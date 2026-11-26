import { backdrops, exportMatte } from "@/components/ds";

/** The shape of each part. `original` keeps the picture's own height. */
export type Shape = "original" | "4:5" | "1:1" | "3:4";
export type Format = "webp" | "jpeg" | "png";
export type Backdrop = (typeof backdrops)[number];
export type BackdropId = Backdrop["id"] | "none";

/**
 * What gets cut: the image, optionally sitting on a backdrop with a margin
 * around it. `width` and `height` are the whole picture, margin included.
 */
export interface Scene {
  image: HTMLImageElement;
  width: number;
  height: number;
  /** Margin between the image and the picture's edge, in pixels. 0 without a backdrop. */
  pad: number;
  backdrop: Backdrop | null;
}

/** Where the crop sits: zoom 1 is the largest crop that fits; x and y are its centre, 0 to 1. */
export interface View {
  zoom: number;
  x: number;
  y: number;
}

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export const MAX_ZOOM = 4;
/** No part may be dragged narrower than this share of the crop. */
export const MIN_PART = 0.1;

const RATIOS: Record<Exclude<Shape, "original">, number> = {
  "4:5": 4 / 5,
  "1:1": 1,
  "3:4": 3 / 4,
};

export const MIME: Record<Format, string> = {
  webp: "image/webp",
  jpeg: "image/jpeg",
  png: "image/png",
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export function makeScene(
  image: HTMLImageElement,
  backdropId: BackdropId,
  /** Margin as a percentage of the image's shorter side. */
  padding: number
): Scene {
  const backdrop = backdrops.find((item) => item.id === backdropId) ?? null;
  const width = image.naturalWidth;
  const height = image.naturalHeight;
  const pad = backdrop ? Math.round((Math.min(width, height) * padding) / 100) : 0;
  return { image, width: width + pad * 2, height: height + pad * 2, pad, backdrop };
}

/** The backdrop as a CSS background, for the on-screen preview. */
export function backdropCss(backdrop: Backdrop) {
  return `linear-gradient(${backdrop.angle}deg, ${backdrop.stops.join(", ")})`;
}

/**
 * The same gradient for a canvas. CSS sizes its gradient line so the corners
 * get the end colours exactly; this reproduces that line, so the export
 * matches the preview.
 */
function backdropFill(context: CanvasRenderingContext2D, backdrop: Backdrop, width: number, height: number) {
  const angle = (backdrop.angle * Math.PI) / 180;
  const directionX = Math.sin(angle);
  const directionY = -Math.cos(angle);
  const half = (Math.abs(width * directionX) + Math.abs(height * directionY)) / 2;
  const gradient = context.createLinearGradient(
    width / 2 - directionX * half,
    height / 2 - directionY * half,
    width / 2 + directionX * half,
    height / 2 + directionY * half
  );
  backdrop.stops.forEach((stop, index) =>
    gradient.addColorStop(index / (backdrop.stops.length - 1), stop)
  );
  return gradient;
}

/** Size of the whole crop (all parts together), in scene pixels. */
function cropSize(width: number, height: number, parts: number, shape: Shape, zoom: number) {
  const sceneAspect = width / height;
  const aspect = shape === "original" ? sceneAspect : parts * RATIOS[shape];
  const fitted =
    aspect > sceneAspect
      ? { width, height: width / aspect }
      : { width: height * aspect, height };
  return { width: fitted.width / zoom, height: fitted.height / zoom };
}

/** Pulls a view back inside the picture, so the crop never runs off an edge. */
export function clampView(width: number, height: number, parts: number, shape: Shape, view: View): View {
  const zoom = clamp(view.zoom, 1, MAX_ZOOM);
  const size = cropSize(width, height, parts, shape, zoom);
  const halfX = size.width / 2 / width;
  const halfY = size.height / 2 / height;
  return { zoom, x: clamp(view.x, halfX, 1 - halfX), y: clamp(view.y, halfY, 1 - halfY) };
}

/** The crop in whole scene pixels. */
export function cropRect(width: number, height: number, parts: number, shape: Shape, view: View): Rect {
  const safe = clampView(width, height, parts, shape, view);
  const size = cropSize(width, height, parts, shape, safe.zoom);
  // Never narrower than one pixel per part
  const cropWidth = clamp(Math.round(size.width), parts, width);
  const cropHeight = clamp(Math.round(size.height), 1, height);
  return {
    x: clamp(Math.round(safe.x * width - cropWidth / 2), 0, width - cropWidth),
    y: clamp(Math.round(safe.y * height - cropHeight / 2), 0, height - cropHeight),
    width: cropWidth,
    height: cropHeight,
  };
}

/** Seam positions for equal parts, as shares of the crop width. */
export function equalSeams(parts: number) {
  return Array.from({ length: parts - 1 }, (_, index) => (index + 1) / parts);
}

/** Moves one seam, keeping every part at least MIN_PART wide. */
export function moveSeam(seams: readonly number[], index: number, to: number) {
  const min = (seams[index - 1] ?? 0) + MIN_PART;
  const max = (seams[index + 1] ?? 1) - MIN_PART;
  return seams.map((seam, position) => (position === index ? clamp(to, min, max) : seam));
}

/**
 * Cuts the crop into columns. With `seams` null the parts are equal, and when
 * the width does not divide evenly the leftover pixels go one each to the
 * first parts. Either way the parts tile the crop exactly; nothing is trimmed.
 */
export function partRects(crop: Rect, parts: number, seams: readonly number[] | null): Rect[] {
  let edges: number[];
  if (seams) {
    edges = [0];
    seams.forEach((seam, index) => {
      // Whole pixels, at least one per part, leaving room for the parts after
      const remaining = seams.length - index;
      edges.push(clamp(Math.round(seam * crop.width), edges[index] + 1, crop.width - remaining));
    });
    edges.push(crop.width);
  } else {
    const base = Math.floor(crop.width / parts);
    const extra = crop.width % parts;
    edges = [0];
    for (let index = 0; index < parts; index++) {
      edges.push(edges[index] + base + (index < extra ? 1 : 0));
    }
  }
  return edges.slice(0, -1).map((edge, index) => ({
    x: crop.x + edge,
    y: crop.y,
    width: edges[index + 1] - edge,
    height: crop.height,
  }));
}

function encode(scene: Scene, rect: Rect, format: Format, quality: number) {
  return new Promise<Blob>((resolve, reject) => {
    const canvas = document.createElement("canvas");
    canvas.width = rect.width;
    canvas.height = rect.height;
    const context = canvas.getContext("2d");
    if (!context) return reject(new Error("Canvas is unavailable"));
    if (format === "jpeg") {
      context.fillStyle = exportMatte;
      context.fillRect(0, 0, rect.width, rect.height);
    }
    // Draw the whole scene shifted so that this part lands on the canvas
    context.translate(-rect.x, -rect.y);
    if (scene.backdrop) {
      context.fillStyle = backdropFill(context, scene.backdrop, scene.width, scene.height);
      context.fillRect(0, 0, scene.width, scene.height);
    }
    context.drawImage(scene.image, scene.pad, scene.pad);
    canvas.toBlob(
      (blob) => {
        // A browser that cannot write the format silently falls back to PNG
        if (!blob || blob.type !== MIME[format]) reject(new Error(`Cannot encode ${format}`));
        else resolve(blob);
      },
      MIME[format],
      quality
    );
  });
}

/** Encodes every part, in order. Rejects if the browser cannot write the format. */
export async function encodeParts(
  scene: Scene,
  rects: readonly Rect[],
  format: Format,
  quality: number
): Promise<Blob[]> {
  const blobs: Blob[] = [];
  // One at a time: several full-size canvases at once can exhaust memory on phones
  for (const rect of rects) blobs.push(await encode(scene, rect, format, quality));
  return blobs;
}

export function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}
