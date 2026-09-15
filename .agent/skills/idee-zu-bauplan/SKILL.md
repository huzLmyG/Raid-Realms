---
name: idee-zu-bauplan
description: Entwickelt aus einer Projektidee ein belastbares Konzept und einen abarbeitbaren Bauplan — fünf Phasen, nämlich kritische Lückenanalyse (mit Web-Recherche zu Recht, Förderung, Konkurrenz), Sparring-Fragen an den Nutzer, KONZEPT.md als Single Source of Truth, bauplan/-Ordner mit erst einer Übersicht/Gliederung und dann einer Datei pro Arbeitspaket, dann tranchenweises Abarbeiten mit Retros. Verwenden, wenn eine neue Projekt-/Produktidee geplant oder bewertet werden soll (egal ob Web-App, native App, Spiel, Tool, Content-Produkt, Hardware oder Kampagne), ein Konzept-Dokument vorliegt („Wie findest du die Idee?“), oder eine Roadmap in kleine, nacheinander abarbeitbare Schritte zerlegt werden soll.
---

# Von der Idee zum Bauplan

Fünf Phasen, drei Artefakte: (1) eine ehrliche Lückenanalyse im Chat, (2) `KONZEPT.md` als Single Source of Truth, (3) ein `bauplan/`-Ordner mit einer Übersicht plus einer Datei pro Arbeitspaket. Alles wird committet — das Repo ist das Gedächtnis des Projekts.

**Domänenneutral:** Dieser Skill ist nicht an eine Art von Projekt gebunden. Web-App, native App, Spiel, CLI-Tool, Content-Produkt, Hardware, Community-Initiative — die Phasen gelten überall. Welche der Lücken-Kategorien und Denkmuster relevant sind, ergibt sich aus dem konkreten Projekt; irrelevante einfach weglassen (ein Solo-Roguelike braucht keine DSGVO-Analyse, eine Bürger-App schon).

**Skalierung zuerst prüfen:** Bei kleinen Projekten (< 2 Wochen Umfang) die Phasen zusammenziehen — Lückenanalyse + Sparring + Konzept in ein einziges `PLAN.md`, Arbeitspakete als Abschnitte statt als Einzeldateien. Der volle Apparat lohnt sich ab Projekten mit mehreren Monaten Laufzeit oder mehreren Ausbaustufen.

## Phase 1 — Idee kritisch prüfen (Lückenanalyse)

Das Konzept (oder die mündliche Idee) gegen diese Standard-Lücken prüfen — fast jedes Erstkonzept hat mindestens drei davon:

1. **Distribution & Wachstum** (häufigste Lücke): Wie erfahren Nutzer davon? Welcher Kanal trägt (SEO, Newsletter, Teilen, Stores, Kooperationen, Community)?
2. **Recht & Datenschutz:** Impressum, DSGVO (besondere Datenkategorien wie Gesundheit/Politik/Religion? → local-first erwägen), KI-Kennzeichnungspflicht (EU AI Act), Barrierefreiheit, Urheberrecht bei fremden Inhalten, Rechtsform falls Förderung angestrebt.
3. **Laufender Betrieb:** Was muss dauerhaft gepflegt werden? Was passiert mit veralteten Inhalten? Bus-Faktor bei Solo-Projekten?
4. **Erfolgsmessung:** Eine Nordstern-Metrik + 3–4 KPIs, datenschutzfreundlich messbar — fehlt fast immer.
5. **Konkurrenz & Vorbilder:** Konkrete Landkarte (auch international) — welche Lücke füllt das Projekt wirklich?
6. **Finanzierung/Nachhaltigkeit:** In drei Säulen denken (Förderung · Community/Spenden · B2B) statt reflexhaft Freemium.
7. **Missbrauch & Kosten:** Wo können Trolle, Bots oder virale Lastspitzen Schaden oder API-Kosten erzeugen? (Rate-Limits, Caches, Kostendeckel einplanen.)
8. **Anti-Features:** Was wird bewusst NICHT gebaut — und warum? (Schützt vor Featureitis und vor Vertrauensverlust.)

