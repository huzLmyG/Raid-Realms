# Paket C2 — P2P 1v1 Multiplayer

**Teil:** C (MVP)  
**Voraussetzungen:** Paket C1 fertig  
**Rollen:** 🤖 Claude: WebRTC/PeerJS Netzwerk-Layer implementieren · 👤 Nutzer: 1v1-Match mit zweitem Tab / Gerät testen  

## Ziel
Zwei menschliche Spieler können über das Internet per Klick auf einen Einladungslink oder Eingabe eines 6-stelligen Raum-Codes ohne zentrale Serverkosten ein synchronisiertes 1v1-Duell gegeneinander austragen.

## Arbeitsschritte
1. PeerJS-Integration (`src/net/p2p-peerjs.ts`): Host erstellt Raum, generiert Link (`?room=XYZ`) und wartet auf Gast.
2. Protokoll für Aktionsübertragung definieren: State-Synchronisation via DataChannels (PlayCard, Attack, EndPhase).
3. Rollenmodell: Host fungiert als autoritativer Schiedsrichter für Zufallswerte (Markt-Rerolls, Feen-Echo-RNG).
4. Disconnect-Handling: Anzeige bei Verbindungsabbruch und automatischer Reconnect-Versuch.

## Fertig wenn
- [ ] Spieler A erstellt Raum, teilt Link mit Spieler B; B tritt bei und Match startet.
- [ ] Aktionen auf beiden Bildschirmen sind verzögerungsarm (< 150ms) synchron.
- [ ] Spielende wird bei beiden Spielern übereinstimmend angezeigt.

## Ergebnis
[Wird beim Abarbeiten gefüllt: was konkret entstanden ist]

## Notizen
[Leer lassen. Beim Abarbeiten füllen: Entscheidungen, Abweichungen vom Plan, Datum.]
