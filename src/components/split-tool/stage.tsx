import { Heart, MessageCircle, Repeat2, Share } from "lucide-react";
import { Label } from "@/components/ds";
import { backdropCss, type Rect, type Scene } from "./split";

const percent = (value: number) => `${value * 100}%`;

/**
 * Shows the region `rect` of the scene (image plus backdrop), filling the
 * nearest positioned, clipped ancestor. Sized in percentages, so it follows
 * the ancestor at any width. The same scene is drawn to a canvas on export.
 */
export function Stage({ scene, rect, url }: { scene: Scene; rect: Rect; url: string }) {
  return (
    <div
      className="pointer-events-none absolute"
      style={{
        width: percent(scene.width / rect.width),
        height: percent(scene.height / rect.height),
        left: percent(-rect.x / rect.width),
        top: percent(-rect.y / rect.height),
        background: scene.backdrop ? backdropCss(scene.backdrop) : undefined,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- a local blob the visitor is editing; nothing for next/image to optimise */}
      <img
        src={url}
        alt=""
        draggable={false}
        className="absolute max-w-none"
        style={{
          left: percent(scene.pad / scene.width),
          top: percent(scene.pad / scene.height),
          width: percent((scene.width - scene.pad * 2) / scene.width),
          height: percent((scene.height - scene.pad * 2) / scene.height),
        }}
      />
    </div>
  );
}

const actions = [MessageCircle, Repeat2, Heart, Share] as const;

/**
 * A stand-in post showing the parts as separate attachments in a row, the way
 * a feed lays out a multi-image post. A rough guide, not any one app's layout.
 */
export function PostPreview({
  scene,
  rects,
  url,
  name,
}: {
  scene: Scene;
  rects: readonly Rect[];
  url: string;
  name: string;
}) {
  return (
    <div
      role="img"
      aria-label={`Preview of a post with ${rects.length} attached parts`}
      className="mx-auto flex max-w-lg gap-3 border border-line-strong bg-background p-4"
    >
      <div className="size-8 shrink-0 rounded-full border border-line-strong bg-fill-strong" />
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <p className="flex items-baseline gap-2">
          <span className="font-sans text-sm font-semibold">You</span>
          <Label>@you · now</Label>
        </p>
        <p className="truncate text-xs text-muted-foreground">
          {name}, in {rects.length} parts
        </p>
        <div className="flex gap-0.5">
          {rects.map((rect, index) => (
            <div
              key={index}
              className="relative basis-0 overflow-hidden bg-fill-strong"
              style={{ flexGrow: rect.width, aspectRatio: `${rect.width} / ${rect.height}` }}
            >
              <Stage scene={scene} rect={rect} url={url} />
            </div>
          ))}
        </div>
        <div className="flex justify-between pt-1 text-muted-foreground">
          {actions.map((Icon, index) => (
            <Icon key={index} className="size-4" aria-hidden="true" />
          ))}
        </div>
      </div>
    </div>
  );
}
