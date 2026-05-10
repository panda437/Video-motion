# ASML Video — Quality Planning Doc

## What's Wrong With Current State

The video reads like animated slides, not a video. Problems:

1. **No continuous motion** — elements appear once then freeze. A great video has things always subtly moving.
2. **Layouts are grid-based text dumps** — 3-column cards feel like a budget infographic.
3. **Scene 9 (The Lesson)** — 7 text blocks stacked. The most important moment of the video is the weakest.
4. **No visual metaphors** — "ASML is a monopoly" should be shown, not listed.
5. **Machine diagram is static** — the coolest part of the story (light turns plasma) has no motion.
6. **Wall of equal-weight content** — too many things compete for attention per slide.

## What Makes a Great Explainer Video

- **One idea per frame** — reveal, let it land, move on.
- **Big, single-stat moments** — "100%" on its own. "$200M machine." Let the number breathe.
- **Things move in the scene, not just appear** — particles travel, counters tick, lines draw.
- **Typography does visual work** — size contrast (120px vs 30px on same slide) is cinematic.
- **Colour is purposeful** — one accent colour per scene, not five.

---

## Scene-by-Scene Redesign Plan

### Scene 1 — Title  ✅ KEEP (good)
- Keep the counter animation
- Add: circuit traces that **draw themselves** across the dark background (SVG path `stroke-dashoffset` animation)
- Add: very subtle pulsing glow on the "ASML" wordmark (opacity 0.8↔1.0 loop)

### Scene 2 — The Machine  🔁 REWORK
Current: 4 stat cards + static SVG diagram  
Problem: the diagram is the best part but it's static

**New design:**
- Left: just 2 BIG stats (price + weight) — massive numbers, minimal label
- Right: animated EUV machine path — draw the laser beam line, have a glowing **particle** travel from laser → tin droplet → plasma burst → EUV ray → mirror → wafer, looping slowly
- Particle: small bright dot on a GSAP `motionPath` or manually keyframed along the path

### Scene 3 — The Physics  ✅ KEEP (good)
- The sine wave comparison is genuinely good — keep
- Add: after EUV wave appears, animate a gentle **shimmer/scroll** on the wave (translate the stroke-dashoffset)
- Maybe: a dramatic "zoom in" — scale the EUV wavelength section up as the 40× stat appears

### Scene 4 — How EUV Works  🔁 REWORK
Current: 2×3 step grid + static SVG  
Problem: steps appearing is good but the right-side SVG is lifeless

**New design:**
- Keep the step-by-step left panel
- Right panel: **Animate the SVG** — as each step reveals:
  - Step 1: tin droplet falls (translate Y animation)
  - Step 2: laser beam draws in from left (stroke-dashoffset)
  - Step 3: plasma circle pulses/flashes (scale + opacity)
  - Step 4: EUV ray draws down (stroke-dashoffset)
  - Step 5: mirrors flash
  - Step 6: wafer concentric rings pulse outward

### Scene 5 — Origin (Timeline)  🔁 REWORK
Current: compact row cards appearing staggered  
Problem: looks like a list

**New design:**
- A **vertical timeline line** that draws itself downward (scaleY animation from top)
- Each event: the dot pulses in first, then the year badge, then the text card slides in
- 1992 near-bankruptcy: make the dot RED and pulse aggressively (scale 1→1.3→1 loop) while its card is showing
- Spacing: each event takes up its full vertical moment

### Scene 6 — Two Bets  ✅ KEEP (decent)
- The 3-column layout is clean
- Add: the ✗ on Industry Bet should crack/smash in, not just pop
- Add: a green CHECK line that draws itself across from left on Bet #1

### Scene 7 — Lock-in  ✅ KEEP (decent)
- Clean grid layout, 23% stat reads well
- Minor: add a subtle animated arc on the "23% of ASML sold" card (circle SVG that draws itself)

### Scene 8 — Geopolitics  🔁 REWORK  
Current: text badges for "PARTNER" countries + ban cards  
Problem: feels like a table, no visual weight on the China block

