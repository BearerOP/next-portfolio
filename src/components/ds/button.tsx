import Link from "next/link";
import type { MouseEventHandler, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md";

interface ButtonBase {
  /** `primary` is the single most important action on a screen. */
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Leading icon. Pass a 16px icon element. */
  icon?: ReactNode;
  /** Passed straight through; used by the Cal.com embed. */
  dataAttributes?: Record<`data-${string}`, string>;
}

interface WithText {
  children: ReactNode;
  /** Optional when there is visible text. */
  "aria-label"?: string;
}

interface IconOnly {
  children?: undefined;
  /** Required: an icon-only button has no other accessible name. */
  "aria-label": string;
  icon: ReactNode;
}

interface AsButton {
  href?: undefined;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit";
  disabled?: boolean;
  "aria-expanded"?: boolean;
  "aria-pressed"?: boolean;
}

interface AsLink {
  /** Internal path or absolute URL. External URLs open in a new tab. */
  href: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

export type ButtonProps = ButtonBase & (WithText | IconOnly) & (AsButton | AsLink);

const variants: Record<ButtonVariant, string> = {
  primary: "bg-foreground text-background border-foreground hover:bg-foreground/85",
  secondary: "bg-background text-foreground border-line-strong hover:bg-fill-strong",
  ghost: "bg-transparent text-muted-foreground border-transparent hover:text-foreground hover:bg-fill-strong",
};

const sizes: Record<ButtonSize, { text: string; icon: string }> = {
  sm: { text: "h-8 px-3 gap-2 text-label", icon: "size-8" },
  md: { text: "h-9 px-4 gap-2 text-caption", icon: "size-9" },
};

/**
 * The only clickable control. Renders a `<button>`, or a link when `href` is set.
 *
 * - No `className`: appearance comes from `variant` and `size` only.
 * - Press feedback (scale 0.97) is built in; do not wrap it in a motion element.
 *
 * @ds-replaces button
 * @ds-limit variant=primary max=1 -- one primary action per screen; a second one means neither is primary
 */
export function Button(props: ButtonProps) {
  const { variant = "secondary", size = "md", icon, children, dataAttributes } = props;
  const iconOnly = children === undefined;

  const className = cn(
    "inline-flex shrink-0 select-none items-center justify-center whitespace-nowrap border font-mono uppercase",
    "transition-[transform,background-color,color,border-color] duration-press ease-out active:scale-press",
    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-40",
    variants[variant],
    iconOnly ? sizes[size].icon : sizes[size].text
  );

  const content = (
    <>
      {icon}
      {children}
    </>
  );

  if (props.href !== undefined) {
    const external = /^(https?:|mailto:)/.test(props.href);
    if (external) {
      return (
        // ds-lint-disable-next-line raw-html -- Button is the component that wraps <a>
        <a
          href={props.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={props.onClick}
          aria-label={props["aria-label"]}
          className={className}
          data-hover-sound=""
          {...dataAttributes}
        >
          {content}
        </a>
      );
    }
    return (
      <Link
        href={props.href}
        onClick={props.onClick}
        aria-label={props["aria-label"]}
        className={className}
        data-hover-sound=""
        {...dataAttributes}
      >
        {content}
      </Link>
    );
  }

  return (
    // ds-lint-disable-next-line raw-html -- Button is the component that wraps <button>
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      disabled={props.disabled}
      aria-label={props["aria-label"]}
      aria-expanded={props["aria-expanded"]}
      aria-pressed={props["aria-pressed"]}
      className={className}
      data-hover-sound=""
      {...dataAttributes}
    >
      {content}
    </button>
  );
}
