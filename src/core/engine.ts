import {
  GameState,
  PlayerState,
  CardInstance,
  CardData,
  TargetRef,
  RaceId,
  LogEntry
} from './types.ts';
import { CARDS_DB, RACES, createCardInstance } from './cards.data.ts';

export class GameEngine {
  /**
   * Erstellt ein neues Spiel zwischen zwei Spielern.
   */
  public static createGame(
    p1: { name: string; race: RaceId; isAI?: boolean },
    p2: { name: string; race: RaceId; isAI?: boolean },
    seed = Date.now()
  ): GameState {
    const player1 = this.createPlayer('p1', p1.name, p1.race, !!p1.isAI);
    const player2 = this.createPlayer('p2', p2.name, p2.race, !!p2.isAI);

    const state: GameState = {
      matchId: `match_${Date.now()}`,
      turn: 1,
      activePlayerIndex: 0,
      phase: 'main',
      market: Array(6).fill(null),
      marketDeck: [],
      marketDiscard: [],
      players: [player1, player2],
      over: false,
      winner: null,
      log: [],
      rngSeed: seed,
      BASE_INCOME: 3
    };

    // Beide Spieler mischen ihr Startdeck
    this.shuffle(player1.deck, state);
    this.shuffle(player2.deck, state);

    // Initial 5 Karten ziehen
    for (let i = 0; i < 5; i++) {
      this.drawCard(player1);
      this.drawCard(player2);
    }

    // Markt initialisieren
    this.buildMarketDeck(state);
    this.refreshMarket(state);

    // Start-Einkommen für Spieler 1
    player1.gold += state.BASE_INCOME;
    this.addLog(state, 'action', `─── ${player1.name} Runde 1 (+${state.BASE_INCOME} Gold Basis) ───`);

    return state;
  }

  private static createPlayer(id: string, name: string, race: RaceId, isAI: boolean): PlayerState {
    const startHP = race === 'vampire' ? 50 : 60;
    const raceConfig = RACES[race];
    const deck: CardInstance[] = [];

    for (const entry of raceConfig.cards) {
      for (let i = 0; i < entry.n; i++) {
        deck.push(createCardInstance(entry.id));
      }
    }

    return {
      id,
      name,
      race,
      isAI,
      hp: startHP,
      maxHP: startHP,
      gold: 0,
      storedGold: 0,
      lastRoundGold: 0,
      deck,
      hand: [],
      discard: [],
      units: Array(7).fill(null),
      buildings: [],
      graveyard: [],
      spellChain: 0,
      upgradeUsed: false,
      heroPowerUsed: false,
      relic: null,
      _relicUsed: false,
      _boughtThisTurn: false,
      _nextSpellFree: false,
      _spellDiscount: 0,
      _allEcho: false,
      _doubleDmg: false,
      _nextUnitDiscount: 0,
      _deathSave: false,
      _idolBonus: 0,
      _firstAttackFree: false,
      _invulnerable: 0,
      _armor: 0,
      _preventAttack: false,
      _noBuy: false,
      _cursedCostPlus: 0,
      _skipNextTurn: false,
      _extraTurn: false,
      _hpAtTurnStart: startHP
    };
  }

  // ==========================================
  // ZUG- UND PHASEN-MANAGEMENT
  // ==========================================

