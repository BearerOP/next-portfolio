"use client";

import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ds";
import { cn } from "@/lib/utils";

export const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={cn(
        "fixed bottom-4 right-4 z-40 transition-opacity duration-ui ease-out",
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      )}
    >
      <Button
        aria-label="Scroll to top"
        disabled={!visible}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        icon={<ChevronUp className="size-4" />}
      />
    </div>
  );
};
