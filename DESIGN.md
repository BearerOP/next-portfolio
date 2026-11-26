# Design system

The portfolio is drawn as an engineering sheet: a monochrome surface, hairline rules, hatched margins, and small uppercase annotations. Content sits in ruled panels inside one centred column.

Read this before building or changing UI. The rules below marked **(linted)** are enforced by `pnpm lint:ds`, which runs in CI and fails the build.

```bash
pnpm check      # eslint + design-system lint + type-check (what CI runs)
pnpm lint:ds    # design-system lint only
```

## Where things live

| Path | What it is |
| --- | --- |
| `src/app/globals.css` | Colour, line and motion tokens (CSS variables), light and dark |
| `tailwind.config.ts` | Maps tokens to Tailwind classes; named sizes, grids and easings |
| `src/components/ds/` | The components. Import from `@/components/ds` |
| `src/components/ds/tokens.ts` | Tokens that must be passed to JavaScript as literal values |
| `src/components/home/` | Home-page sections, built only from the components above |
| `src/components/split-tool/` | The `/split` image tool. Runs entirely in the browser |
| `src/components/craft-page/` | The `/craft` page: index, demo stage, install steps, specs. Content lives in `catalog.tsx` |
| `scripts/ds-lint.mjs` | The linter. Configured by `design-system.config.mjs` |

## Color

Tokens are named for their **role**, never their value. A class says what the colour is *for*; the theme decides what it looks like.

| Role | Class | Use for |
| --- | --- | --- |
| Surface | `bg-background` | The sheet and every panel |
| Text | `text-foreground` | Content |
| Secondary text | `text-muted-foreground` | Annotations, metadata, descriptions |
| Rule | `border-line` | Dividers inside a panel |
| Faint rule | `border-line-subtle` | Dividers inside a divided area; the gutter grid |
| Outline | `border-line-strong` | The outer edge of a panel, a control, a tag |
| Tint | `bg-fill` | Header strips, label cells, hover on rows |
| Strong tint | `bg-fill-strong` | Hover on controls, image placeholders, skeletons |
| Hatching | `bg-hatch` | Margins and empty states, never behind text |
| Live | `bg-live` | Something happening right now (`StatusDot` only) |

- **Never write a raw colour (linted: `raw-color`).** No hex, `rgb()`, `hsl()`, and no Tailwind palette classes (`bg-zinc-900`, `text-white`). If no role fits, add a token to `globals.css` in both themes, map it in `tailwind.config.ts`, and add a row to this table.
- **The palette is monochrome.** The only hue is `live` green. Project screenshots and the hero banner carry the colour.
- The exceptions are `Petal`, whose gradient lives in `tokens.ts`, and the `/split` tool's `backdrops` (also in `tokens.ts`), which become part of the visitor's exported image rather than the site.
- **Images and video are greyscale at rest and take their colour on hover.** Add `media-mono` to the image; add `media-mono-group` to the card around it when hovering the card should colour it. Every new image gets this. The exception is an image the visitor is working on (the `/split` tool), which is shown as it is.
- Raw colours are allowed in exactly two places: `globals.css` and `src/components/ds/tokens.ts`.

## Typography

- **Geist Mono is the default** (`font-mono`, set on `body`). Geist Sans (`font-sans`) is for names and titles only: the `h1`, project and job titles. Caveat (`font-hand`) is handwriting, used only by `Annotation`.
- Sizes below `text-xs` have names: `text-caption` (11px) and `text-label` (10px, tracked). Use `<Label>` rather than applying `text-label` by hand.
- Body copy is `text-sm leading-relaxed`; secondary copy is `text-xs text-muted-foreground`.

## Spacing and layout

- **Use the Tailwind scale. No arbitrary values (linted: `one-off`).** `p-[13px]` is a finding; `p-3` or `p-4` is the answer. A value that references a token (`w-[var(--x)]`) is allowed. If a layout needs a value the scale lacks, give it a name in `tailwind.config.ts` (see `grid-cols-frame`, `scale-press`, `grid-rows-open`).
- Panel padding is `p-4`. Gaps between panels are `gap-6`. Gaps between controls and tags are `gap-2`.
- Corners are square. `rounded-full` is for dots and the avatar only.
- Separate things with a rule (`border-line`), not a shadow. There are no shadows.
- **Horizontal rules run across the whole sheet.** A panel's top and bottom edges continue through both gutters (`cross-rules`, built into `Panel`). Any other top-level box in the column gets the `cross-rules` class too.

## Components

Import everything from `@/components/ds`. Components take typed props and, except where noted, **no `className`**: if you need a different look, the system needs a new variant, not an override.