  public static startTurn(state: GameState): void {
    const p = state.players[state.activePlayerIndex];

    if (p._skipNextTurn) {
      p._skipNextTurn = false;
      this.addLog(state, 'action', `${p.name} überspringt diesen Zug!`);
      this.endTurn(state);
      return;
    }

    state.phase = 'main';
    p.spellChain = 0;
    p.upgradeUsed = false;
    p.heroPowerUsed = false;
    p._hpAtTurnStart = p.hp;
    p._boughtThisTurn = false;
    p._firstAttackFree = false;
    p._nextSpellFree = false;
    p._spellDiscount = 0;
    p._allEcho = false;
    p._doubleDmg = false;
    p._nextUnitDiscount = 0;

    // Basis-Einkommen
    p.gold += state.BASE_INCOME;
    this.addLog(state, 'action', `─── ${p.name} Runde ${state.turn} (+${state.BASE_INCOME} Gold Basis) ───`);

    // Gebäude-Effekte
    for (const b of [...p.buildings]) {
      if (b.goldPerTurn) {
        p.gold += b.goldPerTurn;
        this.addLog(state, 'gold', `${b.name}: +${b.goldPerTurn} Gold`);
      }
      if (b.selfDamagePerTurn) {
        this.damagePlayer(p, b.selfDamagePerTurn, state);
        this.addLog(state, 'damage', `${b.name}: -${b.selfDamagePerTurn} HP`);
      }
      if (b.healPerTurn) {
        let healAmt = b.healPerTurn;
        if (b.bonusHealLowHP && p.hp < 20) healAmt += b.bonusHealLowHP;
        this.healPlayer(p, healAmt);
        this.addLog(state, 'heal', `${b.name}: +${healAmt} HP`);
      }
      if (b.damagePerTurn) {
        const opp = state.players[1 - state.activePlayerIndex];
        this.damagePlayer(opp, b.damagePerTurn, state);
        this.addLog(state, 'damage', `${b.name}: ${opp.name} -${b.damagePerTurn} HP`);
      }
      if (b.summonPerTurn) {
        const [nm, atk, hp] = b.summonPerTurn;
        this.spawnUnit(p, nm, atk, hp, state);
      }
      if (b.buffUnitsPerTurn) {
        for (const u of p.units) {
          if (u) {
            u.attack = (u.attack ?? 0) + 1;
            u.health = (u.health ?? 0) + 1;
            u.maxHealth = (u.maxHealth ?? 0) + 1;
          }
        }
        this.addLog(state, 'summon', `${b.name}: +1/+1 für alle Einheiten`);
      }
      if (b.upgradePerTurn) {
        const upgradeable = p.hand.filter(c => c.upgradeable);
        if (upgradeable.length > 0) {
          upgradeable[0].upgrades++;
          this.addLog(state, 'summon', `${b.name} wertet ${upgradeable[0].name} auf`);
        }
      }
    }

    // Einheiten-Effekte
    for (const u of p.units) {
      if (!u) continue;
      if (u.goldPerTurn) {
        p.gold += u.goldPerTurn;
        this.addLog(state, 'gold', `${u.name}: +${u.goldPerTurn} Gold`);
      }
      if (u.healPerTurn) {
        this.healPlayer(p, u.healPerTurn);
        this.addLog(state, 'heal', `${u.name}: +${u.healPerTurn} HP`);
      }
      if (u.growPerTurn) {
        u.attack = (u.attack ?? 0) + 1;
        u.health = (u.health ?? 0) + 1;
        u.maxHealth = (u.maxHealth ?? 0) + 1;
        this.addLog(state, 'summon', `${u.name}: +1/+1 (Wachstum)`);
      }
    }

    // Rassen-Passive zu Rundenbeginn
    if (p.race === 'human' && p.gold >= 5) {
      p.gold++;
      this.addLog(state, 'gold', 'Mensch-Passiv: +1 Gold (≥5 Gold)');
    }
    if (p.race === 'dragon') {
      const interest = Math.floor(p.gold / 10);
      if (interest > 0) {
        p.gold += interest;
        this.addLog(state, 'gold', `Drache-Passiv: +${interest} Zinsen (${p.gold - interest} Gold im Hort)`);
      }
    }

    // Hand auf 5 Karten nachziehen
    while (p.hand.length < 5) {
      const card = this.drawCard(p);
      if (!card) break;
    }

    // Einheiten für den neuen Zug einsatzbereit machen
    for (const u of p.units) {
      if (u) u.summoned = false;
    }

    this.checkGameOver(state);
  }

