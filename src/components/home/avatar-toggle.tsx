"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import useSound from "@/hooks/use-sound";
import { cn } from "@/lib/utils";
import { personalInfo } from "@/lib/resume";

const avatars = [
  { src: personalInfo.avatar, name: "illustration" },
  { src: "/images/avatar-photo.jpg", name: "photo" },
] as const;

/** Must match the `avatar-glitch` animation duration in globals.css. */
const GLITCH_MS = 320;

/**
 * The hero avatar. Clicking it glitches and swaps between the illustration
 * and the photo. Both images stay mounted so the swap never waits on a load.
 */
export function AvatarToggle() {
  const [active, setActive] = useState(0);
  const [glitching, setGlitching] = useState(false);
  const busy = useRef(false);
  const switchSound = useSound("/audio/switch.mp3");

  const toggle = () => {
    // One glitch at a time: a click mid-animation would restart the keyframes
    if (busy.current) return;
    switchSound();

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActive((value) => 1 - value);
      return;
    }

    busy.current = true;
    setGlitching(true);
    // Swap halfway, while the image is sliced apart, so the cut is hidden
    setTimeout(() => setActive((value) => 1 - value), GLITCH_MS / 2);
    setTimeout(() => {
      setGlitching(false);
      busy.current = false;
    }, GLITCH_MS);
  };

  const next = avatars[1 - active];

  return (
    // ds-lint-disable-next-line raw-html -- the avatar itself is the control; Button is a rectangular text/icon control
    <button
      type="button"
      onClick={toggle}
      aria-label={`${personalInfo.fullName}. Switch avatar to ${next.name}`}
      className="media-mono-group relative -mt-10 block size-20 shrink-0 rounded-full border border-line-strong bg-background p-1 transition-transform duration-press ease-out active:scale-press focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background md:size-24"
    >
      <span className="media-mono relative block size-full overflow-hidden rounded-full">
        <span className={cn("absolute inset-0", glitching && "avatar-glitch")}>
          {avatars.map((avatar, index) => (
            <Image
              key={avatar.src}
              src={avatar.src}
              alt=""
              width={96}
              height={96}
              priority={index === 0}
              className={cn(
                "absolute inset-0 size-full object-cover",
                index === active ? "opacity-100" : "opacity-0"
              )}
            />
          ))}
        </span>
      </span>
    </button>
  );
}
