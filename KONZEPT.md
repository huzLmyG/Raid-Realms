# KONZEPT: RAID REALMS (Arbeitstitel)

> **Single Source of Truth** für das Projekt „Raid Realms“ — Browser- & Steam-Deckbuilder-Duell.  
> Erstellt nach der Methodik `idee-zu-bauplan`.  
> Status: **Gültig ab September 2026**

---

## §0 Entscheidungstabelle (Sparring-Ergebnisse)

| # | Frage aus dem Sparring | Getroffene Entscheidung | Konsequenz für Konzept & Bauplan |
|---|---|---|---|
| **E1** | **Primäres Ziel** | **Hybrid:** Kostenlose Browser-Demo (itch.io / GitHub Pages), später vollwertiger Release auf Steam (4,99 € – 7,99 €) mit Premium-Features. | Der Core-Loop muss als Web-Demo sofort ohne Barriere spielbar sein. Die Codebasis wird so angelegt, dass sie später via Tauri/Electron ohne Rewrite als Steam-Build exportiert werden kann. |
| **E2** | **Fokus Spielmodi** | **Sowohl PvE-Solo als auch 1v1-Online**. | Die Spiellogik (Game Engine / State Machine) muss strikt von der UI und dem Netzwerk getrennt sein (deterministischer State). Ein Bot speist dieselben Aktionen ein wie ein Online-Gegner. |
| **E3** | **Multiplayer-Technologie** | **Phase 1: P2P (WebRTC/PeerJS)** mit Einladungslink/Room-Code (0 € Serverkosten). Architektur so vorbereiten, dass ein **globaler WebSocket-Server** (Lobby/Matchmaking) später nahtlos angedockt werden kann. | Keine laufenden Serverkosten in der Prototypenphase. Schneller Start mit Raumcodes für Freunde; State Machine ist transport-agnostisch vorbereitet für globale Server. |
| **E4** | **Plattform & UI** | **Responsive & Mobile-First PWA:** Läuft im mobilen Browser und Desktop gleichermaßen, touch-optimiert (Tap/Swipe). | Kein reines Desktop-Fixed-Layout. Spielbrett passt sich nahtlos an Smartphones (Portrait/Landscape-Switch) und Desktop-Screens an. ServiceWorker für Offline-PvE. |
| **E5** | **Code-Architektur** | **Modularisierung mit Vite + TypeScript**, schrittweiser Übergang von Single-File v8 zu sauberem Modulsystem. | Codebase wird wartbar, typensicher und testbar. Komponenten (Board, Hand, Market, Combat, Audio) sind isoliert. Ermöglicht saubere Asset-Pipelines für die 102 Kartenbilder. |
| **E6** | **Ressourcen & Arbeitsmodus** | **Lean Solo-Entwicklung (Feierabend):** 3–6 Std./Woche, AI-gestützter Workflow (Antigravity). | Pakete müssen strikt portioniert sein (1 Paket = 1 Sitzung von 1–2 Stunden). Klare Trennung zwischen Automatisierbarem (Code, Templates) und Nutzer-Entscheidungen (Playtesting, Balancing). |
| **E7** | **Projektname** | **„Raid Realms“ ist Arbeitstitel;** finale Markenentscheidung erfolgt vor dem öffentlichen Steam-Launch. | Markenrecherche und Namensfindung sind als Meilenstein im Organisations-Strang vor dem Release eingeplant. |

---

## 1. Kernidee & Grundprinzipien

### 1.1 Was ist Raid Realms?
**Raid Realms** ist ein temporeiches, taktisches 1v1-Kartenduell-Spiel, das zwei beliebte Genres verschmilzt:
1. **Board-Battler (Hearthstone / Magic):** Einheiten auf dem Feld mit Taunt, Charge, Stats (ATK/HP) sowie Gebäude mit passiven Rundeneffekten und Fortify.
2. **In-Match Deckbuilder (Dominion / Star Realms):** Spieler kaufen *während* des laufenden Duells neue Karten aus einer dynamischen Marktauslage (Tiers 1–3) und verfeinern ihr Deck Zug um Zug.

