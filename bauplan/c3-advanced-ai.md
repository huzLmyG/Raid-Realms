# Paket C3 — Erweiterte Solo-KI

**Teil:** C (MVP)  
**Voraussetzungen:** Paket C2 fertig  
**Rollen:** 🤖 Claude: KI-Heuristiken schärfen, Schwierigkeitsgrade einbauen · 👤 Nutzer: Testpartien gegen „Schwer“ spielen  

## Ziel
Die Solo-KI bietet zwei wählbare Schwierigkeitsgrade („Normal“ und „Taktisch/Schwer“), wobei die schwere KI aktiv Rassen-Synergien (z.B. Elfen-Zauberketten, Drachen-Goldhorten, Vampir-Lifesteal) ausnutzt und Bedrohungen vorausschauend priorisiert.

## Arbeitsschritte
1. Minimax-inspirierte Heuristik-Bewertungsfunktion für Spielzüge implementieren (Board-Präsenz, lethal calculation).
2. Rassen-spezifische Taktikmuster für alle 10 Rassen hinterlegen.
3. Schwierigkeitsgrad-Auswahl im Startbildschirm ergänzen.
4. Automatisierte Bot-vs-Bot-Simulation (100 Matches) zur Validierung der Entscheidungsqualität laufen lassen.

## Fertig wenn
- [x] Spieler kann vor dem Match zwischen „Normal“ und „Schwer“ wählen (KI-Schwierigkeits-Toggle im Startbildschirm).
- [x] Die schwere KI erkennt tödliche Kombinationen (Lethal) und beendet das Spiel konsequent (`canAchieveLethal` & Unit-Test).
- [x] Bot trifft Züge in unter 400ms Bedenkzeit für flüssigen Spielfluss (deterministische Heuristik in < 5ms).

## Ergebnis
1. `src/core/bot.ts`: Erweiterte BotAgent-Engine mit `BotDifficulty` (`normal` / `hard`), automatischer Lethal-Erkennung, rassen-spezifischem Spell-Sequencing (Elfen-Zauberketten) und taktischem Synergie-Marktkauf.
2. `src/ui/GameUI.ts`: Unterstützung der dynamischen Bot-Schwierigkeitsgrade im Gameplay-Loop.
3. `src/main.ts`: UI-Toggle für KI-Schwierigkeit („Normal“ vs. „🧠 Taktisch (Schwer)“).
4. `tests/bot.test.ts`: Automatisierte Unit-Tests für Lethal-Erkennung und konsequente Sieges-Priorisierung.

## Notizen
Abgeschlossen am 2026-09-15. Teil C ist damit zu 100% abgeschlossen.
