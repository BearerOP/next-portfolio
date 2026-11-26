"use client";

import { Ban, Download, GripVertical, ImagePlus, RotateCcw, Images, Trash2 } from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type DragEvent,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import { toast } from "sonner";
import { Button, Label, Panel, PanelSection, Segmented, backdrops } from "@/components/ds";
import { cn } from "@/lib/utils";
import {
  MAX_ZOOM,
  backdropCss,
  clampView,
  cropRect,
  encodeParts,
  equalSeams,
  formatBytes,
  makeScene,
  moveSeam,
  partRects,
  type BackdropId,
  type Format,
  type Shape,
  type View,
} from "./split";
import { PostPreview, Stage } from "./stage";

interface Source {
  element: HTMLImageElement;
  url: string;
  /** File name without its extension, used to name the downloads. */
  name: string;
  width: number;
  height: number;
}

type PartCount = "2" | "3" | "4";
/** Bytes for all parts together; `null` when the browser cannot write the format; absent while measuring. */
type Sizes = Partial<Record<Format, number | null>>;

const partOptions = [
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
] as const;

const shapeOptions = [
  { value: "original", label: "Original" },
  { value: "4:5", label: "4:5" },
  { value: "1:1", label: "1:1" },
  { value: "3:4", label: "3:4" },
] as const;

const formatOptions = [
  { value: "webp", label: "WebP" },
  { value: "jpeg", label: "JPEG" },
  { value: "png", label: "PNG" },
] as const;

const FORMATS: readonly Format[] = ["webp", "jpeg", "png"];
const EXTENSION: Record<Format, string> = { webp: "webp", jpeg: "jpg", png: "png" };
const CENTRED: View = { zoom: 1, x: 0.5, y: 0.5 };
/** A wide picture that ships with the site, for trying the tool without a file. */
const SAMPLE = { src: "/images/ascii-hero.webp", name: "ascii-hero.webp" };
/** Arrow keys move the crop by this share of the image. */
const NUDGE = 0.02;
/** Arrow keys move a seam by this share of the crop. */
const SEAM_NUDGE = 0.01;
/** Margin around the image when a backdrop is first chosen, as a percentage of its shorter side. */
const DEFAULT_PADDING = 8;
/** Wait for the controls to settle before re-encoding to measure file sizes. */
const MEASURE_DELAY_MS = 300;

const swatch =
  "flex size-9 items-center justify-center border bg-background p-0.5 transition-[transform,border-color] duration-press ease-out active:scale-press focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

