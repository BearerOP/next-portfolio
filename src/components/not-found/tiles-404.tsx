"use client";

import { useState, type CSSProperties } from "react";

// 3 x 5 glyphs, first row first
const GLYPHS = {
  "4": ["101", "101", "111", "001", "001"],
  "0": ["111", "101", "101", "101", "111"],
} as const;
const TEXT = ["4", "0", "4"] as const;
const GLYPH_WIDTH = 3;
const GLYPH_HEIGHT = 5;
const GAP = 1;
// One tile of margin around the numerals on every side
const MARGIN = 1;
const WIDTH = TEXT.length * GLYPH_WIDTH + (TEXT.length - 1) * GAP + MARGIN * 2;
const HEIGHT = GLYPH_HEIGHT + MARGIN * 2;
/** How far the swell reaches, in tiles. */
const REACH = 2.6;

function isLit(column: number, row: number) {
  const x = column - MARGIN;
  const y = row - MARGIN;
  if (x < 0 || y < 0 || y >= GLYPH_HEIGHT) return false;
  const character = TEXT[Math.floor(x / (GLYPH_WIDTH + GAP))];
  const within = x % (GLYPH_WIDTH + GAP);
  return character !== undefined && within < GLYPH_WIDTH && GLYPHS[character][y][within] === "1";
}

const tiles = Array.from({ length: WIDTH * HEIGHT }, (_, index) => {
  const column = index % WIDTH;
  const row = Math.floor(index / WIDTH);
  return { column, row, lit: isLit(column, row) };
});

/**
 * "404" pressed into a slab of 3D tiles seen in perspective. The tile under
 * the pointer lifts and its neighbours rise with it, less the further away.
 * The geometry is pure CSS (`.tiles-*` in globals.css); this component lays
 * out the grid and tells each tile how far to rise.
 */
export function Tiles404() {
  const [hovered, setHovered] = useState<{ column: number; row: number } | null>(null);

  const liftFor = (column: number, row: number): CSSProperties | undefined => {
    if (!hovered) return undefined;
    const distance = Math.hypot(column - hovered.column, row - hovered.row);
    const strength = Math.max(0, 1 - distance / REACH);
    // Set on the tile itself (not a parent), so only that tile restyles
    return { "--lift": `calc(var(--rise) * ${strength.toFixed(3)})` } as CSSProperties;
  };

  return (
    <div
      role="img"
      aria-label="404, pressed into a field of tiles in perspective"
      className="tiles-stage px-4 py-12"
    >
      <div
        className="tiles-plane"
        style={{ "--columns": WIDTH } as CSSProperties}
        onPointerLeave={() => setHovered(null)}
      >
        {tiles.map(({ column, row, lit }) => (
          <div
            key={`${column}-${row}`}
            className="tiles-cell"
            data-lit={lit ? "" : undefined}
            onPointerEnter={() => setHovered({ column, row })}
          >
            <div className="tile" style={liftFor(column, row)} />
          </div>
        ))}
      </div>
    </div>
  );
}
