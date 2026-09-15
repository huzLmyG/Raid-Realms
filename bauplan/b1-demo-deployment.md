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
- [ ] Spiel ist unter einer öffentlichen HTTPS-URL erreichbar.
- [ ] Assets (102 Kartenbilder) laden in der Live-Version ohne 404-Fehler.
- [ ] Spiel ist auf Desktop- und Mobil-Browsern ohne Installationshürde startbar.

## Ergebnis
[Wird beim Abarbeiten gefüllt: was konkret entstanden ist]

## Notizen
[Leer lassen. Beim Abarbeiten füllen: Entscheidungen, Abweichungen vom Plan, Datum.]
