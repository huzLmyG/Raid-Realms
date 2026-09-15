# ⚔️ RAID REALMS (Arbeitstitel)

> **Taktisches 1v1-Deckbuilder-Duell** im Browser und auf Desktop — Dark Fantasy Pixel Art, 10 asymmetrische Rassen, In-Match-Kartenmarkt und tiefe Synergien.

[![Status](https://img.shields.io/badge/Status-Teil%20A%20Abgeschlossen%20%7C%20Teil%20B%20Proof-brightgreen.svg)](#bauplan--status)
[![Engine](https://img.shields.io/badge/Engine-TypeScript%20%7C%20Vite-yellow.svg)](#technologie)
[![Tests](https://img.shields.io/badge/Tests-20%20passed-success.svg)](#technologie)
[![Platform](https://img.shields.io/badge/Plattform-Web%20%7C%20PWA%20%7C%20Steam%20(Tauri)-purple.svg)](#plattformen)

---

## 🎯 Über das Spiel

**Raid Realms** verbindet das direkte Spielfeld-Feeling klassischer Sammelkartenspiele (wie *Hearthstone* oder *Magic*) mit der taktischen Dynamik von In-Game-Deckbuildern (wie *Dominion* oder *Star Realms*).

- **10 spielbare Rassen:** Jede Rasse (Mensch, Ork, Elf, Untoter, Drache, Zwerg, Fee, Dämon, Werwolf, Vampir) besitzt ein eigenes Startdeck und eine spielentscheidende passive Fähigkeit.
- **In-Match Economy:** Verfeinere dein Deck *während* des Duells über den 6-Slot-Kartenmarkt (Tiers 1–3).
- **Zwei-Phasen-Runden:** Erst Ressourcen investieren, Truppen beschwören und Gebäude errichten — dann gezielte Angriffe deklarieren.
- **Taktische Keywords:** `Taunt` (Schutz), `Charge` (Sofortangriff), `Lifesteal` (Lebensraub), `Fortify` (Helden-Schutz).
- **Autonomer Bot-Gegner:** Vollständiges PvE-Spiel gegen intelligente KI mit Heuristiken und Synergiefokus.
- **Zero Friction:** Sofort im Browser spielbar, kein Download-Zwang, keine Registrierungshürde.

---

## 🗺️ Bauplan & Status

Das Projekt wird strukturiert nach der **`idee-zu-bauplan`**-Methodik entwickelt.

- 📖 **Konzept & Single Source of Truth:** [KONZEPT.md](KONZEPT.md)
- 📋 **Bauplan-Übersicht:** [bauplan/uebersicht.md](bauplan/uebersicht.md)

### 📍 Du bist hier:
> **Teil B — Proof (Kernhypothese testen vor weiterer Infrastruktur)**  
> ✅ [Teil A — Fundament & Modularisierung](bauplan/uebersicht.md#teil-a--fundament--modularisierung-100-abgeschlossen) (100% Abgeschlossen)  
> ⏳ Aktuelles Paket: [B1 — Demo-Deployment](bauplan/b1-demo-deployment.md) (Bereit zur Umsetzung)

---

## 🛠️ Technologie

- **Core:** TypeScript, deterministische State Machine, Vitest (20 Tests)
- **AI Agent:** Autonomer Bot mit Heuristik für Trades, Lethal-Berechnung und Marktkäufe
- **Frontend:** HTML5, CSS Grid & Flexbox, modulare UI-Komponenten
- **Audio:** Web Audio API (Synthesizer-Pipeline mit 12 Sound-Effekten)
- **Netzwerk:** WebRTC (PeerJS P2P, serverlos)
- **Desktop:** Tauri v2 (geplant für Steam-Release)

---

## ⚖️ Rechtliches & Transparenz

- **EU AI Act:** Die im Spiel enthaltenen 102 Kartengrafiken und Rassen-Porträts wurden mithilfe generativer KI-Werkzeuge erstellt.
- **Datenschutz:** 100% Local-First & P2P. Keine Tracking-Cookies, keine serverseitige Profilbildung.
