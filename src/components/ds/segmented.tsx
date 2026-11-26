"use client";

import { cn } from "@/lib/utils";

export interface SegmentedOption<Value extends string> {
  value: Value;
  label: string;
}

export interface SegmentedProps<Value extends string> {
  options: readonly SegmentedOption<Value>[];
  value: Value;
  onChange: (value: Value) => void;
  /** Names the setting for assistive tech, e.g. "Number of parts". */
  "aria-label": string;
}

/**
 * Picks one value of a setting from a short, fixed set (2 to 5 options).
 * Selection is instant: nothing animates.
 * Use `Tabs` to switch between views, and `Button` for actions.
 */
export function Segmented<Value extends string>({
  options,
  value,
  onChange,
  ...rest
}: SegmentedProps<Value>) {
  return (
    <div role="radiogroup" aria-label={rest["aria-label"]} className="inline-flex border border-line-strong">
      {options.map((option) => {
        const selected = option.value === value;
        return (
          // ds-lint-disable-next-line raw-html -- Segmented owns its own joined cells; Button is a free-standing control
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(option.value)}
            data-hover-sound=""
            className={cn(
              "h-8 select-none border-r border-line-strong px-3 font-mono text-label uppercase last:border-r-0",
              "transition-[background-color,color] duration-press ease-out",
              "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-ring",
              selected
                ? "bg-foreground text-background"
                : "bg-background text-muted-foreground hover:bg-fill-strong hover:text-foreground"
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
