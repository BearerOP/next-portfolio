/**
 * Configuration for `pnpm lint:ds` (scripts/ds-lint.mjs).
 * Rules and their reasons are documented in DESIGN.md.
 */
export default {
  /** Where application UI lives. Everything here is linted unless ignored below. */
  include: ["src/app", "src/components"],

  /** The design system itself. `@ds-replaces` and `@ds-limit` tags are read from here. */
  componentsDir: "src/components/ds",

  /** The only source files allowed to contain raw colour values. */
  tokenFiles: ["src/components/ds/tokens.ts"],

  ignore: [
    // Vendored shadcn/ui and Magic UI primitives. They follow the tokens through
    // the CSS variables in globals.css, but their markup is not ours to restyle.
    "src/components/ui",
    "src/components/magicui",
    // The vendored Stageshow kit (MIT), which draws the cursor walkthrough on
    // /split. It is restyled to the site's tokens from split-demo.css.
    "src/components/stageshow",
    // The standalone demo components shown on /craft, and their code snippets.
    // Visitors copy these, so they deliberately carry their own colours and raw
    // markup. The /craft page itself (src/components/craft-page) IS linted.
    "src/components/craft",
    // Legacy components that nothing imports. Delete them, or migrate them to
    // the design system and remove them from this list. Do not add to it.
    "src/components/archive-icon.tsx",
    "src/components/contribution-grid.tsx",
    "src/components/copy-button.tsx",
    "src/components/figma-button.tsx",
    "src/components/github.tsx",
    "src/components/video-player-component.tsx",
    "src/components/volume-icon.tsx",
  ],
};
