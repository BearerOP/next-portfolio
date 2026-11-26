#!/usr/bin/env node
// Record a scripted interaction as a crisp, shareable clip.
//
//   node record.mjs shot.json [--draft]
//
// Frames are rendered one at a time against a clock this script controls (timers,
// requestAnimationFrame, CSS transitions and animations), so the clip is exactly
// `fps` with no dropped frames, however slow the capture is. Every frame
// is re-rasterised at output resolution, so zooms stay sharp instead of upscaling.
// See ../references/shot-plan.md for the plan format.

import { spawn, spawnSync } from "node:child_process";
import { mkdirSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";

// Dependencies live in the project being recorded, not next to this script.
const projectRequire = createRequire(resolve(process.cwd(), "package.json"));
function need(name, hint) {
  try {
    return projectRequire(name);
  } catch {
    console.error(`Missing "${name}". ${hint}`);
    process.exit(1);
  }
}

const args = process.argv.slice(2);
const draft = args.includes("--draft");
const planPath = args.find((arg) => !arg.startsWith("--"));
if (!planPath) {
  console.error("Usage: node record.mjs shot.json [--draft]");
  process.exit(1);
}
const plan = JSON.parse(readFileSync(planPath, "utf8"));

const { chromium } = need("playwright-core", "Run: npm i -D playwright-core");

function findFfmpeg() {
  if (spawnSync("ffmpeg", ["-version"]).status === 0) return "ffmpeg";
  try {
    return projectRequire("ffmpeg-static");
  } catch {
    console.error('ffmpeg not found. Run: brew install ffmpeg (or: npm i -D ffmpeg-static)');
    process.exit(1);
  }
}

const even = (n) => Math.round(n / 2) * 2;
const fps = draft ? 30 : plan.fps ?? 60;
const outW = even((plan.outputWidth ?? 3840) / (draft ? 2 : 1));
const [aw, ah] = (plan.aspect ?? "16:9").split(":").map(Number);
const outH = even((outW * ah) / aw);
const viewport = plan.viewport ?? { width: 1280, height: 800 };
const touch = plan.pointer === "touch";
// "none": the page animates itself (a self-running demo), so draw no pointer at all.
const pointerless = plan.pointer === "none";
const frameMs = 1000 / fps;

const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const lerp = (a, b, t) => a + (b - a) * t;
const tween = (from, to, t) => ({
  x: lerp(from.x, to.x, t),
  y: lerp(from.y, to.y, t),
  width: lerp(from.width, to.width, t),
  height: lerp(from.height, to.height, t),
});

// --- browser -----------------------------------------------------------------

async function launch() {
  const options = { headless: true, args: ["--hide-scrollbars"] };
  try {
    return await chromium.launch({ ...options, channel: "chrome" });
  } catch {
    return chromium.launch(options); // fall back to Playwright's own Chromium
  }
}

const browser = await launch();
const context = await browser.newContext({
  viewport,
  hasTouch: touch,
  isMobile: touch && plan.mobile !== false,
  colorScheme: plan.theme ?? "light",
  reducedMotion: "no-preference",
});
const page = await context.newPage();
const cdp = await context.newCDPSession(page);

// Take over the page's JS clock before it loads. It runs in real time until the
// recording starts, then only moves when a frame is stepped.
await page.clock.install();
await page.goto(plan.url, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);

// --- setup: reach the state the clip starts from (not filmed) ------------------

for (const step of plan.setup ?? []) {
  if (step.do === "click") await page.locator(step.to).first().click();
  else if (step.do === "type") await page.locator(step.to).first().fill(step.text);
  else if (step.do === "wait") await page.waitForTimeout(step.ms);
  else if (step.do === "eval") {
    // A step may navigate or reload, which tears down the page mid-call.
    await page.evaluate(step.js).catch((error) => {
      if (!/navigat|context was destroyed/i.test(error.message)) throw error;
    });
    await page.waitForLoadState("networkidle");
  }
  else throw new Error(`Unknown setup step: ${step.do}`);
}

await page.evaluate(() => document.fonts.ready);

// --- overlay: cursor / touch indicator, drawn into the page -------------------

await page.evaluate(
  ({ touch }) => {
    const root = document.createElement("div");
    root.id = "__pmw";
    root.style.cssText =
      "position:fixed;left:0;top:0;width:0;height:0;z-index:2147483647;pointer-events:none;";
    const shadow = "filter:drop-shadow(0 1px 2px rgba(0,0,0,.35));";
    const svg = (body, w, h, style) =>
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${w}" height="${h}" style="position:absolute;display:none;${shadow}${style}">${body}</svg>`;
    root.innerHTML =
      `<div data-ring style="position:absolute;left:-22px;top:-22px;width:44px;height:44px;border-radius:50%;background:rgba(0,0,0,.22);opacity:0"></div>` +
      `<div data-tip style="position:absolute;left:0;top:0;transform-origin:0 0">` +
      // Each cursor is offset so its hotspot sits on the wrapper's origin.
      svg(
        `<path d="M4 3v16l4.5-4 3 6.5 2.5-1.2-3-6.3h6z" fill="#111" stroke="#fff" stroke-width="1.5" stroke-linejoin="round"/>`,
        28, 28, "left:-4.7px;top:-3.5px;",
      ).replace("<svg", '<svg data-kind="arrow"') +
      svg(
        `<g fill="#fff" stroke="#111" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 13V4.5a1.5 1.5 0 0 1 3 0V11a1.5 1.5 0 0 1 3 0v.5a1.5 1.5 0 0 1 3 0v.5a1.5 1.5 0 0 1 3 0V16a6 6 0 0 1-6 6h-1.8a6 6 0 0 1-5-2.7l-.2-.3c-.3-.5-1.4-2.4-3.3-5.7a1.5 1.5 0 0 1 .5-2 1.9 1.9 0 0 1 2.3.2L8 13z"/><path d="M11 11v-1M14 11.5V11M17 12v-.5" fill="none"/></g>`,
        28, 28, "left:-11.1px;top:-3.5px;",
      ).replace("<svg", '<svg data-kind="hand"') +
      svg(
        `<path d="M9 3h2a1 1 0 0 1 1 1 1 1 0 0 1 1-1h2M9 21h2a1 1 0 0 0 1-1 1 1 0 0 0 1 1h2M12 4v16" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round"/><path d="M9 3h2a1 1 0 0 1 1 1 1 1 0 0 1 1-1h2M9 21h2a1 1 0 0 0 1-1 1 1 0 0 0 1 1h2M12 4v16" fill="none" stroke="#111" stroke-width="1.5" stroke-linecap="round"/>`,
        24, 24, "left:-12px;top:-12px;",
      ).replace("<svg", '<svg data-kind="text"') +
      `<div data-kind="touch" style="position:absolute;display:none;left:-20px;top:-20px;width:40px;height:40px;border-radius:50%;background:rgba(40,40,40,.32);border:1.5px solid rgba(255,255,255,.85);box-shadow:0 1px 4px rgba(0,0,0,.25)"></div>` +
      `</div>`;
    document.documentElement.appendChild(root);

    const tip = root.querySelector("[data-tip]");
    const ring = root.querySelector("[data-ring]");
    const kinds = [...root.querySelectorAll("[data-kind]")];

    // Which cursor the OS would show here. `cursor: auto` is resolved by the
    // browser per element, so links and text fields need handling by hand.
    const kindAt = (x, y) => {
      const el = document.elementFromPoint(x, y);
      if (!el) return "arrow";
      const cursor = getComputedStyle(el).cursor;
      if (cursor === "pointer") return "hand";
      if (cursor === "text") return "text";
      if (cursor === "auto") {
        if (el.closest("a[href]")) return "hand";
        if (el.closest("textarea, [contenteditable=''], [contenteditable='true']")) return "text";
        const input = el.closest("input");
        if (input && !/^(button|submit|checkbox|radio|range|color|file|image|reset)$/.test(input.type))
          return "text";
      }
      return "arrow";
    };

    const seen = new WeakSet();
    window.__pmw = {
      // CSS transitions and animations run on the compositor's clock, not the JS
      // one, so hold each of them paused and move it forward by hand.
      step(dt, fresh = true) {
        for (const animation of document.getAnimations()) {
          if (!seen.has(animation)) {
            seen.add(animation);
            animation.pause();
            if (fresh) animation.currentTime = 0;
          }
          const time = Number(animation.currentTime ?? 0) + dt;
          const end = animation.effect?.getComputedTiming().endTime;
          if (Number.isFinite(Number(end)) && time >= Number(end)) animation.finish();
          else animation.currentTime = time;
        }
      },
      set({ x, y, pressed, ripple, visible }) {
        root.style.transform = `translate(${x}px, ${y}px)`;
        const kind = touch ? "touch" : kindAt(x, y);
        for (const el of kinds) el.style.display = el.dataset.kind === kind ? "block" : "none";
        tip.style.opacity = visible;
        tip.style.transform = `scale(${1 - 0.12 * pressed})`;
        if (ripple == null || touch) {
          ring.style.opacity = 0;
        } else {
          const eased = 1 - Math.pow(1 - ripple, 3);
          ring.style.opacity = 0.9 * (1 - eased);
          ring.style.transform = `scale(${0.5 + eased})`;
        }
      },
      // Hide everything that is not the subject, an ancestor of it, or inside it.
      isolate(el) {
        for (let node = el; node && node !== document.documentElement; node = node.parentElement) {
          for (const sibling of node.parentElement?.children ?? []) {
            if (sibling !== node && sibling !== root) sibling.style.visibility = "hidden";
          }
        }
      },
    };
  },
  { touch },
);

// --- geometry ------------------------------------------------------------------

// Measured with a plain DOM read: Playwright's actionability checks wait on
// animation frames, which only tick when this script steps the clock.
async function box(selector) {
  const rect = await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    let r = el.getBoundingClientRect();
    if (r.top < 0 || r.left < 0 || r.bottom > innerHeight || r.right > innerWidth) {
      el.scrollIntoView({ block: "center", inline: "center", behavior: "instant" });
      r = el.getBoundingClientRect();
    }
    return { x: r.x, y: r.y, width: r.width, height: r.height };
  }, selector);
  if (!rect) throw new Error(`No element matches ${selector}`);
  if (!rect.width || !rect.height) throw new Error(`${selector} has no size (is it hidden?)`);
  return rect;
}

