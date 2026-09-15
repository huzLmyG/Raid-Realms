import { GameState, CardInstance, TargetRef } from '../core/types.ts';
import { GameEngine } from '../core/engine.ts';
import { BotAgent } from '../core/bot.ts';
import { renderPlayerBar } from './components/PlayerBar.ts';
import { renderBoardArea } from './components/BoardZone.ts';
import { renderMarketZone } from './components/MarketZone.ts';
import { renderHandZone } from './components/HandZone.ts';
import { SoundEngine } from './audio.ts';

import { P2PNetwork, P2PAction } from '../net/p2p-peerjs.ts';

export class GameUI {
  private container: HTMLElement;
  private state: GameState;
  private selectedAttackerSlot: number | null = null;
  private targetedSpellCard: CardInstance | null = null;
  private p2p?: { network: P2PNetwork; myPlayerIndex: number };

  constructor(
    container: HTMLElement,
    state: GameState,
    p2p?: { network: P2PNetwork; myPlayerIndex: number }
  ) {
    this.container = container;
    this.state = state;
    this.p2p = p2p;

    if (this.p2p) {
      this.setupP2PListeners();
    }

    this.render();
  }

  private setupP2PListeners(): void {
    if (!this.p2p) return;
    const { network, myPlayerIndex } = this.p2p;

    network.onActionReceived = (action: P2PAction) => {
      const remotePlayerIndex = 1 - myPlayerIndex;

      switch (action.type) {
        case 'playCard':
          if (action.cardUid) {
            GameEngine.playCard(this.state, remotePlayerIndex, action.cardUid, action.target);
            SoundEngine.playCard();
          }
          break;
        case 'attack':
          if (action.attackerSlot !== undefined && action.target) {
            GameEngine.attackTarget(this.state, remotePlayerIndex, action.attackerSlot, action.target);
            SoundEngine.damage();
          }
          break;
        case 'buy':
          if (action.marketSlot !== undefined) {
            GameEngine.buyMarketCard(this.state, remotePlayerIndex, action.marketSlot);
            SoundEngine.buy();
          }
          break;
        case 'reroll':
          GameEngine.rerollMarket(this.state, remotePlayerIndex);
          SoundEngine.gold();
          break;
        case 'heroPower':
          GameEngine.useHeroPower(this.state, remotePlayerIndex);
          SoundEngine.playCard();
          break;
        case 'endTurn':
          GameEngine.endTurn(this.state);
          SoundEngine.turn();
          break;
      }

      if (network.isHost) {
        network.syncState(this.state);
      }
      this.render();
    };

    network.onStateSync = (syncedState: GameState) => {
      this.state = syncedState;
      this.render();
    };

    network.onDisconnected = () => {
      alert('Der andere Spieler hat das Duell verlassen.');
    };
  }

  public updateState(newState: GameState): void {
    this.state = newState;
    this.render();
  }

