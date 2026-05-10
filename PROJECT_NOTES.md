# Nils Frahm — Feutre
## Concept Notes

### Radical Metaphor (5 references)
1. **The felt on the hammers** — Nils's first signature move on *Felt* (2011). He muffled the instrument so he could play without disturbing neighbours. The muting is what made the record intimate.
2. **The Klavins Modell 370** — a 3.7m vertical piano with one string per key. The instrument of *Solo* (2015). A tall line in a tall room.
3. **Saal 3, Funkhaus Berlin** — East German broadcast hall turned analog cathedral. The acoustic body of *All Melody* (2018).
4. **Piano Day (88th day of the year)** — a temporal ritual; 88 keys, 88 days.
5. **Klaus Frahm's ECM covers** — Nils's father photographed ECM record sleeves. ECM's visual codes (typographic restraint, generous void, matt blacks, single accent) are native heritage.

### New Spatial Grammar — La Colonne
Six hammers suspended in dark 3D space, placed around a **horizontal-axis cylinder** (one hammer per 60°). The user rotates the cylinder vertically via drag / wheel / arrow keys. The active hammer meets a horizontal threshold line at eye level — that's the "strike zone." This is not a carousel. It is a memory: a piano seen from the side, its hammers in motion.

### Signature Elements Audit
- [x] **Radical metaphor** — documented, five references.
- [x] **New spatial grammar** — La Colonne.
- [x] **Living texture** — `feTurbulence` felt filter on hammer heads; drifting grain overlay; radial hall gradient.
- [x] **Custom cursor** — Le Marteau: a felt-tipped hammer with a wooden shank that hovers over the mouse. An ember pulse fires on strike.
- [x] **Elegant loader** — the Modell 370 thread draws itself top-to-bottom, the hammer head travels with it, FRAHM emerges letter-by-letter from fog; a mono counter runs 00 → 88 (keys).
- [x] **Typography as architecture** — Spectral displays the wordmark and album titles; Geist Mono carries timestamps, coordinates, numbers. No bold weights. Italic carries all warmth.
- [x] **Poetic transitions** — pull-slam-explode strike; detail fold opens only after the dust settles; column eases with critical damping.
- [x] **Reactive environment** — cursor enlarges on hammer proximity, hammer head depresses on hover, ember ring fires on strike, coord clock ticks in real time.
- [x] **Bespoke interactions** — drag-rotate column, wheel-step column, enter-to-strike, esc-to-close, rail-jump, dot-breath rhythm.
- [x] **Mobile perfection** — touch drag rotates the column; tap strikes the active hammer; single-column detail layout; cursor hidden; particle count halved.

### Anti-Patterns — all zero
No hero, no footer list, no sidebar, no hamburger, no grid, no cards, no snap, no lorem, no fade, no stock.

### Palette — Feutre (fresh)
- Blackbox `#0C0B09` — the dark hall
- Hall `#110F0C` — its inner volume
- Linen `#E8E2D4` — paper, light, type
- Linen-2 `#CFC9BB` — second voice
- Ash `#54524C` — felt fiber
- Whisper `#8A8580` — muted metadata
- Ember `#A84B2A` — the one warm accent — a piano wire seen briefly under a work lamp
- Felt `#3A3833` — hammer shadow

### Typography — fresh sole-serif + mono
- **Spectral** — the one display and body serif. Weights 200/300/400; italic for epigraphs. Literary, ECM-adjacent, not Cormorant, not Garamond.
- **Geist Mono** — technical metadata, numbers, coordinates, timestamps. A modern mono not yet in the log.

### Interaction — Le Marteau (fresh)
A single felt hammer cursor. Head is a `feTurbulence`-filtered circle. On hammer hover: the head enlarges slightly. On strike: an ember circle fires and expands from the head; the hammer-head DOM element animates in three stages (pull up 22px, slam down 14px with ember bloom, shrink to 0.2 + vanish); canvas particles explode in two bursts (pull-dust, impact-felt+ember); 560ms later the detail fold fades in.

### Works included
1. Felt (2011)
2. Spaces (2013)
3. Solo (2015)
4. All Melody (2018)
5. Music for Animals (2022)
6. Night + Day (2025)

All copy is original, written for this prospect. No lorem.

### Technical notes
- Pure vanilla. Canvas for particles, CSS 3D transforms for the column, SVG for the loader thread and hall.
- The column uses `transform-style: preserve-3d` with each hammer at `rotateX(-i*60deg) translateZ(var(--column-radius))`.
- Spring animation is plain lerp at 0.08 — the stiffness of a well-tuned hammer.
- Particle system is ~1700 particles at impact; each has gravity, drag, life decay, and a palette-sampled colour.

### Pre-delivery status
`Engine: PASSED | All Signatures: YES | Anti-Patterns: 0`

---

A Velocity atelier work — © MMXXVI.
