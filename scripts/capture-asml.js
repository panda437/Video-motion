#!/usr/bin/env node
/**
 * Captures the ASML video page at 1280x720, then merges with ElevenLabs audio.
 * Output: output/asml_final.mp4
 *
 * Usage: node scripts/capture-asml.js
 * Requires: dev server running on port 3010 + ffmpeg installed
 */

const { chromium } = require("playwright");
const { spawnSync } = require("child_process");
const path = require("path");
const fs = require("fs");

const AUDIO_CLEAN  = path.join(process.env.HOME, "Downloads/ASML_clean.m4a");
const AUDIO_ORIG   = path.join(process.env.HOME, "Downloads/ASML.m4a");
const AUDIO_FILE   = fs.existsSync(AUDIO_CLEAN) ? AUDIO_CLEAN : AUDIO_ORIG;
const OUTPUT_DIR   = path.join(__dirname, "../output");
const MP4_VIDEO    = path.join(OUTPUT_DIR, "asml_video.mp4");
const FINAL_OUTPUT = path.join(OUTPUT_DIR, "asml_final.mp4");
const PAGE_URL     = "http://localhost:3010/videos/asml?cinema=1";

// Sum of scene durations in page.tsx (451s) + 13s buffer
// Clean audio (ASML_clean.m4a) is 429.4s; ffmpeg trims final output to audio length.
const TOTAL_MS = 460_000 + 4_000;

function checkPrereqs() {
  console.log(`✓ Using audio: ${path.basename(AUDIO_FILE)}`);
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

(async () => {
  checkPrereqs();

  const probeResult = spawnSync("ffprobe", [
    "-v", "quiet", "-show_entries", "format=duration", "-of", "csv=p=0", AUDIO_FILE,
  ], { encoding: "utf8" });
  const audioDuration = parseFloat(probeResult.stdout.trim());
  console.log(`\n✓ Audio duration: ${audioDuration.toFixed(3)}s (${(audioDuration / 60).toFixed(2)} min)`);

  const waitMs = Math.max(TOTAL_MS, (audioDuration + 3) * 1000);
  console.log(`✓ Capture window: ${(waitMs / 1000).toFixed(1)}s`);

  console.log("\n⟳  Launching browser and recording...");
  console.log("   Do not interact with the browser.\n");

  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars", "--disable-dev-shm-usage"],
  });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    recordVideo: { dir: OUTPUT_DIR, size: { width: 1280, height: 720 } },
    ignoreHTTPSErrors: true,
  });

  context.setDefaultTimeout(waitMs + 30_000);
  const page = await context.newPage();

  console.log(`⟳  Navigating to ${PAGE_URL}`);
  await page.goto(PAGE_URL, { waitUntil: "domcontentloaded", timeout: 30_000 });
  await page.waitForTimeout(1500);
  console.log("✓  Page loaded. Recording in progress...\n");

  const startTime = Date.now();
  const progressInterval = setInterval(() => {
    const elapsed = (Date.now() - startTime) / 1000;
    const pct = Math.min((elapsed / (waitMs / 1000)) * 100, 100).toFixed(1);
    process.stdout.write(`\r   Progress: ${pct}%  (${elapsed.toFixed(0)}s / ${(waitMs / 1000).toFixed(0)}s)`);
  }, 1000);

  await page.waitForTimeout(waitMs);

  clearInterval(progressInterval);
  process.stdout.write("\n");

  console.log("\n⟳  Finalizing recording...");
  const videoPath = await page.video()?.path();
  await context.close();
  await browser.close();
  console.log(`✓  Raw recording saved`);

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

  const trimDuration = audioDuration + 0.5;
  ffmpeg([
    "-y", "-i", rawWebm,
    "-t", trimDuration.toFixed(3),
    "-vf", "fps=30",
    "-c:v", "libx264", "-crf", "16", "-preset", "slow", "-pix_fmt", "yuv420p",
    MP4_VIDEO,
  ], "Converting WebM → MP4");

  ffmpeg([
    "-y", "-i", MP4_VIDEO, "-i", AUDIO_FILE,
    "-c:v", "copy", "-c:a", "aac", "-b:a", "192k",
    "-shortest", "-map", "0:v:0", "-map", "1:a:0",
    FINAL_OUTPUT,
  ], "Merging video + audio");

  const stats = fs.statSync(FINAL_OUTPUT);
  const sizeMb = (stats.size / 1024 / 1024).toFixed(1);
  console.log(`\n${"─".repeat(60)}`);
  console.log(`✓  Final video: ${FINAL_OUTPUT}`);
  console.log(`   Duration: ~${(audioDuration / 60).toFixed(2)} min`);
  console.log(`   File size: ${sizeMb} MB`);
  console.log(`${"─".repeat(60)}\n`);

  spawnSync("open", [FINAL_OUTPUT]);
})();