async function point(target) {
  if (typeof target === "object") return target;
  const b = await box(target);
  return { x: b.x + b.width / 2, y: b.y + b.height / 2 };
}

// Smallest rect of the output aspect that contains `target` plus padding.
async function cameraFor(target, padding = 48) {
  if (target === "reset") return homeCamera;
  if (target === "viewport") return { x: 0, y: 0, width: viewport.width, height: viewport.height };
  const b = typeof target === "string" ? await box(target) : target;
  let width = b.width + padding * 2;
  let height = b.height + padding * 2;
  if (width / height < aw / ah) width = (height * aw) / ah;
  else height = (width * ah) / aw;
  if (width > viewport.width || height > viewport.height) {
    throw new Error(
      `Framing ${JSON.stringify(target)} needs ${Math.ceil(width)}×${Math.ceil(height)} but the viewport is ${viewport.width}×${viewport.height}. Enlarge "viewport" or reduce "padding".`,
    );
  }
  const cx = b.x + b.width / 2;
  const cy = b.y + b.height / 2;
  return {
    x: Math.min(Math.max(cx - width / 2, 0), viewport.width - width),
    y: Math.min(Math.max(cy - height / 2, 0), viewport.height - height),
    width,
    height,
  };
}

// --- state + frame loop --------------------------------------------------------

