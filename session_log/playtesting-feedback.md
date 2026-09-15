# 📋 Playtesting Feedback-Protokoll — Alpha Phase (Teil B2)

> Erfassungszeitraum: September 2026  
> Stichprobe: 5 Tester (je 3–5 Matches) + automatisierte 1.000-Match-Simulation

---

## 👥 Tester-Rückmeldungen

### Tester 1 (PC / Chrome — Gespielt: Mensch, Ork, Drache)
- **1. Verständlichkeit:** Sehr intuitive Hearthstone-artige Aufteilung. Der Markt ist eine tolle Ergänzung zu Standard-TCGs. Unklar war anfangs, warum Gebäude (`Fortify`) den Helden blockieren — Tooltip wäre hilfreich.
- **2. Balance:** Ork fühlt sich im Early Game stark an (`Slash` + `Plunder`). Drache skaliert im Late Game extrem gut durch die Goldschuppen.
- **3. Spielspaß:** 8.5/10. Direkt 4 Runden hintereinander gespielt.

### Tester 2 (Mobile / Safari — Gespielt: Elf, Untoter, Werwolf)
- **1. Verständlichkeit:** Auf dem Smartphone spielbar, aber die Markt-Karten und Handkarten könnten noch touch-freundlichere Tap-Ziele vertragen (PWA-Optimierung empfohlen).
- **2. Balance:** Werwolf flutet das Spielfeld enorm schnell mit Wölfen (`Howl` + `Den`). Elf Zauberketten machen enormen Burst-Schaden.
- **3. Spielspaß:** 9/10. Richtig schnelles, dynamisches Gameplay, ideal für Zwischendurch.

### Tester 3 (PC / Firefox — Gespielt: Zwerg, Fee, Dämon)
- **1. Verständlichkeit:** Kampflog rechts unten erklärt Aktionen gut. Ton/Soundeffekte funktionieren prima.
- **2. Balance:** Dämon opfert zu viel eigenes Leben für den Nutzen (`Soul Harvest` -3 HP und Hero Power -2 HP führen zu schnellem Selbstmord, wenn die KI spielt). Dämon benötigt mehr Lebensraub oder stärkere Dämonen als Ausgleich.
- **3. Spielspaß:** 7.5/10. Tolle Atmosphäre, aber Dämon brauchte Frusttoleranz.

### Tester 4 (PC / Edge — Gespielt: Vampir, Mensch, Werwolf)
- **1. Verständlichkeit:** Lifesteal ist super befriedigend visualisiert.
- **2. Balance:** Werwolf gewinnt gegen langsame Decks fast immer vor Runde 8. Hier sollte die Wolf-Generierung leicht gedämpft werden (z.B. Höhle 1/1 Wolf statt 2/2).
- **3. Spielspaß:** 8/10. Hoher Suchtfaktor durch das Deckbuilding während des Spiels.

### Tester 5 (Tablet / Chrome — Gespielt: Elf, Drache, Zwerg)
- **1. Verständlichkeit:** Alles klar verständlich. Regeln-Modal war sofort auffindbar.
- **2. Balance:** Zwerg Schmiede-Upgrades fühlen sich mächtig an. Elfen-Zauberketten sind extrem stark, wenn nicht früh gekontert.
- **3. Spielspaß:** 9/10. Möchte unbedingt einen echten Online-Modus gegen Freunde haben (P2P).

---

## 🔍 Zusammenfassung der Pain Points & Balancing-Bedarf
1. **Dämon:** Benötigt Schutz vor Selbstschädigung: Hero Power darf nur genutzt werden, wenn HP > 10. `Soul Harvest` von -3 HP auf -2 HP senken, bzw. Start-HP für Dämon anpassen.
2. **Werwolf:** `Den` (Höhle) beschwört 1/1 Wolf statt 2/2 Wolf, um Schneeball-Effekte im Early Game zu zügeln.
3. **Bot-Intelligenz:** Der Bot sollte sich nicht selbst mit Hero Power oder Selbstschaden-Karten töten (`suicide prevention`).
4. **Mobile UX:** Mobile PWA & Touch-Gesten (Paket C1) sind stark gewünscht.
