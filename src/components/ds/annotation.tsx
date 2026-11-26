import { cn } from "@/lib/utils";

export interface AnnotationProps {
  /** Two or three words, lowercase, like a note pencilled beside the drawing. */
  children: string;
  /** Which gutter the note sits in. Its arrow points inward, at the content. */
  side: "left" | "right";
  /** Where along the target's height the note sits. */
  align?: "top" | "bottom";
}

const alignment = {
  top: "top-6",
  bottom: "bottom-6",
} as const;

/**
 * A handwritten margin note with an arrow. It sits OUTSIDE the content
 * column, in the gutter, pointing in at the thing worth noticing.
 *
 * The nearest positioned ancestor is the target: `Panel` is already
 * positioned (pass it via the `annotation` prop); elsewhere add `relative`.
 * Decorative: hidden from assistive tech, and hidden below `lg` where there
 * is no gutter, so never use it for information the reader needs.
 */
export function Annotation({ children, side, align = "top" }: AnnotationProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute hidden select-none items-end gap-2 text-muted-foreground lg:flex",
        alignment[align],
        // Clear the column padding and the hatched strip before the note starts
        side === "left" ? "right-full mr-12" : "left-full ml-12 flex-row-reverse"
      )}
    >
      <span className="-rotate-3 whitespace-nowrap pb-3 font-hand text-xl leading-none">{children}</span>
      <svg
        viewBox="0 0 40 28"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn("h-7 w-10 shrink-0", side === "right" && "-scale-x-100")}
      >
        <path d="M3 3c3 12 14 19 32 17" />
        <path d="M27 13l8 7-9 5" />
      </svg>
    </span>
  );
}
