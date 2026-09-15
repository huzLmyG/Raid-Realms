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
- [ ] Spieler kann vor dem Match zwischen „Normal“ und „Schwer“ wählen.
- [ ] Die schwere KI erkennt tödliche Kombinationen (Lethal) und beendet das Spiel konsequent.
- [ ] Bot trifft Züge in unter 400ms Bedenkzeit für flüssigen Spielfluss.

## Ergebnis
[Wird beim Abarbeiten gefüllt: was konkret entstanden ist]

## Notizen
[Leer lassen. Beim Abarbeiten füllen: Entscheidungen, Abweichungen vom Plan, Datum.]