  public render(): void {
    this.container.innerHTML = '';
    const myIndex = this.p2p ? this.p2p.myPlayerIndex : 0;
    const enemyIndex = 1 - myIndex;
    const isMyTurn = this.state.activePlayerIndex === myIndex;
    const me = this.state.players[myIndex];
    const enemy = this.state.players[enemyIndex];

    const layout = document.createElement('div');
    layout.className = 'game-layout';

    // 1. Enemy Bar (Top)
    const canTargetEnemyHero = this.isTargetModeActive()
      ? GameEngine.canTarget(
          this.state,
          myIndex,
          { type: 'player', ownerIndex: enemyIndex },
          this.targetedSpellCard?.piercing
        )
      : false;

    const enemyBar = renderPlayerBar(enemy, {
      isMine: false,
      canTargetHero: canTargetEnemyHero,
      onHeroClick: () => this.handleTargetSelected({ type: 'player', ownerIndex: enemyIndex })
    });
    layout.appendChild(enemyBar);

    // 2. Enemy Board (Units & Buildings)
    const enemyBoard = renderBoardArea(enemy, enemyIndex, {
      isEnemy: true,
      canTargetChecker: (target) =>
        this.isTargetModeActive()
          ? GameEngine.canTarget(this.state, myIndex, target, this.targetedSpellCard?.piercing)
          : false,
      onUnitClick: (slotIndex) => {
        if (this.isTargetModeActive()) {
          this.handleTargetSelected({ type: 'unit', ownerIndex: enemyIndex, slotIndex });
        }
      },
      onBuildingClick: (buildingUid) => {
        if (this.isTargetModeActive()) {
          this.handleTargetSelected({ type: 'building', ownerIndex: enemyIndex, buildingUid });
        }
      }
    });
    layout.appendChild(enemyBoard);

    // 3. Center Zone (Market, Turn, Phase, Reroll)
    const centerZone = renderMarketZone(this.state.market, {
      turn: this.state.turn,
      playerGold: me.gold,
      isMyTurn,
      onBuyCard: (slotIndex) => {
        if (!isMyTurn) return;
        SoundEngine.buy();
        GameEngine.buyMarketCard(this.state, myIndex, slotIndex);
        if (this.p2p) {
          this.p2p.network.sendAction({ type: 'buy', marketSlot: slotIndex });
          if (this.p2p.network.isHost) this.p2p.network.syncState(this.state);
        }
        this.render();
      },
      onReroll: () => {
        if (!isMyTurn) return;
        SoundEngine.gold();
        GameEngine.rerollMarket(this.state, myIndex);
        if (this.p2p) {
          this.p2p.network.sendAction({ type: 'reroll' });
          if (this.p2p.network.isHost) this.p2p.network.syncState(this.state);
        }
        this.render();
      },
      onEndTurn: () => {
        if (!isMyTurn) return;
        SoundEngine.turn();
        this.clearTargetMode();
        GameEngine.endTurn(this.state);
        if (this.p2p) {
          this.p2p.network.sendAction({ type: 'endTurn' });
          if (this.p2p.network.isHost) this.p2p.network.syncState(this.state);
        }
        this.render();

        // Wenn Gegner AI ist, lassen wir ihn nach einer kurzen Pause ziehen
        if (!this.p2p && this.state.players[1].isAI && !this.state.over) {
          setTimeout(() => this.runAITurn(), 600);
        }
      }
    });
    layout.appendChild(centerZone);

    // 4. My Board (Units & Buildings)
    const myBoard = renderBoardArea(me, myIndex, {
      isEnemy: false,
      selectedAttackerSlot: this.selectedAttackerSlot,
      onUnitClick: (slotIndex) => {
        const unit = me.units[slotIndex];
        if (!unit || !isMyTurn) return;

        if (unit.summoned) {
          SoundEngine.error();
          return;
        }

        if (this.selectedAttackerSlot === slotIndex) {
          this.clearTargetMode();
        } else {
          this.clearTargetMode();
          this.selectedAttackerSlot = slotIndex;
        }
        this.render();
      }
    });
    layout.appendChild(myBoard);

    // 5. My Hand
    const handZone = renderHandZone(me.hand, {
      playerGold: me.gold,
      isMyTurn,
      selectedCardUid: this.targetedSpellCard?.uid,
      onCardClick: (card) => {
        if (!isMyTurn) return;

        // Wenn Karte direkt ausgeführt werden kann (kein manuelles Single-Target)
        if (card.type === 'unit' || card.type === 'building' || card.type === 'resource' || card.aoe || !card.damage) {
          SoundEngine.playCard();
          GameEngine.playCard(this.state, myIndex, card.uid);
          if (this.p2p) {
            this.p2p.network.sendAction({ type: 'playCard', cardUid: card.uid });
            if (this.p2p.network.isHost) this.p2p.network.syncState(this.state);
          }
          this.render();
        } else {
          // Schadenszauber benötigt Ziel
          if (this.targetedSpellCard?.uid === card.uid) {
            this.clearTargetMode();
          } else {
            this.clearTargetMode();
            this.targetedSpellCard = card;
          }
          this.render();
        }
      }
    });
    layout.appendChild(handZone);

    // 6. My Bar (Avatar, HP, Gold, Hero Power)
    const myBar = renderPlayerBar(me, {
      isMine: true,
      onHeroPowerClick: () => {
        if (isMyTurn && me.gold >= 2 && !me.heroPowerUsed) {
          SoundEngine.playCard();
          GameEngine.useHeroPower(this.state, myIndex);
          if (this.p2p) {
            this.p2p.network.sendAction({ type: 'heroPower' });
            if (this.p2p.network.isHost) this.p2p.network.syncState(this.state);
          }
          this.render();
        }
      }
    });
    layout.appendChild(myBar);

    // Target Indicator Overlay
    if (this.isTargetModeActive()) {
      const targetInd = document.createElement('div');
      targetInd.className = 'target-indicator on';
      targetInd.textContent = this.selectedAttackerSlot !== null
        ? '⚔️ Wähle ein Ziel für deinen Angriff!'
        : `⚔️ Wähle ein Ziel für ${this.targetedSpellCard?.name}! (Klick auf Handkarte zum Abbrechen)`;
      layout.appendChild(targetInd);
    }

    // Battle Log
    const logZone = document.createElement('div');
    logZone.className = 'log-zone';
    const recentLogs = this.state.log.slice(-6);
    recentLogs.forEach((entry) => {
      const row = document.createElement('div');
      row.className = `log-entry ${entry.type}`;
      row.textContent = entry.message;
      logZone.appendChild(row);
    });
    layout.appendChild(logZone);

    // Game Over Overlay
    if (this.state.over) {
      const overOverlay = document.createElement('div');
      overOverlay.className = 'modal-overlay open';
      const isWinner = this.state.winner === myIndex;
      if (isWinner) SoundEngine.victory();
      else SoundEngine.defeat();

      overOverlay.innerHTML = `
        <div class="modal-box" style="text-align:center;">
          <h2 style="font-size:2.5rem;color:${isWinner ? 'var(--gold)' : 'var(--blood)'};">
            ${isWinner ? '🏆 SIEG!' : '💀 NIEDERLAGE!'}
          </h2>
          <p style="font-size:1.2rem;color:var(--txt2);margin:1rem 0;">
            ${isWinner ? 'Du hast das Duell glorreich gewonnen!' : 'Deine Streitkräfte wurden überwältigt.'}
          </p>
          <button class="start-btn" id="btn-restart">Nochmal spielen</button>
        </div>
      `;
      const restartBtn = overOverlay.querySelector('#btn-restart');
      if (restartBtn) {
        restartBtn.addEventListener('click', () => {
          location.reload();
        });
      }
      layout.appendChild(overOverlay);
    }

    this.container.appendChild(layout);
  }