### 1.2 Grundprinzipien
1. **Zero Barrier (Reibungslosigkeit):** Sofort im Browser spielbar. Kein Download, kein Zwangskonto, kein Tutorial-Zwang von 30 Minuten. Klick auf den Link und das Duell startet in 5 Sekunden.
2. **Asymmetrische Spieltiefe:** 10 Rassen mit radikal unterschiedlichen passiven Talenten und Starterdecks erzeugen hohen Wiederspielwert und Konter-Dynamiken.
3. **Deterministische Klarheit:** Kampfabläufe, Keywords und Markt-Interaktionen sind transparent, fair und nachvollziehbar.
4. **Fairness First:** Kein Pay-to-Win, kein Gacha, keine kaufbaren Gameplay-Vorteile.

---

## 2. Zielgruppen & Start-Keil

### 2.1 Zielgruppen
*   **Primäre Zielgruppe (Start-Keil):** Fans von schnellen Browser-Deckbuildern, Indie-Kartenspielen und taktischen Duell-Spielen (Spieler von *Slay the Spire*, *Balatro*, *Inscryption*, *Star Realms*, *Hearthstone Battlegrounds*), die auf itch.io und Reddit nach innovativen Mechaniken suchen.
*   **Sekundäre Zielgruppe:** Gelegenheits-PvP-Spieler, die mit Freunden über Discord/WhatsApp per Klick auf einen Einladungslink ein schnelles 5-Minuten-Duell am Handy oder PC austragen wollen.
*   **Tertiäre Zielgruppe (Post-MVP):** Steam-Indie-Community, die Solo-Roguelike-Runs und kompetitive Lobbies schätzt.

### 2.2 Der Start-Keil
Wir bauen nicht sofort ein komplexes MMO-Cardgame, sondern fokussieren uns im ersten Schritt auf:
> **Ein perfekt ausbalanciertes 1v1-Duell (PvE vs. KI & P2P per Room-Code) mit 10 spielbaren Rassen und responsivem PWA-Design.**

---

## 3. Kernprodukt im Detail

### 3.1 Spielablauf (Core Loop)
1. **Setup:** Beide Spieler wählen eine von 10 Rassen (Start-HP 60, Vampir 50). Beide erhalten ihr rassen-spezifisches Startdeck (10 Karten) und ziehen 5 Handkarten.
2. **Phase 1 – Haupt-Phase (Action & Economy):**
   - Gold erhalten (+ Basiseinkommen + Gebäude-Boni).
   - Karten ausspielen (Zauber wirken, Einheiten beschwören [max. 7 Slots], Gebäude errichten).
   - Handkarten oder Gebäude upgraden (Goldkosten).
   - Markt nutzen: Aus 6 zufälligen Marktkarten (Tiers 1–3) neue Karten ins Deck kaufen; optional Reroll für 2 Gold.
3. **Phase 2 – Kampf-Phase:**
   - Einheiten deklarieren Angriffe auf gegnerische Einheiten, Gebäude oder direkt auf den gegnerischen Helden (solange kein `Taunt` oder `Fortify` aktiv ist).
   - Schadensberechnung, Lifesteal, Gegenschlag.
4. **Turn End:** Nicht ausgespielte Karten ablegen, auf 5 Karten nachziehen, Rundenwechsel.
5. **Siegbedingung:** Die HP des gegnerischen Spielers auf 0 reduzieren.

