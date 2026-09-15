# Paket D3 — Tauri Desktop-Packaging

**Teil:** D (Polish & Vorbereitung Steam/Store)  
**Voraussetzungen:** Paket D1 fertig  
**Rollen:** 🤖 Claude: Tauri v2 initialisieren und Build-Skripte anlegen · 👤 Nutzer: Testen der erzeugten `.exe` auf Windows  

## Ziel
Die Web-Codebasis wird mithilfe von Tauri v2 ohne Code-Duplizierung als native, schlanke Windows-Desktop-Anwendung (.exe / MSI) kompiliert, die offline läuft und bereit für das Steamworks SDK ist.

## Arbeitsschritte
1. Tauri CLI (`@tauri-apps/cli`) in das Projekt integrieren.
2. `tauri.conf.json` konfigurieren (App-Name, Fenstergröße 1280×720 zentriert, Icons).
3. Test-Build via `npm run tauri build` ausführen.
4. Prüfen von Vollbild-Modus, Tastatur-Shortcuts und Audio auf Windows.

## Fertig wenn
- [ ] Standalone `.exe` startet unter Windows ohne Konsolenfenster.
- [ ] Spiel läuft mit voller Performance ohne Webbrowser-Rahmen.
- [ ] Build-Artefakt ist kleiner als 25 MB.

## Ergebnis
[Wird beim Abarbeiten gefüllt: was konkret entstanden ist]

## Notizen
[Leer lassen. Beim Abarbeiten füllen: Entscheidungen, Abweichungen vom Plan, Datum.]
