import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface TextLinkProps {
  /** Internal path or absolute URL. External URLs open in a new tab. */
  href: string;
  children: ReactNode;
  /** `muted` for secondary links in metadata rows. */
  tone?: "default" | "muted";
  "aria-label"?: string;
}

/**
 * Inline link inside text or a metadata row. For a link that looks like a
 * control, use `<Button href>` instead.
 *
 * @ds-replaces a
 */
export function TextLink({ href, children, tone = "default", ...rest }: TextLinkProps) {
  const className = cn(
    "inline-flex items-center gap-1 underline decoration-line-strong underline-offset-4",
    "transition-colors duration-ui ease-out hover:decoration-foreground",
    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    tone === "muted" ? "text-muted-foreground hover:text-foreground" : "text-foreground"
  );

  if (/^(https?:|mailto:)/.test(href)) {
    return (
      // ds-lint-disable-next-line raw-html -- TextLink is the component that wraps <a>
      <a href={href} target="_blank" rel="noopener noreferrer" className={className} data-hover-sound="" {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className} data-hover-sound="" {...rest}>
      {children}
    </Link>
  );
}
