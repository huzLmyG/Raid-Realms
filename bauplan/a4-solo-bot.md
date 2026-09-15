# Paket A4 — Solo-Bot & Lokales Duell

**Teil:** A (Fundament)  
**Voraussetzungen:** Paket A3 fertig  
**Rollen:** 🤖 Claude: KI-Logik portieren, Startscreen anbinden · 👤 Nutzer: Erstes Solo-Testspiel durchführen  

## Ziel
Ein vollständiges Solo-Duell (Spieler gegen heuristische KI) kann vom Startscreen (Rassenwahl, Modus-Auswahl) bis zum Spielende (Sieg-/Niederlage-Bildschirm) fehlerfrei lokal im Browser gespielt werden.

## Arbeitsschritte
1. Startbildschirm implementieren: Modus-Wahl („Solo vs. KI“ & „Lokales Duell 2P“), Rassen-Karussell mit 10 Rassen-Porträts und Beschreibungen.
2. Bot-Logik (`src/core/bot.ts`) implementieren:
   - Spielt leistbare Handkarten sinnvoll aus (Einheiten aufs Feld, Buffs auf Diener).
   - Kauft prioritär stärkere Karten aus dem Markt (Tier 2/3 bevorzugt).
   - Greift im Kampf prioritär Taunt-Ziele an, ansonsten Bedrohungen oder den Helden direkt.
3. Spielende-Erkennung (HP ≤ 0) mit stylischem Victory/Defeat-Overlay und Option zum Replay.

## Fertig wenn
- [ ] Spieler kann jede der 10 Rassen wählen und ein Match starten.
- [ ] Die KI führt eigenständige Züge ohne Hänger aus.
- [ ] Spielende wird korrekt deklariert und ein Neustart funktioniert ohne Seiten-Reload.

## Ergebnis
[Wird beim Abarbeiten gefüllt: was konkret entstanden ist]

## Notizen
[Leer lassen. Beim Abarbeiten füllen: Entscheidungen, Abweichungen vom Plan, Datum.]
