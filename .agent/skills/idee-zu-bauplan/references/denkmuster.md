# Denkmuster für die Lückenanalyse

Domänenneutrale Erklär-Muster zum Nachschlagen in Phase 1. **Wichtig:** Das hier sind *Denkraster*, keine fertigen Fakten. Die konkreten Namen, Fristen und Preise liefert jedes Mal die Web-Recherche aus Phase 1 — nicht aus dieser Datei abschreiben, sondern dieses Raster mit frisch recherchierten Fakten füllen. Irrelevante Muster für das jeweilige Projekt weglassen.

## 1. Monetarisierung in drei Säulen

Reflexhaftes „Freemium“ ist bei den meisten Projekten der schwächste Plan. Stattdessen in drei Säulen denken und zeitlich staffeln:

- **Säule A — Förderung/Startkapital (Anfang):** Programme, Wettbewerbe, Stipendien, Stiftungen, öffentliche Töpfe. Passend besonders für Gemeinwohl-, Bildungs- und Open-Source-Projekte. → In Phase 1 die *aktuell offenen* Programme recherchieren, die zu Projektart **und** Ziel passen. Viele verlangen Gemeinnützigkeit oder Open Source — das beeinflusst früh Rechtsform und Lizenz.
- **Säule B — Community (mittel):** Mitgliedschaften/Abos (z. B. Steady, Patreon), Spenden, „Unterstützer“-Tiers. Trägt, wenn ein wiederkehrender Kanal (Newsletter, Feed, Community) existiert. Eine öffentliche Finanz-Transparenzseite kann hier selbst ein Vertrauens-Feature sein.
- **Säule C — B2B (ab Traktion, das zahlungskräftige Segment):** Pro-Tier mit Alerts/Export/API, White-Label-Widgets, Lizenzen für Institutionen (Schulen, Verbände, Kommunen, Unternehmen). Oft existiert hier bereits ein teurer Markt mit etablierten Anbietern.

**„Robin-Hood-Modell“:** Profis/Institutionen zahlen (Säule C), Endnutzer nutzen kostenlos. Funktioniert, wenn dieselbe Datenbasis für beide Gruppen Wert hat.

Recherche-Aufgabe je Säule: Gibt es das konkret für *dieses* Projekt? Wie heißen die Programme/Plattformen/Wettbewerber wirklich, und sind sie aktuell offen?

## 2. Plattformwahl — Web vs. PWA vs. nativ

Oft ein Scheinkonflikt: man muss sich kaum entscheiden.

| | Web-App | PWA | Native App |
|---|---|---|---|
| Erreichbarkeit | per URL, von Suchmaschinen indexierbar | wie Web + auf Homescreen installierbar | nur über App Store |
| Updates | sofort | sofort | langsamer, Store-Review |
| Auffindbarkeit | Suchmaschine | Suchmaschine | Store-Suche |
| Push | eingeschränkt | Android voll, iOS eingeschränkt | voll |
| Offline | nein | ja | ja |
| Hürden | — | — | Store-Gebühren, Review-Prozesse (bei sensiblen Themen pingelig) |

**Faustregel:** Muss der Inhalt **gegoogelt und geteilt** werden → Web/PWA zuerst, eindeutig. Steht **zuverlässige Push-Benachrichtigung oder Offline-Nutzung** im Zentrum → nativ wird relevanter.

**Die Brücke:** Eine PWA ist eine Web-App, die sich installieren lässt, offline läuft und (eingeschränkt) Push kann. Mit einem Wrapper (z. B. Capacitor) wird aus derselben Codebasis später eine echte Store-App — man verliert also nichts, wenn man mit Web/PWA startet und nativ offen hält.

## 3. Distribution — der häufigste blinde Fleck

Fast jedes Erstkonzept beschreibt ein gutes Produkt, aber nicht, **wie Nutzer davon erfahren**. Kanäle, die je nach Projekt tragen:

- **SEO / organische Suche:** trägt, wenn Leute aktiv nach dem Problem suchen („X einfach erklärt“). Erfordert indexierbare Inhalte → Argument für Web.
- **Newsletter / wiederkehrendes Briefing:** stärkster Retention-Kanal für Content-Produkte — bringt Leute zurück, statt nur einmal.
- **Teilbare Einheiten:** Social Cards, kurze Clips, „1 Sache, 3 Fakten“ — für Weiterleitung in Messenger/Social.
- **Audio/Feed:** Podcast-/RSS-Feed als zweiter Zugang zum gleichen Inhalt.
- **Stores:** nur relevant, wenn nativ — dann aber eigener Sichtbarkeitskanal.
- **Kooperationen:** Multiplikatoren, die die Zielgruppe schon haben (Verbände, Creator, Institutionen).

Mindestens **einen** tragenden Kanal pro Projekt benennen und im KONZEPT.md festhalten — „bauen und sie kommen schon“ ist kein Plan.
