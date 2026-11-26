"use client";

import { Check, ImagePlus, Minus, Plus, X } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState, type ReactNode } from "react";
import type { Act, Script } from "@/components/stageshow/kit/act";
import { Button, Segmented } from "@/components/stageshow/kit/controls";
import type { Point } from "@/components/stageshow/kit/measure";
import { Count } from "@/components/stageshow/kit/motion/Count";
import { Stage } from "@/components/stageshow/kit/stage";
import "./split-demo.css";

/*
 * The small cursor demos in the /split bento, one per tile. Each is its own
 * Stageshow stage, drawn at 1:1, with the arrow cursor doing one thing and
 * then undoing it, so every loop ends where it began for a visible reason.
 * Stages only play while on screen. Styles are in split-demo.css.
 *
 * Illustrations only: nothing here is a live control.
 */

/** The picture slot of a one-column tile. */
const NARROW = 222;

/** The stage follows the site's theme once it is known (dark until then, the site default). */
export function useStageTheme() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted && resolvedTheme === "light" ? "light" : "dark";
}

/** A stage with the look and cursor every tile shares. */
function Demo<S extends object>({
  width = NARROW,
  height,
  compact,
  initial,
  poster,
  script,
  children,
}: {
  width?: number;
  height: number;
  compact?: { below: number; width: number; height: number };
  initial: S;
  poster: S;
  script: Script<S>;
  children: (scene: S, layout: "wide" | "compact") => ReactNode;
}) {
  const theme = useStageTheme();
  return (
    <Stage<S>
      width={width}
      height={height}
      compact={compact}
      initial={initial}
      poster={poster}
      script={script}
      cursor={{ at: "rest", style: "arrow", ripple: true }}
      theme={theme}
      palette="mono"
      className="split-demo split-demo--tile"
    >
      {(scene, _rect, layout) => (
        <>
          {children(scene, layout)}
          <span data-target="rest" className="sd-rest sd-rest--corner" />
        </>
      )}
    </Stage>
  );
}

const on = (value: boolean) => (value ? "" : undefined);

/* ── 1. Open: a file is dragged into the drop area, then cleared ─────────── */

interface DropScene {
  at: Point | null;
  dropped: boolean;
}
const CHIP = { width: 104, height: 24 };

const dropScript = async (a: Act<DropScene>) => {
  await a.wait(500);
  await a.move("file");
  const zone = a.rect("zone", { layout: true });
  await a.drag(
    { x: zone.x + zone.width / 2, y: zone.y + zone.height / 2 },
    (at) => a.put({ at }),
    { duration: 900 }
  );
  await a.set({ at: null, dropped: true });
  await a.wait(1800);
  await a.click("clear");
  await a.set({ dropped: false });
  await a.wait(500);
  await a.move("rest");
  await a.wait(500);
};

export function DropDemo() {
  return (
    <Demo<DropScene>
      height={104}
      initial={{ at: null, dropped: false }}
      poster={{ at: null, dropped: true }}
      script={dropScript}
    >
      {(scene) => {
        const resting = { x: 0, y: 80 };
        const landed = { x: (NARROW - CHIP.width) / 2, y: (68 - CHIP.height) / 2 };
        const place = scene.at
          ? { x: scene.at.x - CHIP.width / 2, y: scene.at.y - CHIP.height / 2 }
          : scene.dropped
            ? landed
            : resting;
        return (
          <>
            <div className="sd-zone" data-target="zone" data-filled={on(scene.dropped)} />
            {/* One chip throughout: it rests, is carried, and lands */}
            <div
              className="sd-chip"
              data-target="file"
              data-cursor="open"
              data-held={on(scene.at !== null)}
              style={{ transform: `translate(${place.x}px, ${place.y}px)`, ...CHIP }}
            >
              <ImagePlus size={12} />
              <span>pano.png</span>
              <span className="sd-chip__clear" data-target="clear" data-cursor="pointer" data-on={on(scene.dropped)}>
                <X size={12} />
              </span>
            </div>
          </>
        );
      }}
    </Demo>
  );
}

