"use client";

import { Music2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Label, Panel, PanelSection, TextLink } from "@/components/ds";
import { useSpotifyPlayer } from "./spotify-player";

interface SpotifyData {
  isPlaying: boolean;
  title: string;
  artist: string;
  album: string;
  albumImageUrl: string;
  songUrl: string;
  progress: number;
  duration: number;
}

const POLL_MS = 5000;

function formatTime(ms: number) {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function NowPlaying() {
  const [data, setData] = useState<SpotifyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch("/api/spotify/now-playing");
        // 204: nothing new, keep showing the last known track
        if (response.status !== 204) {
          if (!response.ok) throw new Error();
          const json: SpotifyData = await response.json();
          setData(json);
          setProgress(json.progress);
        }
      } catch {
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    load();
    // Don't poll while the tab is in the background
    const interval = setInterval(() => {
      if (!document.hidden) load();
    }, POLL_MS);
    return () => clearInterval(interval);
  }, []);

  // Tick locally between polls so the bar moves every second
  useEffect(() => {
    if (!data?.isPlaying) return;
    const interval = setInterval(
      () => setProgress((value) => Math.min(value + 1000, data.duration)),
      1000
    );
    return () => clearInterval(interval);
  }, [data?.isPlaying, data?.duration]);

  const { button, player } = useSpotifyPlayer(data?.songUrl ?? "", data?.title ?? "");
  const playing = data?.isPlaying ?? false;
  const fraction = data && data.duration > 0 ? Math.min(progress / data.duration, 1) : 0;

  return (
    <Panel
      id="listening"
      label="Signal // Spotify"
      live={playing}
      meta={loading ? "Syncing" : playing ? "Now playing" : data ? "Last played" : "Offline"}
    >
      <PanelSection className="media-mono-group flex items-center gap-4">
        <div className="relative flex size-14 shrink-0 items-center justify-center border border-line bg-fill-strong">
          {data ? (
            <Image src={data.albumImageUrl} alt={data.album} fill unoptimized className="media-mono object-cover" />
          ) : (
            <Music2 aria-hidden="true" className="size-5 text-muted-foreground" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          {data ? (
            <>
              <p className="truncate text-sm font-medium">
                <TextLink href={data.songUrl}>{data.title}</TextLink>
              </p>
              <p className="truncate text-xs text-muted-foreground">{data.artist}</p>
              <div className="mt-2 flex items-center gap-2">
                <Label>{formatTime(progress)}</Label>
                <div className="h-px flex-1 overflow-hidden bg-line-strong">
                  {/* scaleX, not width: stays on the compositor */}
                  <div
                    className="h-full w-full origin-left bg-foreground transition-transform duration-1000 ease-linear"
                    style={{ transform: `scaleX(${fraction})` }}
                  />
                </div>
                <Label>{formatTime(data.duration)}</Label>
              </div>
            </>
          ) : (
            <p className="text-xs text-muted-foreground">
              {loading ? "Checking what's playing…" : "Nothing playing right now."}
            </p>
          )}
        </div>
        {button}
      </PanelSection>
      {player}
    </Panel>
  );
}
