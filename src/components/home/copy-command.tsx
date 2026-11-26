"use client";

import { Check, Terminal } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { Button, motionTokens } from "@/components/ds";
import useSound from "@/hooks/use-sound";

const COMMAND = "npm i -g ankit-cli && ankit";

export function CopyCommand() {
  const [copied, setCopied] = useState(false);
  const clickSound = useSound("/audio/click.mp3");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(COMMAND);
      clickSound();
      setCopied(true);
      toast.success("Command copied", { description: "Run it in your terminal." });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Couldn't copy the command. Try again.");
    }
  };

  return (
    <Button
      onClick={copy}
      aria-label="Copy install command"
      icon={
        // The icon swap is the confirmation: blur masks the crossfade
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={copied ? "check" : "terminal"}
            initial={{ opacity: 0, scale: 0.9, filter: "blur(2px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.9, filter: "blur(2px)" }}
            transition={motionTokens.popover}
            className="flex"
          >
            {copied ? <Check className="size-4" /> : <Terminal className="size-4" />}
          </motion.span>
        </AnimatePresence>
      }
    >
      npx ankit
    </Button>
  );
}
