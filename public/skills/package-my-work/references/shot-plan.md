# Shot plan reference

A shot plan is one JSON file describing one clip. `scripts/record.mjs` reads it.

## Top-level fields

| Field | Default | Meaning |
| --- | --- | --- |
| `url` | required | Page to record. A dev server URL or a `file://` path. |
| `output` | `out/clip.mp4` | Where to write the clip, relative to the current directory. |
| `frame` | `"viewport"` | What the camera frames at the start: a CSS selector, `"viewport"`, or `{ "x", "y", "width", "height" }` in CSS pixels. |
| `padding` | `48` | Breathing room around a framed selector, in CSS pixels. |
| `isolate` | none | CSS selector. Everything that is not this element, inside it, or an ancestor of it is hidden. |
| `viewport` | `1280×800` | Browser size the page lays out in. This decides the layout, not the output resolution. |
| `outputWidth` | `3840` | Width of the clip in pixels. Height follows from `aspect`. |
| `aspect` | `"16:9"` | Output aspect ratio, e.g. `"1:1"`, `"4:5"`, `"9:16"`. |
| `fps` | `60` | Frame rate. |
| `pointer` | `"mouse"` | `"mouse"` draws a cursor; `"touch"` emulates a touch device and draws a touch dot; `"none"` draws nothing, for a demo that animates itself (use only `wait` and `zoom` steps). |
| `theme` | `"light"` | `prefers-color-scheme` the page sees. |
| `cursorStart` | lower-left of the frame | Where the cursor rests before the first step: a selector or `{ "x", "y" }`. |
| `setup` | none | Steps run before recording starts (not filmed). See below. |
| `steps` | required | The filmed timeline. |

Coordinates are CSS pixels relative to the viewport's top-left corner.

## Steps

Every step is `{ "do": "<name>", ... }`. A target (`to`, `from`) is a CSS selector, which resolves to the element's centre, or `{ "x", "y" }`.

| `do` | Fields | What it does |
| --- | --- | --- |
| `wait` | `ms` (500) | Hold. Animations already running keep playing. |
| `move` | `to`, `ms`, `zoom` | Glide the cursor to the target. Duration is derived from distance when `ms` is omitted. |
| `click` | `to`, `ms`, `settle` (180), `zoom` | Optionally travel to `to`, pause `settle` ms so the hover state lands, then press and release. Without `to`, clicks where the cursor already is. In touch mode this is a tap. |
| `drag` | `from`, `to`, `ms` (600) | Press at `from` (or the current position), move to `to`, release. In touch mode this is a swipe. |
| `type` | `text`, `perChar` (70) | Type into whatever has focus, one character at a time with slightly uneven rhythm. Click the field first. |
| `press` | `key`, `ms` (200) | Press a key, e.g. `"Enter"`, `"Escape"`, `"Meta+K"`. |
| `scroll` | `by`, `ms` (700) | Scroll vertically by `by` CSS pixels, eased. Negative scrolls up. |
| `zoom` | `to`, `padding`, `ms` (700) | Move the camera to frame a target. `"to": "reset"` returns to the opening frame. |

`move` and `click` accept `"zoom": { "to": "<selector>", "padding": 64 }` to move the camera during the cursor's travel, so the push-in and the cursor arrive together.

## Setup steps

Run in real time before the first frame. Use them to reach the state the clip starts from.

| `do` | Fields |
| --- | --- |
| `click` | `to` (selector) |
| `type` | `to` (selector), `text` (fills instantly) |
| `wait` | `ms` |
| `eval` | `js` (a string evaluated in the page, e.g. to seed `localStorage`). If it evaluates to a promise, recording waits for it, which is how to start a self-running demo at the top of its loop. |

## Example

```json
{
  "url": "http://localhost:3000/groceries",
  "output": "out/add-to-cart-7s.mp4",
  "frame": ".product-card",
  "padding": 60,
  "isolate": ".product-card",
  "outputWidth": 3840,
  "steps": [
    { "do": "wait", "ms": 600 },
    { "do": "click", "to": "button[aria-label='Increase']", "zoom": { "to": ".stepper-row", "padding": 64 } },
    { "do": "wait", "ms": 450 },
    { "do": "click" },
    { "do": "wait", "ms": 700 },
    { "do": "click", "to": "button[aria-label='Decrease']" },
    { "do": "wait", "ms": 500 },
    { "do": "move", "to": { "x": 330, "y": 300 }, "zoom": { "to": "reset" } },
    { "do": "wait", "ms": 500 }
  ]
}
```

## Errors you may see

- **"Framing … needs W×H but the viewport is …"**: the target plus padding, widened to the output aspect, does not fit in the viewport. Raise `viewport`, lower `padding`, or frame something smaller.
- **"No element matches …" / "… has no size"**: the selector is wrong, or the element is not on screen yet. Add a `wait` or a `setup` step that reveals it.
- **Missing `playwright-core` or ffmpeg**: install them in the project you are recording from (see SKILL.md).