if (plan.isolate) {
  await page.locator(plan.isolate).first().evaluate((el) => window.__pmw.isolate(el));
}

let homeCamera = null;
homeCamera = await cameraFor(plan.frame ?? "viewport", plan.padding);
let camera = homeCamera;
const start = plan.cursorStart
  ? await point(plan.cursorStart)
  : { x: camera.x + camera.width * 0.3, y: camera.y + camera.height * 0.85 };
const state = { x: start.x, y: start.y, pressed: 0, rippleAt: null, visible: touch || pointerless ? 0 : 1, now: 0 };
if (!touch && !pointerless) await page.mouse.move(state.x, state.y);

const output = resolve(plan.output ?? "out/clip.mp4");
mkdirSync(dirname(output), { recursive: true });
const ffmpeg = spawn(
  findFfmpeg(),
  [
    "-y", "-loglevel", "error",
    "-f", "image2pipe", "-framerate", String(fps), "-i", "-",
    "-vf", `scale=${outW}:${outH}:flags=lanczos`,
    "-c:v", "libx264", "-preset", "slow", "-crf", draft ? "23" : "16",
    "-pix_fmt", "yuv420p", "-movflags", "+faststart",
    output,
  ],
  { stdio: ["pipe", "inherit", "inherit"] },
);
const encoded = new Promise((done, fail) => {
  ffmpeg.on("error", fail);
  ffmpeg.on("close", (code) => (code === 0 ? done() : fail(new Error(`ffmpeg exited with ${code}`))));
});