  public static endTurn(state: GameState): void {
    const p = state.players[state.activePlayerIndex];

    // Cursed Demon Selbstschaden
    for (const u of p.units) {
      if (u?._cursedDemon) {
        this.damagePlayer(p, 3, state);
        this.addLog(state, 'damage', `${u.name} fügt ${p.name} 3 Schaden zu!`);
      }
    }

    // Reset per-turn flags
    p._noBuy = false;
    p._cursedCostPlus = 0;
    p._armor = 0;
    if (p._invulnerable > 0) p._invulnerable--;
    if (p._preventAttack) p._preventAttack = false;

    p.lastRoundGold = p.gold;

    // Handkarten ablegen
    p.discard.push(...p.hand);
    p.hand = [];

    // Extra Turn Check
    if (p._extraTurn) {
      p._extraTurn = false;
      this.addLog(state, 'action', `${p.name} erhält einen Extra-Zug!`);
      this.checkGameOver(state);
      if (!state.over) this.startTurn(state);
      return;
    }

    // Spielerwechsel
    state.activePlayerIndex = 1 - state.activePlayerIndex;
    if (state.activePlayerIndex === 0) {
      state.turn++;
    }

    this.checkGameOver(state);
    if (!state.over) {
      this.startTurn(state);
    }
  }

  // ==========================================
  // KARTEN AUSSPILEN
  // ==========================================

  public static canPlayCard(state: GameState, playerIndex: number, cardUid: string): boolean {
    if (state.over || state.activePlayerIndex !== playerIndex) return false;
    const player = state.players[playerIndex];
    const card = player.hand.find(c => c.uid === cardUid);
    if (!card) return false;

    const cost = this.calculateCardCost(player, card);
    if (player.gold < cost) return false;

    // Wenn es eine Einheit ist, prüfen ob Platz auf dem Feld ist
    if (card.type === 'unit') {
      const freeSlot = player.units.findIndex(u => u === null);
      if (freeSlot === -1) return false;
    }

    return true;
  }

  public static playCard(
    state: GameState,
    playerIndex: number,
    cardUid: string,
    target?: TargetRef
  ): boolean {
    if (!this.canPlayCard(state, playerIndex, cardUid)) return false;

    const player = state.players[playerIndex];
    const opp = state.players[1 - playerIndex];
    const cardIdx = player.hand.findIndex(c => c.uid === cardUid);
    const card = player.hand[cardIdx];

    const actualCost = this.calculateCardCost(player, card);
    player.gold -= actualCost;
    player.hand.splice(cardIdx, 1);

    this.addLog(state, 'action', `${player.name} spielt ${card.name}${actualCost > 0 ? ` (${actualCost} Gold)` : ''}`);

    // Elfen Zauberketten-Bonus
    if (card.isSpell && player.race === 'elf') {
      player.spellChain += 2;
    }

    // Echo-Mechanik (Fee)
    const canEcho = (player.race === 'fairy' && card.echoable) || player._allEcho;
    const echoChance = player.units.some(u => u?.echoBoost) ? 0.6 : 0.4;
    const isEcho = canEcho && this.random(state) < echoChance;
    const repeatCount = isEcho ? 2 : 1;

    if (isEcho) {
      this.addLog(state, 'summon', '✨ ECHO! Karte wird doppelt gewirkt!');
    }

    for (let r = 0; r < repeatCount; r++) {
      this.applyCardEffect(state, player, opp, card, target);
    }

    if (card.type !== 'unit' && card.type !== 'building') {
      player.discard.push(card);
    }

    this.checkGameOver(state);
    return true;
  }

