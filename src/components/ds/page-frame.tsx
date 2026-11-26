import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Petal, type PetalProps } from "./petal";

// Petals grow in from the outer edge of each margin, flush against it and
// fully visible. Only their height along the page varies.
const petals: Record<"left" | "right", readonly Pick<PetalProps, "size" | "className">[]> = {
  left: [
    { size: "lg", className: "top-40" },
    { size: "md", className: "top-1/3" },
    { size: "lg", className: "top-2/3" },
    { size: "sm", className: "bottom-32" },
  ],
  right: [
    { size: "md", className: "top-24" },
    { size: "lg", className: "top-1/2" },
    { size: "sm", className: "top-3/4" },
    { size: "lg", className: "bottom-16" },
  ],
};

function Gutter({ side }: { side: "left" | "right" }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative hidden overflow-hidden bg-grid bg-grid-cell lg:block",
        side === "left" ? "col-start-1" : "col-start-3"
      )}
    >
      {petals[side].map((petal) => (
        <Petal key={petal.className} side={side} {...petal} />
      ))}
      {/* Hatched strip on the edge that touches the content column */}
      <div
        className={cn(
          "absolute inset-y-0 w-4 border-x border-line bg-hatch",
          side === "left" ? "right-0" : "left-0"
        )}
      />
    </div>
  );
}

/**
 * The drawing sheet: a centred content column between two gridded gutters.
 * Used once per page. Pages render their Panels inside it; each Panel's top
 * and bottom rules run on across both gutters (`cross-rules`).
 */
export function PageFrame({ children }: { children: ReactNode }) {
  return (
    <div className="grid min-h-screen grid-cols-frame">
      <Gutter side="left" />
      {/* Above the gutters, so the cross rules read the same on both sides */}
      <div className="relative z-10 col-start-2 flex min-w-0 flex-col gap-6 px-4 py-8">{children}</div>
      <Gutter side="right" />
    </div>
  );
}
