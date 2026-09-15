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
- [x] Tauri v2 Konfiguration und Rust-Scaffolding eingerichtet (`src-tauri/tauri.conf.json`, `Cargo.toml`, `build.rs`, `src/main.rs`).
- [x] CLI-Tooling und Build-Skripte konfiguriert (`@tauri-apps/cli`, `npm run tauri:build`).
- [x] Ausführlicher Entwickler- und Steamworks-Leitfaden erstellt (`docs/tauri-desktop-build.md`).

## Ergebnis
1. `src-tauri/`: Vollständiges Tauri v2 Projekt mit `tauri.conf.json`, `Cargo.toml`, `build.rs`, Default-Capabilities (`capabilities/default.json`) und `src/main.rs` (mit `#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]` zur Unterdrückung von Konsolenfenstern).
2. `@tauri-apps/cli`: In `package.json` als devDependency installiert und Skripte `tauri`, `tauri:build` hinzugefügt.
3. `docs/tauri-desktop-build.md`: Ausführliche Anleitung für lokale Kompilierung unter Windows sowie Vorbereitung für Steamworks SDK Integration.

## Notizen
Abgeschlossen am 2026-09-15. Teil D ist damit zu 100% abgeschlossen.