/* ── 2. Frame: the part count re-cuts the picture ────────────────────────── */

const COUNTS = [2, 3, 4] as const;

const frameScript = async (a: Act<{ parts: number }>) => {
  await a.wait(900);
  await a.click("count-2");
  await a.set({ parts: 2 });
  await a.wait(1300);
  await a.click("count-0");
  await a.set({ parts: 0 });
  await a.wait(1300);
  await a.click("count-1");
  await a.set({ parts: 1 });
  await a.wait(500);
  await a.move("rest");
  await a.wait(600);
};

export function FrameDemo() {
  return (
    <Demo<{ parts: number }> height={104} initial={{ parts: 1 }} poster={{ parts: 1 }} script={frameScript}>
      {(scene) => {
        const parts = COUNTS[scene.parts];
        return (
          <>
            <div className="sd-frame sd-frame--small" style={{ width: NARROW }}>
              {/* Three seams always exist; the ones not in use wait past the right edge */}
              {[1, 2, 3].map((seam) => {
                const used = seam < parts;
                const x = (used ? seam / parts : 1) * NARROW;
                return (
                  <span key={seam} className="sd-slide" style={{ transform: `translateX(${x}px)` }}>
                    <span className="sd-rule" />
                    <span className="sd-badge sd-badge--inline" data-on={on(used)}>
                      {seam + 1}
                    </span>
                  </span>
                );
              })}
              <span className="sd-badge">1</span>
            </div>
            <div className="sd-row" style={{ top: 72, width: NARROW }}>
              <span className="sd-label">Parts</span>
              <Segmented items={["2", "3", "4"]} value={scene.parts} targets={["count-0", "count-1", "count-2"]} cursor="pointer" />
            </div>
          </>
        );
      }}
    </Demo>
  );
}

/* ── 3. Attach: the parts are added to a post in order ───────────────────── */

const FILES = ["pano-1.webp", "pano-2.webp", "pano-3.webp"] as const;

const attachScript = async (a: Act<{ attached: number }>) => {
  await a.wait(1300);
  for (let index = 0; index < FILES.length; index++) {
    await a.click(`file-${index}`);
    await a.set({ attached: index + 1 });
    await a.wait(250);
  }
  await a.wait(1600);
  await a.click("detach");
  await a.set({ attached: 0 });
  await a.wait(400);
  await a.move("rest");
  await a.wait(500);
};

export function AttachDemo() {
  return (
    <Demo<{ attached: number }> height={104} initial={{ attached: 0 }} poster={{ attached: 3 }} script={attachScript}>
      {(scene) => (
        <div className="sd-stack">
          {FILES.map((file, index) => (
            <div
              key={file}
              className="sd-file"
              data-target={`file-${index}`}
              data-cursor="pointer"
              data-on={on(scene.attached > index)}
            >
              <span className="sd-file__index">{index + 1}</span>
              <span className="sd-file__name">{file}</span>
              {/* Pressing the first row's tick again removes them all */}
              <span
                className="sd-tick"
                data-on={on(scene.attached > index)}
                data-target={index === 0 ? "detach" : undefined}
              >
                <Check size={14} />
              </span>
            </div>
          ))}
        </div>
      )}
    </Demo>
  );
}

/* ── 4. Limit: images are added to a post until it is full ───────────────── */

const MOST = 4;

const limitScript = async (a: Act<{ images: number }>) => {
  await a.wait(1700);
  for (let images = 2; images <= MOST; images++) {
    await a.click("more");
    await a.set({ images });
    await a.wait(350);
  }
  await a.wait(1700);
  for (let images = MOST - 1; images >= 1; images--) {
    await a.click("fewer");
    await a.set({ images });
    await a.wait(200);
  }
  await a.move("rest");
  await a.wait(500);
};

