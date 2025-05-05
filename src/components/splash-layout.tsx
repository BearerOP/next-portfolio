"use client";

import { useState, useEffect, Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import { Loader2Icon } from "lucide-react";
import { SplashScreen } from "./splash-screen";
import { Spinner } from "./ui/spinner";
interface SplashLayoutProps {
  children: React.ReactNode;
}

export function SplashLayout({ children }: SplashLayoutProps) {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        <Suspense
          fallback={
            <div className="flex items-center justify-center w-full h-screen">
              <Spinner/>
            </div>
          }
        >
          {showSplash ? <SplashScreen key="splash" /> : children}
        </Suspense>
      </AnimatePresence>
    </>
  );
}