import { cn } from "@/lib/utils";

export interface StatusDotProps {
  /** `live` pulses; use it only for something happening right now. */
  state?: "live" | "idle";
}

/**
 * Status indicator. `live` = green and pulsing (current job, now playing),
 * `idle` = neutral. Always pair it with a text label; colour alone is not a status.
 */
export function StatusDot({ state = "idle" }: StatusDotProps) {
  return (
    <span aria-hidden="true" className="relative inline-flex size-1.5 shrink-0">
      {state === "live" && (
        <span className="absolute inline-flex size-full rounded-full bg-live opacity-75 motion-safe:animate-ping" />
      )}
      <span
        className={cn(
          "relative inline-flex size-1.5 rounded-full",
          state === "live" ? "bg-live" : "bg-muted-foreground"
        )}
      />
    </span>
  );
}
