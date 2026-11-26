"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { motionTokens } from "./tokens";

export interface RevealProps {
  children: ReactNode;
  /** Position in a group, for a 50ms stagger. Capped so late items never wait long. */
  index?: number;
}

/**
 * Entrance for a block of content: fades up 8px, once, when scrolled into view.
 * One Reveal per Panel; do not nest them or reveal individual words.
 */
export function Reveal({ children, index = 0 }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ ...motionTokens.enter, delay: Math.min(index, 4) * 0.05 }}
    >
      {children}
    </motion.div>
  );
}
