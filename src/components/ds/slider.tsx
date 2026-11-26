"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export interface SliderProps {
  value: number;
  min?: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  /** Names the setting for assistive tech, e.g. "Zoom". */
  "aria-label": string;
  disabled?: boolean;
  /**
   * Set when the value is driven by a clock (playback) and arrives in steps
   * this many milliseconds apart: the thumb then travels between steps at a
   * steady speed instead of jumping. It still follows the pointer exactly
   * while dragged. Leave out for a setting the visitor sets by hand.
   */
  glideMs?: number;
}

/**
 * A value on a line: a hairline track, a solid fill, and a rectangular
 * frosted thumb. A native range input sits invisibly on top, so dragging,
 * arrow keys and screen readers all behave as the platform's own slider.
 *
 * Use for a continuous value (zoom, quality, a position in a track).
 * Use `Segmented` for a short fixed set of choices.
 * Takes the full width of its container.
 */
export function Slider({
  value,
  min = 0,
  max,
  step = 1,
  onChange,
  disabled = false,
  glideMs,
  ...rest
}: SliderProps) {
  const [dragging, setDragging] = useState(false);
  const fraction = max > min ? Math.min(1, Math.max(0, (value - min) / (max - min))) : 0;
  // Only transform moves, so the glide stays off the main thread
  const glide = {
    transitionDuration: glideMs && !dragging ? `${glideMs}ms` : "0ms",
  };

  return (
    <div className={cn("relative h-5 w-full touch-none", disabled && "opacity-40")}>
      <input
        type="range"
        aria-label={rest["aria-label"]}
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(Number(event.target.value))}
        onPointerDown={() => setDragging(true)}
        onPointerUp={() => setDragging(false)}
        onPointerCancel={() => setDragging(false)}
        onBlur={() => setDragging(false)}
        className="peer absolute inset-0 z-10 size-full cursor-pointer opacity-0 disabled:cursor-default"
      />
      {/* Inset by half the thumb, so the thumb never hangs over either end */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-1 inset-y-0 text-muted-foreground transition-colors duration-press ease-out peer-hover:text-foreground peer-focus-visible:text-foreground peer-active:text-foreground"
      >
        <div className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 overflow-hidden bg-line-strong">
          <div
            className="size-full origin-left bg-foreground transition-transform ease-linear motion-reduce:transition-none"
            style={{ transform: `scaleX(${fraction})`, ...glide }}
          />
        </div>
        {/* As wide as the track and shifted by a share of itself: the thumb rides its left edge */}
        <div
          className="absolute inset-0 transition-transform ease-linear motion-reduce:transition-none"
          style={{ transform: `translateX(${fraction * 100}%)`, ...glide }}
        >
          <span className="absolute left-0 top-1/2 h-4 w-2 -translate-x-1/2 -translate-y-1/2 border border-current bg-background/60 backdrop-blur-sm" />
        </div>
      </div>
    </div>
  );
}
