import { GameState, TargetRef, CardInstance } from './types.ts';
import { GameEngine } from './engine.ts';

export class BotAgent {
  /**
   * Führt einen kompletten KI-Zug deterministisch und regelkonform durch.
   */
  public static playTurn(state: GameState, botIndex: number): void {
    if (state.over || state.activePlayerIndex !== botIndex) return;
    const bot = state.players[botIndex];
    const opponentIndex = 1 - botIndex;

    // 1. Hero Power nutzen, falls nützlich und bezahlbar
    if (bot.gold >= 2 && !bot.heroPowerUsed) {
      GameEngine.useHeroPower(state, botIndex);
    }

    // 2. Handkarten spielen
    // Sortiere Karten: Zuerst Ressourcen (bringen ggf. mehr Gold/Karten), dann Einheiten, dann Zauber
    const playOrder = [...bot.hand].sort((a, b) => {
      const typeRank = (t: string) => (t === 'resource' ? 0 : t === 'unit' ? 1 : t === 'building' ? 2 : 3);
      return typeRank(a.type) - typeRank(b.type);
    });

    for (const card of playOrder) {
      if (state.over) break;
      if (!bot.hand.some(c => c.uid === card.uid)) continue;
      if (!GameEngine.canPlayCard(state, botIndex, card.uid)) continue;

      let target: TargetRef | undefined;

      // Wenn Karte gezielten Schaden anrichtet (Single Target)
      if (card.damage && !card.aoe) {
        target = this.selectBestTarget(state, botIndex, opponentIndex, card);
      }

      GameEngine.playCard(state, botIndex, card.uid, target);
    }

    // 3. Kampf: Bereite Angriffe mit allen einsatzbereiten Einheiten vor
    for (let slot = 0; slot < bot.units.length; slot++) {
      if (state.over) break;
      const unit = bot.units[slot];
      if (!unit || unit.summoned) continue;

      const target = this.selectAttackTarget(state, botIndex, opponentIndex, unit);
      if (target) {
        GameEngine.attackTarget(state, botIndex, slot, target);
      }
    }

    // 4. Markteinkauf: Kaufe die beste leistbare Karte
    this.buyFromMarket(state, botIndex);

    // 5. Zug beenden
    if (!state.over && state.activePlayerIndex === botIndex) {
      GameEngine.endTurn(state);
    }
  }

  private static selectBestTarget(
    state: GameState,
    botIndex: number,
    opponentIndex: number,
    card: CardInstance
  ): TargetRef {
    const opp = state.players[opponentIndex];
    const dmg = card.damage ?? 0;

    // Prüfen, ob Lethal direkt auf den Helden möglich ist
    const directHeroTarget: TargetRef = { type: 'player', ownerIndex: opponentIndex };
    if (opp.hp <= dmg && GameEngine.canTarget(state, botIndex, directHeroTarget, card.piercing)) {
      return directHeroTarget;
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
    attacker: CardInstance
  ): TargetRef | null {
    const opp = state.players[opponentIndex];
    const atk = attacker.attack ?? 0;

    // Prüfen, ob Gegner-Held direkt besiegt werden kann
    const heroTarget: TargetRef = { type: 'player', ownerIndex: opponentIndex };
    if (opp.hp <= atk && GameEngine.canTarget(state, botIndex, heroTarget)) {
      return heroTarget;
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

    // Wenn keine gegnerischen Einheiten da sind -> direkt auf Helden
    const enemyUnits = opp.units.map((u, i) => ({ u, i })).filter(x => x.u !== null);
    if (enemyUnits.length === 0) {
      return heroTarget;
    }

    // Bevorzuge günstige Trades (Gegner töten ohne selbst zu sterben)
    const favorableTrade = enemyUnits.find(
      x => (x.u?.health ?? 0) <= atk && (x.u?.attack ?? 0) < (attacker.health ?? 0)
    );
    if (favorableTrade) {
      return { type: 'unit', ownerIndex: opponentIndex, slotIndex: favorableTrade.i };
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
}
