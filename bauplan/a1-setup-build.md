# Paket A1 — Projekt-Setup & Build-Pipeline

**Teil:** A (Fundament)  
**Voraussetzungen:** Keine  
**Rollen:** 🤖 Claude: Vite+TS einrichten, Asset-Pipeline konfigurieren · 👤 Nutzer: Überprüfen & Freigeben  

## Ziel
Ein modernes Vite + TypeScript Entwicklungsumfeld ist im Repository aufgesetzt, bindet alle 102 vorhandenen Karten- und Porträtgrafiken sauber ein und baut ohne Fehler (`npm run build`).

## Arbeitsschritte
1. `package.json` und `tsconfig.json` für Vite + TypeScript + Vitest initialisieren.
2. Verzeichnisstruktur `src/` anlegen (`core/`, `ui/`, `net/`, `assets/`).
3. Alle 102 Kartenbilder aus `bilder/` in das Vite-Asset-Management (`public/cards/` & `src/assets/card-images.ts`) spiegeln bzw. anbinden.
4. Vitest-Testsuite für spätere Engine-Tests konfigurieren.
5. Build-Befehl testen und sicherstellen, dass `dist/` sauber erzeugt wird.

## Fertig wenn
- [x] `npm install` läuft fehlerfrei durch.
- [x] `npm run build` erzeugt ein fertiges Bundle ohne TypeScript- oder Bundler-Warnungen.
- [x] `npm run test` führt mindestens einen Smoke-Test erfolgreich aus.
- [x] Alle 102 Bilddateien sind referenzierbar und werden im Build-Output korrekt erfasst.

## Ergebnis
- Vollständiges Vite v6 + TypeScript + Vitest Setup eingerichtet.
- 102 Karten- und Rassen-Grafiken aus `bilder/` nach `public/cards/` überführt und in `src/assets/card-images.ts` typisiert registriert.
- Smoke-Test `tests/smoke.test.ts` verifiziert erfolgreich Porträts und Asset-Pfade.
- `npm run build` erzeugt in 206ms das produktionsreife `dist/`-Bundle inklusive aller 102 Assets.

## Notizen
- Abgeschlossen am 2026-09-15.
- Alle 102 Bilder werden im Build automatisch nach `dist/cards/` deployt.
