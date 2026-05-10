# Video Motion (Editorial Video Engine)

A high-end, programmatic video generation engine built with Next.js, GSAP, and Playwright. This system allows for "World-Class" strategy documentary production by syncing precise SVG-based animations with voice-over narration.

## 🚀 The Core Philosophy

The engine is designed to move beyond "animated slides" into cinematic storytelling. Every frame is a custom-coded React component, ensuring infinite flexibility and frame-perfect precision.

### 🎥 Animation Principles (The Playbook)

1.  **The Living Frame:** No scene should ever be static. 
    *   **Lens Breath:** Subtle, continuous scaling (1.0 to 1.05) on the main container to simulate a camera "pushing in."
    *   **Micro-Drift:** Background elements (grids, dots) should have slow, infinite linear motion.
2.  **Visual Hierarchy (120/32 Rule):** 
    *   **The Hero:** One core idea or number at **120px+**. 
    *   **The Support:** Explanatory text should never exceed **32px**. 
    *   **White Space:** Let the big ideas breathe. Avoid clutter.
3.  **Retention Pacing:** 
    *   **Snap Reveal:** Start visuals within **0.5s** of a scene beginning.
    *   **Fast Hook:** The first 10 seconds must be high-energy with bold typography and immediate context.
4.  **Aesthetic:** "Silicon Editorial" – High contrast, usually white/light-grey backgrounds with subtle patterns and sharp slate-colored text.

## 🛠 Tech Stack

*   **Frontend:** Next.js (TypeScript) + Vanilla CSS
*   **Animation:** GSAP (GreenSock Animation Platform)
*   **Audio Transcription:** OpenAI Whisper (Word-level timestamps)
*   **Capture & Render:** Playwright (Headless Browser) + FFmpeg
*   **Audio Processing:** Sidechain Compression (Automatic Music Ducking)

## 🔄 The Workflow

1.  **Scripting:** Write a story focused on "Beats" (Visual Metaphors).
2.  **Voice-over:** Record narration and save to `Downloads/`.
3.  **Transcription:** 
    ```bash
    whisper audio.m4a --model base --output_format json
    ```
4.  **Development:**
    *   Create scenes in `components/scenes/[project]/`.
    *   Map Whisper timestamps to GSAP timelines.
    *   Preview live at `http://localhost:3010/videos/[project]`.
5.  **Render:** 
    ```bash
    node scripts/capture-[project].js
    ```

## 📦 Project Structure

```
video-motion/
├── app/videos/          # Video-specific entry points (Next.js pages)
├── components/scenes/   # Individual scene components (GSAP logic)
├── public/              # Portraits and assets
├── scripts/             # Playwright/FFmpeg capture scripts
└── output/              # Final rendered MP4 files
```

## 🎬 How to Generate a New Video

1.  Scaffold a new directory in `components/scenes/`.
2.  Inherit the `.scene` CSS class for the 16:9 stage (1280x720).
3.  Use the `VideoEngine` component to manage scene transitions and durations.
4.  Run the capture script to merge your video frames with voice-over and background music.

---
Built by Asif Kabeer. Strategy Documentary Series.
