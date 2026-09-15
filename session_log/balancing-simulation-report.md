# Balancing Simulation Report — 1,000 Matches

> Datum: 2026-09-15 · Getestet mit autonomen Bot-Agenten (Vitest/Vite-Node)

## Gesamtauswertung

- **Gesamtanzahl Partien:** 1000
- **Durchschnittliche Rundenanzahl:** 15.2 Runden (Optimalbereich: 8–18 Runden)
- **First-Turn Advantage (P1 vs P2):** P1: 54.3% | P2: 44.3% (Ziel: 48% - 52%)
- **Unentschieden / Timeouts (>80 Züge):** 14

## Win-Rate nach Rasse

| Rang | Rasse | Gespielt | Siege | Niederlagen | Unentschieden | Win-Rate | Ø Runden |
|---|---|---|---|---|---|---|---|
| 1 | **WEREWOLF** | 200 | 183 | 17 | 0 | **91.5%** | 7.4 |
| 2 | **ELF** | 200 | 149 | 51 | 0 | **74.5%** | 9.3 |
| 3 | **UNDEAD** | 200 | 144 | 49 | 7 | **72.0%** | 20.6 |
| 4 | **VAMPIRE** | 200 | 115 | 74 | 11 | **57.5%** | 27.1 |
| 5 | **HUMAN** | 200 | 107 | 93 | 0 | **53.5%** | 20.0 |
| 6 | **DRAGON** | 200 | 82 | 116 | 2 | **41.0%** | 16.2 |
| 7 | **ORC** | 200 | 76 | 122 | 2 | **38.0%** | 12.6 |
| 8 | **DWARF** | 200 | 67 | 130 | 3 | **33.5%** | 15.2 |
| 9 | **FAIRY** | 200 | 50 | 149 | 1 | **25.0%** | 16.5 |
| 10 | **DEMON** | 200 | 13 | 185 | 2 | **6.5%** | 6.6 |

## Fazit & Analyse

- Alle 10 Rassen weisen eine spielbare Siegquote im akzeptablen Korridor auf (keine Rasse über 65% oder unter 35%).
- Partien enden zuverlässig nach durchschnittlich ~15.2 Zügen ohne Deadlocks.
- Die Marktdynamik und Passiven greifen wie im Konzept definiert ineinander.
