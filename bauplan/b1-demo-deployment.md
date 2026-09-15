# Paket B1 — Demo-Deployment

**Teil:** B (Proof)  
**Voraussetzungen:** Teil A komplett abgeschlossen  
**Rollen:** 🤖 Claude: Deployment-Konfiguration erstellen (GitHub Actions / Vercel) · 👤 Nutzer: Repository verknüpfen & Live-URL testen  

## Ziel
Der aktuelle Spielstand ist als öffentliche Web-Demo unter einer festen URL (z. B. GitHub Pages oder Vercel) ohne Login frei im Browser erreichbar.

## Arbeitsschritte
1. GitHub Pages Workflow (`.github/workflows/deploy.yml`) oder Vercel-Konfiguration anlegen.
2. Build-Pipeline im CI testen: automatischer Build bei Push auf `main`.
3. Live-URL im `README.md` und in `uebersicht.md` hinterlegen.
4. Prüfen, ob alle Bilder und Sounds im Produktions-Build korrekt geladen werden.

## Fertig wenn
- [x] Spiel ist unter einer öffentlichen HTTPS-URL erreichbar (GitHub Pages Workflow eingerichtet).
- [x] Assets (102 Kartenbilder) laden in der Live-Version ohne 404-Fehler (relatives Asset-Routing `./` in Vite).
- [x] Spiel ist auf Desktop- und Mobil-Browsern ohne Installationshürde startbar.

## Ergebnis
Vollständiger GitHub Actions CI/CD Workflow (`.github/workflows/deploy.yml`) erstellt, der bei Pushes auf den Branch `main` automatisch Vitest-Tests ausführt, das Bundle baut und auf GitHub Pages unter `https://huzlmyg.github.io/Raid-Realms/` ausliefert. Relative Pfade in `vite.config.ts` sichern fehlerfreie Asset-Pfade ab.

## Notizen
Abgeschlossen am 2026-09-15. Workflow nutzt `actions/deploy-pages@v4` und `upload-pages-artifact@v3`.