### 3.2 Die 10 Rassen
| Rasse | Archetyp / Spielstil | Passiver Effekt |
|---|---|---|
| **Mensch** | Economy & Allrounder | +1 Gold/Runde, wenn zu Rundenbeginn ≥5 Gold vorhanden sind |
| **Ork** | Aggro & Low-HP-Berserker | +2 Schaden auf alle Angriffe, sobald eigene HP < 10 |
| **Elf** | Zauberketten & Tempo | Zauberketten-Bonus: Aufeinanderfolgende Zauber erhalten +2 / +4 / +6 Bonusschaden |
| **Untoter** | Nekromantie & Zermürbung | 50% Chance, dass gefallene Einheiten als Skelett (1/1) zurückkehren |
| **Drache** | Late-Game & Horten | Unverbrauchtes Gold verfällt nicht am Rundenende, sondern akkumuliert |
| **Zwerg** | Schmiede & Wertsteigerung | 1× pro Runde: Eine Handkarte kostenlos permanent aufwerten (+1 Stats) |
| **Fee** | Chaos & Duplikation | 25% Echo-Chance: Eine gespielte Karte wird sofort ein zweites Mal kostenlos gewirkt |
| **Dämon** | Hochrisiko / Blutmagie | 5 HP opfern für +8 Sofortgold; bei <8 HP: +5 Bonusschaden |
| **Werwolf** | Rudel-Synergie | +1 Angriff pro eigener Einheit auf dem Spielfeld (max. +4) |
| **Vampir** | Sustain & Lebensraub | Jeder zugefügte Schaden heilt den Spieler um 1 HP (Startet dafür mit 50 HP) |

### 3.3 Kartentypen & Keywords
*   **Zauber (Spells):** Sofortiger Effekt (Direktschaden, Heilung, Draw, Flächenschaden/AOE).
*   **Einheiten (Units):** Kämpfen auf dem Board (ATK / HP). Keywords:
    - `Taunt`: Muss vor allen anderen Zielen angegriffen werden.
    - `Charge`: Kann sofort in der Beschwörungsrunde angreifen (keine Einsatzverzögerung).
    - `Lifesteal`: Zugefügter Schaden heilt die Einheit bzw. den Spieler.
*   **Gebäude (Buildings):** Verbleiben dauerhaft auf dem Feld. Keywords:
    - `Fortify`: Blockiert alle direkten Angriffe auf den Helden.
    - Passive Rundenboni (Goldproduktion, Heilung, Truppenrekrutierung).
*   **Ressourcenkarten:** Sofortiges Gold, Extra-Karten oder Buffs.

---

## 4. Feature-Katalog nach Phasen & Anti-Features

### Phasen-Katalog
*   **Phase A (Fundament & Modularisierung):**
    - Migration des monolithischen `raid-realms-v8.html` in ein Vite + TypeScript Projekt.
    - Saubere Trennung: `Engine` (State, Rules, Cards), `AI` (Heuristiken), `UI` (Components, Audio), `Net` (P2P).
    - Lokaler Prototyp läuft stabil mit Tests für Combat-Regeln.
*   **Phase B (Proof & Balancing):**
    - Spielbare Browser-Demo mit 10 Rassen und voller 102-Karten-Asset-Integration.
    - Test-Session mit echten Nutzern (itch.io unlisted oder Vercel-Link).
    - Go/No-Go-Meilenstein: Macht der Core-Loop Spaß? Sind Rassen ausbalanciert?
*   **Phase C (MVP - Solo & P2P Online):**
    - P2P 1v1 Multiplayer via WebRTC (PeerJS Room-Codes).
    - Mobile-First Responsive PWA Styling (Touch, Gesten, Fullscreen).
    - Erweiterte Solo-KI (verschiedene Schwierigkeitsgrade, Rassen-spezifische Taktiken).
*   **Phase D (Polish & Vorbereitung Steam/Store):**
    - Sound- & Haptik-Polishing (Web Audio FX, Screen Shake, visuelle Effekte).
    - Vorbereitung eines Desktop-Wrappers via Tauri für Steam.
    - Optional: Globales Matchmaking (WebSocket Relay).

