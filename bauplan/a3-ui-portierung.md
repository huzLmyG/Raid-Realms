# Paket A3 — UI-Portierung & Spielfeld-Layout

**Teil:** A (Fundament)  
**Voraussetzungen:** Paket A2 fertig  
**Rollen:** 🤖 Claude: UI modularisieren und an Engine anbinden · 👤 Nutzer: Visuelle Kontrolle im Browser  

## Ziel
Das Hearthstone-inspirierte Split-Screen-Interface aus `raid-realms-v8.html` ist modular in UI-Komponenten überführt, rendert dynamisch aus dem `GameState` und reagiert auf Nutzerinteraktionen mit sofortigem visuellen Feedback.

## Arbeitsschritte
1. CSS-Designsystem aus v8 in strukturierte Stylesheets überführen (`tokens.css`, `board.css`, `cards.css`, `market.css`).
2. UI-Komponenten aufbauen:
   - `PlayerBar`: Avatar, HP-Balken, Goldanzeige, Rassen-Passiv, Hero Power Button.
   - `GameBoard`: Einheitenslots (max. 7) und Gebäudezone (max. 7) für Spieler und Gegner.
   - `HandZone`: Handkarten mit Zoom-/Hover-Effekten und Energiekosten.
   - `MarketZone`: Marktauslage (6 Slots), Reroll-Button, Upgrade-Bereich.
   - `CombatOverlay`: Trefferanimationen, Schadenszahlen, Phasen-Banner.
3. Sound-Engine (`audio.ts`) mit Web Audio API Synthesizern für Kartenspielen, Angriff, Zauber und Gold anbinden.

## Fertig wenn
- [ ] Spielfeld rendert pixelgenau und scharf.
- [ ] Karten können per Klick/Tap ausgespielt und Ziele ausgewählt werden.
- [ ] Sounds erklingen bei Aktionen synchron zum visuellen Feedback.
- [ ] Phase 1 (Action) und Phase 2 (Combat) lassen sich intuitiv bedienen.

## Ergebnis
[Wird beim Abarbeiten gefüllt: was konkret entstanden ist]

## Notizen
[Leer lassen. Beim Abarbeiten füllen: Entscheidungen, Abweichungen vom Plan, Datum.]
