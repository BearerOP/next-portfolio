"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useEffect, useSyncExternalStore } from "react";
import { Button, Tooltip } from "@/components/ds";

const SRC = "/audio/waterfall-sound.mp3";
const STORAGE_KEY = "ambient-sound";
/** Deliberately quiet: this sits under the page, it is not the page. */
const VOLUME = 0.12;
const FADE_MS = 600;

/*
 * The preference and the audio element live outside React. The navbar, and
 * this toggle with it, is mounted again on every page; state kept in the
 * component would reset to "on" on each navigation and restart the sound.
 */
let preference: boolean | null = null;
const subscribers = new Set<() => void>();
let audio: HTMLAudioElement | null = null;
let fade = 0;

function readPreference() {
  if (preference === null) {
    try {
      preference = localStorage.getItem(STORAGE_KEY) !== "off";
    } catch {
      // Storage unavailable: on, for this visit
      preference = true;
    }
  }
  return preference;
}

function writePreference(next: boolean) {
  preference = next;
  try {
    localStorage.setItem(STORAGE_KEY, next ? "on" : "off");
  } catch {
    // Storage unavailable: the choice lasts until the tab closes
  }
  subscribers.forEach((notify) => notify());
}

function subscribe(notify: () => void) {
  subscribers.add(notify);
  return () => {
    subscribers.delete(notify);
  };
}

/** Ramp the volume rather than cutting it, then pause once silent. */
function fadeTo(target: number) {
  const element = audio;
  if (!element) return;
  cancelAnimationFrame(fade);
  const from = element.volume;
  const startedAt = performance.now();
  const step = (now: number) => {
    const progress = Math.min((now - startedAt) / FADE_MS, 1);
    element.volume = from + (target - from) * progress;
    if (progress < 1) fade = requestAnimationFrame(step);
    else if (target === 0) element.pause();
  };
  fade = requestAnimationFrame(step);
}

// Something else on the page is playing audio (the Spotify preview). This is a
// temporary hold, separate from the visitor's own on/off choice.
let held = false;

/** True while other audio has the floor; the site's own sounds stay quiet. */
export function isSoundHeld() {
  return held;
}

/**
 * Quiets the waterfall while other audio plays, and brings it back after,
 * if the visitor has it switched on. Does not change their preference.
 */
export function holdAmbientSound(hold: boolean) {
  if (held === hold) return;
  held = hold;
  if (hold) fadeTo(0);
  else start();
}

function start() {
  if (document.hidden || held || !readPreference()) return;
  if (!audio) {
    audio = new Audio(SRC);
    audio.loop = true;
    audio.volume = 0;
  }
  audio
    .play()
    .then(() => {
      // The visitor may have muted while the browser was starting playback
      if (readPreference() && !held && !document.hidden) fadeTo(VOLUME);
      else fadeTo(0);
    })
    .catch(() => {
      // Blocked until the first gesture; the listeners below retry
    });
}

/**
 * Navbar toggle for the ambient waterfall. On by default, remembered across
 * pages and visits. Browsers block audio until the visitor interacts with the
 * page, so the sound starts on their first click or key press, not on load.
 * The loop keeps playing across page changes rather than restarting.
 */
export function AmbientSound() {
  // The server cannot read the preference, so it renders "on"; the stored
  // value takes over as soon as the page hydrates
  const enabled = useSyncExternalStore(subscribe, readPreference, () => true);

  useEffect(() => {
    if (!enabled) {
      fadeTo(0);
      return;
    }

    // Works at once if the page has already been interacted with;
    // otherwise the first gesture unlocks it.
    start();
    const onVisibility = () => (document.hidden ? fadeTo(0) : start());
    window.addEventListener("pointerdown", start, { once: true });
    window.addEventListener("keydown", start, { once: true });
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("pointerdown", start);
      window.removeEventListener("keydown", start);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [enabled]);

  const toggle = () => writePreference(!enabled);

  return (
    <Tooltip content={enabled ? "Waterfall on" : "Waterfall off"} side="bottom">
      <Button
        variant="ghost"
        onClick={toggle}
        aria-pressed={enabled}
        aria-label={enabled ? "Turn waterfall sound off" : "Turn waterfall sound on"}
        icon={enabled ? <Volume2 className="size-4" /> : <VolumeX className="size-4" />}
      />
    </Tooltip>
  );
}
