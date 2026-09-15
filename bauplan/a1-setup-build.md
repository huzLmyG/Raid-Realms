# Paket A1 — Projekt-Setup & Build-Pipeline

**Teil:** A (Fundament)  
**Voraussetzungen:** Keine  
**Rollen:** 🤖 Claude: Vite+TS einrichten, Asset-Pipeline konfigurieren · 👤 Nutzer: Überprüfen & Freigeben  

## Ziel
Ein modernes Vite + TypeScript Entwicklungsumfeld ist im Repository aufgesetzt, bindet alle 102 vorhandenen Karten- und Porträtgrafiken sauber ein und baut ohne Fehler (`npm run build`).

## Arbeitsschritte
1. `package.json` und `tsconfig.json` für Vite + TypeScript + Vitest initialisieren.
2. Verzeichnisstruktur `src/` anlegen (`core/`, `ui/`, `net/`, `assets/`).
3. Alle 102 Kartenbilder aus `bilder/` in das Vite-Asset-Management (`src/assets/cards/`) spiegeln bzw. anbinden.
4. Vitest-Testsuite für spätere Engine-Tests konfigurieren.
5. Build-Befehl testen und sicherstellen, dass `dist/` sauber erzeugt wird.

## Fertig wenn
- [ ] `npm install` läuft fehlerfrei durch.
- [ ] `npm run build` erzeugt ein fertiges Bundle ohne TypeScript- oder Bundler-Warnungen.
- [ ] `npm run test` führt mindestens einen Smoke-Test erfolgreich aus.
- [ ] Alle 102 Bilddateien sind referenzierbar und werden im Build-Output korrekt erfasst.

## Ergebnis
[Wird beim Abarbeiten gefüllt: was konkret entstanden ist]

## Notizen
[Leer lassen. Beim Abarbeiten füllen: Entscheidungen, Abweichungen vom Plan, Datum.]