**New design:**
- Replace the text badge country list with a **simplified SVG world outline** — just continents as filled shapes
- Overlay: blue dots pulsing on PARTNER countries, large RED pulse on China's location
- Ban cards: appear one by one with a "stamped" BLOCKED animation (scale 1.5→1, opacity flash)
- Bottom: China response and open question — two cards, clean

### Scene 9 — The Lesson  🔧 COMPLETE REWRITE
Current: 7 text blocks centered. User says "terrible."

**New design — cinematic single-statement reveal:**

Each major statement appears alone, fills most of the screen, then fades as the next arrives.

```
[Black screen, grid background]

BEAT 1 (0-4s):
  "30 YEARS · $9 BILLION · 1 COMPANY"
  — small, centered, fades up

BEAT 2 (4-10s):
  "The lesson isn't just that
   long bets sometimes pay off."
  — BIG, 72px Oswald, slides in from slight blur

BEAT 3 (10-18s):
  Previous text fades to 20% opacity / stays as ghost
  New text appears on top in #00C8F5:
  "It's that the conditions under which
   a long bet can even be made
   are increasingly rare."
  — 48px, dominates the frame

BEAT 4 (18-26s):
  Both fade. Three short lines appear staggered:
  • "Philips kept funding through near-bankruptcy."
  • "Customers became investors."  
  • "The Dutch government waited decades."
  — 32px each, left-aligned, with a blue left-border bar

BEAT 5 (26-35s):
  Gold separator bar draws across
  Final statement — the whole frame:
  "The most important tech company
   in the world couldn't be built today."
  — 54px, white + gold accent word "couldn't"

BEAT 6 (35-38s):
  Episode credit fades up
```

This uses the FULL duration rather than showing everything at once.

---

## Technical Animation Improvements

### Continuous Loop Animations (add to existing scenes)
- Circuit dot grid in Scene 1: add a slow pan/drift effect
- EUV machine: particle loop on the light path
- Plasma burst: scale 0.95↔1.05 pulse loop

### GSAP Techniques to Use More
- `gsap.to(el, { repeat: -1, yoyo: true })` for pulsing effects
- `motionPath` plugin for particle travel
- `DrawSVG`-like approach: `strokeDasharray/strokeDashoffset` for drawing lines
- `blur` filter animations for depth of field feel
- Stagger with `from: "center"` for radial reveals

### Font/Visual Hierarchy
- Scenes should have ONE dominant element (120px+) and supporting text (30-32px)
- Currently too many things at 34-44px fighting for attention

---

## Audio Sync Plan (once Whisper completes)

1. Get word-level timestamps from Whisper JSON
2. Identify the 9 story "chapters" in the transcript
3. Map chapter boundaries → scene durations
4. Update `SCENES` array in `page.tsx`
5. Update GSAP trigger times in each scene to match audio beats

### Key Sync Points to Find in Transcript
- When narrator first says "ASML" → Scene 1
- When they describe the machine specs → Scene 2
- "wavelength" / "193 nanometer" mention → Scene 3
- "tin droplet" / "laser" → Scene 4
- "1984" / "leaky shed" → Scene 5
- "157 nanometer" / "water immersion" → Scene 6
- "23 percent" / "Intel" / "TSMC" → Scene 7
- "China" / "export" / "blocked" → Scene 8
- "30 years" / "lesson" → Scene 9

---

## Priority Order

1. **Transcribe audio + identify interruptions** — remove, export clean audio
2. **Scene 9 — complete rewrite** (user explicitly called it terrible)
3. **Scene 4 — animate the EUV machine SVG** (particle of light was requested)
4. **Scene 2 — animate the machine path**
5. **Scene 5 — proper animated timeline**
6. **Scene 8 — SVG world map with pulses**
7. **Scene 1 — animated circuit traces**
8. **Update all scene durations to match audio**
9. **Capture final video**

---

## What Success Looks Like

When the video is good:
- Each scene has exactly ONE thing that makes you go "oh, that's clever"
- The EUV machine scene has a photon travelling the path
- The physics scene makes you feel the difference between 193nm and 13.5nm
- The finale makes you sit with the idea, not read a list
- Audio narration and visual reveals are in sync

