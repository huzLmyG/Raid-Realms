# Bauplan — Übersicht: RAID REALMS

> Inhaltsverzeichnis des Bauplans. Entstanden nach Phase 4 der `idee-zu-bauplan`-Methodik.  
> Lebendes Dokument — nach jeder Meilenstein-Retro aktualisieren.

**Du bist hier:** Teil A · Vorbereitung von Paket A4 (Solo-Bot & Lokales Duell)  
**Letzte Aktualisierung:** 2026-09-15

---

## Stop-/Pivot-Kriterien
- **Zweimal No-Go am Proof-Meilenstein (B3):** Grundsatzgespräch über Kernmechanik, Rassen-Asymmetrie oder Match-Tempo.
- **Längere Zeit kein abgeschlossenes Paket (> 3 Wochen Pause):** Bewusste, dokumentierte Pause oder Reduktion des Umfangs (Pivot auf reines Solo-PvE).
- **Ein Paket dauert mehr als das 3-fache der geschätzten Zeit:** Sofortige Retro vorziehen, Paket in kleinere Untertranchen aufteilen.

---

## Teile & Pakete

### Teil A — Fundament & Modularisierung
| Paket | Titel & Ziel (1 Satz) | Status | Rollen |
|---|---|---|---|
| [A1](a1-setup-build.md) | **Projekt-Setup & Build-Pipeline:** Vite, TypeScript und Asset-Pipeline für 102 Kartenbilder einrichten. | ✅ fertig | 🤖 Claude |
| [A2](a2-core-engine.md) | **Core Engine & Datenmodelle:** Deterministische State Machine, Kartendatenbank und Regel-Unit-Tests erstellen. | ✅ fertig | 🤖 Claude |
| [A3](a3-ui-portierung.md) | **UI-Portierung & Spielfeld-Layout:** Hearthstone Split-Screen, Karten- und Marktdarstellung modularisieren. | ✅ fertig | 🤖 Claude |
| [A4](a4-solo-bot.md) | **Solo-Bot & Lokales Duell:** KI-Anbindung und Rassenwahl für vollständiges Offline-PvE-Spiel im Browser. | ⏳ bereit | 🤖 Claude / 👤 Nutzer |

### Teil B — Proof (Kernhypothese testen vor weiterer Infrastruktur)
| Paket | Titel & Ziel (1 Satz) | Status | Rollen |
|---|---|---|---|
| [B1](b1-demo-deployment.md) | **Demo-Deployment:** Öffentliche Web-Demo auf GitHub Pages oder Vercel bereitstellen. | ⏳ offen | 🤖 Claude / 👤 Nutzer |
| [B2](b2-playtesting.md) | **Playtesting mit echten Spielern:** Feedback von mindestens 5 Testnutzern zu Spielspaß und Balance sammeln. | ⏳ offen | 👤 Nutzer |
| [B3](b3-go-no-go.md) | **Go/No-Go-Meilenstein & Balancing-Retro:** Auswertung des Feedbacks und formelle Freigabe für Phase C. | ⏳ offen | 👤 Nutzer / 🤖 Claude |

### Teil C — MVP (Mobile-First PWA & P2P-Multiplayer)
| Paket | Titel & Ziel (1 Satz) | Status | Rollen |
|---|---|---|---|
| [C1](c1-mobile-pwa.md) | **Mobile-First PWA:** Touch-Gesten, responsive Anpassung für Smartphones und Offline-Support via ServiceWorker. | ⏳ offen | 🤖 Claude |
| [C2](c2-p2p-multiplayer.md) | **P2P 1v1 Multiplayer:** WebRTC/PeerJS Raum-Code-System für direkte Duelle ohne laufende Serverkosten. | ⏳ offen | 🤖 Claude |
| [C3](c3-advanced-ai.md) | **Erweiterte Solo-KI:** Zusätzlicher taktischer Schwierigkeitsgrad mit Synergie-Erkennung. | ⏳ offen | 🤖 Claude |

### Teil D — Polish & Release-Vorbereitung (Steam / itch.io)
| Paket | Titel & Ziel (1 Satz) | Status | Rollen |
|---|---|---|---|
| [D1](d1-audiovisual-polish.md) | **Audio- & Visual-Polish:** Dynamische Web Audio Effekte, Partikel und Treffer-Animationen verfeinern. | ⏳ offen | 🤖 Claude |
| [D2](d2-itch-launch.md) | **itch.io Veröffentlichung:** Öffentlicher Store-Auftritt auf itch.io mit spielbarem Web-Build. | ⏳ offen | 👤 Nutzer / 🤖 Claude |
| [D3](d3-tauri-steam-build.md) | **Tauri Desktop-Packaging:** Kompilierung einer nativen Windows-Executable als Vorbereitung für Steam. | ⏳ offen | 🤖 Claude |

---

### Parallelstrang — Organisation & Recht
| Paket | Titel & Ziel (1 Satz) | Wann | Rollen |
|---|---|---|---|
| [O1](o1-recht-impressum.md) | **Impressum & Datenschutz:** Rechtssicheres § 5 DDG Impressum und Datenschutzerklärung für Web-Hosting. | vor B1 | 👤 Nutzer / 🤖 Claude |
| [O2](o2-ai-act-kennzeichnung.md) | **EU AI Act Kennzeichnung:** Transparenzhinweis zu KI-generierten Kartengrafiken einbinden. | vor B1 | 🤖 Claude |
| [O3](o3-name-branding.md) | **Namensfindung & Marken-Check:** Finalen Titel festlegen und DPMA-Register kurz prüfen. | vor D2 | 👤 Nutzer |
| [O4](o4-foerderung.md) | **Förderungs-Check (optional):** Regionale Prototypenförderung (z.B. Gamecity/NRW) sichten. | flexibel | 👤 Nutzer |
