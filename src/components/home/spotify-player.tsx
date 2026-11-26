"use client";

import { Loader2, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { holdAmbientSound } from "@/components/ambient-sound";
import { Button } from "@/components/ds";

/*
 * Spotify's embed, driven by its iFrame API
 * (https://developer.spotify.com/documentation/embeds/references/iframe-api).
 * It needs no token: visitors who are signed in to Spotify hear the whole
 * track, everyone else a preview. Only the parts of the API used here are typed.
 */
interface EmbedController {
  togglePlay(): void;
  play(): void;
  pause(): void;
  /** Jumps to a position, in whole seconds. */
  seek(seconds: number): void;
  destroy(): void;
  addListener(event: "ready", listener: () => void): void;
  addListener(
    event: "playback_update",
    listener: (update: {
      data: { isPaused: boolean; isBuffering: boolean; position: number; duration: number };
    }) => void
  ): void;
}
interface IframeApi {
  createController(
    element: HTMLElement,
    options: { uri: string; height: number; width: string },
    callback: (controller: EmbedController) => void
  ): void;
}
declare global {
  interface Window {
    onSpotifyIframeApiReady?: (api: IframeApi) => void;
  }
}

const API_SRC = "https://open.spotify.com/embed/iframe-api/v1";
/** The embed's compact layout. It is kept out of sight; the panel is the player. */
const PLAYER_HEIGHT = 80;

/** Within this of the end counts as finished. */
const END_MARGIN_MS = 300;
/** A report this close to the end, followed by one this close to the start, is a wrap. */
const WRAP_WINDOW_MS = 2000;

/** Where the track playing on this page has got to, in milliseconds. */
export interface LocalPlayback {
  playing: boolean;
  position: number;
  duration: number;
}

// The script is loaded once, on the first press of play, never on page load
let apiPromise: Promise<IframeApi> | null = null;
function loadApi() {
  apiPromise ??= new Promise<IframeApi>((resolve, reject) => {
    window.onSpotifyIframeApiReady = resolve;
    const script = document.createElement("script");
    script.src = API_SRC;
    script.async = true;
    script.onerror = () => {
      apiPromise = null;
      reject(new Error("Spotify player failed to load"));
    };
    document.body.appendChild(script);
  });
  return apiPromise;
}

/** `https://open.spotify.com/track/<id>` to `spotify:track:<id>`. */
function trackUri(songUrl: string) {
  const id = /\/track\/([A-Za-z0-9]+)/.exec(songUrl)?.[1];
  return id ? `spotify:track:${id}` : null;
}

/**
 * Plays the track in the Spotify panel, on this page. Spotify's embed does
 * the playing but stays out of sight: the panel shows the one player, driven
 * by the embed's progress. While it plays, the site's waterfall is held quiet,
 * and comes back when it pauses.
 *
 * Returns the play button, the hidden embed (it must be mounted somewhere),
 * the playback state, which is null until the visitor has pressed play, and
 * `seek`. There is no volume control: the embed's API does not offer one, and
 * a page cannot set the volume of another site's frame.
 */
export function useSpotifyPlayer(songUrl: string, title: string) {
  const [status, setStatus] = useState<"idle" | "loading" | "ready">("idle");
  const [playback, setPlayback] = useState<LocalPlayback | null>(null);
  const playing = playback?.playing ?? false;
  const mount = useRef<HTMLDivElement>(null);
  const controller = useRef<EmbedController | null>(null);
  // The last position the embed reported, to notice the track wrapping round
  const lastPosition = useRef(0);
  const uri = trackUri(songUrl);

  // A different track, or leaving the page: drop the player and release the hold
  useEffect(
    () => () => {
      controller.current?.destroy();
      controller.current = null;
      holdAmbientSound(false);
      setStatus("idle");
      setPlayback(null);
    },
    [uri]
  );

  const toggle = async () => {
    if (!uri) return;
    if (controller.current) {
      controller.current.togglePlay();
      return;
    }
    if (status === "loading" || !mount.current) return;
    setStatus("loading");
    try {
      const api = await loadApi();
      // The API replaces the element it is given, so hand it one React does not own
      const slot = document.createElement("div");
      mount.current.replaceChildren(slot);
      api.createController(slot, { uri, height: PLAYER_HEIGHT, width: "100%" }, (created) => {
        controller.current = created;
        // Hand the button back as soon as the player exists, so it is never
        // stuck on the spinner if Spotify is slow to report "ready"
        setStatus("ready");
        created.addListener("ready", () => created.play());
        created.addListener("playback_update", ({ data }) => {
          // Left alone, the embed starts the track again when it ends. Stop
          // there instead: either it has reached the end, or it has already
          // wrapped round to the start since the last report.
          const ended =
            data.duration > 0 &&
            !data.isPaused &&
            (data.position >= data.duration - END_MARGIN_MS ||
              (lastPosition.current >= data.duration - WRAP_WINDOW_MS && data.position < WRAP_WINDOW_MS));
          lastPosition.current = ended ? 0 : data.position;
          if (ended) {
            created.pause();
            created.seek(0);
            setPlayback({ playing: false, position: 0, duration: data.duration });
            holdAmbientSound(false);
            return;
          }
          const nowPlaying = !data.isPaused && !data.isBuffering;
          setPlayback({ playing: nowPlaying, position: data.position, duration: data.duration });
          holdAmbientSound(nowPlaying);
        });
      });
    } catch {
      setStatus("idle");
      toast.error("Couldn't load the Spotify player. Open the track on Spotify instead.");
    }
  };

  /** Jump to a position in the track, in milliseconds. */
  const seek = (position: number) => {
    if (!controller.current) return;
    controller.current.seek(Math.round(position / 1000));
    // Move the bar at once; the embed's next report confirms it
    setPlayback((current) => (current ? { ...current, position } : current));
  };

  const button = uri ? (
    <Button
      onClick={toggle}
      aria-pressed={playing}
      aria-label={playing ? `Pause ${title}` : `Play ${title}`}
      disabled={status === "loading"}
      icon={
        status === "loading" ? (
          <Loader2 className="size-4 motion-safe:animate-spin" />
        ) : playing ? (
          <Pause className="size-4" />
        ) : (
          <Play className="size-4" />
        )
      }
    />
  ) : null;

  // The embed has to be in the page and rendered to play, so it is shrunk to
  // nothing and taken out of reach rather than removed
  const player = (
    <div
      ref={mount}
      aria-hidden="true"
      className="pointer-events-none absolute size-px overflow-hidden opacity-0"
    />
  );

  return { button, player, playback, seek };
}