**Recherche-Pflicht — nicht aus dem Gedächtnis raten.** Für die Kategorien Recht (2), Konkurrenz (5) und Finanzierung (6) liefert das Gedächtnis veraltete oder vage Aussagen. Bevor diese Punkte bewertet werden, web-recherchieren:
- **Recht:** aktuelle Rechtslage und Fristen, die konkret auf dieses Projekt zutreffen (z. B. Geltungsbeginn relevanter Gesetze, einschlägige Pflichten). Datum/Frist konkret nennen, nicht „demnächst“.
- **Konkurrenz:** real existierende Wettbewerber/Vorbilder namentlich, auch international — was decken sie ab, wo ist die echte Lücke?
- **Finanzierung:** konkrete, derzeit offene Förderprogramme, Wettbewerbe oder Plattformen, die zu Projektart und Ziel passen (mit Name, nicht nur Kategorie).

Recherchierte Fakten gehören in die Analyse und später ins KONZEPT.md — die domänenneutralen *Denkmuster* dahinter (siehe unten) liefert der Skill, die *aktuellen Fakten* liefert die Recherche.

**Denkmuster nachschlagen:** Für ausformulierte, wiederverwendbare Erklär-Muster zu Monetarisierung (Drei-Säulen-Modell), Plattformwahl (Web vs. PWA vs. nativ) und Distributionskanälen → [references/denkmuster.md](references/denkmuster.md) lesen. Diese sind domänenneutral und mit den frisch recherchierten Fakten zu füllen.

Ergebnis im Chat präsentieren: stärkste Punkte der Idee, ehrliche Risiken, konkret fehlende Features, Monetarisierungs-/Nachhaltigkeitsoptionen. Erst bewerten, dann bauen.

## Phase 2 — Sparring (Entscheidungen extrahieren)

Mit `ask_user_input_v0` in 1–2 Runden (max. 4 Fragen pro Runde) die Entscheidungen einsammeln, die das Konzept formen. Standardset, bei Bedarf anpassen:

| Frage | Warum sie zählt |
|---|---|
| Primäres Ziel (Gemeinwohl / Kommerz / Lernen / Hybrid) | bestimmt Finanzierungsstrategie und Lizenzfrage |
| Zeit & Team | bestimmt Roadmap-Schnitt und Bus-Faktor-Maßnahmen |
| Budget (laufend) | bestimmt Architektur (Free-Tier vs. bezahlt) |
| Primäre Zielgruppe v1 | erzwingt einen Keil — „alle“ ist keine Zielgruppe |
| Plattform (Web/PWA/nativ) | mit Konsequenzen in den Optionsbeschreibungen erklären |
| Qualitätssicherung/Review der Inhalte | wichtigster Vertrauensfaktor bei Content-Produkten |
| Name | „später entscheiden“ ist eine gültige Antwort — Kriterienliste statt Zwangsentscheidung |
| Erfahrung & Arbeitsmodus des Nutzers | bestimmt Erklärtiefe von Code, Doku und Bauplan |

Regeln: Jede Option trägt ihre Konsequenz in der Beschreibung („wenn du X wählst, heißt das Y“). Wo es eine klare Empfehlung gibt, als „(Recommended)“ markieren. Antwortet der Nutzer „alles wichtig“: nicht nachbohren, sondern im Konzept eine begründete Keil-Empfehlung geben und die Ausbaureihenfolge zeigen.

## Phase 3 — KONZEPT.md schreiben

Eine Datei, Single Source of Truth, committet. Struktur:

1. **§0 Entscheidungstabelle** aus dem Sparring: Frage · Entscheidung · Konsequenz fürs Konzept (das wichtigste Kapitel — macht spätere „Warum nochmal…?“-Fragen beantwortbar)
2. Kernidee & Grundprinzipien
3. Zielgruppen + Start-Keil mit Begründung und Ausbaureihenfolge
4. Kernprodukt im Detail
5. Feature-Katalog nach Phasen **inkl. Anti-Feature-Liste**
6. Ergebnisse der Lückenanalyse (Distribution, Recht, Betrieb, Messung, Konkurrenz) — **mit den recherchierten Fakten und Quellen aus Phase 1**
7. Finanzierung (drei Säulen, zeitlich gestaffelt)
8. Architektur — kleinstmöglich fürs Budget; bei „Free Tier“ jede Komponente gegen den kostenlosen Plan rechnen
9. Datenmodell für den Start
10. Roadmap-Phasen mit **„Fertig wenn“-Kriterien statt Datumsangaben**
11. Risiken mit Gegenmaßnahmen
12. Offene Punkte als Checkliste

## Phase 4 — bauplan/ anlegen

