import { describe, it, expect } from 'vitest';
import { GameEngine } from '../src/core/engine.ts';
import { createCardInstance } from '../src/core/cards.data.ts';

describe('Raid Realms - Core Game Engine', () => {
  it('Initialisiert ein Spiel korrekt mit Rassen und 5 Handkarten', () => {
    const state = GameEngine.createGame(
      { name: 'Spieler 1', race: 'human' },
      { name: 'Spieler 2', race: 'vampire' },
      12345
    );

    expect(state.players[0].hp).toBe(60);
    expect(state.players[0].hand.length).toBe(5);
    expect(state.players[0].gold).toBe(3); // Basis-Einkommen Runde 1

    // Vampir startet mit 50 HP
    expect(state.players[1].hp).toBe(50);
    expect(state.players[1].hand.length).toBe(5);

    // Markt hat 6 befüllte Slots
    expect(state.market.length).toBe(6);
    expect(state.market.every(c => c !== null)).toBe(true);
  });

  it('Verhindert Direktangriffe auf den Helden bei aktivem Fortify', () => {
    const state = GameEngine.createGame(
      { name: 'P1', race: 'human' },
      { name: 'P2', race: 'orc' }
    );

    const p2 = state.players[1];
    // P2 baut eine Holzmauer mit Fortify
    p2.buildings.push({
      ...createCardInstance('wooden_wall'),
      fortify: true,
      health: 7
    });

    // P1 versucht P2 direkt anzugreifen
    const canHitHero = GameEngine.canTarget(state, 0, { type: 'player', ownerIndex: 1 });
    expect(canHitHero).toBe(false);

    // Aber die Holzmauer darf angegriffen werden
    const canHitWall = GameEngine.canTarget(state, 0, {
      type: 'building',
      ownerIndex: 1,
      buildingUid: p2.buildings[0].uid
    });
    expect(canHitWall).toBe(true);
  });

  it('Erzwingt Taunt-Ziele im Kampf', () => {
    const state = GameEngine.createGame(
      { name: 'P1', race: 'human' },
      { name: 'P2', race: 'orc' }
    );

    const p2 = state.players[1];
    // Slot 0: Normale Miliz
    p2.units[0] = { ...createCardInstance('militia'), attack: 3, health: 4, keywords: [] };
    // Slot 1: Wachhund mit Taunt
    p2.units[1] = { ...createCardInstance('guard_dog'), attack: 2, health: 3, keywords: ['taunt'] };

    // Angriff auf Held verboten
    expect(GameEngine.canTarget(state, 0, { type: 'player', ownerIndex: 1 })).toBe(false);

    // Angriff auf normale Einheit verboten
    expect(GameEngine.canTarget(state, 0, { type: 'unit', ownerIndex: 1, slotIndex: 0 })).toBe(false);

    // Angriff auf Taunt-Einheit erlaubt
    expect(GameEngine.canTarget(state, 0, { type: 'unit', ownerIndex: 1, slotIndex: 1 })).toBe(true);
  });

  it('Piercing-Schaden ignoriert Taunt und Fortify', () => {
    const state = GameEngine.createGame(
      { name: 'P1', race: 'human' },
      { name: 'P2', race: 'orc' }
    );

    const p2 = state.players[1];
    p2.units[0] = { ...createCardInstance('guard_dog'), keywords: ['taunt'] };
    p2.buildings.push({ ...createCardInstance('stone_wall'), fortify: true });

    // Mit isPiercing = true darf der Held trotzdem anvisiert werden
    const canHitHero = GameEngine.canTarget(state, 0, { type: 'player', ownerIndex: 1 }, true);
    expect(canHitHero).toBe(true);
  });

  it('Vampir-Passiv: Jeder Schaden heilt den Spieler um 1 HP', () => {
    const state = GameEngine.createGame(
      { name: 'Vampir', race: 'vampire' },
      { name: 'Gegner', race: 'human' }
    );

    const vamp = state.players[0];
    vamp.hp = 40; // Angeschlagen

    // Vampir wirkt Schwachen Schlag (2 Schaden)
    const card = createCardInstance('weak_strike');
    vamp.hand = [card];
    vamp.gold = 10;

    GameEngine.playCard(state, 0, card.uid, { type: 'player', ownerIndex: 1 });

    // Gegner verliert 2 HP
    expect(state.players[1].hp).toBe(58);
    // Vampir heilt um 1 HP (40 -> 41)
    expect(vamp.hp).toBe(41);
  });

  it('Ork-Berserker-Passiv: +2 Schaden bei < 10 HP', () => {
    const state = GameEngine.createGame(
      { name: 'Ork', race: 'orc' },
      { name: 'Mensch', race: 'human' }
    );

    const ork = state.players[0];
    ork.hp = 8; // < 10 HP -> Berserker aktiv!

    const slash = createCardInstance('slash'); // Basis: 2 Schaden
    ork.hand = [slash];
    ork.gold = 5;

    GameEngine.playCard(state, 0, slash.uid, { type: 'player', ownerIndex: 1 });

    // 2 Basis + 2 Berserker = 4 Schaden an P2 (60 -> 56)
    expect(state.players[1].hp).toBe(56);
  });

  it('Elfen Zauberketten-Bonus erhöht den Schaden aufeinanderfolgender Zauber', () => {
    const state = GameEngine.createGame(
      { name: 'Elf', race: 'elf' },
      { name: 'Mensch', race: 'human' }
    );

    const elf = state.players[0];
    elf.gold = 10;
    const bolt1 = createCardInstance('arcane_bolt'); // isSpell = true, base dmg 2
    const bolt2 = createCardInstance('arcane_bolt'); // isSpell = true, base dmg 2
    elf.hand = [bolt1, bolt2];

    // Erster Zauber: spellChain erhöht sich auf 2 -> 2 Basis + 2 Kette = 4 Schaden (60 -> 56)
    GameEngine.playCard(state, 0, bolt1.uid, { type: 'player', ownerIndex: 1 });
    expect(state.players[1].hp).toBe(56);
    expect(elf.spellChain).toBe(2);

    // Zweiter Zauber: spellChain erhöht sich auf 4 -> 2 Basis + 4 Kette = 6 Schaden (56 -> 50)
    GameEngine.playCard(state, 0, bolt2.uid, { type: 'player', ownerIndex: 1 });
    expect(state.players[1].hp).toBe(50);
    expect(elf.spellChain).toBe(4);
  });

  it('Einheiten-Kampf mit Gegenschlag und Zerstörung', () => {
    const state = GameEngine.createGame(
      { name: 'P1', race: 'human' },
      { name: 'P2', race: 'orc' }
    );

    const p1 = state.players[0];
    const p2 = state.players[1];

    // P1 hat einen Ritter (5 ATK / 6 HP)
    p1.units[0] = { ...createCardInstance('knight'), attack: 5, health: 6, summoned: false };
    // P2 hat eine Miliz (3 ATK / 4 HP)
    p2.units[0] = { ...createCardInstance('militia'), attack: 3, health: 4, summoned: false };

    // P1 greift Miliz an
    const success = GameEngine.attackTarget(state, 0, 0, { type: 'unit', ownerIndex: 1, slotIndex: 0 });
    expect(success).toBe(true);

    // Miliz (4 HP) nimmt 5 Schaden -> tot (null auf Slot 0)
    expect(p2.units[0]).toBeNull();
    // Ritter (6 HP) nimmt 3 Gegenschlag -> 3 HP verbleibend
    expect(p1.units[0]?.health).toBe(3);
  });

  it('Marktkauf zieht Gold ab und legt Karte in den Ablagestapel (Deckbuilder-Mechanik)', () => {
    const state = GameEngine.createGame(
      { name: 'P1', race: 'human' },
      { name: 'P2', race: 'orc' }
    );

    const p1 = state.players[0];
    p1.gold = 10;
    const targetCard = state.market[0]!;
    const cost = targetCard.cost;

    const bought = GameEngine.buyMarketCard(state, 0, 0);
    expect(bought).toBe(true);
    expect(p1.gold).toBe(10 - cost);
    // Karte landet im Ablagestapel
    expect(p1.discard.some(c => c.id === targetCard.id)).toBe(true);
    // Marktslot wurde nachgefüllt
    expect(state.market[0]).not.toBeNull();
  });

  it('Mensch-Passiv: +1 Gold zu Rundenbeginn bei ≥5 Gold', () => {
    const state = GameEngine.createGame(
      { name: 'Mensch', race: 'human' },
      { name: 'Ork', race: 'orc' }
    );

    const human = state.players[0];
    human.gold = 6;

    // Rundenwechsel zu P2 und zurück zu P1
    GameEngine.endTurn(state);
    GameEngine.endTurn(state);

    // P1 startet Runde mit 6 + 3 (Basis) + 1 (Passiv) = 10 Gold
    expect(human.gold).toBe(10);
  });

  it('Drachen-Passiv: Zinsen auf gehortetes Gold (1 Gold pro 10 Gold)', () => {
    const state = GameEngine.createGame(
      { name: 'Drache', race: 'dragon' },
      { name: 'Mensch', race: 'human' }
    );

    const dragon = state.players[0];
    dragon.gold = 20;

    GameEngine.endTurn(state);
    GameEngine.endTurn(state);

    // 20 + 3 (Basis) + 2 (Zinsen für 20 Gold) = 25 Gold
    expect(dragon.gold).toBe(25);
  });

  it('Hero Power kostet 2 Gold und löst Rassen-Effekt aus', () => {
    const state = GameEngine.createGame(
      { name: 'Mensch', race: 'human' },
      { name: 'Ork', race: 'orc' }
    );

    const human = state.players[0];
    human.gold = 5;

    // Mensch Hero Power beschwört eine 1/1 Miliz
    const used = GameEngine.useHeroPower(state, 0);
    expect(used).toBe(true);
    expect(human.gold).toBe(3);
    expect(human.heroPowerUsed).toBe(true);
    expect(human.units.some(u => u?.name === 'Miliz')).toBe(true);

    // Nochmal in derselben Runde nicht erlaubt
    expect(GameEngine.useHeroPower(state, 0)).toBe(false);
  });

  it('Untoten-Einheiten wandern bei Zerstörung in den Friedhof', () => {
    const state = GameEngine.createGame(
      { name: 'Untoter', race: 'undead' },
      { name: 'Ork', race: 'orc' }
    );

    const undead = state.players[0];
    const skel = { ...createCardInstance('summon_skeleton'), attack: 1, health: 1, type: 'unit' as const };
    undead.units[0] = skel;

    // Einheit stirbt
    GameEngine.damageUnit(undead, skel, 5, state);

    // Einheit ist im Friedhof
    expect(undead.graveyard.some(c => c.name === skel.name)).toBe(true);
  });

  it('Feen Hero Power fügt Feenstaub zur Hand hinzu', () => {
    const state = GameEngine.createGame(
      { name: 'Fee', race: 'fairy' },
      { name: 'Mensch', race: 'human' }
    );

    const fairy = state.players[0];
    fairy.gold = 5;

    GameEngine.useHeroPower(state, 0);

    expect(fairy.hand.some(c => c.id === 'hp_fairy_dust')).toBe(true);
    expect(fairy.gold).toBe(3);
  });
});
