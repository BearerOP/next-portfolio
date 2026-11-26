import type { ReactNode } from "react";

export interface TagProps {
  children: string;
  /** 14px icon or logo shown before the text. */
  icon?: ReactNode;
}

/**
 * Static chip for a technology or skill. Not interactive: if it needs to be
 * clicked, it is a `Button`.
 */
export function Tag({ children, icon }: TagProps) {
  return (
    <span className="media-mono-group inline-flex h-7 items-center gap-2 border border-line-strong bg-fill px-2 font-mono text-caption text-foreground">
      {icon && <span className="media-mono flex size-3.5 shrink-0 items-center justify-center">{icon}</span>}
      {children}
    </span>
  );
}