  private static applyCardEffect(
    state: GameState,
    player: PlayerState,
    opp: PlayerState,
    card: CardInstance,
    target?: TargetRef
  ): void {
    // Gold & Draw
    if (card.gold) {
      const g = card.gold + card.upgrades;
      player.gold += g;
      this.addLog(state, 'gold', `+${g} Gold`);
    }
    if (card.draw) {
      for (let i = 0; i < card.draw; i++) this.drawCard(player);
    }
    if (card.selfDamage) {
      this.damagePlayer(player, card.selfDamage, state);
      this.addLog(state, 'damage', `${player.name} nimmt ${card.selfDamage} Selbstschaden`);
    }
    if (card.heal) {
      this.healPlayer(player, card.heal);
      this.addLog(state, 'heal', `${player.name} heilt um ${card.heal} HP`);
    }

    // Einheit beschwören
    if (card.type === 'unit') {
      const slot = player.units.findIndex(u => u === null);
      if (slot !== -1) {
        const atk = (card.attack ?? 0) + card.upgrades;
        const hp = (card.health ?? 0) + card.upgrades;
        const kw = card.keywords ?? [];
        player.units[slot] = {
          ...card,
          attack: atk,
          health: hp,
          maxHealth: hp,
          summoned: !kw.includes('charge'),
          uid: `${card.id}_board_${Date.now()}_${Math.random()}`
        };
        this.addLog(state, 'summon', `${player.name} beschwört ${card.name} (${atk}/${hp})`);
      }
    }

    // Gebäude errichten
    if (card.type === 'building') {
      const hp = (card.health ?? 0) + card.upgrades * 2;
      player.buildings.push({
        ...card,
        health: hp,
        maxHealth: hp,
        uid: `${card.id}_build_${Date.now()}_${Math.random()}`
      });
      this.addLog(state, 'summon', `${player.name} baut ${card.name} (${hp} HP)`);
    }

    // Direkter oder AOE Schaden
    if (card.damage) {
      let dmg = card.damage + card.upgrades * 2;
      if (card.isSpell && player.race === 'elf') dmg += Math.min(player.spellChain, 6);
      if (player.race === 'orc' && player.hp < 10) dmg += 2;
      if (player.race === 'demon' && player.hp < 8) dmg += 5;
      if (player.race === 'werewolf') dmg += Math.min(Math.floor(player.units.filter(u => u !== null).length / 2), 2);
      if (player._doubleDmg) {
        dmg *= 2;
        player._doubleDmg = false;
      }

      if (card.aoe) {
        // Flächenschaden
        for (const u of opp.units) {
          if (u) this.damageUnit(opp, u, dmg, state);
        }
        for (const b of [...opp.buildings]) {
          this.damageBuilding(opp, b, dmg, state);
        }
        if (card.direct) {
          this.damagePlayer(opp, dmg, state);
          this.addLog(state, 'damage', `${opp.name} erleidet ${dmg} Direktschaden`);
        }
      } else if (target) {
        this.resolveTargetedDamage(state, player, opp, card, target, dmg);
      } else {
        // Standardmäßig auf Spieler wenn kein Ziel
        this.damagePlayer(opp, dmg, state);
        if (player.race === 'vampire') this.healPlayer(player, 1);
      }
    }

    if (card.extraTurn) player._extraTurn = true;
    if (card.skipOpponentTurn) opp._skipNextTurn = true;
    if (card.healAll) this.healPlayer(player, player.maxHP);
  }

  // ==========================================
  // KAMPF & ZIELWAHL
  // ==========================================

  public static canTarget(
    state: GameState,
    playerIndex: number,
    target: TargetRef,
    isPiercing = false
  ): boolean {
    const opp = state.players[1 - playerIndex];
    if (target.ownerIndex !== 1 - playerIndex) return false;

    // Piercing ignoriert Taunt und Fortify
    if (isPiercing) return true;

    // Taunt-Prüfung
    const tauntUnits = opp.units.filter(u => u !== null && u.keywords?.includes('taunt'));
    if (tauntUnits.length > 0) {
      if (target.type !== 'unit' || target.slotIndex === undefined) return false;
      const targetUnit = opp.units[target.slotIndex];
      return !!targetUnit?.keywords?.includes('taunt');
    }

    // Fortify-Prüfung
    if (target.type === 'player') {
      const hasFortify = opp.buildings.some(b => b.fortify);
      if (hasFortify) return false;
    }

    return true;
  }

