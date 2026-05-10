# Vox Videos — Creative Playbook

This document defines the visual language and animation philosophy for high-end explainer videos. The goal is to move beyond "animated slides" into "cinematic storytelling."

## 1. The Living Frame (The "Always Moving" Rule)
No frame should ever be static. Even when the narrator is paused, the scene must feel alive.
- **Micro-Drift:** Every background element (grids, maps, icons) should have a slow, infinite drift (20-40px over 30 seconds).
- **The Lens Breath:** Use a subtle, continuous scale animation (1.0 to 1.05) on the main container to simulate a camera slowly "pushing in" on the idea.
- **Ambient Glow:** Background gradients should "shimmer" (opacity 0.4 ↔ 0.8) to give the screen a sense of depth and energy.

## 2. Visual Hierarchy (The 120/32 Rule)
To prevent "information overload," every scene must have a clear "Hero" and "Support."
- **The Hero:** One word or number, rendered at **120px+**. This is the anchor.
- **The Support:** Explanatory text should never exceed **32px**.
- **Negative Space:** If a scene feels "busy," remove one element. Let the big ideas breathe.

## 3. Motion Semantics
Motion should explain the story, not just decorate it.
- **Reveals:** Elements should "arrive" with intention. Use `power3.out` for a smooth, weighted landing.
- **Impacts:** When a company fails or a problem occurs (e.g., "Bankruptcy"), use a "Smash" or "Shake" effect (scale 1.5 → 1.0 with a quick blur).
- **The Path:** Use particles (photons, dots) to show flow—supply chains, light paths, or money moving.

## 4. Transitions
Fading to black is a last resort.
- **The "Wipe":** Use a solid bar of the next scene’s accent color to sweep across the screen.
- **The "Zoom-Through":** Scale a central element (like a circle) until it fills the entire screen, becoming the background for the next scene.
- **The "Match Cut":** A circle in Scene A becomes a gear in Scene B.

## 5. Narrative Pacing (The "Beats")
- **The Hook (0-15s):** Fast, aggressive motion. Big numbers. Set the stakes.
- **The Middle (Explainer):** Rhythmic, steady reveals. Sync animations to specific words in the transcript.
- **The Finale (The Lesson):** Slow the motion down. High contrast. Minimalist visuals. Let the "Deep Insight" land on a clean, dark frame.

## 6. Technical Excellence
- **Frame-Perfect Rendering:** Animations must be driven by frame-counts, not real-time clocks, to ensure 60fps export quality.
- **Brand Colors:** Use exactly one primary accent color per video (ASML = Cyan, Nintendo = Red, Toyota = Forest Green/White).