  private isTargetModeActive(): boolean {
    return this.selectedAttackerSlot !== null || this.targetedSpellCard !== null;
  }

  private clearTargetMode(): void {
    this.selectedAttackerSlot = null;
    this.targetedSpellCard = null;
  }

  private handleTargetSelected(target: TargetRef): void {
    const myIndex = this.p2p ? this.p2p.myPlayerIndex : 0;

    if (this.selectedAttackerSlot !== null) {
      SoundEngine.damage();
      GameEngine.attackTarget(this.state, myIndex, this.selectedAttackerSlot, target);
      if (this.p2p) {
        this.p2p.network.sendAction({
          type: 'attack',
          attackerSlot: this.selectedAttackerSlot,
          target
        });
        if (this.p2p.network.isHost) this.p2p.network.syncState(this.state);
      }
      this.clearTargetMode();
      this.render();
    } else if (this.targetedSpellCard !== null) {
      SoundEngine.playCard();
      GameEngine.playCard(this.state, myIndex, this.targetedSpellCard.uid, target);
      if (this.p2p) {
        this.p2p.network.sendAction({
          type: 'playCard',
          cardUid: this.targetedSpellCard.uid,
          target
        });
        if (this.p2p.network.isHost) this.p2p.network.syncState(this.state);
      }
      this.clearTargetMode();
      this.render();
    }
  }

  private runAITurn(): void {
    if (this.state.over) return;
    const aiIndex = 1;
    BotAgent.playTurn(this.state, aiIndex);
    SoundEngine.turn();
    this.render();
  }
}
