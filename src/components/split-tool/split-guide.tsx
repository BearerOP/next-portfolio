import type { ReactNode } from "react";
import { Annotation, Panel } from "@/components/ds";
import { cn } from "@/lib/utils";
import { SplitDemo } from "./split-demo";
import {
  AttachDemo,
  DropDemo,
  FrameDemo,
  LimitDemo,
  ShapeDemo,
  WeightDemo,
} from "./split-tiles";

/*
 * Two ruled bento grids under the /split tool: how to cut a picture, then
 * why. Every tile's picture is a small Stageshow demo in which an arrow
 * cursor does one thing (split-demo.tsx for the lead tile, split-tiles.tsx
 * for the rest).
 *
 *   How        The cursor…
 *   Open       drags a file into the drop area
 *   Frame      changes the part count; the seams slide
 *   Attach     adds the three parts to a post, in order
 *
 *   Why        Span   The cursor…
 *   Limit      1 × 2  adds images until the post's four slots are full (the tall tile)
 *   Continuous 2 × 1  drags a seam, downloads, resets (the lead)
 *   Shape      1 × 1  picks a ratio
 *   Weight     1 × 1  changes format; the size rolls
 *
 * The pictures are illustrations, not live controls, so they are hidden from
 * assistive tech; the copy beside each one says the same thing.
 */

/** One cell of a ruled grid. The copy sits on top; the picture hangs below it. */
function Tile({
  lead,
  children,
  picture,
  className,
}: {
  /** The tile's title. */
  lead: string;
  children: ReactNode;
  picture: ReactNode;
  /** Layout only: the cell's span. */
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-6 bg-background p-4", className)}>
      {/* A large title with one quiet sentence under it; the picture carries the rest */}
      <div>
        <h3 className="font-sans text-xl font-semibold leading-tight tracking-tight">{lead}</h3>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{children}</p>
      </div>
      <div aria-hidden="true" className="mt-auto">
        {picture}
      </div>
    </div>
  );
}

/** The grid: hairlines show through the 1px gaps between opaque cells. */
function Ruled({ children }: { children: ReactNode }) {
  return <div className="grid gap-px bg-line md:grid-cols-3">{children}</div>;
}

/** How and why, as two ruled grids. Sits under the tool on /split. */
export function SplitGuide() {
  return (
    <>
      <Panel
        label="Guide // How_to"
        meta="03 steps"
        annotation={<Annotation side="left">stays on your device</Annotation>}
      >
        <Ruled>
          <Tile lead="1. Open a wide image" picture={<DropDemo />}>
            Choose it, drop it on the canvas, or paste it. Landscape works best.
          </Tile>
          <Tile lead="2. Frame and cut" picture={<FrameDemo />}>
            Pick two, three or four parts, then drag the crop and the seams.
          </Tile>
          <Tile lead="3. Attach in order" picture={<AttachDemo />}>
            Download the parts and add them to one post, first to last.
          </Tile>
        </Ruled>
      </Panel>

      <Panel label="Notes // Why_split" meta="04 notes">
        {/* One tall tile down the left, small tiles beside it, the wide lead under them */}
        <Ruled>
          <Tile lead="Room for more" picture={<LimitDemo />} className="md:row-span-2">
            A single post takes several images. Split uses them for one.
          </Tile>
          <Tile lead="Choose the shape" picture={<ShapeDemo />}>
            Lock each part to a ratio a feed shows uncropped, or keep the original height.
          </Tile>
          <Tile lead="Know the weight first" picture={<WeightDemo />}>
            Every format is encoded as you work, so the size is a number, not a surprise.
          </Tile>
          <Tile lead="One picture, several attachments" picture={<SplitDemo />} className="md:col-span-2">
            Cut into parts and attached in order, a wide image fills the whole row and reads as
            one continuous picture.
          </Tile>
        </Ruled>
      </Panel>
    </>
  );
}