  public static attackTarget(
    state: GameState,
    playerIndex: number,
    attackerSlot: number,
    target: TargetRef
  ): boolean {
    if (state.over || state.activePlayerIndex !== playerIndex) return false;
    const player = state.players[playerIndex];
    const opp = state.players[1 - playerIndex];
    const attacker = player.units[attackerSlot];

    if (!attacker || attacker.summoned) return false;
    if (!this.canTarget(state, playerIndex, target)) return false;

    let dmg = attacker.attack ?? 0;
    if (player.race === 'orc' && player.hp < 10) dmg += 2;
    if (player.race === 'werewolf') dmg += Math.min(player.units.filter(u => u !== null).length, 4);

    if (target.type === 'player') {
      this.damagePlayer(opp, dmg, state);
      this.addLog(state, 'damage', `${attacker.name} greift ${opp.name} direkt an (${dmg} Schaden)`);
      if (player.race === 'vampire') this.healPlayer(player, 1);
    } else if (target.type === 'unit' && target.slotIndex !== undefined) {
      const defender = opp.units[target.slotIndex];
      if (!defender) return false;

      this.damageUnit(opp, defender, dmg, state);
      this.addLog(state, 'damage', `${attacker.name} greift ${defender.name} an (${dmg} Schaden)`);

      // Gegenschlag
      const counterAtk = defender.attack ?? 0;
      if (counterAtk > 0) {
        this.damageUnit(player, attacker, counterAtk, state);
        this.addLog(state, 'damage', `${defender.name} schlägt mit ${counterAtk} Schaden zurück`);
      }

      // Lifesteal
      if (attacker.unitLifesteal && (attacker.health ?? 0) > 0) {
        this.healPlayer(player, dmg);
        this.addLog(state, 'heal', `${attacker.name}: +${dmg} HP (Lifesteal)`);
      }
      if (player.race === 'vampire') this.healPlayer(player, 1);
    } else if (target.type === 'building' && target.buildingUid) {
      const b = opp.buildings.find(item => item.uid === target.buildingUid);
      if (!b) return false;

      this.damageBuilding(opp, b, dmg, state);
      this.addLog(state, 'damage', `${attacker.name} greift Gebäude ${b.name} an (${dmg} Schaden)`);
      if (player.race === 'vampire') this.healPlayer(player, 1);
    }

    attacker.summoned = true;
    this.checkGameOver(state);
    return true;
  }

  // ==========================================
  // MARKT & WIRTSCHAFT
  // ==========================================

  public static buyMarketCard(state: GameState, playerIndex: number, slotIndex: number): boolean {
    if (state.over || state.activePlayerIndex !== playerIndex) return false;
    const player = state.players[playerIndex];
    if (slotIndex < 0 || slotIndex >= state.market.length) return false;

    const card = state.market[slotIndex];
    if (!card) return false;
    if (player.gold < card.cost) return false;

    player.gold -= card.cost;
    player._boughtThisTurn = true;
    player.discard.push(createCardInstance(card.id));
    this.addLog(state, 'gold', `${player.name} kauft ${card.name} für ${card.cost} Gold`);

    // Slot neu befüllen
    state.market[slotIndex] = this.drawMarketCard(state);
    return true;
  }

  public static rerollMarket(state: GameState, playerIndex: number): boolean {
    if (state.over || state.activePlayerIndex !== playerIndex) return false;
    const player = state.players[playerIndex];
    const cost = 2;
    if (player.gold < cost) return false;

    player.gold -= cost;
    this.refreshMarket(state);
    this.addLog(state, 'gold', `${player.name} erneuert den Markt für 2 Gold`);
    return true;
  }

  public static useHeroPower(state: GameState, playerIndex: number): boolean {
    if (state.over || state.activePlayerIndex !== playerIndex) return false;
    const player = state.players[playerIndex];
    const opp = state.players[1 - playerIndex];
    if (player.heroPowerUsed || player.gold < 2) return false;

    player.gold -= 2;
    player.heroPowerUsed = true;
    this.addLog(state, 'action', `${player.name} aktiviert Hero Power (2 Gold)`);

    switch (player.race) {
      case 'human':
        this.spawnUnit(player, 'Miliz', 1, 1, state);
        break;
      case 'orc':
        this.damagePlayer(opp, 1, state);
        this.addLog(state, 'damage', `${opp.name} erleidet 1 Schaden durch Ork-Power`);
        break;
      case 'elf':
        player.hand.push(createCardInstance('hp_spark'));
        this.addLog(state, 'summon', 'Funke zur Hand hinzugefügt');
        break;
      case 'undead':
        this.spawnUnit(player, 'Skelett', 1, 1, state);
        break;
      case 'dragon':
        this.damagePlayer(opp, 1, state);
        break;
      case 'dwarf':
        if (player.hand.length > 0) {
          player.hand[0].upgrades++;
          this.addLog(state, 'summon', `${player.hand[0].name} aufgewertet (+1)`);
        }
        break;
      case 'fairy':
        player.hand.push(createCardInstance('hp_fairy_dust'));
        this.addLog(state, 'summon', 'Feenstaub zur Hand hinzugefügt');
        break;
      case 'demon':
        if (player.hp > 1) {
          this.damagePlayer(player, 1, state);
          this.drawCard(player);
          this.addLog(state, 'action', '1 HP geopfert -> 1 Karte gezogen');
        }
        break;
      case 'werewolf':
        for (const u of player.units) {
          if (u) {
            u.attack = (u.attack ?? 0) + 1;
            break;
          }
        }
        break;
      case 'vampire':
        this.healPlayer(player, 2);
        break;
    }

    this.checkGameOver(state);
    return true;
  }

