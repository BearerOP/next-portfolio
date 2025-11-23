"use client";

// 👇 Add this patch to tell TypeScript about startViewTransition
declare global {
  interface Document {
    startViewTransition?: (callback: () => void) => void;
  }
}

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

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
  
    switchSound();
  
    // Find avatar element and get its center position
    const avatarElement = document.querySelector('[data-slot="avatar-image"]') as HTMLElement
    let centerX = "50%"
    let centerY = "50%"
    
    if (avatarElement) {
      const rect = avatarElement.getBoundingClientRect()
      const avatarCenterX = rect.left + rect.width / 2
      const avatarCenterY = rect.top + rect.height / 2
      
      // Convert to percentage relative to viewport
      centerX = `${(avatarCenterX / window.innerWidth) * 100}%`
      centerY = `${(avatarCenterY / window.innerHeight) * 100}%`
    }
    
    // Create custom circle animation from avatar position with blur effect
    const animationCSS = `
      ::view-transition-group(root) {
        animation-duration: 0.7s;
        animation-timing-function: var(--expo-out);
      }
      
      ::view-transition-new(root) {
        animation-name: reveal-light;
      }
      ::view-transition-old(root) {
        animation-name: fade-out-old;
      }
      .dark::view-transition-old(root) {
        animation-name: fade-out-old-dark;
        z-index: -1;
      }
      .dark::view-transition-new(root) {
        animation-name: reveal-dark;
      }
      @keyframes reveal-dark {
        from {
          clip-path: circle(0% at ${centerX} ${centerY});
          filter: blur(20px);
          opacity: 0.5;
        }
        to {
          clip-path: circle(150% at ${centerX} ${centerY});
          filter: blur(0px);
          opacity: 1;
        }
      }
      @keyframes reveal-light {
        from {
          clip-path: circle(0% at ${centerX} ${centerY});
          filter: blur(20px);
          opacity: 0.5;
        }
        to {
          clip-path: circle(150% at ${centerX} ${centerY});
          filter: blur(0px);
          opacity: 1;
        }
      }
      @keyframes fade-out-old {
        from {
          filter: blur(0px);
          opacity: 1;
        }
        to {
          filter: blur(15px);
          opacity: 0;
        }
      }
      @keyframes fade-out-old-dark {
        from {
          filter: blur(0px);
          opacity: 1;
        }
        to {
          filter: blur(15px);
          opacity: 0;
        }
      }
    `
    
    // Apply animation CSS
    const styleId = "theme-transition-style"
    let styleElement = document.getElementById(styleId) as HTMLStyleElement
    if (!styleElement) {
      styleElement = document.createElement("style")
      styleElement.id = styleId
      document.head.appendChild(styleElement)
    }
    styleElement.textContent = animationCSS
    
    // Safe check using built-in DOM typing
    if (typeof document.startViewTransition !== "function") {
      setTheme(newTheme)
      return
    }
  
    // TypeScript expects a ViewTransitionCallback
    document.startViewTransition(() => {
      setTheme(newTheme)
    })
  }
  

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "relative flex h-10 w-fit items-center justify-between rounded-2xl border border-primary/10 bg-foreground/5 px-1 py-2 shadow-[0px_1px_1px_-0.5px_rgba(0,0,0,0.03),0px_3px_3px_-1.5px_rgba(0,0,0,0.03)] hover:shadow-[0px_3px_3px_-1.5px_rgba(0,0,0,0.03),0px_6px_6px_-3px_rgba(0,0,0,0.03),0px_12px_12px_-6px_rgba(0,0,0,0.03)] dark:border-primary/10 dark:hover:shadow-[0px_3px_3px_-1.5px_rgba(0,0,0,0.03),0px_6px_6px_-3px_rgba(0,0,0,0.03),0px_12px_12px_-6px_rgba(0,0,0,0.03)] ",
          className
        )}
      >
        {themes.map(({ key, icon: Icon, label }) => {
          const isActive = theme === key;
          return (
            <button
              type="button"
              key={key}
              className="relative px-1 h-6 w-2/3 rounded-xl cursor-pointer z-10 "
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
                    : "text-foreground"
                )}
              />
            </button>
          );
        })}
      </motion.div>
    </>
  );
};