### Anti-Feature-Liste (Was wir bewusst NICHT bauen)
| Anti-Feature | Warum wir es NICHT bauen |
|---|---|
| **Pay-to-Win Mikrotransaktionen / Boosterpacks** | Zerstört kompetitive Glaubwürdigkeit und Spielspaß; stößt Indie-Kartenspieler sofort ab. |
| **Schwerfällige 3D-Grafik-Engine** | Explodierende Ladezeiten, Inkompatibilität auf schwachen Mobilgeräten, unverhältnismäßiger Mehraufwand. |
| **Registrierungszwang vor dem ersten Match** | Maximale Abbruchrate bei Web-Spielen. Ein Spieler muss in < 5 Sekunden spielen können. |
| **Komplexer 4-Spieler-Modus** | Zerstört das schnelle, fokussierte 1v1-Tempo und potenziert den Balancing-Aufwand. |
| **Kryptowährungen / NFT-Karten** | Extrem schlechter Ruf in der Gaming-Community; rechtliche und steuerliche Minenfelder. |

---

## 5. Ergebnisse der Lückenanalyse (Recht, Betrieb, Konkurrenz)

### 5.1 Recht & Datenschutz (Recherchierte Fakten, Stand 2026)
*   **EU AI Act (Verordnung (EU) 2024/1689):**
    - Die Transparenz- und Kennzeichnungspflichten gemäß Art. 50 EU AI Act sind seit dem **2. August 2026** für neu in Verkehr gebrachte Systeme verbindlich.
    - Für die 102 mit generativer KI erstellten Kartengrafiken (`bilder/`) gilt: Bei rein künstlerischen/fiktionalen Werken reicht ein angemessener Hinweis, der das Spielerlebnis nicht stört.
    - **Maßnahme:** Ein klarer Transparenzhinweis in den Credits / Startscreen („Kartengrafiken wurden mithilfe generativer KI generiert“) sowie saubere Bild-Metadaten.
*   **Urheberrecht (UrhG):**
    - KI-generierte Bilder ohne menschliche Schöpfungshöhe genießen in DE/EU keinen Urheberrechtsschutz, dürfen jedoch uneingeschränkt im Spiel verwendet werden, sofern die Nutzungsbedingungen (ToS) des Generierungs-Tools kommerzielle Nutzung erlauben.
*   **Impressum & Datenschutz (§ 5 DDG & DSGVO):**
    - Sobald das Spiel öffentlich gehostet wird (z. B. auf GitHub Pages / Vercel), greift die Impressumspflicht nach § 5 Digitale-Dienste-Gesetz (DDG, Nachfolger des TMG).
    - **Datenschutz-Vorteil:** Da wir mit **Local-First** arbeiten (LocalStorage für Einstellungen/Savegame) und P2P für Multiplayer nutzen, werden keine personenbezogenen Daten auf zentralen Servern gespeichert. Kein Consent-Banner / Cookie-Banner nötig!

### 5.2 Konkurrenzanalyse & Markt
*   **Wettbewerber im Markt:**
    - *Slay the Spire 2* (Early Access Release März 2026): Fokussiert auf Singleplayer/Co-Op Roguelike Deckbuilder, Premium Steam.
    - *Balatro*: Poker-Roguelike-Phänomen, zeigt den enormen Hunger nach schnellen, befriedigenden Kartenspielen.
    - *Lost For Swords*, *Retromine*, *Roulette Hero*: Erfolgreiche Indie-Titel auf itch.io und Steam, die mit Nischenideen punkten.
    - *Hearthstone / Marvel Snap*: Marktführer im Online-CCG, aber voll von Mikrotransaktionen, Battle Passes und schweren Downloads.
*   **Die echte Marktlücke für Raid Realms:**
    - Ein **sofort im Browser startbares, skill-basiertes 1v1-Deckbuilder-Duell**, das die Board-Präsenz von Hearthstone mit dem dynamischen Einkaufs-Deckbau von Star Realms/Dominion kombiniert — ohne P2W und ohne Ladezeiten.

