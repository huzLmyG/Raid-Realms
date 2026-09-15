# Paket C1 — Mobile-First PWA

**Teil:** C (MVP)  
**Voraussetzungen:** Teil B erfolgreich abgeschlossen (Go-Entscheidung)  
**Rollen:** 🤖 Claude: Responsive Layout, Touch-Controls & PWA-Manifest bauen · 👤 Nutzer: Auf eigenem Smartphone testen  

## Ziel
Das Spiel ist vollumfänglich auf mobilen Browsern (iOS Safari & Android Chrome) spielbar, unterstützt Touch-Gesten (Tippen/Wischen für Handkarten) und lässt sich als Offline-fähige PWA auf dem Homescreen installieren.

## Arbeitsschritte
1. Touch-Event-Handling (Tap-to-Inspect, Drag/Tap-to-Play) für Handkarten und Zielauswahl.
2. Responsive Breakpoints für Smartphone-Screens (Portrait & Landscape): Handkarten-Drawer, verkleinerte Spielfeld-Zonen mit Pinch/Scroll-Schutz.
3. Web App Manifest (`manifest.json`) mit Icons und Theme-Farbe konfigurieren.
4. ServiceWorker für Caching der Spiel-Assets (Offline-PvE-Spielbarkeit) registrieren.

## Fertig wenn
- [ ] Spiel läuft flüssig auf einem Smartphone ohne horizontales Scrollen oder abgeschnittene Buttons.
- [ ] PWA kann zum Homescreen hinzugefügt werden und startet im Vollbildmodus ohne Browserleiste.
- [ ] PvE-Match lässt sich komplett offline ohne Internetverbindung starten und spielen.

## Ergebnis
[Wird beim Abarbeiten gefüllt: was konkret entstanden ist]

## Notizen
[Leer lassen. Beim Abarbeiten füllen: Entscheidungen, Abweichungen vom Plan, Datum.]