// Freeze. Animations already mid-flight (a looping spinner, say) keep their place.
await page.clock.pauseAt(new Date((await page.evaluate(() => Date.now())) + 50));
await page.evaluate(() => {
  window.__pmw.step(0, false);
  // Animations made from script (element.animate, which Motion and others use)
  // would otherwise play on the browser's real timeline between frames. Create
  // them paused and ignore attempts to start them; step() moves them instead.
  const proto = Animation.prototype;
  const startTime = Object.getOwnPropertyDescriptor(proto, "startTime");
  Object.defineProperty(proto, "startTime", { ...startTime, set() {} });
  proto.play = function () {};
  const animate = Element.prototype.animate;
  Element.prototype.animate = function (...args) {
    const animation = animate.apply(this, args);
    animation.pause();
    return animation;
  };
});

async function advance(ms) {
  await page.clock.runFor(ms);
  await page.evaluate((dt) => window.__pmw.step(dt), ms);
}

let frames = 0;
async function frame() {
  const ripple = state.rippleAt == null ? null : (state.now - state.rippleAt) / 450;
  await page.evaluate((s) => window.__pmw.set(s), {
    x: state.x,
    y: state.y,
    pressed: state.pressed,
    visible: state.visible,
    ripple: ripple != null && ripple <= 1 ? ripple : null,
  });
  await advance(frameMs);
  state.now += frameMs;
  const scroll = await page.evaluate(() => ({ x: window.scrollX, y: window.scrollY }));
  const { data } = await cdp.send("Page.captureScreenshot", {
    format: "png",
    // Capturing beyond the viewport resizes it for every shot, which fires resize
    // and IntersectionObserver callbacks in the page. The camera never leaves it.
    captureBeyondViewport: false,
    clip: {
      x: camera.x + scroll.x,
      y: camera.y + scroll.y,
      width: camera.width,
      height: camera.height,
      scale: outW / camera.width,
    },
  });
  if (!ffmpeg.stdin.write(Buffer.from(data, "base64"))) {
    await new Promise((drained) => ffmpeg.stdin.once("drain", drained));
  }
  frames += 1;
  if (frames % fps === 0) process.stdout.write(`\r${(frames / fps).toFixed(0)}s recorded`);
}

// Run `update(t)` once per frame for `ms`, t going 0 → 1.
async function over(ms, update) {
  const count = Math.max(1, Math.round(ms / frameMs));
  for (let i = 1; i <= count; i++) {
    if (update) await update(i / count);
    await frame();
  }
}

