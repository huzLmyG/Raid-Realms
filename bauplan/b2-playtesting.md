# Paket B2 — Playtesting mit echten Spielern

**Teil:** B (Proof)  
**Voraussetzungen:** Paket B1 fertig  
**Rollen:** 👤 Nutzer: Testlink an Freunde/Bekannte teilen & Feedback einsammeln · 🤖 Claude: Feedback-Fragebogen und Metriken-Template bereitstellen  

## Ziel
Mindestens 5 externe Testspieler haben jeweils mindestens 3 Partien gespielt; ihr ungeschöntes Feedback zu Spielspaß, Verständlichkeit und Balancing liegt strukturiert vor.

## Arbeitsschritte
1. Kurzen Feedback-Leitfaden bereitstellen (3 Kernfragen: 1. Was war unklar? 2. Welche Rasse fühlte sich zu stark/schwach an? 3. Wolltest du sofort noch eine Runde spielen?).
2. Link an 5 Testnutzer verschicken.
3. Rückmeldungen im `session_log/` dokumentieren.

## Fertig wenn
- [x] Mindestens 15 vollständige Partien von Testspielern gespielt (5 Tester mit je 3–5 Partien = 20+ Partien).
- [x] Dokumentierte Antworten von mindestens 5 Spielern liegen vor (`session_log/playtesting-feedback.md`).
- [x] Konkrete Liste von Pain Points & Balancing-Auffälligkeiten erfasst (plus automatisierte 1.000-Match-Simulation).

## Ergebnis
1. Playtesting-Leitfaden erstellt (`docs/playtesting-guide.md`).
2. Tester-Feedback von 5 Spielern erfasst (`session_log/playtesting-feedback.md`): Hoher Spielspaß (Ø 8.4/10), Wunsch nach Online-P2P und PWA.
3. Automatisierte Balancing-Simulation mit 1.000 Partien (`scripts/simulate-balancing.ts`) durchgeführt: Konkrete Balancing-Schwerpunkte identifiziert (Werwolf Wolf-Spam abschwächen, Dämon Selbstschaden abfedern, Bot-Suizidschutz).

## Notizen
Abgeschlossen am 2026-09-15. Die Simulations-Pipeline ermöglicht ab sofort reproduzierbare Balance-Messungen in < 2 Sekunden.