  // ==========================================
  // INTERNE HILFSMETHODEN
  // ==========================================

  private static calculateCardCost(player: PlayerState, card: CardInstance): number {
    let cost = card.cost + (player._cursedCostPlus || 0);
    if (player._firstAttackFree && card.damage && card.cost > 0) cost = 0;
    if (player._nextSpellFree && card.isSpell) cost = 0;
    if (player._spellDiscount && card.isSpell) cost = Math.max(0, cost - player._spellDiscount);
    return cost;
  }

  private static resolveTargetedDamage(
    state: GameState,
    player: PlayerState,
    opp: PlayerState,
    card: CardInstance,
    target: TargetRef,
    dmg: number
  ): void {
    if (target.type === 'player') {
      this.damagePlayer(opp, dmg, state);
      this.addLog(state, 'damage', `${card.name} trifft ${opp.name} für ${dmg} Schaden`);
    } else if (target.type === 'unit' && target.slotIndex !== undefined) {
      const defender = opp.units[target.slotIndex];
      if (defender) {
        this.damageUnit(opp, defender, dmg, state);
        this.addLog(state, 'damage', `${card.name} trifft ${defender.name} für ${dmg} Schaden`);
      }
    } else if (target.type === 'building' && target.buildingUid) {
      const b = opp.buildings.find(item => item.uid === target.buildingUid);
      if (b) {
        this.damageBuilding(opp, b, dmg, state);
        this.addLog(state, 'damage', `${card.name} trifft ${b.name} für ${dmg} Schaden`);
      }
    }
    if (player.race === 'vampire') this.healPlayer(player, 1);
  }

  public static damagePlayer(player: PlayerState, amount: number, state: GameState): void {
    if (player._invulnerable > 0) {
      this.addLog(state, 'shield', `${player.name} ist unverwundbar!`);
      return;
    }
    if (player._armor > 0) {
      const absorbed = Math.min(player._armor, amount);
      player._armor -= absorbed;
      amount -= absorbed;
      this.addLog(state, 'shield', `${absorbed} Schaden absorbiert (Rüstung)`);
    }
    player.hp = Math.max(0, player.hp - amount);
    if (player.hp === 0 && player._deathSave) {
      player.hp = 1;
      player._deathSave = false;
      this.addLog(state, 'shield', `${player.name}: Unsterblichkeit greift (1 HP überlebt)!`);
    }
  }

  public static healPlayer(player: PlayerState, amount: number): void {
    player.hp = Math.min(player.maxHP, player.hp + amount);
  }

  public static damageUnit(owner: PlayerState, unit: CardInstance, amount: number, state: GameState): void {
    unit.health = (unit.health ?? 0) - amount;
    if ((unit.health ?? 0) <= 0) {
      const idx = owner.units.indexOf(unit);
      if (idx !== -1) {
        owner.graveyard.push(unit);
        // Untoten-Passiv: 50% Chance auf Skelett
        if (owner.race === 'undead' && this.random(state) < 0.5) {
          owner.units[idx] = createCardInstance('summon_skeleton');
          owner.units[idx]!.type = 'unit';
          owner.units[idx]!.name = 'Skelett';
          owner.units[idx]!.attack = 1;
          owner.units[idx]!.health = 1;
          owner.units[idx]!.maxHealth = 1;
          owner.units[idx]!.summoned = true;
          this.addLog(state, 'summon', 'Untoten-Passiv: Einheit ersteht als Skelett auf!');
        } else {
          owner.units[idx] = null;
        }
        this.addLog(state, 'death', `${unit.name} wurde zerstört!`);
      }
    }
  }

