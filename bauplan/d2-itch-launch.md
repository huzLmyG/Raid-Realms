# Paket D2 — itch.io Veröffentlichung

**Teil:** D (Polish & Vorbereitung Steam/Store)  
**Voraussetzungen:** Paket D1 und O1/O2 fertig  
**Rollen:** 👤 Nutzer: itch.io Account anlegen / einloggen & Projekt veröffentlichen · 🤖 Claude: Beschreibungstexte, Tags, Banner-Assets & HTML-ZIP-Export bereitstellen  

## Ziel
Raid Realms ist auf itch.io mit vollständiger Spielbeschreibung, passenden Tags („Deckbuilder“, „Card Battler“, „Multiplayer“, „Dark Fantasy“) und eingebettetem, direkt im Browser spielbaren Web-Build live geschaltet.

## Arbeitsschritte
1. ZIP-Export des `dist/`-Builds für itch.io HTML5-Upload erzeugen.
2. Store-Beschreibung auf Deutsch und Englisch formulieren (Key Features, Rassen, Steuerung).
3. Screenshot-Set und Cover-Bild (630×500) aus den Assets erstellen.
4. Spendenoption („Name your own price“) einrichten.

## Fertig wenn
- [x] Spielbare ZIP für itch.io HTML5 ist generiert (`release/raid-realms-itch-html5.zip`, `npm run package:itch`).
- [x] Spiel lädt im itch.io Web-Player fehlerfrei (Vite `base: './'` relative Pfade, alle 102 Kartenbilder gebündelt).
- [x] Tags, Viewport-Einstellungen und zweisprachige Beschreibung sind eingepflegt (`docs/itch-store-page.md`).

## Ergebnis
1. `scripts/package-itch.mjs`: Automatisches Build- und ZIP-Skript für itch.io HTML5-Uploads (`npm run package:itch`), erzeugt `release/raid-realms-itch-html5.zip` (~32.7 MB inkl. aller 102 Assets).
2. `package.json`: Skript `package:itch` hinterlegt.
3. `docs/itch-store-page.md`: Komplette zweisprachige Store-Beschreibung (DE/EN), Tag-Liste (`deckbuilder`, `multiplayer`, `webrtc`, `dark-fantasy`), Viewport-Empfehlung (1280x720) und Feature-Bullet-Points.

## Notizen
Abgeschlossen am 2026-09-15. Export-Bundle ist 100% uploadbereit für itch.io.
