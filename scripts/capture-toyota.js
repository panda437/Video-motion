#!/usr/bin/env node
/**
 * Captures the Toyota video page at 1280x720, then merges with the audio.
 * Output: output/toyota_final.mp4
 *
 * Usage: node scripts/capture-toyota.js
 * Requires: dev server running on port 3010 + ffmpeg installed
 */

const { chromium } = require("playwright");
const { spawnSync } = require("child_process");
const path = require("path");
const fs = require("fs");

const AUDIO_FILE   = path.join(process.env.HOME, "Downloads/Toyota.m4a");
const BGM_FILE     = path.join(process.env.HOME, "Downloads/toyota_bgm.mp3");
const OUTPUT_DIR   = path.join(__dirname, "../output");
const MP4_VIDEO    = path.join(OUTPUT_DIR, "toyota_video.mp4");
const FINAL_OUTPUT = path.join(OUTPUT_DIR, "toyota_final.mp4");
const PAGE_URL     = "http://localhost:3010/videos/toyota?cinema=1";

// Sum of scene durations is ~280.6s
const TOTAL_MS = 285_000;

function checkPrereqs() {
  console.log(`✓ Using audio: ${path.basename(AUDIO_FILE)}`);
  if (!fs.existsSync(AUDIO_FILE)) {
    console.error(`✗ Audio file not found: ${AUDIO_FILE}`);
    process.exit(1);
  }
  if (fs.existsSync(BGM_FILE)) {
    console.log(`✓ Using BGM: ${path.basename(BGM_FILE)}`);
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

  const trimDuration = audioDuration + 1.0;
  
  // Changed fps=30 to fps=60 for HD 60FPS quality
  ffmpeg([
    "-y", "-i", rawWebm,
    "-t", trimDuration.toFixed(3),
    "-vf", "fps=60",
    "-c:v", "libx264", "-crf", "16", "-preset", "slow", "-pix_fmt", "yuv420p",
    MP4_VIDEO,
  ], "Converting WebM → MP4 (60 FPS)");

  if (fs.existsSync(BGM_FILE)) {
    ffmpeg([
      "-y",
      "-i", MP4_VIDEO,
      "-i", AUDIO_FILE,
      "-i", BGM_FILE,
      "-filter_complex",
      "[2:a]volume=0.18[bgm_base]; [bgm_base][1:a]sidechaincompress=threshold=0.1:ratio=20:attack=200:release=1000[bgm_ducked]; [1:a][bgm_ducked]amix=inputs=2:duration=first[a]",
      "-c:v", "copy", "-c:a", "aac", "-b:a", "192k",
      "-map", "0:v:0", "-map", "[a]",
      FINAL_OUTPUT,
    ], "Merging video + narration + ducked BGM");
  } else {
    ffmpeg([
      "-y", "-i", MP4_VIDEO, "-i", AUDIO_FILE,
      "-c:v", "copy", "-c:a", "aac", "-b:a", "192k",
      "-shortest", "-map", "0:v:0", "-map", "1:a:0",
      FINAL_OUTPUT,
    ], "Merging video + audio");
  }

  const stats = fs.statSync(FINAL_OUTPUT);
  const sizeMb = (stats.size / 1024 / 1024).toFixed(1);
  console.log(`\n${"─".repeat(60)}`);
  console.log(`✓  Final video: ${FINAL_OUTPUT}`);
  console.log(`   Duration: ~${(audioDuration / 60).toFixed(2)} min`);
  console.log(`   File size: ${sizeMb} MB`);
  console.log(`${"─".repeat(60)}\n`);

})();