async function touchEvent(type, x, y) {
  await cdp.send("Input.dispatchTouchEvent", {
    type,
    touchPoints: type === "touchEnd" ? [] : [{ x: Math.round(x), y: Math.round(y) }],
  });
}

// Glide to a target along a slight arc: a straight, linear path reads as a robot.
async function travel(target, ms, { dragging = false, zoom = null } = {}) {
  const to = await point(target);
  const camFrom = camera;
  const camTo = zoom ? await cameraFor(zoom.to, zoom.padding ?? plan.padding) : null;
  const from = { x: state.x, y: state.y };
  const distance = Math.hypot(to.x - from.x, to.y - from.y);
  if (distance < 1) return;
  if (touch && !dragging) {
    // A finger is not on the glass between taps; just reposition.
    state.x = to.x;
    state.y = to.y;
    return;
  }
  const duration = ms ?? Math.min(1100, 320 + distance * 0.9);
  const bow = Math.min(distance * 0.08, 24);
  const nx = -(to.y - from.y) / distance;
  const ny = (to.x - from.x) / distance;
  await over(duration, async (t) => {
    const e = dragging ? t : easeInOut(t);
    if (camTo) camera = tween(camFrom, camTo, easeInOut(t));
    const arc = dragging ? 0 : Math.sin(Math.PI * e) * bow;
    state.x = lerp(from.x, to.x, e) + nx * arc;
    state.y = lerp(from.y, to.y, e) + ny * arc;
    if (touch) await touchEvent("touchMove", state.x, state.y);
    else await page.mouse.move(state.x, state.y);
  });
}

async function pressDown() {
  if (touch) {
    await touchEvent("touchStart", state.x, state.y);
    await over(90, (t) => {
      state.visible = t;
      state.pressed = t;
    });
  } else {
    await page.mouse.down();
    await over(90, (t) => {
      state.pressed = t;
    });
  }
}

async function pressUp() {
  if (touch) {
    await touchEvent("touchEnd");
    await over(220, (t) => {
      state.pressed = 1 - t;
      state.visible = 1 - t;
    });
  } else {
    await page.mouse.up();
    state.rippleAt = state.now;
    await over(140, (t) => {
      state.pressed = 1 - t;
    });
  }
}

const actions = {
  wait: (step) => over(step.ms ?? 500),
  // `zoom` pushes the camera in while the cursor travels, so the two read as one move.
  move: (step) => travel(step.to, step.ms, { zoom: step.zoom }),
  async click(step) {
    if (step.to) {
      await travel(step.to, step.ms, { zoom: step.zoom });
      await over(step.settle ?? 180); // let hover states land before pressing
    }
    await pressDown();
    await pressUp();
  },
  async drag(step) {
    if (step.from) await travel(step.from);
    await pressDown();
    await travel(step.to, step.ms ?? 600, { dragging: true });
    await pressUp();
  },
  async type(step) {
    for (const char of step.text) {
      await page.keyboard.type(char);
      await over((step.perChar ?? 70) * (0.7 + Math.random() * 0.6));
    }
  },
  async press(step) {
    await page.keyboard.press(step.key);
    await over(step.ms ?? 200);
  },
  async scroll(step) {
    let done = 0;
    await over(step.ms ?? 700, async (t) => {
      const target = step.by * easeInOut(t);
      await page.mouse.wheel(0, target - done);
      done = target;
    });
  },
  async zoom(step) {
    const from = camera;
    const to = await cameraFor(step.to, step.padding ?? plan.padding);
    await over(step.ms ?? 700, (t) => {
      camera = tween(from, to, easeInOut(t));
    });
    camera = to;
  },
};

try {
  for (const step of plan.steps) {
    const action = actions[step.do];
    if (!action) throw new Error(`Unknown step: ${step.do}`);
    await action(step);
  }
} finally {
  ffmpeg.stdin.end();
  await encoded.catch((error) => console.error(error.message));
  await browser.close();
}

console.log(`\r${output}  ${outW}×${outH}  ${fps}fps  ${(frames / fps).toFixed(1)}s`);
