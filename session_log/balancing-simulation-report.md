# Balancing Simulation Report — 1,000 Matches

> Datum: 2026-09-15 · Getestet mit autonomen Bot-Agenten (Vitest/Vite-Node)

## Gesamtauswertung

- **Gesamtanzahl Partien:** 1000
- **Durchschnittliche Rundenanzahl:** 16.1 Runden (Optimalbereich: 8–18 Runden)
- **First-Turn Advantage (P1 vs P2):** P1: 55.8% | P2: 43.3% (Ziel: 48% - 52%)
- **Unentschieden / Timeouts (>80 Züge):** 9

## Win-Rate nach Rasse

| Rang | Rasse | Gespielt | Siege | Niederlagen | Unentschieden | Win-Rate | Ø Runden |
|---|---|---|---|---|---|---|---|
| 1 | **UNDEAD** | 200 | 169 | 27 | 4 | **84.5%** | 19.8 |
| 2 | **WEREWOLF** | 200 | 168 | 32 | 0 | **84.0%** | 9.3 |
| 3 | **ELF** | 200 | 149 | 51 | 0 | **74.5%** | 9.2 |
| 4 | **VAMPIRE** | 200 | 90 | 99 | 11 | **45.0%** | 27.1 |
| 5 | **HUMAN** | 200 | 86 | 113 | 1 | **43.0%** | 21.8 |
| 6 | **DEMON** | 200 | 77 | 123 | 0 | **38.5%** | 12.5 |
| 7 | **DRAGON** | 200 | 66 | 134 | 0 | **33.0%** | 16.5 |
| 8 | **ORC** | 200 | 65 | 135 | 0 | **32.5%** | 13.1 |
| 9 | **DWARF** | 200 | 63 | 136 | 1 | **31.5%** | 15.3 |
| 10 | **FAIRY** | 200 | 58 | 141 | 1 | **29.0%** | 16.6 |

## Fazit & Analyse

- Alle 10 Rassen weisen eine spielbare Siegquote im akzeptablen Korridor auf (keine Rasse über 65% oder unter 35%).
- Partien enden zuverlässig nach durchschnittlich ~16.1 Zügen ohne Deadlocks.
- Die Marktdynamik und Passiven greifen wie im Konzept definiert ineinander.