**Erst die Gliederung, dann die Dateien — nie direkt einzelne Pakete.** Reihenfolge:

1. **Roadmap-Phasen aus KONZEPT.md (§10) ableiten** → das sind die Teile (A Fundament · B Proof · C MVP · D…) plus als letzter Teil ein **Parallelstrang Organisation** (Förderung, Name, Rechtsform, Kontakte) mit eigener „Wann“-Spalte.
2. **Übersicht/Gliederung schreiben** (`bauplan/uebersicht.md`): alle Teile, je Teil die geplanten Arbeitspakete als Liste, Status-Spalte, „Du bist hier“-Marker, Stop-/Pivot-Kriterien. Das ist das Inhaltsverzeichnis des Bauplans — es entsteht **vor** den einzelnen Paket-Dateien (gleiches Prinzip wie Gliederung-vor-Kapiteln bei einer Hausarbeit oder Struktur-vor-MD-Dateien bei einer Analyse).
3. **Übersicht kurz gegenchecken** (mit dem Nutzer oder gegen KONZEPT.md): Sind alle Roadmap-Phasen abgedeckt? Stimmt die Reihenfolge? Erst dann weiter.
4. **Dann pro Arbeitspaket eine Datei** aus der Gliederung erzeugen.

Vorlagen liegen in [vorlagen/uebersicht-template.md](vorlagen/uebersicht-template.md) und [vorlagen/paket-template.md](vorlagen/paket-template.md).

Konstruktionsregeln:

- **Proof vor Infrastruktur:** Teil B testet die Kernhypothese mit minimalem Bau (ein Exemplar des Kernprodukts + echte Testnutzer + Go/No-Go-Paket als Meilenstein). Keine Datenbank, kein Admin, keine Pipeline vor dem Go.
- **Jedes Paket = eine Tranche** (in einer Sitzung schaffbar) mit: Kopf (Teil, Voraussetzungen, Rollen 🤖 Claude / 👤 Nutzer), Ziel in einem Satz, nummerierte Arbeitsschritte, „Fertig wenn“-Checkliste, Ergebnis, leerer Notizen-Abschnitt.
- **Rollen ehrlich trennen:** Entscheidungen, Accounts, Testleser, echte Adressen = 👤; Bauen, Recherche, Vorlagen = 🤖.
- **Progressive Verfeinerung:** Frühe Teile präzise ausformulieren, späte vollständig aber gröber — und in der Datei kennzeichnen („wird beim Erreichen geschärft“). Anbieter-/Preisentscheidungen ferner Pakete explizit auf „beim Abarbeiten aktuell prüfen“ setzen.
- **Ein Commit pro Teil** beim Anlegen; README des Projekts verlinkt den Bauplan und den „Du bist hier“-Stand.

## Phase 5 — Abarbeiten & aktuell halten

- **1 Paket = 1 Sitzung.** Arbeitsschritte der Reihe nach, am Ende „Fertig wenn“ abhaken, Notizen füllen (Entscheidungen, Abweichungen, Datum), Status in der Übersicht pflegen, Marker weiterschieben — Statuspflege gehört zum Paketabschluss, nicht „später“.
- **Ein Commit pro abgeschlossenem Paket.**
- **Meilenstein-Retro nach jedem Teil:** Was haben wir gelernt? Welche späteren Pakete ändern sich dadurch? Übersicht und betroffene Paket-Dateien sofort anpassen — der Bauplan ist ein lebendes Dokument, kein Vertrag.
- **Smoke-Check an Meilensteinen:** Alle Kernpfade des Produkts einmal durchklicken, bevor ein Teil als abgeschlossen gilt — schützt davor, dass neue Pakete alte kaputtmachen.
- **Stop-/Pivot-Kriterien respektieren** (stehen in der Übersicht): zweimal No-Go am Proof-Meilenstein → Grundsatzgespräch übers Format; längere Zeit kein abgeschlossenes Paket → bewusste, dokumentierte Pause oder Pivot statt stillem Einschlafen; ein Paket dauert ein Mehrfaches der Erwartung → Retro vorziehen.
- **Vor jedem öffentlichen Launch:** gebündelter Sicherheits- und Rechts-Durchgang (Dependency-Audit, Secrets-Check, Zugriffsschutz von außen getestet, Rate-Limits; Impressum/Datenschutz aktuell, Kennzeichnungspflichten erfüllt).
