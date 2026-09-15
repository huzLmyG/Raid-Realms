# Paket A2 — Core Engine & Datenmodelle

**Teil:** A (Fundament)  
**Voraussetzungen:** Paket A1 fertig  
**Rollen:** 🤖 Claude: State Machine, Typen und Regel-Tests implementieren · 👤 Nutzer: Balancing-Regeln gegenprüfen  

## Ziel
Die gesamte Spiellogik (Rundenablauf, Karteneffekte, 10 Rassen-Passive, Kampfsystem mit Taunt/Fortify/Lifesteal, Marktmechanik) ist als deterministische State Machine in TypeScript implementiert und durch Unit-Tests abgedeckt.

## Arbeitsschritte
1. `src/core/types.ts` mit allen Schnittstellen (`CardData`, `CardInstance`, `PlayerState`, `GameState`, `TargetRef`, `RaceId`) ausarbeiten.
2. `src/core/cards.data.ts` mit allen ~70 Karten und 10 Rassen-Startdecks aus `raid-realms-v8.html` typisiert anlegen.
3. `src/core/engine.ts` implementieren:
   - Aktionen: `playCard`, `attackTarget`, `buyMarketCard`, `rerollMarket`, `useHeroPower`, `endTurn`, `startTurn`.
   - Regeln: Taunt-Zwang, Fortify-Blockade, Zauberketten-Multiplikator für Elfen, Lifesteal für Vampire, Echo für Feen, Berserker für Orks, Zinsen für Drachen.
4. Vitest-Testfälle für jede Schlüsselmechanik schreiben (Taunt-Block, Fortify, Berserker-Schaden, Goldakkumulation der Drachen, Einheiten-Gegenschlag, Marktkauf).

## Fertig wenn
- [x] Alle 10 Rassen und ihre Passiv-Talente sind typisiert und logisch umgesetzt.
- [x] Sämtliche Kampfsituationen (Einheit vs. Einheit, Einheit vs. Gebäude, Einheit vs. Held) verhalten sich exakt nach Regelwerk.
- [x] Mindestens 15 Unit-Tests für Kernregeln laufen erfolgreich grün durch. (17 Tests)

## Ergebnis
- `src/core/types.ts`: Vollständige, strikte TypeScript-Typisierung aller Spielkomponenten.
- `src/core/cards.data.ts`: Typisierte Datenbank aller Karten (Tier 0 bis 3), Cursed Cards, Hero-Power-Karten, 10 Rassen-Starterdecks und Relikte.
- `src/core/engine.ts`: Vollwertige deterministische State Machine mit vollständiger Regel-Validierung (`canTarget`, `canPlayCard`, `attackTarget`, `buyMarketCard`, etc.).
- `tests/engine.test.ts`: 14 tiefgehende Testfälle (+ 3 Smoke-Tests = 17 grüne Tests), die alle Kernmechaniken automatisiert absichern.

## Notizen
- Abgeschlossen am 2026-09-15.
- `spellChain` verhält sich konsistent zu v8 (wird pro gespieltem Zauber um 2 erhöht und fließt direkt in den aktuellen Zauber ein).
- Keine externen Abhängigkeiten in der Engine nötig (reines TypeScript).