### 5.3 Laufender Betrieb & Bus-Faktor
*   **Solo-Wartbarkeit:** Durch Modularisierung (Vite + TS) und strikte Trennung von Spiellogik und UI kann die Codebasis über Monate hinweg auch in kurzen Feierabend-Sitzungen erweitert werden.
*   **Balancing-Pflege:** Kartendaten liegen in einer zentralen, übersichtlichen JSON/TS-Kartenkonfiguration. Stat-Tweaks (z.B. Zwergen-Passiv oder Vampir-Lifesteal) können in Sekunden angepasst werden, ohne Code anzufassen.

### 5.4 Erfolgsmessung
*   **Nordstern-Metrik:** **Completed Matches pro aktiver Session** (Ziel: ≥ 3 Partien im Durchschnitt, Indikator für den „Nur noch eine Runde“-Sucht-Effekt).
*   **KPI 1 (Retention):** D1- und D7-Wiederkehrrate im Browser (anonym über LocalStorage-Besuchsintervall gemessen).
*   **KPI 2 (Balance):** Pick-Rate und Win-Rate der 10 Rassen (Ziel: Keine Rasse hat > 58% oder < 42% Win-Rate).
*   **KPI 3 (Match-Dauer):** Durchschnittliche Duell-Länge liegt im Sweet Spot von 7 bis 12 Minuten.

---

## 6. Finanzierung & Nachhaltigkeit (Drei-Säulen-Modell)

```
       [SÄULE A: Start / Proof]
  Regionale Prototypenförderung (z.B. Gamecity Hamburg bis 80k €)
  & Kostenloses Hosting (GitHub Pages / Vercel: 0 €)
                   │
                   ▼
      [SÄULE B: Community / Demo]
  itch.io ("Pay what you want"), Ko-fi / Supporter-Packs
  für exklusive kosmetische Cardbacks / Avatare
                   │
                   ▼
      [SÄULE C: Kommerzieller Release]
  Steam-Launch (4,99 € – 7,99 €) via Tauri-Desktop-App
  mit Solo-Kampagne, Achievements & Ranked Matchmaking
```

1. **Säule A – Start & Free-Tier (Sofort bis MVP):**
   - Laufende Infrastrukturkosten: **0,00 €**.
   - Hosting der Web-Demo über **GitHub Pages / Cloudflare Pages / Vercel** (kostenlos).
   - Multiplayer über PeerJS / WebRTC Free Tier (kostenlos).
   - Bei Weiterentwicklung zum kommerziellen Studio: Antrag bei regionalen Programmen (z. B. Prototypenförderung der Bundesländer wie Gamecity Hamburg, FFF Bayern, Medienboard; im Gegensatz zur Bundesförderung mit 300k € Mindestschwelle passgenau für Indie-Prototypen bis 80.000 €).
2. **Säule B – Community-Unterstützung (Proof & Beta):**
   - Release auf itch.io mit „Name your own price“.
   - Ko-fi / Patreon für leidenschaftliche Kartenspieler, die das Projekt begleiten möchten (Belohnung: Credits-Eintrag, Discord-Rolle, exklusive kosmetische Kartenrahmen).
3. **Säule C – Steam Release (Ausbaustufe):**
   - Nach erfolgreicher Validierung der Browser-Version Verpackung mit **Tauri** als performanter, nativer Steam-Build.
   - Preispunkt: 4,99 € – 7,99 € Einmalkauf (Fair Price Indie).

---

## 7. Technische Architektur

### 7.1 Tech-Stack
*   **Frontend & Runtime:** HTML5, CSS3 (Modernes Flexbox/Grid, CSS Custom Properties), TypeScript.
*   **Build-Tool & Bundler:** **Vite** (blitzschneller Dev-Server, optimierter Build für PWA und statisches Deployment).
*   **Grafik & Assets:** 102 vorbereitete PNG-Sprites (512×512 bzw. 1024×1024) im Dark-Fantasy-Pixel-Art-Stil.
*   **Audio:** Native Web Audio API (Synthesizer-Effekte & dynamische Audio-Pipeline ohne schwere MP3-Assets).
*   **Netzwerk (Multiplayer):**
    - Phase 1: **WebRTC via PeerJS** (Direct Browser-to-Browser, 0 € Kosten, P2P via Room-Code).
    - Phase 2 (optional): Schlanker WebSocket-Relay-Server (Node.js / Bun) auf Render/Fly.io Free Tier für zentrales Matchmaking.
