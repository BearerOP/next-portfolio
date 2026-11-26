/**
 * Tokens that have to be handed to JavaScript APIs as literal values
 * (libraries that cannot read CSS variables). Everything else lives in
 * src/app/globals.css. Raw colours are allowed in this file only.
 */

/** Contribution-graph intensity ramp, lowest to highest. Monochrome on purpose. */
export const graphRamp = {
  light: ["#ededed", "#c9c9c9", "#969696", "#565656", "#171717"],
  dark: ["#161616", "#333333", "#5c5c5c", "#9a9a9a", "#ededed"],
} as const;

/** The petal's leaf-to-sky gradient. The one soft colour on the sheet. */
export const petalGradient = { from: "#a6c9a9", to: "#8da7ff" } as const;

/** Painted behind an exported JPEG, which has no transparency. */
export const exportMatte = "#ffffff";

/**
 * Backdrops the /split tool can put behind a visitor's image. They are part
 * of the exported picture, not of the site, so they are free to carry colour.
 * `angle` is a CSS gradient angle in degrees.
 */
export const backdrops = [
  { id: "dusk", name: "Dusk", angle: 135, stops: ["#2b1d52", "#c2477a", "#f6a36b"] },
  { id: "ember", name: "Ember", angle: 120, stops: ["#ff7a59", "#e8457c", "#7a3fd1"] },
  { id: "lagoon", name: "Lagoon", angle: 135, stops: ["#0b2a4a", "#1c7fa6", "#8fe3d0"] },
  { id: "mint", name: "Mint", angle: 150, stops: ["#b9f3d0", "#5fc9a8", "#2f8f83"] },
  { id: "blush", name: "Blush", angle: 135, stops: ["#fde2d2", "#f9b7a7", "#f58fa0"] },
  { id: "paper", name: "Paper", angle: 180, stops: ["#fafafa", "#e4e4e4"] },
  { id: "ink", name: "Ink", angle: 160, stops: ["#2a2d35", "#0c0d10"] },
] as const;

/** Motion values for Motion (JS) animations. Mirrors the CSS tokens. */
export const motionTokens = {
  easeOut: [0.23, 1, 0.32, 1],
  easeInOut: [0.77, 0, 0.175, 1],
  /** Press, hover and other direct feedback */
  press: { type: "spring", duration: 0.3, bounce: 0 },
  /** Elements entering the page */
  enter: { duration: 0.3, ease: [0.23, 1, 0.32, 1] },
  /** Small popovers and tooltips */
  popover: { duration: 0.15, ease: [0.23, 1, 0.32, 1] },
} as const;
