#!/usr/bin/env node
// Tile a clip into one contact-sheet image so it can be reviewed at a glance.
//
//   node sheet.mjs out/clip.mp4 [framesPerSecond=3]   →  out/clip.sheet.png

import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import { resolve } from "node:path";

const [clip, rate = "3"] = process.argv.slice(2);
if (!clip) {
  console.error("Usage: node sheet.mjs clip.mp4 [framesPerSecond]");
  process.exit(1);
}

let ffmpeg = "ffmpeg";
if (spawnSync(ffmpeg, ["-version"]).status !== 0) {
  try {
    ffmpeg = createRequire(resolve(process.cwd(), "package.json"))("ffmpeg-static");
  } catch {
    console.error("ffmpeg not found. Run: brew install ffmpeg (or: npm i -D ffmpeg-static)");
    process.exit(1);
  }
}

// Size the grid to the clip so the sheet has no empty rows.
const probe = spawnSync(ffmpeg, ["-i", clip], { encoding: "utf8" }).stderr ?? "";
const [, h = "0", m = "0", sec = "8"] = probe.match(/Duration: (\d+):(\d+):([\d.]+)/) ?? [];
const seconds = Number(h) * 3600 + Number(m) * 60 + Number(sec);
const rows = Math.max(1, Math.ceil((seconds * Number(rate)) / 4));

const out = clip.replace(/\.\w+$/, ".sheet.png");
const result = spawnSync(
  ffmpeg,
  ["-y", "-loglevel", "error", "-i", clip, "-vf", `fps=${rate},scale=480:-1,tile=4x${rows}`, "-frames:v", "1", out],
  { stdio: "inherit" },
);
if (result.status !== 0) process.exit(result.status ?? 1);
console.log(out);
