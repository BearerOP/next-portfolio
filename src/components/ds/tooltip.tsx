"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { motionTokens } from "./tokens";

/** Delay before the first tooltip opens. */
const OPEN_DELAY_MS = 600;
/** After one closes, neighbours open instantly for this long. */
const WARM_WINDOW_MS = 1500;

// Shared across every Tooltip so moving between neighbours skips the delay
// and the animation. Module state, so it never re-renders a parent.
let lastClosedAt = 0;

export interface TooltipProps {
  /** Short text. One line, no punctuation. */
  content: string;
  /** Which side of the trigger it opens on. It scales from that edge. */
  side?: "top" | "bottom";
  children: ReactNode;
}

const sideStyles = {
  // The transform origin faces the trigger, so the tooltip grows out of it
  top: { position: "bottom-full mb-2", origin: "origin-bottom", offset: 4 },
  bottom: { position: "top-full mt-2", origin: "origin-top", offset: -4 },
} as const;

/**
 * Names an icon-only control on hover and keyboard focus.
 * Origin-aware: scales from the edge nearest its trigger. The first one waits
 * 600ms; neighbours hovered right after open instantly with no animation.
 * The trigger must already have an accessible name (`aria-label`); the tooltip
 * is a visual hint, not the label.
 */
export function Tooltip({ content, side = "top", children }: TooltipProps) {
  const [open, setOpen] = useState(false);
  const [instant, setInstant] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const id = useId();
  const styles = sideStyles[side];

  useEffect(() => () => clearTimeout(timer.current), []);

  const show = () => {
    const warm = Date.now() - lastClosedAt < WARM_WINDOW_MS;
    setInstant(warm);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpen(true), warm ? 0 : OPEN_DELAY_MS);
  };

  const hide = () => {
    clearTimeout(timer.current);
    if (open) lastClosedAt = Date.now();
    setOpen(false);
  };

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      aria-describedby={open ? id : undefined}
    >
      {children}
      <AnimatePresence>
        {open && (
          <motion.span
            id={id}
            role="tooltip"
            initial={{ opacity: 0, scale: 0.97, y: styles.offset }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={instant ? { duration: 0 } : motionTokens.popover}
            className={cn(
              "pointer-events-none absolute left-1/2 z-50 -translate-x-1/2 whitespace-nowrap border border-line-strong bg-foreground px-2 py-1 font-mono text-label uppercase text-background",
              styles.position,
              styles.origin
            )}
          >
            {content}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