*   **Desktop-Packaging (später):** **Tauri** (extrem leichtgewichtig im Vergleich zu Electron, < 15 MB Installer).

### 7.2 Modul-Struktur
```
src/
├── core/                  # Transport-unabhängige Spiellogik
│   ├── types.ts           # Alle TypeScript-Typen (Card, Player, GameState, Race)
│   ├── engine.ts          # State Machine (Turn phases, PlayCard, Attack, Buy)
│   ├── cards.data.ts      # Kartendatenbank (~70+ Karten, 10 Rassen)
│   └── bot.ts             # Deterministiche Solo-KI mit Taktikstufen
├── net/                   # Netzwerk-Layer
│   ├── network-interface.ts
│   └── p2p-peerjs.ts      # WebRTC P2P-Implementierung
├── ui/                    # Benutzeroberfläche & Rendering
│   ├── components/        # Board, Hand, Market, Avatar, Modal
│   ├── styles/            # Responsive CSS & Theme
│   └── audio.ts           # Web Audio Sound FX Engine
└── main.ts                # Application Entry Point
```

---

## 8. Datenmodell für den Start

```typescript
export type RaceId = 'human' | 'orc' | 'elf' | 'undead' | 'dragon' | 
                     'dwarf' | 'fairy' | 'demon' | 'werewolf' | 'vampire';

export type CardType = 'spell' | 'unit' | 'building' | 'resource';

export interface Card {
  id: string;
  name: string;
  type: CardType;
  tier: 0 | 1 | 2 | 3; // 0 = Starter, 1 = 2g, 2 = 5g, 3 = 10g
  cost: number;
  image: string;
  description: string;
  // Stats (für Einheiten / Gebäude)
  attack?: number;
  health?: number;
  maxHealth?: number;
  keywords?: ('taunt' | 'charge' | 'lifesteal' | 'fortify')[];
  // Effekte
  onPlay?: (state: GameState, target?: Target) => void;
  onTurnStart?: (state: GameState, owner: Player) => void;
  onTurnEnd?: (state: GameState, owner: Player) => void;
}

export interface Player {
  id: string;
  name: string;
  race: RaceId;
  hp: number;
  maxHp: number;
  gold: number;
  hand: Card[];
  deck: Card[];
  discard: Card[];
  boardUnits: Card[];    // max. 7
  boardBuildings: Card[];// max. 7
  heroPowerUsed: boolean;
}

export interface GameState {
  matchId: string;
  turn: number;
  activePlayerIndex: 0 | 1;
  phase: 'action' | 'combat';
  marketCards: Card[];
  players: [Player, Player];
  log: string[];
}
```

---

## 9. Roadmap-Phasen mit „Fertig wenn“-Kriterien

### Teil A — Fundament & Modularisierung
*   **Ziel:** Die bestehende `raid-realms-v8.html`-Logik ist sauber in ein modernes, typisiertes Vite+TypeScript-Projekt überführt und lokal lauffähig.
*   **Fertig wenn:**
    - [ ] Vite + TypeScript Projekt eingerichtet ist und `npm run build` fehlerfrei durchläuft.
    - [ ] Sämtliche 102 Kartenbilder aus `bilder/` über das Asset-System angebunden sind.
    - [ ] Der Core-Loop (Rassenwahl, Kaufen, Ausspielen, Angreifen) im Browser 1:1 wie in v8 funktioniert.
    - [ ] Unit-Tests für Kern-Regeln (Taunt, Fortify, Lifesteal, Schadensberechnung) grün sind.

