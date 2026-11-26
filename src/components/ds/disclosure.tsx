"use client";

import { ChevronDown } from "lucide-react";
import { useId, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface DisclosureProps {
  /** Always-visible row content. Must not contain links or buttons. */
  summary: ReactNode;
  /** Links or actions that belong to the row. Rendered beside the toggle, not inside it. */
  actions?: ReactNode;
  /** Revealed content. */
  children: ReactNode;
  defaultOpen?: boolean;
}

/**
 * A row that expands in place. Use for list items with secondary detail
 * (a job's responsibilities). The detail animates to its real height.
 *
 * `summary` sits inside the toggle button, so interactive elements go in
 * `actions`: a link inside a button is invalid HTML and unreachable by keyboard.
 */
export function Disclosure({ summary, actions, children, defaultOpen = false }: DisclosureProps) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();

  return (
    <div className="border-b border-line last:border-b-0">
      <div className="flex items-stretch">
        {/* ds-lint-disable-next-line raw-html -- full-row toggle; Button is a fixed-height control */}
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls={panelId}
          className="media-mono-group group flex min-w-0 flex-1 items-center gap-4 p-4 text-left transition-colors duration-ui ease-out hover:bg-fill focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-ring"
        >
          <span className="min-w-0 flex-1">{summary}</span>
          <ChevronDown
            aria-hidden="true"
            className={cn(
              "size-4 shrink-0 text-muted-foreground transition-transform duration-ui ease-out group-hover:text-foreground",
              open && "rotate-180"
            )}
          />
        </button>
      </div>
      {actions && <div className="flex flex-wrap gap-x-4 gap-y-2 px-4 pb-4">{actions}</div>}
      <div
        id={panelId}
        className={cn(
          // 0fr -> 1fr animates to the content's real height
          "grid transition-[grid-template-rows,opacity] duration-panel ease-out motion-reduce:transition-none",
          open ? "grid-rows-open opacity-100" : "invisible grid-rows-closed opacity-0"
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="border-t border-line-subtle p-4">{children}</div>
        </div>
      </div>
    </div>
  );
}