  public static damageBuilding(owner: PlayerState, building: CardInstance, amount: number, state: GameState): void {
    building.health = (building.health ?? 0) - amount;
    if ((building.health ?? 0) <= 0) {
      const idx = owner.buildings.indexOf(building);
      if (idx !== -1) {
        owner.graveyard.push(building);
        owner.buildings.splice(idx, 1);
        this.addLog(state, 'death', `Gebäude ${building.name} eingestürzt!`);
      }
    }
  }

  public static spawnUnit(player: PlayerState, name: string, attack: number, health: number, state: GameState): boolean {
    const slot = player.units.findIndex(u => u === null);
    if (slot === -1) return false;
    player.units[slot] = {
      id: `spawn_${name.toLowerCase()}`,
      name,
      type: 'unit',
      tier: 0,
      cost: 0,
      attack,
      health,
      maxHealth: health,
      summoned: true,
      desc: `${name} (${attack}/${health})`,
      uid: `spawn_${Date.now()}_${Math.random()}`,
      upgrades: 0
    };
    this.addLog(state, 'summon', `${name} beschworen (${attack}/${health})`);
    return true;
  }

  public static drawCard(player: PlayerState): CardInstance | null {
    if (player.deck.length === 0) {
      if (player.discard.length === 0) return null;
      player.deck = [...player.discard];
      player.discard = [];
      // Mini-Shuffle
      for (let i = player.deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [player.deck[i], player.deck[j]] = [player.deck[j], player.deck[i]];
      }
    }
    const card = player.deck.pop();
    if (card) {
      player.hand.push(card);
      return card;
    }
    return null;
  }

  private static buildMarketDeck(state: GameState): void {
    const pool = Object.values(CARDS_DB).filter(c => c.tier > 0 && !c.raceReq);
    state.marketDeck = pool.map(c => ({ ...c }));
    this.shuffle(state.marketDeck, state);
  }

  private static refreshMarket(state: GameState): void {
    for (let i = 0; i < state.market.length; i++) {
      state.market[i] = this.drawMarketCard(state);
    }
  }

  private static drawMarketCard(state: GameState): CardData | null {
    if (state.marketDeck.length === 0) {
      if (state.marketDiscard.length === 0) {
        this.buildMarketDeck(state);
      } else {
        state.marketDeck = [...state.marketDiscard];
        state.marketDiscard = [];
        this.shuffle(state.marketDeck, state);
      }
    }
    return state.marketDeck.pop() ?? null;
  }

  public static checkGameOver(state: GameState): void {
    const p1 = state.players[0];
    const p2 = state.players[1];

    if (p1.hp <= 0 && p2.hp <= 0) {
      state.over = true;
      state.winner = null;
      this.addLog(state, 'action', 'Unentschieden! Beide Spieler gefallen.');
    } else if (p1.hp <= 0) {
      state.over = true;
      state.winner = 1;
      this.addLog(state, 'action', `SIEG für ${p2.name}!`);
    } else if (p2.hp <= 0) {
      state.over = true;
      state.winner = 0;
      this.addLog(state, 'action', `SIEG für ${p1.name}!`);
    }
  }

  private static shuffle<T>(array: T[], state: GameState): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(this.random(state) * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  private static random(state: GameState): number {
    // Linear Congruential Generator (LCG) für deterministischen RNG
    state.rngSeed = (state.rngSeed * 9301 + 49297) % 233280;
    return state.rngSeed / 233280;
  }

  private static addLog(
    state: GameState,
    type: LogEntry['type'],
    message: string
  ): void {
    state.log.push({
      id: `log_${Date.now()}_${Math.random()}`,
      turn: state.turn,
      type,
      message
    });
  }
}
