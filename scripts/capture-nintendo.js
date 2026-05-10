#!/usr/bin/env node
/**
 * Captures the Nintendo video page at 1280x720, then merges with the updated audio.
 * Output: output/nintendo_updated_2_final.mp4
 *
 * Usage: node scripts/capture-nintendo.js
 * Requires: dev server running on port 3010 + ffmpeg installed
 */

const { chromium } = require("playwright");
const { execSync, spawnSync } = require("child_process");
const path = require("path");
const fs = require("fs");

// ── Config ────────────────────────────────────────────────────────────────────
const AUDIO_FILE   = path.join(process.env.HOME, "Downloads/nintendo - updated 2.mp3");
const OUTPUT_DIR   = path.join(__dirname, "../output");
const MP4_VIDEO    = path.join(OUTPUT_DIR, "nintendo_updated_2_video.mp4");
const FINAL_OUTPUT = path.join(OUTPUT_DIR, "nintendo_updated_2_final.mp4");
const PAGE_URL     = "http://localhost:3010/videos/nintendo?cinema=1";

// Total duration = sum of retimed scenes (282.5s) + capture safety buffer.
const PAGE_RUNTIME_MS = 282_500;
const TOTAL_MS = 286_000;

// ── Helpers ───────────────────────────────────────────────────────────────────
function checkPrereqs() {
  if (!fs.existsSync(AUDIO_FILE)) {
    console.error(`✗ Audio file not found: ${AUDIO_FILE}`);
    process.exit(1);
  }
  const ffmpeg = spawnSync("which", ["ffmpeg"]);
  if (ffmpeg.status !== 0) {
    console.error("✗ ffmpeg not found. Install with: brew install ffmpeg");
    process.exit(1);
  }
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function ffmpeg(args, label) {
  console.log(`\n⟳  ${label}...`);
  const result = spawnSync("ffmpeg", args, { stdio: "inherit" });
  if (result.status !== 0) {
    console.error(`✗ ffmpeg failed at step: ${label}`);
    process.exit(1);
  }
  console.log(`✓  ${label} done`);
}

// ── Main ──────────────────────────────────────────────────────────────────────
(async () => {
  checkPrereqs();

  // 1. Get exact audio duration
  const probeResult = spawnSync("ffprobe", [
    "-v", "quiet", "-show_entries", "format=duration", "-of", "csv=p=0", AUDIO_FILE,
  ], { encoding: "utf8" });
  const audioDuration = parseFloat(probeResult.stdout.trim());
  console.log(`\n✓ Audio duration: ${audioDuration.toFixed(3)}s (${(audioDuration / 60).toFixed(2)} min)`);

  // Wait long enough to record the intentional silent end-card tail.
  const finalDuration = Math.max(PAGE_RUNTIME_MS / 1000, audioDuration + 4);
  const waitMs = Math.max(TOTAL_MS, (finalDuration + 3) * 1000);
  console.log(`✓ Capture window: ${(waitMs / 1000).toFixed(1)}s`);

  // 2. Launch browser and record
  console.log("\n⟳  Launching browser and recording...");
  console.log("   This will take the full video duration. Do not interact with the browser.\n");

  const browser = await chromium.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-gpu",
      "--hide-scrollbars",
      "--disable-dev-shm-usage",
    ],
  });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    recordVideo: {
      dir: OUTPUT_DIR,
      size: { width: 1280, height: 720 },
    },
    ignoreHTTPSErrors: true,
  });

  // Set long default timeout so waitForTimeout never hits a limit
  context.setDefaultTimeout(waitMs + 30_000);

  const page = await context.newPage();

  // Navigate — cinema mode auto-plays immediately
  console.log(`⟳  Navigating to ${PAGE_URL}`);
  await page.goto(PAGE_URL, { waitUntil: "domcontentloaded", timeout: 30_000 });
  // Give fonts and GSAP a moment to initialise before recording counts
  await page.waitForTimeout(1500);
  console.log("✓  Page loaded. Recording in progress...\n");

  // Progress indicator
  const startTime = Date.now();
  const progressInterval = setInterval(() => {
    const elapsed = (Date.now() - startTime) / 1000;
    const pct = Math.min((elapsed / (waitMs / 1000)) * 100, 100).toFixed(1);
    process.stdout.write(`\r   Progress: ${pct}%  (${elapsed.toFixed(0)}s / ${(waitMs / 1000).toFixed(0)}s)`);
  }, 1000);

  // Wait for all scenes to play
  await page.waitForTimeout(waitMs);

  clearInterval(progressInterval);
  process.stdout.write("\n");

  // 3. Close context to finalize the WebM file
  console.log("\n⟳  Finalizing recording...");
  const videoPath = await page.video()?.path();
  await context.close();
  await browser.close();
  console.log(`✓  Raw recording saved`);

  // Find the recorded file (Playwright names it automatically)
  const webmFiles = fs.readdirSync(OUTPUT_DIR)
    .filter(f => f.endsWith(".webm"))
    .map(f => ({ name: f, mtime: fs.statSync(path.join(OUTPUT_DIR, f)).mtime }))
    .sort((a, b) => b.mtime - a.mtime);

  if (webmFiles.length === 0) {
    console.error("✗ No WebM file found in output directory");
    process.exit(1);
  }

  const rawWebm = videoPath || path.join(OUTPUT_DIR, webmFiles[0].name);
  console.log(`✓  WebM: ${path.basename(rawWebm)}`);

  // 4. Convert WebM → MP4 (high quality, trim to full page runtime)
  const trimDuration = finalDuration;
  ffmpeg([
    "-y",
    "-i", rawWebm,
    "-t", trimDuration.toFixed(3),
    "-vf", "fps=30",                   // Normalize to 30fps
    "-c:v", "libx264",
    "-crf", "16",                       // High quality (lower = better, 16 is near-lossless)
    "-preset", "slow",
    "-pix_fmt", "yuv420p",             // Broad compatibility
    MP4_VIDEO,
  ], "Converting WebM → MP4 (this may take a minute)");

  // 5. Merge video + audio
  ffmpeg([
    "-y",
    "-i", MP4_VIDEO,
    "-i", AUDIO_FILE,
    "-c:v", "copy",                    // No re-encode — video stays pristine
    "-filter_complex", `[1:a]apad=pad_dur=${Math.max(finalDuration - audioDuration, 0).toFixed(3)}[a]`,
    "-c:a", "aac",
    "-b:a", "192k",
    "-t", finalDuration.toFixed(3),
    "-map", "0:v:0",
    "-map", "[a]",
    FINAL_OUTPUT,
  ], "Merging video + audio");

  // 6. Done
  const stats = fs.statSync(FINAL_OUTPUT);
  const sizeMb = (stats.size / 1024 / 1024).toFixed(1);
  console.log(`\n${"─".repeat(60)}`);
  console.log(`✓  Final video: ${FINAL_OUTPUT}`);
  console.log(`   Duration: ~${(finalDuration / 60).toFixed(2)} min`);
  console.log(`   File size: ${sizeMb} MB`);
  console.log(`${"─".repeat(60)}\n`);

  // Open in QuickTime
  spawnSync("open", [FINAL_OUTPUT]);
})();
