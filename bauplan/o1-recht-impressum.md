# Paket O1 — Impressum & Datenschutz

**Teil:** Parallelstrang (Organisation & Recht)  
**Voraussetzungen:** Vor Paket B1 (vor dem ersten öffentlichen Deployment)  
**Rollen:** 👤 Nutzer: Kontaktdaten für Impressum bereitstellen · 🤖 Claude: Rechtstexte-Template nach § 5 DDG & DSGVO einbinden  

## Ziel
Die Web-App verfügt über ein rechtssicheres Impressum nach § 5 Digitale-Dienste-Gesetz (DDG) sowie eine Datenschutzerklärung, die den datenschutzfreundlichen Local-First-Ansatz (keine Tracking-Cookies, keine serverseitige Speicherung) dokumentiert.

## Arbeitsschritte
1. Impressum-Modal oder Sub-Page in der UI erstellen.
2. Pflichtangaben (§ 5 DDG: Name, ladungsfähige Anschrift, E-Mail-Adresse) einpflegen.
3. Datenschutzerklärung verfassen: Hinweis auf reine Client-Speicherung (LocalStorage), Verzicht auf Drittanbieter-Tracker und P2P-Datenübertragung.
4. Barrierearmen Link im Startmenü platzieren.

## Fertig wenn
- [x] Impressum und Datenschutzerklärung sind mit 2 Klicks aus dem Hauptmenü erreichbar.
- [x] Keine externen unerlaubten Tracker-Skripte im Bundle aktiv.

## Ergebnis
Rechtssicheres Impressum nach § 5 DDG (ehemals TMG) sowie vollständige DSGVO-Datenschutzerklärung für die Local-First-Architektur (keine Tracking-Cookies, LocalStorage, keine Drittanbieter-Tracker) direkt als modales Fenster im Startbildschirm (`src/main.ts`) integriert.

## Notizen
Abgeschlossen am 2026-09-15. Keine externen Tracker oder Tracking-Cookies im Codebase vorhanden. Local-First-Prinzip vollständig gewahrt.
