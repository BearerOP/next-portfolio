import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Label } from "./label";
import { StatusDot } from "./status-dot";

export interface PanelProps {
  /** Header annotation, e.g. "PROFILE // ABOUT". Rendered as the section heading. */
  label: string;
  /** Right-aligned header metadata, e.g. "TOTAL: 08". */
  meta?: ReactNode;
  /** Footer annotation row. */
  footer?: ReactNode;
  /** Marks the header dot as live. Use only when the panel shows real-time data. */
  live?: boolean;
  /** An `<Annotation>` to pin in the gutter beside this panel. */
  annotation?: ReactNode;
  /** Anchor id for in-page navigation. */
  id?: string;
  children: ReactNode;
}

/**
 * The page's unit of content: a ruled box with a header strip.
 * Every home-page section is one Panel. Panels do not nest; divide a panel's
 * interior with `PanelSection`.
 */
export function Panel({ label, meta, footer, live = false, id, annotation, children }: PanelProps) {
  return (
    <section id={id} aria-label={label} className="cross-rules border border-line-strong bg-background">
      {annotation}
      <header className="flex items-center justify-between gap-4 border-b border-line bg-fill px-4 py-2">
        <span className="flex min-w-0 items-center gap-2">
          <StatusDot state={live ? "live" : "idle"} />
          <Label as="h2" tone="default" className="truncate">
            {label}
          </Label>
        </span>
        {meta && <Label className="shrink-0">{meta}</Label>}
      </header>
      {children}
      {footer && (
        <footer className="flex items-center justify-between gap-4 border-t border-line px-4 py-2">
          {footer}
        </footer>
      )}
    </section>
  );
}

export interface PanelSectionProps {
  /** Small annotation above the content, e.g. "01 // WHO_I_AM". */
  label?: string;
  children: ReactNode;
  /** `none` when the content draws to the panel edge (images, tables). */
  padding?: "default" | "none";
  /** Layout only (grid placement, borders between siblings). */
  className?: string;
}

/** A padded block inside a Panel. Siblings are separated by a rule. */
export function PanelSection({ label, children, padding = "default", className }: PanelSectionProps) {
  return (
    <div className={cn("border-b border-line last:border-b-0", padding === "default" && "p-4", className)}>
      {label && (
        <Label as="p" className="mb-2">
          {label}
        </Label>
      )}
      {children}
    </div>
  );
}
