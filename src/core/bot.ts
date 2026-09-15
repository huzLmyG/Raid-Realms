import { GameState, TargetRef, CardInstance, RaceId } from './types.ts';
import { GameEngine } from './engine.ts';

export type BotDifficulty = 'normal' | 'hard';

export class BotAgent {
  /**
   * Führt einen kompletten KI-Zug deterministisch und regelkonform durch.
   */
  public static playTurn(
    state: GameState,
    botIndex: number,
    difficulty: BotDifficulty = 'normal'
  ): void {
    if (state.over || state.activePlayerIndex !== botIndex) return;
    const bot = state.players[botIndex];
    const opponentIndex = 1 - botIndex;

    // 1. Hero Power nutzen, falls nützlich und bezahlbar
    const demonSafe = bot.race !== 'demon' || bot.hp > 15;
    if (bot.gold >= 2 && !bot.heroPowerUsed && demonSafe) {
      GameEngine.useHeroPower(state, botIndex);
    }

    // 2. Handkarten spielen
    let playOrder = [...bot.hand];
    if (difficulty === 'hard') {
      playOrder = this.sortCardsTactical(playOrder, bot.race);
    } else {
      playOrder.sort((a, b) => {
        const typeRank = (t: string) => (t === 'resource' ? 0 : t === 'unit' ? 1 : t === 'building' ? 2 : 3);
        return typeRank(a.type) - typeRank(b.type);
      });
    }

    const isLethal = difficulty === 'hard' && this.canAchieveLethal(state, botIndex, opponentIndex);

    for (const card of playOrder) {
      if (state.over) break;
      if (!bot.hand.some(c => c.uid === card.uid)) continue;
      if (!GameEngine.canPlayCard(state, botIndex, card.uid)) continue;

      // Suizidprävention: Karten mit Selbstschaden nicht spielen, wenn HP kritisch
      if (card.selfDamage && bot.hp <= card.selfDamage + 6) continue;

      let target: TargetRef | undefined;

      // Wenn Karte gezielten Schaden anrichtet (Single Target)
      if (card.damage && !card.aoe) {
        target = this.selectBestTarget(state, botIndex, opponentIndex, card, isLethal);
      }

      GameEngine.playCard(state, botIndex, card.uid, target);
    }

    // 3. Kampf: Bereite Angriffe mit allen einsatzbereiten Einheiten vor
    for (let slot = 0; slot < bot.units.length; slot++) {
      if (state.over) break;
      const unit = bot.units[slot];
      if (!unit || unit.summoned) continue;

      const target = this.selectAttackTarget(state, botIndex, opponentIndex, unit, isLethal);
      if (target) {
        GameEngine.attackTarget(state, botIndex, slot, target);
      }
    }

    // 4. Markteinkauf: Kaufe die beste leistbare Karte
    if (difficulty === 'hard') {
      this.buyFromMarketTactical(state, botIndex);
    } else {
      this.buyFromMarket(state, botIndex);
    }

    // 5. Zug beenden
    if (!state.over && state.activePlayerIndex === botIndex) {
      GameEngine.endTurn(state);
    }
  }

  /**
   * Prüft, ob der Bot in diesem Zug den Gegner besiegen kann (Lethal-Erkennung).
   */
  public static canAchieveLethal(state: GameState, botIndex: number, opponentIndex: number): boolean {
    const opp = state.players[opponentIndex];
    const bot = state.players[botIndex];

    const hasTaunt = opp.units.some(u => u !== null && u.keywords?.includes('taunt'));
    const hasFortify = opp.buildings.some(b => b.fortify);
    if (hasTaunt || hasFortify) return false;

    // Schaden von bereiten Einheiten
    const boardDmg = bot.units
      .filter(u => u !== null && !u.summoned)
      .reduce((acc, u) => acc + (u!.attack ?? 0), 0);

    // Schaden von spielbaren Zaubern in der Hand
    let availableGold = bot.gold;
    let handDmg = 0;
    for (const c of bot.hand) {
      if (c.cost <= availableGold && c.damage && !c.aoe) {
        availableGold -= c.cost;
        handDmg += c.damage;
      }
    }

    return boardDmg + handDmg >= opp.hp;
  }

