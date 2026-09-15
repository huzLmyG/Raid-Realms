# Paket A2 — Core Engine & Datenmodelle

**Teil:** A (Fundament)  
**Voraussetzungen:** Paket A1 fertig  
**Rollen:** 🤖 Claude: State Machine, Typen und Regel-Tests implementieren · 👤 Nutzer: Balancing-Regeln gegenprüfen  

## Ziel
Die gesamte Spiellogik (Rundenablauf, Karteneffekte, 10 Rassen-Passive, Kampfsystem mit Taunt/Fortify/Lifesteal, Marktmechanik) ist als deterministische State Machine in TypeScript implementiert und durch Unit-Tests abgedeckt.

## Arbeitsschritte
1. `src/core/types.ts` mit allen Schnittstellen (`Card`, `Player`, `GameState`, `Action`, `RaceId`) ausarbeiten.
2. `src/core/cards.data.ts` mit allen ~70 Karten und 10 Rassen-Startdecks aus `raid-realms-v8.html` typisiert anlegen.
3. `src/core/engine.ts` implementieren:
   - Aktionen: `PlayCard`, `AttackTarget`, `BuyCard`, `RerollMarket`, `UpgradeCard`, `UseHeroPower`, `EndPhase`.
   - Regeln: Taunt-Zwang, Fortify-Blockade, Zauberketten-Multiplikator für Elfen, Lifesteal für Vampire, Echo für Feen.
4. Vitest-Testfälle für jede Schlüsselmechanik schreiben (Taunt-Block, Fortify, Berserker-Schaden, Goldakkumulation der Drachen).

## Fertig wenn
- [ ] Alle 10 Rassen und ihre Passiv-Talente sind typisiert und logisch umgesetzt.
- [ ] Sämtliche Kampfsituationen (Einheit vs. Einheit, Einheit vs. Gebäude, Einheit vs. Held) verhalten sich exakt nach Regelwerk.
- [ ] Mindestens 15 Unit-Tests für Kernregeln laufen erfolgreich grün durch.

## Ergebnis
[Wird beim Abarbeiten gefüllt: was konkret entstanden ist]

## Notizen
[Leer lassen. Beim Abarbeiten füllen: Entscheidungen, Abweichungen vom Plan, Datum.]