export function LimitDemo() {
  return (
    <Demo<{ images: number }> height={436} initial={{ images: 1 }} poster={{ images: MOST }} script={limitScript}>
      {(scene) => (
        <div className="sd-stat">
          <span className="sd-label">Up to</span>
          <span className="sd-stat__number">
            <Count value={scene.images} duration={500} />
          </span>
          <div className="sd-inline">
            <Button size="small" data-target="fewer" data-cursor="pointer" icon={<Minus size={12} />} aria-label="Fewer" />
            <Button size="small" data-target="more" data-cursor="pointer" icon={<Plus size={12} />} aria-label="More" />
            <span className="sd-label">{scene.images === MOST ? "Post is full" : "Images in one post"}</span>
          </div>
          {/* The post's four attachment slots, filling as images are added */}
          <div className="sd-slots">
            {Array.from({ length: MOST }, (_, slot) => (
              <span key={slot} className="sd-slot" data-on={on(scene.images > slot)}>
                <span className="sd-file__index">{slot + 1}</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </Demo>
  );
}

/* ── 5. Shape: one ratio is picked at a time ─────────────────────────────── */

const SHAPES = [
  { name: "Original", width: 56, height: 32 },
  { name: "4:5", width: 32, height: 40 },
  { name: "1:1", width: 32, height: 32 },
  { name: "3:4", width: 36, height: 48 },
] as const;

const shapeScript = async (a: Act<{ picked: number }>) => {
  await a.wait(2100);
  for (const picked of [1, 3, 2, 0]) {
    await a.click(`shape-${picked}`);
    await a.set({ picked });
    await a.wait(picked === 1 ? 1500 : 800);
  }
  await a.move("rest");
  await a.wait(500);
};

export function ShapeDemo() {
  return (
    <Demo<{ picked: number }> height={84} initial={{ picked: 0 }} poster={{ picked: 1 }} script={shapeScript}>
      {(scene) => (
        <div className="sd-shapes">
          {SHAPES.map((shape, index) => (
            <div key={shape.name} className="sd-shape" data-on={on(scene.picked === index)}>
              <span
                className="sd-shape__box"
                data-target={`shape-${index}`}
                data-cursor="pointer"
                style={{ width: shape.width, height: shape.height }}
              />
              <span className="sd-label">{shape.name}</span>
            </div>
          ))}
        </div>
      )}
    </Demo>
  );
}

/* ── 6. Weight: the format changes what the parts weigh ──────────────────── */

// Measured by the tool itself on a 1200 × 630 illustration, three parts, quality 90
const FORMATS = [
  { name: "WebP", size: 106 },
  { name: "JPEG", size: 158 },
  { name: "PNG", size: 974 },
] as const;

const weightScript = async (a: Act<{ format: number }>) => {
  await a.wait(2500);
  for (const format of [1, 0]) {
    await a.click(`format-${format}`);
    await a.set({ format });
    await a.wait(format === 0 ? 1800 : 1000);
  }
  await a.click("format-2");
  await a.set({ format: 2 });
  await a.wait(400);
  await a.move("rest");
  await a.wait(500);
};

export function WeightDemo() {
  return (
    <Demo<{ format: number }> height={84} initial={{ format: 2 }} poster={{ format: 0 }} script={weightScript}>
      {(scene) => (
        <div className="sd-stack sd-stack--loose">
          <Segmented
            items={FORMATS.map((format) => format.name)}
            value={scene.format}
            targets={["format-0", "format-1", "format-2"]}
            cursor="pointer"
          />
          <div className="sd-inline">
            <span className="sd-track">
              <span
                className="sd-track__fill"
                style={{ transform: `scaleX(${FORMATS[scene.format].size / FORMATS[2].size})` }}
              />
            </span>
            <span className="sd-value">
              <Count value={FORMATS[scene.format].size} format={(size) => `${Math.round(size)} KB`} duration={600} />
            </span>
          </div>
        </div>
      )}
    </Demo>
  );
}
