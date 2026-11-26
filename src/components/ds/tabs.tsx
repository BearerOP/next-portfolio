"use client";

import { cn } from "@/lib/utils";
import { Label } from "./label";

export interface TabItem<Id extends string> {
  id: Id;
  label: string;
  /** Small annotation above the label, e.g. "01 // Animation". `cells` variant only. */
  annotation?: string;
}

export interface TabsProps<Id extends string> {
  items: readonly TabItem<Id>[];
  value: Id;
  onChange: (id: Id) => void;
  /** Names the group for assistive tech, e.g. "Component". */
  "aria-label": string;
  /** `cells`: a ruled grid of choices (an index). `line`: compact text tabs above content. */
  variant?: "cells" | "line";
}

/**
 * Switches between views of the same thing. Selection is instant: tabs are
 * pressed often, so nothing animates.
 * Use `Button href` for navigation to another page, not Tabs.
 */
export function Tabs<Id extends string>({
  items,
  value,
  onChange,
  variant = "line",
  ...rest
}: TabsProps<Id>) {
  return (
    <div
      role="tablist"
      aria-label={rest["aria-label"]}
      className={cn(
        variant === "cells" ? "grid grid-cols-2 md:grid-cols-4" : "flex border-b border-line"
      )}
    >
      {items.map((item) => {
        const selected = item.id === value;
        return (
          // ds-lint-disable-next-line raw-html -- Tabs owns its own tab buttons; Button is a fixed-height control
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(item.id)}
            className={cn(
              "text-left transition-colors duration-ui ease-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-ring",
              variant === "cells"
                ? "flex flex-col gap-1 border-b border-r border-line p-4 hover:bg-fill"
                : "-mb-px border-b px-4 py-2 font-mono text-caption uppercase",
              variant === "cells" && selected && "bg-fill-strong",
              variant === "line" &&
                (selected
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground")
            )}
          >
            {variant === "cells" ? (
              <>
                {item.annotation && <Label tone={selected ? "default" : "muted"}>{item.annotation}</Label>}
                <span
                  className={cn(
                    "font-sans text-sm font-semibold",
                    selected ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {item.label}
                </span>
              </>
            ) : (
              item.label
            )}
          </button>
        );
      })}
    </div>
  );
}