  private static sortCardsTactical(cards: CardInstance[], race: RaceId): CardInstance[] {
    return [...cards].sort((a, b) => {
      // Immer Ressourcen zuerst (bringen Gold/Karten für nachfolgende Aktionen)
      if (a.type === 'resource' && b.type !== 'resource') return -1;
      if (b.type === 'resource' && a.type !== 'resource') return 1;

      // Elfen: Zauber mit niedrigen Kosten zuerst spielen, um Zauberkette aufzubauen
      if (race === 'elf' && a.isSpell && b.isSpell) {
        return (a.cost || 0) - (b.cost || 0);
      }

      // Gebäude vor Einheiten (bringen ggf. sofortige Buffs)
      if (a.type === 'building' && b.type === 'unit') return -1;
      if (b.type === 'building' && a.type === 'unit') return 1;

      return (b.cost || 0) - (a.cost || 0);
    });
  }

  private static selectBestTarget(
    state: GameState,
    botIndex: number,
    opponentIndex: number,
    card: CardInstance,
    isLethal: boolean = false
  ): TargetRef {
    const opp = state.players[opponentIndex];
    const dmg = card.damage ?? 0;
    const directHeroTarget: TargetRef = { type: 'player', ownerIndex: opponentIndex };

    // Lethal erkannt -> Direkt auf den Helden
    if (isLethal || opp.hp <= dmg) {
      if (GameEngine.canTarget(state, botIndex, directHeroTarget, card.piercing)) {
        return directHeroTarget;
      }
    }

    // Taunt-Ziele erzwingen falls vorhanden
    const tauntIndex = opp.units.findIndex(u => u !== null && u.keywords?.includes('taunt'));
    if (tauntIndex !== -1 && !card.piercing) {
      return { type: 'unit', ownerIndex: opponentIndex, slotIndex: tauntIndex };
    }

    // Schwächere/Bedrohliche Einheiten zerstören
    const killableUnitIndex = opp.units.findIndex(u => u !== null && (u.health ?? 0) <= dmg);
    if (killableUnitIndex !== -1) {
      return { type: 'unit', ownerIndex: opponentIndex, slotIndex: killableUnitIndex };
    }

    // Gebäude mit Fortify zerstören falls vorhanden
    const fortifyBuilding = opp.buildings.find(b => b.fortify);
    if (fortifyBuilding && !card.piercing) {
      return { type: 'building', ownerIndex: opponentIndex, buildingUid: fortifyBuilding.uid };
    }

    // Falls möglich, direkt auf den Helden
    if (GameEngine.canTarget(state, botIndex, directHeroTarget, card.piercing)) {
      return directHeroTarget;
    }

    // Beliebige andere gegnerische Einheit
    const firstUnit = opp.units.findIndex(u => u !== null);
    if (firstUnit !== -1) {
      return { type: 'unit', ownerIndex: opponentIndex, slotIndex: firstUnit };
    }

    return directHeroTarget;
  }

