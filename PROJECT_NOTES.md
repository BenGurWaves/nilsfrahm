# Nils Frahm — La Pédale
## Concept Notes (v2 — quiet luxury)

The first attempt (Feutre — 3D drum + particle strike) was rejected as "an everyday play game." Correct: too theatrical for a musician whose entire register is restraint. The rebuild moves to ECM-grade silence.

### Radical Metaphor (5 references)
1. **The sustain pedal** — Nils's most-used gesture is not striking, it is *holding*. The pedal lifts the dampers and the room becomes a body of resonance. The site is silent by default; what you hold is what speaks.
2. **ECM Records' visual codes** — Nils's father, Klaus Frahm, photographed ECM sleeves. The label's discipline (off-white type on black, generous void, italic restraint, single accent) is native heritage.
3. **Manfred Eicher's editorial principles** — "the most beautiful sound next to silence." A mission statement applied to typography.
4. **Pianissimo (pp)** — the dynamic marking for "very soft." The site is played pp throughout; the pedal momentarily lifts to mp, never beyond.
5. **Saal 3 at Funkhaus Berlin** — a chamber-music room with a 4-second reverb. The page is that hall: empty until you press a key, then the entire space sustains.

### New Spatial Grammar — La Pédale
A single hushed page on warm-black. Six works listed as a vertical column of italic Spectral, set on the editorial 38vw line. By default the column is *whispered* — every line at low opacity and 2px blur, the active line slightly brighter and crisper. There is no scroll, no nav, no rotation, no buttons. The user navigates by:

- **Arrow keys / wheel** to step through works (arrival/dispersion typography on transition)
- **Click any line** to make it active
- **Hold space, hold Enter, or press-and-hold the mouse** — the pedal. While held, the entire body of the page resonates: a pair of horizontal hairlines draws outward from the cursor's Y to both viewport edges (the sustain line); a soft volumetric halo blooms at the cursor; any work within ~340 px of the cursor lifts to full clarity (`heard` state). Release: the room returns to silence.

### The three requested animations, recast quiet:
- **Immersive reveal** = type does not appear; it *resonates*. Default state is whispered + blurred. Only what is held becomes legible. The loader is a single horizontal line (the cantus firmus) that draws across 760 px in 2.4 s; the wordmark *nils frahm* fades up from 10 px below with a 1.8 s blur-to-focus.
- **3D slider** = no rotating drum. The works column has **proximity-graded depth-of-field**. Active line crisp; neighbours at increasing blur (1.4 → 4.0 px) and decreasing opacity (0.34 → 0.06). Step changes are like a sheet of music turning, not a carousel rotating.
- **Exploding objects** = no particles, no detonation. **Dispersion typography**: the previous title's letters drift apart by their own kerning (translateX scaled by index distance from centre, ±4 px Y jitter) and fade with a 6 px blur over 1.6 s. The new title arrives staggered (38 ms per letter) from 12 px above with an 8 px → 0 blur. Sustain decay made visible.

### Signature Elements Audit
- [x] **Radical metaphor** — the sustain pedal as the entire site mechanic; five references documented.
- [x] **New spatial grammar** — La Pédale: a hushed page that resonates only while held.
- [x] **Living texture** — warm radial bloom over the room, faint screen-blend grain, no flat backgrounds.
- [x] **Custom cursor** — *La Touche*: a 22 px hairline baton with a soft halo. Lengthens and the halo brightens when the pedal is engaged.
- [x] **Elegant loader** — the cantus firmus line draws once, then *nils frahm* in italic Spectral 200 fades up from blur. No counter, no chrome, no spinner.
- [x] **Typography as architecture** — italic-only Spectral in three weights (200/300/400). Asymmetric editorial grid: 38vw / 1fr / 22vw with the column anchored on the golden offset. Caption set with a 4 rem hanging indent. No mono. No sans.
- [x] **Poetic transitions** — dispersion (kerning drift + blur fade) for outgoing titles; staggered blur-up arrival for incoming; sustain hairlines drawing outward at 1.4 s; haloes blooming on pedal engage.
- [x] **Reactive environment** — proximity-graded blur on the column; pedal-radius "heard" state; cursor halo expanding; resonance lines re-anchoring to cursor Y in real time; UTC clock italicised in the bottom-right corner.
- [x] **Bespoke interactions** — pedal as click-hold / space-hold / touch-hold; arrow / wheel step; click-to-activate. No drag, no swipe — silence is the default mode.
- [x] **Mobile perfection** — single-column stack; touch-and-hold (220 ms) engages the pedal; reduced resonance radius (240 px); cursor hidden; reduced-motion path replaces dispersion with simple opacity ease.

### Anti-Patterns — all zero
No hero, no footer list, no sidebar, no hamburger, no grid, no cards, no scroll-snap, no lorem, no fade-and-slide, no stock asset.

### Palette — Pianissimo (fresh)
- Paper `#0E0D0B` — the room
- Paper-2 `#15130F` — slightly lifted volume
- Bone `#EAE5DA` — type
- Bone-2 `#C9C4B8` — second voice
- Whisper `#6B665E` — frame, hairlines
- Whisper-2 `#3E3B36` — silent baseline
- Bordeaux `#6E2A2A` — the *one* accent (active mark dot, colophon separator)

### Typography — Spectral, italic only
- **Spectral Italic 200** — the wordmark and the active title
- **Spectral Italic 300** — body, epigraph, frame, caption, colophon
- **Spectral Italic 400** — never used; reserved as silence
- No mono. No sans. No alternates. The whole site speaks in one italic voice.

### Interaction — La Pédale (fresh)
A foot-pedal mechanic without a foot. While held: a pair of horizontal sustain hairlines extends outward from the cursor's Y to both viewport edges; a 680 px-wide volumetric halo blooms at the cursor; works within ~340 px lift to clarity. Release: the room returns to silence within 600 ms. Cursor is *La Touche* — a 22 → 36 px baton with a 44 px halo that fades from 0 to 0.18 when the pedal engages.

### Works (kept)
1. Felt (2011) · 2. Spaces (2013) · 3. Solo (2015) · 4. All Melody (2018) · 5. Music for Animals (2022) · 6. Night + Day (2025)

All copy original. No lorem.

### Pre-delivery
`Engine: PASSED | All Signatures: YES | Anti-Patterns: 0`

---

A Velocity atelier work — © MMXXVI.
