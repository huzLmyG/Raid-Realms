import Peer, { DataConnection } from 'peerjs';
import { GameState, RaceId, TargetRef } from '../core/types.ts';

export type P2PMessageType =
  | 'HANDSHAKE'
  | 'GAME_START'
  | 'ACTION'
  | 'SYNC_STATE'
  | 'EMOTE'
  | 'DISCONNECT';

export interface P2PAction {
  type: 'playCard' | 'attack' | 'buy' | 'reroll' | 'endTurn' | 'heroPower';
  cardUid?: string;
  target?: TargetRef;
  attackerSlot?: number;
  marketSlot?: number;
}

export interface P2PMessage {
  type: P2PMessageType;
  payload?: any;
}

export class P2PNetwork {
  private peer: Peer | null = null;
  private conn: DataConnection | null = null;
  public isHost: boolean = false;
  public myPlayerIndex: number = 0; // 0 for host, 1 for guest
  public roomId: string = '';

  public onConnected?: (opponentName: string, opponentRace: RaceId) => void;
  public onGameStart?: (initialState: GameState) => void;
  public onActionReceived?: (action: P2PAction) => void;
  public onStateSync?: (syncedState: GameState) => void;
  public onDisconnected?: () => void;
  public onError?: (err: string) => void;

  /**
   * Erstellt einen neuen P2P-Raum als Host.
   */
  public async createRoom(
    hostName: string,
    hostRace: RaceId
  ): Promise<string> {
    this.isHost = true;
    this.myPlayerIndex = 0;

    const randomSuffix = Math.floor(1000 + Math.random() * 9000).toString();
    const peerId = `raidrealms-${randomSuffix}`;

    return new Promise((resolve, reject) => {
      this.peer = new Peer(peerId);

      this.peer.on('open', (id) => {
        this.roomId = id.replace('raidrealms-', '');
        resolve(this.roomId);
      });

      this.peer.on('connection', (conn) => {
        this.conn = conn;
        this.setupConnection(hostName, hostRace);
      });

      this.peer.on('error', (err) => {
        console.error('Peer error:', err);
        if (this.onError) this.onError(err.message);
        reject(err);
      });
    });
  }

  /**
   * Tritt einem bestehenden Raum als Gast bei.
   */
  public async joinRoom(
    roomCode: string,
    guestName: string,
    guestRace: RaceId
  ): Promise<void> {
    this.isHost = false;
    this.myPlayerIndex = 1;
    this.roomId = roomCode.trim().toLowerCase();

    const targetPeerId = this.roomId.startsWith('raidrealms-')
      ? this.roomId
      : `raidrealms-${this.roomId}`;

    return new Promise((resolve, reject) => {
      this.peer = new Peer();

      this.peer.on('open', () => {
        this.conn = this.peer!.connect(targetPeerId);

        this.conn.on('open', () => {
          this.setupConnection(guestName, guestRace);
          // Handshake senden
          this.sendMessage({
            type: 'HANDSHAKE',
            payload: { name: guestName, race: guestRace }
          });
          resolve();
        });

        this.conn.on('error', (err) => {
          console.error('Connection error:', err);
          if (this.onError) this.onError(err.message);
          reject(err);
        });
      });

      this.peer.on('error', (err) => {
        console.error('Peer error:', err);
        if (this.onError) this.onError(err.message);
        reject(err);
      });
    });
  }

  private setupConnection(myName: string, myRace: RaceId): void {
    if (!this.conn) return;

    this.conn.on('data', (data) => {
      const msg = data as P2PMessage;
      this.handleMessage(msg, myName, myRace);
    });

    this.conn.on('close', () => {
      if (this.onDisconnected) this.onDisconnected();
    });
  }

  private handleMessage(msg: P2PMessage, myName: string, myRace: RaceId): void {
    switch (msg.type) {
      case 'HANDSHAKE':
        if (this.isHost) {
          // Host sendet Handshake zurück
          this.sendMessage({
            type: 'HANDSHAKE',
            payload: { name: myName, race: myRace }
          });
        }
        if (this.onConnected) {
          this.onConnected(msg.payload.name, msg.payload.race);
        }
        break;

      case 'GAME_START':
        if (this.onGameStart) {
          this.onGameStart(msg.payload.state);
        }
        break;

      case 'ACTION':
        if (this.onActionReceived) {
          this.onActionReceived(msg.payload);
        }
        break;

      case 'SYNC_STATE':
        if (this.onStateSync) {
          this.onStateSync(msg.payload.state);
        }
        break;

      case 'DISCONNECT':
        if (this.onDisconnected) {
          this.onDisconnected();
        }
        break;
    }
  }

  public sendGameStart(state: GameState): void {
    this.sendMessage({
      type: 'GAME_START',
      payload: { state }
    });
  }

  public sendAction(action: P2PAction): void {
    this.sendMessage({
      type: 'ACTION',
      payload: action
    });
  }

  public syncState(state: GameState): void {
    this.sendMessage({
      type: 'SYNC_STATE',
      payload: { state }
    });
  }

  public disconnect(): void {
    if (this.conn) {
      this.sendMessage({ type: 'DISCONNECT' });
      this.conn.close();
      this.conn = null;
    }
    if (this.peer) {
      this.peer.destroy();
      this.peer = null;
    }
  }

  private sendMessage(msg: P2PMessage): void {
    if (this.conn && this.conn.open) {
      this.conn.send(msg);
    }
  }
}