  private static selectAttackTarget(
    state: GameState,
    botIndex: number,
    opponentIndex: number,
    attacker: CardInstance,
    isLethal: boolean = false
  ): TargetRef | null {
    const opp = state.players[opponentIndex];
    const atk = attacker.attack ?? 0;
    const heroTarget: TargetRef = { type: 'player', ownerIndex: opponentIndex };

    // Lethal-Fokus: Wenn Lethal möglich ist, direkt auf den Helden
    if (isLethal || opp.hp <= atk) {
      if (GameEngine.canTarget(state, botIndex, heroTarget)) {
        return heroTarget;
      }
    }

    // Taunt muss zuerst angegriffen werden
    const tauntIndex = opp.units.findIndex(u => u !== null && u.keywords?.includes('taunt'));
    if (tauntIndex !== -1) {
      return { type: 'unit', ownerIndex: opponentIndex, slotIndex: tauntIndex };
    }

    // Fortify blockiert Direktangriff auf Held
    const hasFortify = opp.buildings.some(b => b.fortify);
    if (hasFortify) {
      const fortBuilding = opp.buildings.find(b => b.fortify)!;
      return { type: 'building', ownerIndex: opponentIndex, buildingUid: fortBuilding.uid };
    }

    const enemyUnits = opp.units
      .map((u, i) => ({ u, i }))
      .filter((x): x is { u: CardInstance; i: number } => x.u !== null);

    if (enemyUnits.length === 0) {
      return heroTarget;
    }

    // Günstiger Trade (Gegner töten ohne selbst zu sterben)
    const favorableTrade = enemyUnits.find(
      x => (x.u.health ?? 0) <= atk && (x.u.attack ?? 0) < (attacker.health ?? 0)
    );
    if (favorableTrade) {
      return { type: 'unit', ownerIndex: opponentIndex, slotIndex: favorableTrade.i };
    }

    // Gleichwertiger Trade: Bedrohung ausschalten
    const threatTrade = enemyUnits.find(
      x => (x.u.health ?? 0) <= atk && (x.u.attack ?? 0) >= atk
    );
    if (threatTrade) {
      return { type: 'unit', ownerIndex: opponentIndex, slotIndex: threatTrade.i };
    }

    // Wenn Gegner das Spielfeld flutet (>= 3 Einheiten) und Angreifer Schaden anrichten kann
    if (enemyUnits.length >= 3 && atk >= 2) {
      const highestAtkEnemy = [...enemyUnits].sort((a, b) => (b.u.attack ?? 0) - (a.u.attack ?? 0))[0];
      return { type: 'unit', ownerIndex: opponentIndex, slotIndex: highestAtkEnemy.i };
    }

    // Ansonsten direkt auf den Helden
    if (GameEngine.canTarget(state, botIndex, heroTarget)) {
      return heroTarget;
    }

    return { type: 'unit', ownerIndex: opponentIndex, slotIndex: enemyUnits[0].i };
  }

  private static buyFromMarket(state: GameState, botIndex: number): void {
    const bot = state.players[botIndex];
    const affordable = state.market
      .map((card, slotIndex) => ({ card, slotIndex }))
      .filter(item => item.card !== null && item.card.cost <= bot.gold);

    if (affordable.length === 0) return;

    // Bevorzuge höhere Tiers (mehr Power pro Gold)
    affordable.sort((a, b) => (b.card?.tier ?? 0) - (a.card?.tier ?? 0) || (b.card?.cost ?? 0) - (a.card?.cost ?? 0));

    GameEngine.buyMarketCard(state, botIndex, affordable[0].slotIndex);
  }

  private static buyFromMarketTactical(state: GameState, botIndex: number): void {
    const bot = state.players[botIndex];
    const opp = state.players[1 - botIndex];

    const affordable = state.market
      .map((card, slotIndex) => ({ card, slotIndex }))
      .filter((item): item is { card: CardInstance; slotIndex: number } => item.card !== null && item.card.cost <= bot.gold);

    if (affordable.length === 0) return;

    // Berechne Synergie-Score für schwere KI
    const scoreCard = (card: CardInstance): number => {
      let score = (card.tier ?? 0) * 3 + (card.cost ?? 0);

      // Rassensynergien
      if (bot.race === 'elf' && (card.isSpell || card.draw)) score += 5;
      if (bot.race === 'dragon' && (card.gold || (card.cost ?? 0) >= 5)) score += 4;
      if (bot.race === 'vampire' && (card.unitLifesteal || card.heal)) score += 4;
      if (bot.race === 'dwarf' && card.upgradeable) score += 5;
      if (bot.race === 'undead' && (card.summon || card.type === 'unit')) score += 4;

      // Konter gegen gegnerische Übermacht
      const oppBoardAttack = opp.units.reduce((sum, u) => sum + (u?.attack ?? 0), 0);
      if (oppBoardAttack >= 6) {
        if (card.keywords?.includes('taunt')) score += 6;
        if (card.fortify) score += 5;
        if (card.aoe || card.execute) score += 6;
      }

      return score;
    };

    affordable.sort((a, b) => scoreCard(b.card) - scoreCard(a.card));
    GameEngine.buyMarketCard(state, botIndex, affordable[0].slotIndex);
  }
}