| Component | Use it when | Do not use it for |
| --- | --- | --- |
| `PageFrame` | Once per page, around all content | Nesting |
| `Panel` | Every top-level section of a page | A box inside another panel (use `PanelSection`) |
| `PanelSection` | Dividing a panel's interior; takes an optional annotation `label` | Top-level sections |
| `Label` | Annotations: headers, field names, indices, metadata | Sentences |
| `Button` | Anything clickable that is a control. Pass `href` and it renders a link | Links inside a sentence (use `TextLink`) |
| `TextLink` | A link inside text or a metadata row | Calls to action (use `Button href`) |
| `Tag` | Naming a technology or skill | Anything clickable |
| `StatusDot` | Showing live vs idle, next to a text label | Decoration |
| `Tooltip` | Naming an icon-only `Button` on hover and focus | Essential information; it is a hint, the `aria-label` is the name |
| `Disclosure` | A list row with secondary detail that expands in place | Navigation |
| `Reveal` | The entrance of one panel | Individual words or nested elements |
| `Annotation` | A handwritten note in the gutter, outside the content column, with an arrow pointing in. Pass it to `Panel` via `annotation`, or place it in a `relative` box. A few per page | Information the reader needs (decorative; hidden below `lg`, where there is no gutter). Never inside the frame |
| `Petal` | A drifting leaf in the margins. `PageFrame` scatters them already | Inside panels; it is the only soft, coloured shape and belongs to the margins |
| `Tabs` | Switching between views of the same thing. `cells` for an index grid, `line` for compact tabs above content | Navigating to another page (use `Button href`) |
| `Segmented` | Choosing one value of a setting from a short fixed set (parts: 2 / 3 / 4) | Switching views (use `Tabs`); actions (use `Button`) |
| `CodeBlock` | Anything the reader is meant to copy: commands, usage, source. `collapsible` for long listings | Inline code in a sentence |
| `DataTable` | A reference table (props, specs) | Layout |

Rules the linter reads from the components themselves:

- **No raw `<button>` or `<a>` (linted: `raw-html`).** A component declares what it replaces with `@ds-replaces <tag>` in its doc comment. `next/link` is fine for a plain navigation target; anything that looks like a control is a `Button`.
- **One primary button per file (linted: `limit`).** Declared on `Button` as `@ds-limit variant=primary max=1`. A second primary means neither is primary. On this site the primary action is "Book a call".
- **An icon-only `Button` must have an `aria-label`.** The prop types make it a compile error to leave it out.
- **Links and buttons never go inside `Disclosure`'s `summary`.** It renders inside the toggle button; put them in `actions`.

To suppress a finding, put this on the line above, with a reason (the reason is required):

```tsx
{/* ds-lint-disable-next-line raw-html -- full-row toggle; Button is a fixed-height control */}
```

### Adding a component

1. Create it in `src/components/ds/` with a doc comment saying when to use it and when not to.
2. Type its props as unions of literals. No `string` where a fixed set is meant, and no `className` unless it is for layout only (say so in the prop's comment).
3. If it replaces an HTML element, add `@ds-replaces <tag>`. If a variant has a limit, add `@ds-limit`.
4. Export it from `index.ts` and add a row to the table above.

## Motion

Motion values are tokens too. CSS: `ease-out` and `ease-in-out` resolve to the strong curves below, and durations have names. JavaScript: `motionTokens` from `@/components/ds`.

| Token | Value | Use for |
| --- | --- | --- |
| `ease-out` | `cubic-bezier(0.23, 1, 0.32, 1)` | Anything entering, exiting, or responding to the user |
| `ease-in-out` | `cubic-bezier(0.77, 0, 0.175, 1)` | Something already on screen moving or morphing |
| `duration-press` | 150ms | Press and hover feedback |
| `duration-ui` | 200ms | Colour changes, small reveals, tooltips |
| `duration-panel` | 300ms | Disclosures and panel entrances |

- **Trigger-anchored elements animate from their trigger, not their centre.** Tooltips, popovers, dropdowns and menus set `transform-origin` to the edge facing the trigger (`Tooltip` does this with `origin-bottom` / `origin-top`). The theme switch reveals in a circle growing out of the toggle. Modals are the exception: they are not anchored, so they stay centred.
- **Never `transition-all` (linted: `transition-all`).** Name the properties: `transition-colors`, `transition-transform`, `transition-[opacity,transform]`.
- **Animate `transform` and `opacity` only.** For height, use `Disclosure` (it animates grid rows to the content's real height). For a progress bar, `scaleX` with `origin-left`, not `width`.
- **Never enter from `scale(0)`.** Start at 0.9–0.97 with `opacity: 0`.
- **Press feedback is `scale(0.97)`** (`active:scale-press`), built into `Button`. Do not wrap a `Button` in a motion element.
- **No `ease-in` on UI.** UI motion stays under 300ms; modals and toasts may take up to 500ms.
- **Reduced motion is handled once:** `MotionProvider` sets `reducedMotion="user"` for Motion, and CSS uses `motion-safe:` / `motion-reduce:`. New CSS animation needs a reduced variant.
- **Import Motion from `motion/react`**, never `framer-motion` (ESLint error).
- Adjacent tooltips open instantly after the first. `Button` and `TextLink` play a soft tick on mouse hover; it comes from one document-level listener (`HoverSound`) keyed on `data-hover-sound`, so never attach per-element sound handlers.

## What the linter does not cover

`src/components/ui` and `src/components/magicui` are vendored primitives and follow the tokens through CSS variables. `src/components/stageshow/kit` is the vendored Stageshow kit (MIT), used only for the animated cursor walkthrough on `/split`; `src/components/split-tool/split-demo.css` maps its tokens onto ours, so restyle it there and never edit the kit. `src/components/craft` holds the standalone demo components shown on `/craft` and the code snippets visitors copy, so those keep their own styling; the `/craft` page around them is linted like everything else. To add a demo, put the component in `src/components/craft` and add an entry to `src/components/craft-page/catalog.tsx`. All exclusions are listed, with reasons, in `design-system.config.mjs`. The `ignore` list there also names a few legacy files nothing imports; delete or migrate them rather than adding to the list.
