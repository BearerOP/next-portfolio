"use client";

import Image from "next/image";
import logo from "/public/images/ay.png";

/**
 * Overlay splash. The page renders underneath it, so content is in the
 * server HTML and nothing waits on a timer. Motion is CSS-only (see
 * globals.css) so it plays before hydration. `data-splash="seen"` on <html>
 * hides it for the rest of the session.
 */
export function SplashScreen() {
  return (
    <div
      aria-hidden="true"
      className="splash pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-background"
      onAnimationEnd={(e) => {
        if (e.animationName === "splash-out") {
          document.documentElement.dataset.splash = "seen";
        }
      }}
    >
      <Image src={logo} alt="" className="splash-logo size-24" priority />
    </div>
  );
}
