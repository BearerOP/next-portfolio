"use client";

import { useEffect } from "react";
import { isSoundHeld } from "./ambient-sound";

const SRC = "/audio/click_min.mp3";
const VOLUME = 0.3;

/**
 * Plays a soft tick when the mouse enters a Button or TextLink.
 *
 * One listener on the document, so the components themselves stay plain
 * server-renderable markup: they opt in with a `data-hover-sound` attribute.
 * Mouse only (touch has no hover), and silent until the visitor has
 * interacted with the page, because browsers block audio before that.
 */
export function HoverSound() {
  useEffect(() => {
    let audio: HTMLAudioElement | null = null;
    let current: Element | null = null;

    const onPointerOver = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || !(event.target instanceof Element)) return;
      const target = event.target.closest("[data-hover-sound]");
      // Moving between children of the same control is not a new hover
      if (target === current) return;
      current = target;
      // Stay quiet while the Spotify preview has the floor
      if (!target || target.matches(":disabled") || isSoundHeld()) return;

      audio ??= new Audio(SRC);
      audio.volume = VOLUME;
      audio.currentTime = 0;
      audio.play().catch(() => {});
    };

    document.addEventListener("pointerover", onPointerOver, { passive: true });
    return () => document.removeEventListener("pointerover", onPointerOver);
  }, []);

  return null;
}
