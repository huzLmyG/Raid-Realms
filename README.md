# ⚔️ RAID REALMS (Arbeitstitel)

> **Taktisches 1v1-Deckbuilder-Duell** im Browser und auf Desktop — Dark Fantasy Pixel Art, 10 asymmetrische Rassen, In-Match-Kartenmarkt und tiefe Synergien.

[![Status](https://img.shields.io/badge/Status-100%25%20Complete%20%7C%20Teile%20A%E2%80%93D%20%2B%20O-brightgreen.svg)](#bauplan--status)
[![Engine](https://img.shields.io/badge/Engine-TypeScript%20%7C%20Vite%20v6-yellow.svg)](#technologie)
[![Tests](https://img.shields.io/badge/Tests-22%20passed-success.svg)](#technologie)
[![Multiplayer](https://img.shields.io/badge/Multiplayer-WebRTC%20P2P%20(Serverlos)-blue.svg)](#technologie)
[![Platform](https://img.shields.io/badge/Plattform-Web%20%7C%20PWA%20%7C%20itch.io%20%7C%20Steam%20(Tauri)-purple.svg)](#plattformen)

---

## 🎯 Über das Spiel

**Raid Realms** verbindet das direkte Spielfeld-Feeling klassischer Sammelkartenspiele (wie *Hearthstone* oder *Magic*) mit der taktischen Dynamik von In-Game-Deckbuildern (wie *Dominion* oder *Star Realms*).

- **10 spielbare Rassen:** Jede Rasse (Mensch, Ork, Elf, Untoter, Drache, Zwerg, Fee, Dämon, Werwolf, Vampir) besitzt ein eigenes Startdeck und eine spielentscheidende passive Fähigkeit.
- **In-Match Economy:** Verfeinere dein Deck *während* des Duells über den 6-Slot-Kartenmarkt (Tiers 1–3).
- **Zwei-Phasen-Runden:** Erst Ressourcen investieren, Truppen beschwören und Gebäude errichten — dann gezielte Angriffe deklarieren.
- **Taktische Keywords:** `Taunt` (Schutz), `Charge` (Sofortangriff), `Lifesteal` (Lebensraub), `Fortify` (Helden-Schutz).
- **Solo-KI & Schwierigkeitsgrade:** Autonomer Bot-Gegner mit Heuristik, Rassen-Synergien und konfigurierbaren Stufen („Normal“ vs. „🧠 Taktisch (Schwer)“ mit Lethal-Erkennung).
- **Serverloser P2P-Multiplayer:** Spiele via WebRTC (PeerJS) direkt im Browser gegen Freunde per 4-stelligem Raum-Code oder geteiltem Link (`?room=XYZ`).
- **Offline-PWA & Mobile-First:** Installierbar als PWA auf Android und iOS mit touch-optimierter Steuerung und ServiceWorker-Offline-Support.
- **Zero Friction:** Sofort im Browser spielbar, kein Download-Zwang, keine Registrierungshürde.

---

## 🗺️ Bauplan & Status

Das Projekt wurde strukturiert nach der **`idee-zu-bauplan`**-Methodik entwickelt.

- 📖 **Konzept & Single Source of Truth:** [KONZEPT.md](KONZEPT.md)
- 📋 **Bauplan-Übersicht:** [bauplan/uebersicht.md](bauplan/uebersicht.md)

### 📍 Status: 🎉 100% ABGESCHLOSSEN
> ✅ **Teil A — Fundament & Modularisierung** (Setup, Engine, UI, Solo-Bot)  
> ✅ **Teil B — Proof** (CI/CD Deployment, 1.000-Match Balancing-Simulation, Go-Entscheidung)  
> ✅ **Teil C — MVP** (Mobile PWA, WebRTC P2P Multiplayer, Taktische Solo-KI)  
> ✅ **Teil D — Polish & Release** (Screen-Shake & Partikel, itch.io Export-Pipeline, Tauri Desktop-Scaffolding)  
> ✅ **Parallelstrang — Organisation & Recht** (Impressum § 5 DDG, DSGVO Local-First, EU AI Act Kennzeichnung, DPMA Markenrecherche, Förderungs-Fahrplan)  

---

## 🛠️ Technologie & Skripte

- **Core:** TypeScript, deterministische State Machine, Vitest (22 automatische Tests)
- **AI Agent:** Autonomer Bot mit Heuristik für Trades, Lethal-Berechnung und Marktkäufe
- **Frontend:** HTML5, CSS Grid & Flexbox, Canvas-Partikel-Overlay & Screen-Shake
- **Audio:** Web Audio API (Synthesizer-Pipeline mit Mute-Toggle und LocalStorage-Speicherung)
- **Netzwerk:** WebRTC (PeerJS P2P, serverlos)
- **Desktop:** Tauri v2 (konfiguriert für native Windows `.exe` und Steam)

### Wichtigste Befehle:
```bash
npm run dev           # Lokaler Vite-Dev-Server (Port 3000)
npm run build         # Typgeprüfter Produktions-Build (Vite + TypeScript)
npm test              # Vitest-Testsuite ausführen (22 Tests)
npm run package:itch  # Exportiert uploadfertige ZIP für itch.io (HTML5)
npm run tauri:build   # Kompiliert native Windows Desktop-App
```

---

## ⚖️ Rechtliches & Transparenz

- **EU AI Act:** Die im Spiel enthaltenen 102 Kartengrafiken und Rassen-Porträts wurden mithilfe generativer KI-Werkzeuge erstellt.
- **Datenschutz:** 100% Local-First & P2P. Keine Tracking-Cookies, keine serverseitige Profilbildung.
