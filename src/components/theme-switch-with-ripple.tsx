"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Monitor, Moon, Sun } from "lucide-react";
import { createPortal } from "react-dom";

const themes = [
  { key: "light", icon: Sun, label: "Light theme" },
  { key: "dark", icon: Moon, label: "Dark theme" },
];

export type ThemeSwitcherProps = {
  className?: string;
};

export const ThemeSwitch = ({ className }: ThemeSwitcherProps) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [ripple, setRipple] = useState<{ x: number; y: number } | null>(null);

  const switchSound = () => {
    const audio = new Audio("/audio/netflix-tudum.mp3");
    audio.volume = 0.5;
    audio.play();
  };


  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleChangeTheme = (
    newTheme: "light" | "dark",
    e: React.MouseEvent
  ) => {
    if (newTheme === theme) return;
    if (!document.startViewTransition) {
      setTheme(newTheme);
      return;
    }
    switchSound();

    const x = e.clientX;
    const y = e.clientY;
    setRipple({ x, y });

    document.startViewTransition(() => {
      setTheme(newTheme);
    });

    setTimeout(() => {
      setRipple(null); // Cleanup ripple
    }, 1000);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "relative flex h-10 w-14 items-center justify-between rounded-2xl border border-primary/10 bg-foreground/5 px-1 py-2    shadow-[0px_1px_1px_-0.5px_rgba(0,0,0,0.03),0px_3px_3px_-1.5px_rgba(0,0,0,0.03)] hover:shadow-[0px_3px_3px_-1.5px_rgba(0,0,0,0.03),0px_6px_6px_-3px_rgba(0,0,0,0.03),0px_12px_12px_-6px_rgba(0,0,0,0.03)]" +
          "dark:border-primary/10 dark:hover:shadow-[0px_3px_3px_-1.5px_rgba(0,0,0,0.03),0px_6px_6px_-3px_rgba(0,0,0,0.03),0px_12px_12px_-6px_rgba(0,0,0,0.03)]",
          className
        )}
      >
        {themes.map(({ key, icon: Icon, label }) => {
          const isActive = theme === key;
          return (
            <button
              type="button"
              key={key}
              className="relative h-6 w-2/3 rounded-xl cursor-pointer z-10"
              onClick={(e) => handleChangeTheme(key as any, e)}
              aria-label={label}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTheme"
                  className="absolute inset-0 rounded-xl bg-primary"
                  transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                />
              )}
              <Icon
                className={cn(
                  "relative m-auto h-4 w-4 transition-colors duration-200",
                  isActive
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              />
            </button>
          );
        })}
      </motion.div>

      {/* Full Page Ripple Portal */}
      {createPortal(
        <AnimatePresence>
          {ripple && (
            <motion.div
              key="ripple"
              initial={{ scale: 0, opacity: 0.5 }}
              animate={{ scale: 5, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              style={{
                position: "fixed",
                top: ripple.y,
                left: ripple.x,
                transform: "translate(-50%, -50%)",
                width: 1000,
                height: 1000,
                borderRadius: "9999px",
                backgroundColor: "hsl(var(--primary))",
                zIndex: 50,
                pointerEvents: "none",
              }}
            />
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};