function save(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  // Give the browser a moment to start the download before the URL goes away
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/**
 * Cuts one wide image into 2 to 4 side-by-side parts for a multi-image post.
 * Everything happens on a canvas in the browser; the image is never uploaded.
 */
export function SplitTool() {
  const [source, setSource] = useState<Source | null>(null);
  const [partCount, setPartCount] = useState<PartCount>("3");
  const [shape, setShape] = useState<Shape>("original");
  const [view, setView] = useState<View>(CENTRED);
  // Seam positions as shares of the crop width; null means equal parts
  const [seams, setSeams] = useState<number[] | null>(null);
  const [backdropId, setBackdropId] = useState<BackdropId>("none");
  const [padding, setPadding] = useState(DEFAULT_PADDING);
  const [format, setFormat] = useState<Format>("webp");
  const [quality, setQuality] = useState(90);
  const [sizes, setSizes] = useState<Sizes>({});
  const [dropping, setDropping] = useState(false);
  const [saving, setSaving] = useState(false);

  const fileInput = useRef<HTMLInputElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const dragFrom = useRef<{ x: number; y: number } | null>(null);
  const draggedSeam = useRef<number | null>(null);

  const parts = Number(partCount);

  const open = useCallback(async (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("That file isn't an image.");
      return;
    }
    const url = URL.createObjectURL(file);
    const element = new Image();
    element.src = url;
    try {
      await element.decode();
    } catch {
      URL.revokeObjectURL(url);
      toast.error("Couldn't read that image. Try a JPG, PNG or WebP.");
      return;
    }
    setSource((previous) => {
      if (previous) URL.revokeObjectURL(previous.url);
      return {
        element,
        url,
        name: file.name.replace(/\.[^.]+$/, "") || "image",
        width: element.naturalWidth,
        height: element.naturalHeight,
      };
    });
    setView(CENTRED);
    setSeams(null);
  }, []);

  // No image to hand? Load one that ships with the site, so the tool can be tried at once
  const openSample = async () => {
    try {
      const response = await fetch(SAMPLE.src);
      if (!response.ok) throw new Error();
      const blob = await response.blob();
      await open(new File([blob], SAMPLE.name, { type: blob.type }));
    } catch {
      toast.error("Couldn't load the sample image. Choose one of your own.");
    }
  };

  const clear = () => {
    if (source) URL.revokeObjectURL(source.url);
    setSource(null);
    setSizes({});
  };

  // Paste an image from the clipboard, anywhere on the page
  useEffect(() => {
    const onPaste = (event: ClipboardEvent) => {
      const file = Array.from(event.clipboardData?.files ?? []).find((item) =>
        item.type.startsWith("image/")
      );
      if (file) {
        event.preventDefault();
        void open(file);
      }
    };
    document.addEventListener("paste", onPaste);
    return () => document.removeEventListener("paste", onPaste);
  }, [open]);

  const scene = useMemo(
    () => (source ? makeScene(source.element, backdropId, padding) : null),
    [source, backdropId, padding]
  );
  const crop = useMemo(
    () => (scene ? cropRect(scene.width, scene.height, parts, shape, view) : null),
    [scene, parts, shape, view]
  );
  const rects = useMemo(() => (crop ? partRects(crop, parts, seams) : []), [crop, parts, seams]);

  // Measure what each format would weigh, once the controls have settled
  useEffect(() => {
    if (!scene || rects.length === 0) return;
    let cancelled = false;
    setSizes({});
    const timer = setTimeout(async () => {
      for (const candidate of FORMATS) {
        let total: number | null;
        try {
          const blobs = await encodeParts(scene, rects, candidate, quality / 100);
          total = blobs.reduce((sum, blob) => sum + blob.size, 0);
        } catch {
          total = null;
        }
        if (cancelled) return;
        setSizes((previous) => ({ ...previous, [candidate]: total }));
      }
    }, MEASURE_DELAY_MS);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [scene, rects, quality]);

  const move = (deltaX: number, deltaY: number) => {
    if (!scene) return;
    setView((current) =>
      clampView(scene.width, scene.height, parts, shape, {
        ...current,
        x: current.x + deltaX,
        y: current.y + deltaY,
      })
    );
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    dragFrom.current = { x: event.clientX, y: event.clientY };
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragFrom.current || !frame.current || !scene || !crop) return;
    const box = frame.current.getBoundingClientRect();
    // Screen pixels to a share of the picture: the frame shows exactly the crop
    const deltaX = ((dragFrom.current.x - event.clientX) / box.width) * (crop.width / scene.width);
    const deltaY = ((dragFrom.current.y - event.clientY) / box.height) * (crop.height / scene.height);
    dragFrom.current = { x: event.clientX, y: event.clientY };
    move(deltaX, deltaY);
  };

  const onPointerUp = () => {
    dragFrom.current = null;
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const steps: Record<string, [number, number]> = {
      ArrowLeft: [-NUDGE, 0],
      ArrowRight: [NUDGE, 0],
      ArrowUp: [0, -NUDGE],
      ArrowDown: [0, NUDGE],
    };
    const step = steps[event.key];
    if (!step) return;
    event.preventDefault();
    move(step[0], step[1]);
  };

  // Seams have their own drag, separate from panning the crop underneath
  const onSeamPointerDown = (index: number) => (event: PointerEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.currentTarget.setPointerCapture(event.pointerId);
    draggedSeam.current = index;
  };

  const onSeamPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const index = draggedSeam.current;
    if (index === null || !frame.current) return;
    const box = frame.current.getBoundingClientRect();
    const to = (event.clientX - box.left) / box.width;
    setSeams((current) => moveSeam(current ?? equalSeams(parts), index, to));
  };

  const onSeamPointerUp = () => {
    draggedSeam.current = null;
  };

  const onSeamKeyDown = (index: number) => (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    // Keep the arrow keys from also panning the crop
    event.preventDefault();
    event.stopPropagation();
    const step = event.key === "ArrowLeft" ? -SEAM_NUDGE : SEAM_NUDGE;
    setSeams((current) => {
      const positions = current ?? equalSeams(parts);
      return moveSeam(positions, index, positions[index] + step);
    });
  };

  const changeParts = (next: PartCount) => {
    setPartCount(next);
    // Seam positions only mean something for the count they were set at
    setSeams(null);
  };

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDropping(false);
    void open(event.dataTransfer.files[0]);
  };

  const download = async (only?: number) => {
    if (!source || !scene) return;
    const wanted = only === undefined ? rects : [rects[only]];
    setSaving(true);
    try {
      const blobs = await encodeParts(scene, wanted, format, quality / 100);
      blobs.forEach((blob, index) => {
        const number = (only ?? index) + 1;
        // Staggered: browsers drop downloads started in the same instant
        setTimeout(
          () => save(blob, `${source.name}-${number}.${EXTENSION[format]}`),
          index * 250
        );
      });
    } catch {
      toast.error(`This browser can't save ${format.toUpperCase()}. Pick another format.`);
    } finally {
      setSaving(false);
    }
  };

  const largest = Math.max(1, ...FORMATS.map((item) => sizes[item] ?? 0));
  const unsupported = sizes[format] === null;

  return (
    <Panel
      label="Tool // Split"
      meta="Local only"
      footer={
        <>
          <Label>
            {source ? `Source ${source.width} × ${source.height}` : "No image open"}
          </Label>
          <Label>Nothing is uploaded</Label>
        </>
      }
    >
      <PanelSection>
        <h1 className="font-sans text-2xl font-semibold tracking-tight">Split a wide image</h1>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          Cut one wide image into two, three or four parts that read as a single continuous
          picture when posted side by side. Every pixel stays in your browser.
        </p>
      </PanelSection>

      <input
        ref={fileInput}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(event) => {
          void open(event.target.files?.[0]);
          // Let the same file be chosen again after clearing
          event.target.value = "";
        }}
      />

      <PanelSection padding="none">
        <div
          onDragOver={(event) => {
            event.preventDefault();
            setDropping(true);
          }}
          onDragLeave={() => setDropping(false)}
          onDrop={onDrop}
          className={cn("bg-hatch p-4 transition-colors duration-ui ease-out", dropping && "bg-fill-strong")}
        >
          {source && scene && crop ? (
            <div
              ref={frame}
              role="group"
              tabIndex={0}
              aria-label={`Crop preview in ${parts} parts. Drag, or use the arrow keys, to move the crop.`}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
              onKeyDown={onKeyDown}
              className="relative mx-auto cursor-grab touch-none select-none overflow-hidden border border-line-strong bg-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:cursor-grabbing"
              style={{
                aspectRatio: `${crop.width} / ${crop.height}`,
                // Never taller than most of the screen, however narrow the crop
                width: `min(100%, calc(70vh * ${crop.width / crop.height}))`,
              }}
            >
              <Stage scene={scene} rect={crop} url={source.url} />
              {rects.map((rect, index) => {
                const position = (rect.x - crop.x) / crop.width;
                return (
                  <div
                    key={index}
                    className="pointer-events-none absolute inset-y-0"
                    style={{ left: `${position * 100}%` }}
                  >
                    {index > 0 && (
                      // A 12px grab strip centred on the 2px seam line
                      <div
                        role="separator"
                        aria-orientation="vertical"
                        aria-label={`Seam between parts ${index} and ${index + 1}. Drag, or use the left and right arrow keys, to move it.`}
                        aria-valuenow={Math.round(position * 100)}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        tabIndex={0}
                        onPointerDown={onSeamPointerDown(index - 1)}
                        onPointerMove={onSeamPointerMove}
                        onPointerUp={onSeamPointerUp}
                        onPointerCancel={onSeamPointerUp}
                        onKeyDown={onSeamKeyDown(index - 1)}
                        className="group pointer-events-auto absolute inset-y-0 -left-1.5 flex w-3 cursor-col-resize touch-none items-center justify-center focus-visible:outline-none"
                      >
                        <div className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-background" />
                        <span className="relative flex h-6 w-3 items-center justify-center border border-line-strong bg-background text-muted-foreground transition-colors duration-press ease-out group-hover:text-foreground group-focus-visible:border-foreground group-focus-visible:text-foreground">
                          <GripVertical className="size-3" aria-hidden="true" />
                        </span>
                      </div>
                    )}
                    <span className="absolute left-2 top-2 flex size-5 items-center justify-center border border-line-strong bg-background">
                      <Label tone="default">{index + 1}</Label>
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 border border-dashed border-line-strong bg-background px-4 py-12 text-center">
              <div className="flex flex-wrap items-center justify-center gap-2">
                <Button onClick={() => fileInput.current?.click()} icon={<ImagePlus className="size-4" />}>
                  Choose an image
                </Button>
                <Button variant="ghost" onClick={openSample} icon={<Images className="size-4" />}>
                  Try the sample
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Or drop one here, or paste it. Landscape works best: anything wider than it is tall.
              </p>
              <Label>JPG, PNG, WebP, GIF, AVIF</Label>
            </div>
          )}
        </div>
      </PanelSection>

      {source && scene && crop && (
        <>
          <PanelSection label="01 // Framing" className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <div className="flex items-center gap-2">
                <Label>Parts</Label>
                <Segmented
                  aria-label="Number of parts"
                  options={partOptions}
                  value={partCount}
                  onChange={changeParts}
                />
              </div>
              <div className="flex items-center gap-2">
                <Label>Shape</Label>
                <Segmented
                  aria-label="Shape of each part"
                  options={shapeOptions}
                  value={shape}
                  onChange={setShape}
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Label as="p" className="w-16 shrink-0">
                Zoom
              </Label>
              <input
                type="range"
                aria-label="Zoom"
                min={1}
                max={MAX_ZOOM}
                step={0.01}
                value={view.zoom}
                onChange={(event) =>
                  setView((current) =>
                    clampView(scene.width, scene.height, parts, shape, {
                      ...current,
                      zoom: Number(event.target.value),
                    })
                  )
                }
                className="h-8 w-full accent-foreground"
              />
              <Label tone="default" className="w-12 shrink-0 text-right tabular-nums">
                {view.zoom.toFixed(2)}×
              </Label>
              <Button
                variant="ghost"
                size="sm"
                aria-label="Reset framing"
                icon={<RotateCcw className="size-4" />}
                onClick={() => {
                  setView(CENTRED);
                  setSeams(null);
                }}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Drag the preview to move the crop, and drag a seam to make one part wider. 4:5 and
              1:1 are shown uncropped in a post; 3:4 is a taller portrait.
              {seams && " The parts are no longer equal, so they no longer all match the chosen shape."}
            </p>
          </PanelSection>

          <PanelSection label="02 // Backdrop" className="flex flex-col gap-4">
            <div role="radiogroup" aria-label="Backdrop" className="flex flex-wrap gap-2">
              {/* ds-lint-disable-next-line raw-html -- a colour swatch; Button is a text/icon control and cannot show a gradient */}
              <button
                type="button"
                role="radio"
                aria-checked={backdropId === "none"}
                aria-label="No backdrop"
                onClick={() => setBackdropId("none")}
                data-hover-sound=""
                className={cn(swatch, backdropId === "none" ? "border-foreground" : "border-line-strong")}
              >
                <Ban className="size-4 text-muted-foreground" aria-hidden="true" />
              </button>
              {backdrops.map((backdrop) => (
                // ds-lint-disable-next-line raw-html -- a colour swatch; Button is a text/icon control and cannot show a gradient
                <button
                  key={backdrop.id}
                  type="button"
                  role="radio"
                  aria-checked={backdropId === backdrop.id}
                  aria-label={`${backdrop.name} backdrop`}
                  onClick={() => setBackdropId(backdrop.id)}
                  data-hover-sound=""
                  className={cn(swatch, backdropId === backdrop.id ? "border-foreground" : "border-line-strong")}
                >
                  <span className="size-full" style={{ background: backdropCss(backdrop) }} />
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <Label as="p" className="w-16 shrink-0">
                Margin
              </Label>
              <input
                type="range"
                aria-label="Margin around the image"
                min={2}
                max={24}
                step={1}
                value={padding}
                disabled={backdropId === "none"}
                onChange={(event) => setPadding(Number(event.target.value))}
                className="h-8 w-full accent-foreground disabled:opacity-40"
              />
              <Label tone="default" className="w-12 shrink-0 text-right tabular-nums">
                {backdropId === "none" ? "--" : `${padding}%`}
              </Label>
            </div>
            <p className="text-xs text-muted-foreground">
              A backdrop puts a gradient behind the image with a margin around it. It is part of
              the picture that gets cut, so it runs across all the parts.
            </p>
          </PanelSection>

          <PanelSection label="03 // Preview" className="bg-fill">
            <PostPreview scene={scene} rects={rects} url={source.url} name={source.name} />
          </PanelSection>

          <PanelSection label="04 // Output" className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <div className="flex items-center gap-2">
                <Label>Format</Label>
                <Segmented
                  aria-label="File format"
                  options={formatOptions}
                  value={format}
                  onChange={setFormat}
                />
              </div>
              <div className="flex min-w-48 flex-1 items-center gap-3">
                <Label>Quality</Label>
                <input
                  type="range"
                  aria-label="Quality"
                  min={40}
                  max={100}
                  step={1}
                  value={quality}
                  disabled={format === "png"}
                  onChange={(event) => setQuality(Number(event.target.value))}
                  className="h-8 w-full accent-foreground disabled:opacity-40"
                />
                <Label tone="default" className="w-8 shrink-0 text-right tabular-nums">
                  {format === "png" ? "--" : quality}
                </Label>
              </div>
            </div>
            <dl className="flex flex-col gap-2">
              {FORMATS.map((item) => {
                const size = sizes[item];
                return (
                  <div key={item} className="flex items-center gap-3">
                    <Label as="dt" tone={item === format ? "default" : "muted"} className="w-16 shrink-0">
                      {item}
                    </Label>
                    <div className="h-1 flex-1 bg-fill-strong">
                      <div
                        className={cn(
                          "h-full origin-left transition-transform duration-panel ease-out motion-reduce:transition-none",
                          item === format ? "bg-foreground" : "bg-muted-foreground"
                        )}
                        style={{ transform: `scaleX(${(size ?? 0) / largest})` }}
                      />
                    </div>
                    <Label
                      as="dd"
                      tone={item === format ? "default" : "muted"}
                      className="w-20 shrink-0 text-right tabular-nums"
                    >
                      {size === undefined ? "..." : size === null ? "N/A" : formatBytes(size)}
                    </Label>
                  </div>
                );
              })}
            </dl>
            <p className="text-xs text-muted-foreground">
              Total for all {parts} parts, measured by encoding them here.
              {unsupported && " This browser can't write the selected format."}
            </p>
          </PanelSection>

          <PanelSection label="05 // Parts" className="flex flex-col gap-4">
            <ul className="grid grid-cols-2 gap-2 md:grid-cols-4">
              {rects.map((rect, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between gap-2 border border-line pl-3"
                >
                  <span className="flex min-w-0 flex-col py-1">
                    <Label tone="default">Part {index + 1}</Label>
                    <Label className="tabular-nums">
                      {rect.width} × {rect.height}
                    </Label>
                  </span>
                  <Button
                    variant="ghost"
                    aria-label={`Download part ${index + 1}`}
                    icon={<Download className="size-4" />}
                    disabled={saving || unsupported}
                    onClick={() => void download(index)}
                  />
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="primary"
                icon={<Download className="size-4" />}
                disabled={saving || unsupported}
                onClick={() => void download()}
              >
                Download all {parts}
              </Button>
              <Button onClick={() => fileInput.current?.click()} icon={<ImagePlus className="size-4" />}>
                Replace image
              </Button>
              <Button variant="ghost" onClick={clear} icon={<Trash2 className="size-4" />}>
                Clear
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Attach the files to one post in order, 1 to {parts}. Your browser may ask once to
              allow several downloads.
            </p>
          </PanelSection>
        </>
      )}
    </Panel>
  );
}
