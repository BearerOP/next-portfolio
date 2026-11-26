"use client";

import { Loader2, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { holdAmbientSound } from "@/components/ambient-sound";
import { Button } from "@/components/ds";
import { cn } from "@/lib/utils";

/*
 * Spotify's embed, driven by its iFrame API
 * (https://developer.spotify.com/documentation/embeds/references/iframe-api).
 * It needs no token: visitors who are signed in to Spotify hear the whole
 * track, everyone else a preview. Only the parts of the API used here are typed.
 */
interface EmbedController {
  togglePlay(): void;
  play(): void;
  destroy(): void;
  addListener(event: "ready", listener: () => void): void;
  addListener(
    event: "playback_update",
    listener: (update: { data: { isPaused: boolean; isBuffering: boolean } }) => void
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
/** The embed's compact layout. */
const PLAYER_HEIGHT = 80;

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
 * A play button for the track in the Spotify panel, with Spotify's own
 * player opening under it. While it plays, the site's waterfall is held
 * quiet, and comes back when it pauses.
 *
 * Returns the button and the player separately so the panel can place them.
 */
export function useSpotifyPlayer(songUrl: string, title: string) {
  const [status, setStatus] = useState<"idle" | "loading" | "ready">("idle");
  const [playing, setPlaying] = useState(false);
  const mount = useRef<HTMLDivElement>(null);
  const controller = useRef<EmbedController | null>(null);
  const uri = trackUri(songUrl);

  // A different track, or leaving the page: drop the player and release the hold
  useEffect(
    () => () => {
      controller.current?.destroy();
      controller.current = null;
      holdAmbientSound(false);
      setStatus("idle");
      setPlaying(false);
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
        // Show the player as soon as it exists: if Spotify never reports
        // "ready", the visitor can still press play inside it
        setStatus("ready");
        created.addListener("ready", () => created.play());
        created.addListener("playback_update", ({ data }) => {
          const nowPlaying = !data.isPaused && !data.isBuffering;
          setPlaying(nowPlaying);
          holdAmbientSound(nowPlaying);
        });
      });
    } catch {
      setStatus("idle");
      toast.error("Couldn't load the Spotify player. Open the track on Spotify instead.");
    }
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

  // Always mounted, so the API has somewhere to build; takes no room until it has
  const player = <div ref={mount} className={cn(status === "ready" ? "border-t border-line" : "hidden")} />;

  return { button, player };
}
