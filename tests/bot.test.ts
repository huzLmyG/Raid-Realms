import { describe, it, expect } from 'vitest';
import { GameEngine } from '../src/core/engine.ts';
import { BotAgent } from '../src/core/bot.ts';
import { createCardInstance } from '../src/core/cards.data.ts';

describe('Raid Realms - Bot Agent & AI Simulation', () => {
  it('Bot führt einen gültigen Zug durch und beendet ihn sauber', () => {
    const state = GameEngine.createGame(
      { name: 'Bot 1', race: 'human', isAI: true },
      { name: 'Spieler 2', race: 'orc', isAI: false },
      42
    );

    expect(state.activePlayerIndex).toBe(0);
    BotAgent.playTurn(state, 0);

    // Nach dem Zug ist Spieler 2 am Zug
    expect(state.activePlayerIndex).toBe(1);
    expect(state.log.length).toBeGreaterThan(0);
  });

  it('Bot priorisiert Taunt-Einheiten vor Direktschaden', () => {
    const state = GameEngine.createGame(
      { name: 'Bot', race: 'orc', isAI: true },
      { name: 'Mensch', race: 'human', isAI: false },
      99
    );

    const bot = state.players[0];
    const human = state.players[1];

    // Mensch hat Wachhund mit Taunt (2 ATK / 3 HP)
    human.units[0] = { ...createCardInstance('guard_dog'), keywords: ['taunt'], health: 3 };
    // Bot hat Ritter (5 ATK / 6 HP)
    bot.units[0] = { ...createCardInstance('knight'), attack: 5, health: 6, summoned: false };

    BotAgent.playTurn(state, 0);

    // Der Taunt-Wachhund wurde angegriffen und zerstört
    expect(human.units[0]).toBeNull();
  });

  it('Bot vs Bot Simulation: Vollständiges Duell läuft fehlerfrei bis zum Sieg', () => {
    const state = GameEngine.createGame(
      { name: 'Bot A', race: 'dragon', isAI: true },
      { name: 'Bot B', race: 'undead', isAI: true },
      777
    );

    let maxTurns = 50;
    while (!state.over && maxTurns > 0) {
      const cur = state.activePlayerIndex;
      BotAgent.playTurn(state, cur);
      maxTurns--;
    }

    // Spiel ist nach einer Reihe von Runden beendet
    expect(state.over).toBe(true);
    expect(state.winner).not.toBeNull();
    expect(state.players.some(p => p.hp <= 0)).toBe(true);
  });
});
