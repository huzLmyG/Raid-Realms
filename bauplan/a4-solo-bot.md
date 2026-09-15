# Paket A4 — Solo-Bot & Lokales Duell

**Teil:** A (Fundament)  
**Voraussetzungen:** Paket A3 fertig  
**Rollen:** 🤖 Claude: KI-Logik portieren, Startscreen anbinden · 👤 Nutzer: Erstes Solo-Testspiel durchführen  

## Ziel
Ein vollständiges Solo-Duell (Spieler gegen heuristische KI) kann vom Startscreen (Rassenwahl, Modus-Auswahl) bis zum Spielende (Sieg-/Niederlage-Bildschirm) fehlerfrei lokal im Browser gespielt werden.

## Arbeitsschritte
1. Startbildschirm implementieren: Modus-Wahl („Solo vs. KI“ & „Lokales Duell 2P“), Rassen-Karussell mit 10 Rassen-Porträts und Beschreibungen.
2. Bot-Logik (`src/core/bot.ts`) implementieren:
   - Spielt leistbare Handkarten sinnvoll aus (Ressourcen zuerst, dann Einheiten, dann Zauber).
   - Kauft prioritär stärkere Karten aus dem Markt (Tier 2/3 bevorzugt).
   - Greift im Kampf prioritär Taunt-Ziele an, ansonsten günstige Trades oder den Helden direkt.
3. Spielende-Erkennung (HP ≤ 0) mit stylischem Victory/Defeat-Overlay und Option zum Replay.

## Fertig wenn
- [x] Spieler kann jede der 10 Rassen wählen und ein Match starten.
- [x] Die KI führt eigenständige Züge ohne Hänger aus.
- [x] Spielende wird korrekt deklariert und ein Neustart funktioniert ohne Seiten-Reload.

## Ergebnis
- Autonomer `BotAgent` in `src/core/bot.ts` implementiert.
- Automatisierte Testsuite `tests/bot.test.ts` (3 Tests, inklusive vollständiger Bot-vs-Bot Simulation bis zum Spielende).
- Volle Integration in `GameUI.ts` und Startbildschirm in `main.ts`.
- Alle 20 Tests im Projekt laufen grün durch.

## Notizen
- Abgeschlossen am 2026-09-15.
- Teil A (Fundament) ist damit zu 100% abgeschlossen!
