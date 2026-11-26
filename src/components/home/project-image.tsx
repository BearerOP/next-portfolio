"use client";

import Image from "next/image";
import { useState } from "react";
import { Label } from "@/components/ds";

/** Project screenshot that degrades to a hatched placeholder if the image fails to load. */
export function ProjectImage({ src, title }: { src: string; title: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="flex size-full items-center justify-center bg-hatch">
        <Label>No preview // {title}</Label>
      </div>
    );
  }

  return (
    <Image
      src={src}
      // Screenshots on other hosts load straight from that host. Sent through
      // the image optimiser, a host that is down fails on our server for every
      // visitor; loaded directly, it fails once in the browser and falls back.
      unoptimized={/^https?:/.test(src)}
      alt={`${title} screenshot`}
      fill
      sizes="(min-width: 768px) 384px, 100vw"
      className="media-mono object-cover"
      onError={() => setFailed(true)}
    />
  );
}
