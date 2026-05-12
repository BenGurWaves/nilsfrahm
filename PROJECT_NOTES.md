# Nils Frahm — Nuit Funkhaus
## Concept Notes (v3 — narrative arc with emotional hook)

v1 (Feutre / 3D drum + particles) was theatrical — a play-game. v2 (La Pédale / silent column) was austere — a library with no story. Both failed the human test: *would this make someone feel?* The rebuild is a single emotional journey: **one night with Nils Frahm, inside Saal 3 at Funkhaus Berlin, from dusk to dawn.**

### Radical Metaphor (5 references)
1. **Saal 3 at Funkhaus Berlin** — the East German broadcast hall Nils rebuilt for *All Melody*. The site IS the hall. Drawn in pure SVG line-work: four arched soviet-tall windows, a hanging pendant lamp, herringbone floor, the Klavins Modell 370 piano stage right, the mixing console stage left, an empty chair at centre stage, a single seated figure that appears and leaves with him.
2. **The cycle of one night** — eight acts: arrival (20:48) → felt (22:14) → spaces (00:31) → solo (02:07) → all melody (03:46) → music for animals (04:55) → day (06:12) → departure (07:00). The classical eight-position cycle of an ECM long-player.
3. **Time as the organising principle** — Nils's relationship with time is his subject. Long-form pieces, single-take improvisations, three-hour records that wait. The site advances by time, not by section.
4. **Light from outside** — Funkhaus's tall windows have a different mood at every hour. The site's emotional register is carried by the colour of the windows: amber dusk → indigo midnight → cool dawn → gold morning. The hall is read by its own light.
5. **The waveform as memory** — across the back wall, a single hairline waveform morphs per act: flat (silence on arrival), gentle sine (felt's intimacy), busy noise (spaces' crowd), one tall vertical mark (solo's single note), broad pad (all melody's catharsis), slow drift (animals' patience), sustained tone (day's awakening), flat again (departure). The line is the night's heartbeat.

### Emotional arc — the *hook*
| Act | Emotion | Visual cue |
|---|---|---|
| 1. arrival | solitude, anticipation | empty hall, lamp lit, no figure, flat waveform |
| 2. felt | tenderness | figure appears at piano, gentle sine, warm amber windows |
| 3. spaces | crowd, exhilaration | dense waveform, deep indigo windows |
| 4. solo | grief / awe | one tall mark, coldest blue, lamp at peak |
| 5. all melody | catharsis | broad pad waveform, depth deep blue |
| 6. music for animals | stillness | slow drift, patient cool blue |
| 7. day | hope, warmth returning | sustained tone, dawn amber returns to windows |
| 8. departure | tenderness, loss | figure gone, chair empty, flat line, gold dawn |

### New Spatial Grammar — *Une Nuit (the Night)*
A single full-viewport SVG architectural elevation of Saal 3, drawn in hairline ink. The viewer never leaves this drawing. Time advances by wheel / arrow keys / drag / rail-click; everything in the drawing transforms in response (window light, lamp halo, waveform, figure, prose). No scroll, no nav, no rooms, no carousel, no card grid. The drawing IS the navigation.

### Signature Elements Audit
- [x] **Radical metaphor** — Saal 3 as the entire site. Five references documented.
- [x] **New spatial grammar** — Une Nuit: a single drawn hall that transforms with time.
- [x] **Living texture** — sky gradient transitions over 3s; lamp halo radial; floor shading rect; subtle grain overlay; pendant lamp swings ±0.6° on a 10s cycle.
- [x] **Custom cursor** — *La Veilleuse*: a tiny candle flame (2 SVG/CSS-rendered shapes) with a 64 px warm halo. Flickers on a 1.6s alternate cycle. The visitor's awareness in the room.
- [x] **Elegant loader** — the doors of Saal 3 part: a single vertical line splits into two outward-moving lines, opening to reveal "20:48" in 9 vw upright Spectral, then the place name, then the first prose line.
- [x] **Typography as architecture** — Spectral italic (200/300) for prose and frame; Spectral upright 500 for the time stamp (the only non-italic, the editorial chyron). All-Spectral system, no companion family.
- [x] **Poetic transitions** — dispersion typography on prose changeover (per-letter translateX scaled by index from centre + blur-fade); SVG path tween on waveform; CSS transition on every light variable (3 s deep ease).
- [x] **Reactive environment** — mouse parallax shifts the hall ±14 px; cursor halo follows; lamp halo dims at dawn; figure appears/disappears with the night.
- [x] **Bespoke interactions** — wheel (throttled 600ms), arrow keys, click-and-drag (28 px threshold), rail-click. No drag-pan, no swipe-snap. Time is the only thing that moves.
- [x] **Mobile perfection** — touch drag (28 px threshold) advances time; cursor hidden; rail compressed; prose sized down; reduced-motion path replaces dispersion + lamp swing + flicker with static states.

### Anti-Patterns — all zero
No hero, no footer list, no sidebar, no hamburger, no grid, no cards, no scroll-snap, no lorem, no fade-and-slide, no stock asset.

### Palette — Nuit Funkhaus (fresh, warmer than v2)
- Night `#0A0E16` — the sky
- Hall `#14110D` / Hall-2 `#1B1813` — the room interior
- Bone `#EAE5DA` — type, brightest light
- Bone-2 `#A89E8E` — secondary
- Ink `#4F4A41` — architectural lines
- Ink-2 `#2E2A24` — secondary lines
- Whisper `#6B655A` — frame
- Bordeaux `#8C2E2C` — the waveform, the figure, the active rail mark
- Lamp glow `#F0C684` — warm amber, the only light source
- Dawn `#D6B78C` — end-of-night accent (used in act 8)

### Typography — Spectral (display + body, italic-led)
- **Spectral 500 upright** — TIME STAMPS only (the editorial anchor). `font-feature-settings: 'lnum' 1`.
- **Spectral 200 italic** — prose
- **Spectral 300 italic** — frame, secondary, citation, invitation, colophon
- No mono. No sans. The upright weight is reserved as a single editorial gesture; everything else speaks in italic.

### Interaction — *La Veilleuse* (the candle that walks the hall)
A tiny radial-gradient flame, 12 px tall, 3 px wide, with a 64 px warm halo. Flickers in a 1.6 s alternate-direction CSS animation (scaleY + translateY + rotate). The visitor's awareness in the room — never a tool, never a target, just a presence.

### Pre-delivery
`Engine: PASSED | All Signatures: YES | Anti-Patterns: 0`

---

A Velocity atelier work — © MMXXVI.
