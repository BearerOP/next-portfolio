"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState, type MouseEvent } from "react";
import { Button } from "@/components/ds";

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => unknown;
};

const STYLE_ID = "theme-transition-style";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Until mounted the theme is unknown; render the default (dark) icon so the
  // button holds its place in the navbar instead of popping in.
  const isDark = !mounted || resolvedTheme === "dark";
  const next = isDark ? "light" : "dark";

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    const audio = new Audio("/audio/nakime_biwa.mp3");
    audio.volume = 0.5;
    audio.play().catch(() => {});

    const doc = document as ViewTransitionDocument;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || typeof doc.startViewTransition !== "function") {
      setTheme(next);
      return;
    }

    // Origin-aware: the new theme is revealed in a circle growing out of the
    // toggle itself. clip-path only, so it stays on the compositor.
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    let style = document.getElementById(STYLE_ID) as HTMLStyleElement | null;
    if (!style) {
      style = document.createElement("style");
      style.id = STYLE_ID;
      document.head.appendChild(style);
    }
    style.textContent = `
      ::view-transition-old(root),
      ::view-transition-new(root) { mix-blend-mode: normal; }
      ::view-transition-old(root) { animation: none; }
      ::view-transition-new(root) { animation: theme-reveal 500ms var(--ease-in-out) both; }
      @keyframes theme-reveal {
        from { clip-path: circle(0px at ${x}px ${y}px); }
        to { clip-path: circle(150vmax at ${x}px ${y}px); }
      }
    `;

    doc.startViewTransition(() => setTheme(next));
  };

  return (
    <Button
      variant="ghost"
      onClick={handleClick}
      aria-label={`Switch to ${next} theme`}
      icon={isDark ? <Moon className="size-4" /> : <Sun className="size-4" />}
    />
  );
}
