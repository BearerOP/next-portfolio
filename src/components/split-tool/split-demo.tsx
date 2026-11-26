"use client";

import { Check, Download, GripVertical, RotateCcw } from "lucide-react";
import { Button, Segmented } from "@/components/stageshow/kit/controls";
import { Stage } from "@/components/stageshow/kit/stage";
import type { Act } from "@/components/stageshow/kit/act";
import { useStageTheme } from "./split-tiles";
import "./split-demo.css";

/*
 * A cursor walkthrough of the tool, for the lead tile of the /split bento.
 * Built on the Stageshow kit (src/components/stageshow): the kit draws the
 * cursor, measures targets and plays the script; the scene is styled to the
 * portfolio in split-demo.css.
 *
 * The story, one loop of about ten seconds:
 *   1. The cursor takes the first seam and drags it left: part 1 narrows,
 *      part 2 widens, and the widths under the picture follow.
 *   2. It presses Download: the three parts tick off, first to last.
 *   3. It presses reset: the seam glides back and the loop is where it began.
 *
 * Illustration only: nothing here is a live control.
 */

/** The picture being cut, in source pixels. */
const SOURCE_WIDTH = 1200;
const EQUAL = [1 / 3, 2 / 3] as const;
/** Where the script leaves the first seam. */
const DRAGGED = 0.24;
const FRAME_HEIGHT = 132;
const WIDE = 478;
const COMPACT = 340;

interface Scene {
  /** The first seam, as a share of the frame's width. */
  seam: number;
  held: boolean;
  /** How many parts have ticked off as saved. */
  saved: number;
}

const START: Scene = { seam: EQUAL[0], held: false, saved: 0 };
// The frame people see when nothing plays: the result, left on screen
const POSTER: Scene = { seam: DRAGGED, held: false, saved: 3 };

const script = async (a: Act<Scene>) => {
  await a.wait(900);

  // 1. Drag the first seam left
  await a.move("seam");
  const from = a.center("seam");
  const frame = a.rect("frame", { layout: true });
  await a.set({ held: true });
  await a.drag(
    { x: frame.x + frame.width * DRAGGED, y: from.y },
    (at) => a.put({ seam: (at.x - frame.x) / frame.width }),
    { duration: 1000, cursor: "preserve" }
  );
  await a.set({ held: false, seam: DRAGGED });
  await a.wait(500);

  // 2. Download: the parts tick off in order
  await a.click("download");
  await a.wait(150);
  await a.stagger([1, 2, 3], (count) => a.set({ saved: count }), 140);
  await a.wait(2000);

  // 3. Reset, so the loop returns to its start for a reason
  await a.click("reset");
  await a.set(START);
  await a.wait(500);
  await a.move("rest");
  await a.wait(700);
};

const widths = (seam: number) => {
  const first = Math.round(seam * SOURCE_WIDTH);
  const second = Math.round(EQUAL[1] * SOURCE_WIDTH);
  return [first, second - first, SOURCE_WIDTH - second];
};

export function SplitDemo() {
  const theme = useStageTheme();

  return (
    <Stage<Scene>
      width={WIDE}
      height={236}
      compact={{ below: 440, width: COMPACT, height: 236 }}
      initial={START}
      poster={POSTER}
      script={script}
      cursor={{ at: "rest", style: "arrow", ripple: true }}
      theme={theme}
      palette="mono"
      className="split-demo"
    >
      {(scene, _rect, layout) => {
        const width = layout === "compact" ? COMPACT : WIDE;
        const seams = [scene.seam, EQUAL[1]];
        const held = scene.held || undefined;
        const done = scene.saved === 3;
        return (
          <>
            <div className="sd-frame" data-target="frame" style={{ width, height: FRAME_HEIGHT }}>
              {/* One drawing across the whole frame: the seams cut it, they do not move it */}
              <svg className="sd-art" width={width} height={FRAME_HEIGHT} viewBox={`0 0 ${width} ${FRAME_HEIGHT}`}>
                <text
                  x={width / 2}
                  y={88}
                  textAnchor="middle"
                  textLength={width * 0.8}
                  lengthAdjust="spacingAndGlyphs"
                  fill="currentColor"
                  style={{ fontFamily: "var(--font-geist-sans), sans-serif", fontWeight: 700, fontSize: width * 0.17 }}
                >
                  PANORAMA
                </text>
                <path
                  d={`M0 112 C ${width * 0.15} 100, ${width * 0.25} 124, ${width * 0.4} 112 S ${width * 0.65} 100, ${width * 0.8} 112 S ${width * 0.95} 118, ${width} 110`}
                  fill="none"
                  stroke="currentColor"
                  strokeOpacity={0.4}
                />
              </svg>
              {[0, ...seams].map((at, index) => (
                <span
                  key={index}
                  className="sd-badge"
                  data-held={index === 1 ? held : undefined}
                  style={{ transform: `translateX(${at * width}px)` }}
                >
                  {index + 1}
                </span>
              ))}
              {seams.map((at, index) => (
                <span
                  key={index}
                  className="sd-seam"
                  data-target={index === 0 ? "seam" : undefined}
                  data-cursor={index === 0 ? "resize-ew" : undefined}
                  data-held={index === 0 ? held : undefined}
                  style={{ transform: `translateX(${at * width}px)` }}
                >
                  <span className="sd-grip">
                    <GripVertical size={12} />
                  </span>
                </span>
              ))}
            </div>

            <div className="sd-cells" style={{ top: FRAME_HEIGHT + 12, width }}>
              {widths(scene.seam).map((part, index) => (
                <div key={index} className="sd-cell">
                  <span className="sd-cell__index">{index + 1}</span>
                  <span>
                    {part}
                    {layout === "wide" && <span className="sd-cell__unit"> px</span>}
                  </span>
                  <span className="sd-tick" data-on={scene.saved > index || undefined}>
                    <Check size={14} />
                  </span>
                </div>
              ))}
            </div>

            <div className="sd-row" style={{ top: FRAME_HEIGHT + 58, width }}>
              <span className="sd-label">Parts</span>
              <Segmented items={["2", "3", "4"]} value={1} />
              <span className="sd-spacer" />
              <Button data-target="reset" data-cursor="pointer" variant="ghost" icon={<RotateCcw size={14} />} aria-label="Reset" />
              <Button
                data-target="download"
                data-cursor="pointer"
                variant="primary"
                icon={done ? <Check size={14} /> : <Download size={14} />}
              >
                {done ? "Saved" : "Download"}
              </Button>
            </div>

            <span data-target="rest" className="sd-rest" style={{ left: width - 150, top: FRAME_HEIGHT + 100 }} />
          </>
        );
      }}
    </Stage>
  );
}
