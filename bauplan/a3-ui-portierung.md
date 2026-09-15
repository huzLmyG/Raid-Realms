# Paket A3 — UI-Portierung & Spielfeld-Layout

**Teil:** A (Fundament)  
**Voraussetzungen:** Paket A2 fertig  
**Rollen:** 🤖 Claude: UI modularisieren und an Engine anbinden · 👤 Nutzer: Visuelle Kontrolle im Browser  

## Ziel
Das Hearthstone-inspirierte Split-Screen-Interface aus `raid-realms-v8.html` ist modular in UI-Komponenten überführt, rendert dynamisch aus dem `GameState` und reagiert auf Nutzerinteraktionen mit sofortigem visuellen Feedback.

## Arbeitsschritte
1. CSS-Designsystem aus v8 in strukturierte Stylesheets überführen (`main.css`, `board.css`, `cards.css`, `market.css`).
2. UI-Komponenten aufbauen:
   - `PlayerBar`: Avatar, HP-Balken, Goldanzeige, Rassen-Passiv, Hero Power Button.
   - `BoardZone`: Einheitenslots (max. 7) und Gebäudezone (max. 7) für Spieler und Gegner.
   - `HandZone`: Handkarten mit Zoom-/Hover-Effekten, Erschwinglichkeitsprüfung und Energiekosten.
   - `MarketZone`: Marktauslage (6 Slots), Reroll-Button, Zug- und Phasenanzeige, End-Turn-Button.
   - `CombatOverlay`: Zielauswahl-Indikator, Log-Zone, Game-Over-Overlay.
3. Sound-Engine (`audio.ts`) mit Web Audio API Synthesizern für Kartenspielen, Angriff, Zauber, Gold, Sieg und Niederlage anbinden.

## Fertig wenn
- [x] Spielfeld rendert pixelgenau und scharf.
- [x] Karten können per Klick/Tap ausgespielt und Ziele ausgewählt werden.
- [x] Sounds erklingen bei Aktionen synchron zum visuellen Feedback.
- [x] Phase 1 (Action) und Phase 2 (Combat) lassen sich intuitiv bedienen.

## Ergebnis
- 4 modulare Stylesheets (`main.css`, `board.css`, `cards.css`, `market.css`) im Dark-Fantasy-Theme.
- Modulare UI-Komponenten (`CardView`, `PlayerBar`, `BoardZone`, `MarketZone`, `HandZone`, `GameUI`).
- Web Audio API Sound-Engine (`src/ui/audio.ts`) mit 12 Audio-Synthesizer-Effekten.
- Startbildschirm mit Modus-Auswahl (vs KI, PvP lokal), Rassenwahl aller 10 Rassen und Spielregeln-Modal.
- Zielauswahl-Modus (Targeting für Angriffe & Schadenszauber mit Taunt/Fortify-Validierung).

## Notizen
- Abgeschlossen am 2026-09-15.
- Bundle-Größe extrem schlank: nur 59 kB JS und 16 kB CSS; Build-Zeit 428ms.
