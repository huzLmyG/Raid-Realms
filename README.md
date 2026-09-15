# ⚔️ RAID REALMS (Arbeitstitel)

> **Taktisches 1v1-Deckbuilder-Duell** im Browser und auf Desktop — Dark Fantasy Pixel Art, 10 asymmetrische Rassen, In-Match-Kartenmarkt und tiefe Synergien.

[![Status](https://img.shields.io/badge/Status-In%20Entwicklung%20(A3%20bereit)-blue.svg)](#bauplan--status)
[![Engine](https://img.shields.io/badge/Engine-TypeScript%20%7C%20Vite-yellow.svg)](#technologie)
[![Platform](https://img.shields.io/badge/Plattform-Web%20%7C%20PWA%20%7C%20Steam%20(Tauri)-purple.svg)](#plattformen)

---

## 🎯 Über das Spiel

**Raid Realms** verbindet das direkte Spielfeld-Feeling klassischer Sammelkartenspiele (wie *Hearthstone* oder *Magic*) mit der taktischen Dynamik von In-Game-Deckbuildern (wie *Dominion* oder *Star Realms*).

- **10 spielbare Rassen:** Jede Rasse (Mensch, Ork, Elf, Untoter, Drache, Zwerg, Fee, Dämon, Werwolf, Vampir) besitzt ein eigenes Startdeck und eine spielentscheidende passive Fähigkeit.
- **In-Match Economy:** Verfeinere dein Deck *während* des Duells über den 6-Slot-Kartenmarkt (Tiers 1–3).
- **Zwei-Phasen-Runden:** Erst Ressourcen investieren, Truppen beschwören und Gebäude errichten — dann gezielte Angriffe deklarieren.
- **Taktische Keywords:** `Taunt` (Schutz), `Charge` (Sofortangriff), `Lifesteal` (Lebensraub), `Fortify` (Helden-Schutz).
- **Zero Friction:** Sofort im Browser spielbar, kein Download-Zwang, keine Registrierungshürde.

---

## 🗺️ Bauplan & Status

Das Projekt wird strukturiert nach der **`idee-zu-bauplan`**-Methodik entwickelt.

- 📖 **Konzept & Single Source of Truth:** [KONZEPT.md](KONZEPT.md)
- 📋 **Bauplan-Übersicht:** [bauplan/uebersicht.md](bauplan/uebersicht.md)

### 📍 Du bist hier:
> **Teil A — Fundament & Modularisierung**  
> ✅ [A1 — Projekt-Setup & Build-Pipeline](bauplan/a1-setup-build.md) (Abgeschlossen)  
> ✅ [A2 — Core Engine & Datenmodelle](bauplan/a2-core-engine.md) (Abgeschlossen)  
> ⏳ Nächstes Paket: [A3 — UI-Portierung & Spielfeld-Layout](bauplan/a3-ui-portierung.md) (Bereit zur Umsetzung)

### Phasen-Übersicht:
1. **Teil A — Fundament & Modularisierung** (Vite, TS, State Machine, Engine-Tests, lokales PvE)
2. **Teil B — Proof** (Öffentliche Demo, Playtesting mit 5+ Spielern, Go/No-Go Meilenstein)
3. **Teil C — MVP** (Mobile-First PWA, P2P 1v1 WebRTC Multiplayer, erweiterte KI)
4. **Teil D — Polish & Store-Vorbereitung** (Audio/Visual Juice, itch.io Launch, Tauri Desktop .exe für Steam)
5. **Parallelstrang — Organisation & Recht** (Impressum nach § 5 DDG, EU AI Act Transparenz, Namens-Check)

---

## 🛠️ Technologie

- **Core:** TypeScript, deterministische State Machine, Vitest (17 Tests)
- **Frontend:** HTML5 Canvas / CSS Grid & Flexbox, responsive PWA
- **Audio:** Web Audio API (Synthesizer-Pipeline)
- **Netzwerk:** WebRTC (PeerJS P2P, serverlos)
- **Desktop:** Tauri v2 (geplant für Steam-Release)

---

## ⚖️ Rechtliches & Transparenz

- **EU AI Act:** Die im Spiel enthaltenen 102 Kartengrafiken und Rassen-Porträts wurden mithilfe generativer KI-Werkzeuge erstellt.
- **Datenschutz:** 100% Local-First & P2P. Keine Tracking-Cookies, keine serverseitige Profilbildung.
