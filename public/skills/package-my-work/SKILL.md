---
name: package-my-work
description: Turn a piece of UI work into a short, crisp, shareable clip. Records a scripted interaction frame by frame at high resolution, framed on the component rather than the whole window, with a correct cursor or touch indicator that moves naturally, and camera zooms onto the detail that matters. Use whenever the user wants to record, capture, demo, show off, or share something they built - "record a demo of this", "make a clip/GIF/video of the new modal", "I need something for the PR / tweet / changelog / portfolio", "package this up", "screen-record this interaction" - even if they only say they want to show the work to someone. Also use when an existing screen recording looks small, blurry, or hard to follow and they want a better one. Not for static screenshots, and not for recording native apps or anything outside a browser.
---

# Package my work

A raw screen recording undersells good work: the component is a small box inside a whole app window, the cursor is a few pixels wide, and the one detail that matters happens too fast and too small to see. This skill produces the other kind of clip, the kind that gets watched: tight on the subject, sharp at any size, with every action legible.

The recording is scripted, not captured live. You write a short shot plan (JSON), and `scripts/record.mjs` drives a headless browser through it, rendering each frame separately against a clock it controls. That is why the result has no dropped frames, no stray cursor wobble, and stays sharp when the camera zooms: every frame is rasterised at output resolution rather than upscaled.

## Requirements

Run from the project being recorded. The script resolves its dependencies from the current directory.

- `playwright-core` (`npm i -D playwright-core`). It uses the installed Google Chrome, and falls back to Playwright's Chromium if there is none.
- `ffmpeg` on the PATH, or `npm i -D ffmpeg-static`.

If either is missing the script says which. Ask before adding dependencies to the user's project; installing them in a scratch directory and running from there works just as well, since `url` can point anywhere.

## Workflow

### 1. Decide what the clip is about

One clip shows one thing. Before touching any tool, be able to finish the sentence "this clip shows that ___" (the stepper updates the total, the modal morphs from its trigger, the list reorders by drag). If the sentence needs an "and", it is two clips.

Aim for 4 to 10 seconds. People watch these in a feed or a PR description, usually on a loop, usually without sound.

### 2. Get the thing running and learn its selectors

Find the URL where the work is visible (start the dev server if needed) and read the component's source for stable selectors: ids, `aria-label`s, data attributes. If the interesting state needs setup (logged in, item in cart, dark mode), plan `setup` steps or a dedicated demo route.

Use tidy, believable content. "Sourdough loaf, $6.50" reads as a product; "test test 123" reads as unfinished. If the real data is messy or private, record against a fixture.

### 3. Write the shot plan

Read `references/shot-plan.md` for the full format. The decisions that matter:

**Frame the subject, not the window.** Set `frame` to the component's selector with some `padding`. The viewer should not have to find the component first. Add `isolate` with the same selector when the surrounding page is noise (sidebars, nav, other cards); leave it off when context is the point, such as showing where a popover is anchored.

**Resolution comes from `outputWidth`, layout comes from `viewport`.** Keep `viewport` at whatever size the component is designed for (a desktop layout around 1280 wide, a phone around 390), and set `outputWidth` to 3840 so the clip survives being viewed full-screen on a high-density display and can be cropped later. Do not enlarge the viewport to get more pixels; that changes the layout instead of the sharpness.

**Match the pointer to the platform.** `"pointer": "mouse"` for desktop UI; the cursor changes between arrow, pointing hand and text beam according to what it is over, as a real one does. `"pointer": "touch"` for mobile UI, with a phone-sized viewport and usually `"aspect": "9:16"` or `"4:5"`; taps and swipes show a touch dot only while the finger is down. A mouse arrow gliding over a mobile layout is the most common tell of a careless recording.

**Zoom when the detail is smaller than the story.** If the thing that changes is small relative to the frame (a count, a badge, an icon morph), push the camera in with a `zoom` on the `click` or `move` that leads to it, so the cursor and the camera arrive together, then `"zoom": { "to": "reset" }` on the way out. Keep zooms modest and few: one push-in and one pull-out per clip. A camera that moves on every action is harder to follow than no zoom at all.

**Pace it for a viewer, not a user.** Real use is too fast to read. Open with about half a second of stillness so the viewer can take in the starting state, leave 400 to 700 ms after each action so its result can be seen, and end on a short hold. Let cursor travel time default (it scales with distance) unless a move needs emphasis.

**Make it loop.** End in the state the clip started in when that is natural (increment twice, decrement twice; open, then close). A loop with no visible seam can play forever in a README or a portfolio without looking like it restarted.

### 4. Draft, review, then render

```bash
node <skill-dir>/scripts/record.mjs shot.json --draft   # half resolution, 30fps, fast
node <skill-dir>/scripts/sheet.mjs out/clip.mp4         # contact sheet → out/clip.sheet.png
```

Read the contact sheet image and check it against the sentence from step 1:

- Is the subject fully in frame the whole time, including while zoomed? Cropped titles and clipped shadows are the usual misses; add padding or frame a larger element.
- Does every click land on its target, and does the cursor show the right shape there?
- Is each state change visible for at least a couple of sheet frames?
- Does the last frame match the first, if it is meant to loop?

Fix the plan and redraft until the sheet is right. Then render without `--draft`. A 6-second clip at 3840 wide and 60fps takes about a minute, because every frame is a full-resolution render.

### 5. Deliver

Name the file for what it shows and how long it runs, e.g. `add-to-cart-7s.mp4`; a clip called `recording-final-2.mp4` has to be opened to know what it is. Report the path, resolution, frame rate, duration and file size, and keep the shot plan next to the clip so it can be re-rendered when the UI changes.

Convert on request rather than by default:

```bash
# GIF for places that cannot play video (large; keep it small and short)
ffmpeg -i clip.mp4 -vf "fps=30,scale=960:-1:flags=lanczos,split[a][b];[a]palettegen[p];[b][p]paletteuse" clip.gif
# 1080p copy for upload limits
ffmpeg -i clip.mp4 -vf scale=1920:-2 -crf 18 clip-1080.mp4
```

## What the recorder controls, and what it does not

Time in the page only moves when a frame is rendered. That covers JavaScript timers, `requestAnimationFrame` (so Motion, GSAP and canvas loops), and CSS transitions and animations, which are held paused and stepped by hand.

It does not cover `<video>` and audio playback, or native smooth scrolling (`scroll-behavior: smooth`); avoid those in a shot, or expect them to run at the wrong speed. Network requests complete in real time between frames, so a fetch that takes a second in real use appears to resolve almost instantly. That is usually a welcome side effect, but if the loading state is the subject of the clip, delay the response in a fixture so it spans real frames.

For a demo that plays by itself (a looping hero animation, an auto-playing walkthrough), set `"pointer": "none"` and film it with `wait` steps. To get a seamless loop, start recording at the top of the demo's cycle with a setup `eval` that returns a promise, and record one full cycle; `examples/self-running-demo.json` does this.

If a shot plan step fails, the error names the selector or the framing problem; `references/shot-plan.md` lists the common ones.
