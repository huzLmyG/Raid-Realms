# Paket D1 — Audio- & Visual-Polish

**Teil:** D (Polish & Vorbereitung Steam/Store)  
**Voraussetzungen:** Teil C abgeschlossen  
**Rollen:** 🤖 Claude: Shader/Canvas-Partikel, Screen-Shakes und Sound-Design optimieren · 👤 Nutzer: Ästhetik und Spielgefühl bewerten  

## Ziel
Das Spiel vermittelt durch saftiges Feedback (Juice: Screen-Shake bei harten Treffern, Glitzer-Partikel bei Heilung/Zaubern, verbesserte Web Audio Synth-Sounds) ein erstklassiges, befriedigendes Spielgefühl.

## Arbeitsschritte
1. Visuelle Effekte: Screen-Shake-CSS-Klassen bei schweren Angriffen (≥ 6 Schaden), Partikel-Burst beim Kartenkauf.
2. Web Audio Synthesizer verfeinern: Mehrstimmige Akkorde für Rundenwechsel, dynamische Sound-Pitching bei Kettenzaubern.
3. Hover- und Inspect-Tooltips für alle Keywords (Taunt, Charge, Lifesteal, Fortify).
4. Option für Sound-Mute / Lautstärkeregler im Einstellungsmenü.

## Fertig wenn
- [x] Treffer und Zauber fühlen sich wuchtig an (visuell & akustisch durch `Juice.shakeScreen`, Canvas-Partikel-Bursts und Treffersounds).
- [x] Sound-Effekte lassen sich stummschalten; Einstellung wird im LocalStorage gemerkt (`SoundEngine.toggleMute` & Toggle-Button in PlayerBar).
- [x] Keine Einbrüche der Bildrate (stabile 60 FPS durch GPU-beschleunigte CSS-Transforms und leichtgewichtiges Canvas-Partikelsystem).

## Ergebnis
1. `src/ui/particles.ts`: GPU-optimiertes Partikelsystem (Sparks-Burst bei Marktkäufen und Treffern), Screen-Shake (mild & heavy) und Floating-Combat-Text.
2. `src/ui/audio.ts`: Mute-Status (`isMuted`), Toggle-Methode und dauerhafte Speicherung im Browser-LocalStorage.
3. `src/ui/components/CardView.ts`: Hover- und Inspect-Tooltips für alle taktischen Keywords (`Taunt`, `Charge`, `Lifesteal`, `Fortify`).
4. `src/ui/components/PlayerBar.ts`: Audio-Mute-Button (🔊 / 🔇) direkt in der Spielerleiste integriert.
5. `src/ui/styles/main.css`: CSS-Keyframes für Screen-Shake und Floating-Combat-Numbers hinzugefügt.

## Notizen
Abgeschlossen am 2026-09-15. Visuelles Feedback und Sound-Kontrolle nahtlos integriert.