### Teil B — Proof & Test-Meilenstein (Kernhypothese testen)
*   **Ziel:** Echte Testnutzer spielen die Browser-Version und bewerten Balancing und Spaßfaktor.
*   **Fertig wenn:**
    - [ ] Demo ist öffentlich erreichbar (GitHub Pages oder Vercel).
    - [ ] Mindestens 5 Testspieler haben jeweils mindestens 3 Partien gegen die KI gespielt.
    - [ ] Feedback zu overpowered/underpowered Rassen ist im Session-Log dokumentiert.
    - [ ] **Go/No-Go-Meilenstein:** Entscheidung über Weitermachen oder Nachschärfen der Mechanik.

### Teil C — MVP (Mobile-First UI & P2P-Multiplayer)
*   **Ziel:** Das Spiel ist am Smartphone flüssig spielbar und erlaubt 1v1-Duelle übers Internet per Raum-Link.
*   **Fertig wenn:**
    - [ ] Responsive Layout funktioniert auf Smartphone (Hoch- & Querformat) mit Touch-Gesten ohne Ruckeln.
    - [ ] Zwei Spieler können über PeerJS via Klick auf einen Share-Link ein 1v1-Match austragen.
    - [ ] Desynchronisationen im P2P-Modus werden erkannt und abgefangen.
    - [ ] Solo-KI besitzt mindestens 2 Schwierigkeitsgrade (Normal & Taktisch).

### Teil D — Polish & Release-Vorbereitung (Steam / itch.io)
*   **Ziel:** Fertiges Produkt für die Veröffentlichung auf itch.io und Bereitstellung des Tauri-Steam-Builds.
*   **Fertig wenn:**
    - [ ] Sound-Effekte (Web Audio) und visuelle Screen-Shakes/Partikel sind final abgemischt.
    - [ ] Impressum, EU AI Act Transparenzhinweis und Credits sind eingebunden.
    - [ ] itch.io Seite ist live geschaltet.
    - [ ] Tauri-Build kompiliert erfolgreich eine portable `.exe`.

### Parallelstrang — Organisation & Recht
*   **O1 (Recht & Impressum):** § 5 DDG Impressum und Datenschutzerklärung für das Web-Hosting vorbereiten.
*   **O2 (KI-Kennzeichnung):** Transparenzhinweis gemäß Art. 50 EU AI Act in UI und Metadaten integrieren.
*   **O3 (Namensfindung):** Finalen Titel vor dem Steam-Release festlegen und Markenregister (DPMA) kurz prüfen.
*   **O4 (Förder-Prüfung):** Bei Bedarf Prototypenförderung der Länder (z.B. Hamburg/NRW/Bayern) sichten.

---

## 10. Risiken & Gegenmaßnahmen

| Risiko | Wahrscheinlichkeit | Schwere | Gegenmaßnahme |
|---|---|---|---|
| **Balancing-Ungleichgewicht** (z. B. Elf-Spells oder Ork-Berserker unbesiegbar) | Hoch | Mittel | Zentrale `cards.data.ts` mit isolierten Zahlenwerten; automatisierte Bot-vs-Bot-Simulationen (1000 Matches) zur Winrate-Ermittlung. |
| **Desync bei P2P-Multiplayer** | Mittel | Hoch | State Machine vollkommen deterministisch gestalten (Seed-basierter RNG); State-Hashes nach jedem Turn austauschen. |
| **Mobile UX / Bildschirmgröße zu klein** | Mittel | Mittel | Hearthstone-inspiriertes aufklappbares Handkarten-System und Swipe-Gesten auf Mobilgeräten. |
| **Projekt schläft ein (Solo-Bus-Faktor)** | Mittel | Hoch | Strenge Einhaltung der Bauplan-Methode: Jedes Paket ist in einer Sitzung (1–2 Stunden) schaffbar. |

---

## 11. Offene Punkte & Checkliste

- [ ] Git-Initialisierung im Projekt-Repo abschließen und `main`-Branch synchronisieren.
- [ ] `bauplan/uebersicht.md` und erste Arbeitspaket-Dateien anlegen.
- [ ] Vite + TypeScript Grundgerüst aufsetzen.
