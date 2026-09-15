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
- [x] Spieler A erstellt Raum, teilt Link mit Spieler B; B tritt bei und Match startet (PeerJS WebRTC Mesh).
- [x] Aktionen auf beiden Bildschirmen sind verzögerungsarm (< 150ms) synchron (Host-autoritative State-Synchronisation via DataChannels).
- [x] Spielende wird bei beiden Spielern übereinstimmend angezeigt.

## Ergebnis
1. `src/net/p2p-peerjs.ts`: P2P-Netzwerk-Layer mit PeerJS, automatischer Raum-Code-Generierung (`raidrealms-XXXX`), WebRTC DataConnection und Disconnect-Handling.
2. `src/ui/GameUI.ts`: Vollständige Anbindung des P2P-Netzwerks (Aktionen werden übertragen, Host synchronisiert State nach jedem Zug).
3. `src/main.ts`: Online 1v1 Modal mit Tabs für Raum-Erstellung (inkl. Einladungslink-Kopieren per Klick) und Raum-Beitritt (inkl. automatischer URL-Parameter `?room=XYZ` Erkennung).
4. `tests/p2p.test.ts`: Automatisierte Tests für verlustfreie State-Serialisierung und Netzwerksynchronisation.

## Notizen
Abgeschlossen am 2026-09-15. 100% serverlos über kostenlose öffentliche STUN-Server von WebRTC/PeerJS. Zero Backend-Betriebskosten.
