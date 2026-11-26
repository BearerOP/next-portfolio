import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type LabelTone = "muted" | "default";

export interface LabelProps {
  children: ReactNode;
  /** `muted` for annotations (default), `default` for values that should read as content. */
  tone?: LabelTone;
  /** Render as a different element when the label is a heading or a term. */
  as?: "span" | "p" | "h2" | "h3" | "dt" | "dd";
  /** Layout only (margin, flex placement). Never colour or type. */
  className?: string;
}

const tones: Record<LabelTone, string> = {
  muted: "text-muted-foreground",
  default: "text-foreground",
};

/**
 * Drawing annotation: small uppercase mono text.
 * Use for panel headers, field names, indices ("01 // WORK") and metadata.
 * Do not use for sentences; body copy is plain text.
 */
export function Label({ children, tone = "muted", as: Tag = "span", className }: LabelProps) {
  return (
    <Tag className={cn("font-mono text-label uppercase", tones[tone], className)}>{children}</Tag>
  );
}
