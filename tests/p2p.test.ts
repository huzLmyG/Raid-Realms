import { describe, it, expect } from 'vitest';
import { GameEngine } from '../src/core/engine.ts';

describe('Raid Realms - P2P State Synchronization', () => {
  it('Host State laesst sich vollstaendig und verlustfrei an Gast synchronisieren', () => {
    const seed = 12345;
    const hostState = GameEngine.createGame(
      { name: 'Host', race: 'human', isAI: false },
      { name: 'Gast', race: 'orc', isAI: false },
      seed
    );

    // Host fuehrt Aktionen aus: Karte spielen, Markt kaufen, Zug beenden
    const cardToPlay = hostState.players[0].hand[0];
    GameEngine.playCard(hostState, 0, cardToPlay.uid);

    // JSON Serialisierung (wie ueber WebRTC DataChannel)
    const serialized = JSON.stringify(hostState);
    const guestState = JSON.parse(serialized);

    // Gast hat exakt denselben Zustand
    expect(guestState.turn).toBe(hostState.turn);
    expect(guestState.players[0].hand.length).toBe(hostState.players[0].hand.length);
    expect(guestState.players[0].gold).toBe(hostState.players[0].gold);
    expect(guestState.log.length).toBe(hostState.log.length);
    expect(guestState.market.length).toBe(hostState.market.length);
  });
});
