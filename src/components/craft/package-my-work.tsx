"use client";

import { forwardRef, useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, animate, motion, useInView, useReducedMotion } from "motion/react";

type Target = "plus" | "minus";

const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1];
const EASE_IN_OUT: [number, number, number, number] = [0.77, 0, 0.175, 1];

const START_COUNT = 1;
const STOP = Symbol("stop");

// Cursor stops inside the raw recording, in its 800×450 viewBox units.
const MINI = {
  rest: { x: 300, y: 330 },
  plus: { x: 440, y: 209 },
  minus: { x: 390, y: 209 },
};

const digit = {
  enter: (direction: number) => ({ opacity: 0, transform: `translateY(${direction * 8}px)` }),
  center: { opacity: 1, transform: "translateY(0px)" },
  exit: (direction: number) => ({ opacity: 0, transform: `translateY(${direction * -8}px)` }),
};

// Centre of `el` in `root`'s own coordinates. Uses offsets, not client rects,
// so the answer stays correct while `root` is mid-zoom.
function centerWithin(el: HTMLElement, root: HTMLElement) {
  let x = el.offsetWidth / 2;
  let y = el.offsetHeight / 2;
  let node: HTMLElement | null = el;
  while (node && node !== root) {
    x += node.offsetLeft;
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return { x, y };
}

export function PackageMyWork({ className = "" }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);
  const miniCursorRef = useRef<SVGGElement>(null);
  const plusRef = useRef<HTMLSpanElement>(null);
  const minusRef = useRef<HTMLSpanElement>(null);

  const inView = useInView(rootRef, { amount: 0.4 });
  const reduce = useReducedMotion();

  const [count, setCount] = useState(START_COUNT);
  const [direction, setDirection] = useState(1);
  const [hover, setHover] = useState<Target | null>(null);

  useEffect(() => {
    const camera = cameraRef.current;
    const cursor = cursorRef.current;
    const pointer = pointerRef.current;
    const ripple = rippleRef.current;
    const miniCursor = miniCursorRef.current;
    const plus = plusRef.current;
    const minus = minusRef.current;
    if (!camera || !cursor || !pointer || !ripple || !miniCursor || !plus || !minus) return;

    const spot = (target: Target | "rest") =>
      target === "rest"
        ? { x: camera.offsetWidth * 0.3, y: camera.offsetHeight * 0.86 }
        : centerWithin(target === "plus" ? plus : minus, camera);

    const place = (target: Target | "rest", duration: number) => {
      const p = spot(target);
      const m = MINI[target];
      const options = { duration, ease: EASE_IN_OUT };
      return Promise.all([
        animate(cursor, { transform: `translate(${p.x}px, ${p.y}px)` }, options),
        animate(miniCursor, { transform: `translate(${m.x}px, ${m.y}px)` }, options),
      ]);
    };

    // Reduced motion: one still frame of the packaged shot, cursor on the key detail.
    if (reduce) {
      setCount(START_COUNT + 1);
      setHover("plus");
      place("plus", 0);
      animate(cursor, { opacity: 1 }, { duration: 0.2 });
      return;
    }

    if (!inView) return;

    let alive = true;
    const guard = async (work: PromiseLike<unknown>) => {
      await work;
      if (!alive) throw STOP;
    };
    const sleep = (ms: number) => guard(new Promise((resolve) => setTimeout(resolve, ms)));
    const zoom = (scale: number) =>
      animate(camera, { transform: `scale(${scale})` }, { duration: 0.8, ease: EASE_IN_OUT });

    const press = async (target: Target) => {
      const button = target === "plus" ? plus : minus;
      const down = { duration: 0.1, ease: EASE_OUT };
      const up = { duration: 0.16, ease: EASE_OUT };
      await guard(
        Promise.all([
          animate(button, { transform: "scale(0.92)" }, down),
          animate(pointer, { transform: "scale(0.88)" }, down),
        ]),
      );
      const step = target === "plus" ? 1 : -1;
      setDirection(step);
      setCount((value) => value + step);
      animate(
        ripple,
        { opacity: [0.45, 0], transform: ["scale(0.5)", "scale(1.5)"] },
        { duration: 0.45, ease: EASE_OUT },
      );
      await guard(
        Promise.all([
          animate(button, { transform: "scale(1)" }, up),
          animate(pointer, { transform: "scale(1)" }, up),
        ]),
      );
    };

    const run = async () => {
      setCount(START_COUNT);
      setHover(null);
      animate(camera, { transform: "scale(1)" }, { duration: 0 });
      await guard(place("rest", 0));
      animate(cursor, { opacity: 1 }, { duration: 0.2 });

      while (alive) {
        await sleep(700);

        // Push in on the key detail while the cursor travels to it.
        zoom(1.1);
        await guard(place("plus", 0.8));
        setHover("plus");
        await sleep(250);
        await press("plus");
        await sleep(450);
        await press("plus");
        await sleep(600);

        setHover(null);
        await guard(place("minus", 0.45));
        setHover("minus");
        await sleep(250);
        await press("minus");
        await sleep(450);
        await press("minus");
        await sleep(600);

        setHover(null);
        zoom(1);
        await guard(place("rest", 0.8));
      }
    };

    run().catch((error) => {
      if (error !== STOP) throw error;
    });

    return () => {
      alive = false;
    };
  }, [inView, reduce]);

  return (
    <div
      ref={rootRef}
      role="img"
      aria-label="Before: a raw 800 by 450 screen recording of a whole app window. After: the same interaction packaged at 3840 by 2080, zoomed in on the add-to-cart stepper with a clear cursor and click indicator."
      className={`grid w-full grid-cols-1 gap-6 sm:grid-cols-2 ${className}`}
    >
      <Pane dir="videos/" file="recording.webm" dims="800×450" label="Before">
        <RawRecording count={count} cursorRef={miniCursorRef} />
      </Pane>

      <Pane dir="out/" file="add-to-cart-7s.mp4" dims="3840×2080" label="After" highlight>
        <div
          ref={cameraRef}
          className="relative flex h-full w-full origin-[76%_62%] items-center justify-center bg-white dark:bg-zinc-950"
          style={{ transform: "scale(1)" }}
        >
          <div className="relative w-[74%] max-w-[340px] rounded-2xl border border-zinc-200 bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-12px_rgba(0,0,0,0.12)] dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-[15px] font-semibold leading-tight text-zinc-900 dark:text-zinc-50">
              Sourdough loaf
            </p>
            <p className="mt-1 text-xs leading-snug text-zinc-500 dark:text-zinc-400">
              Slow-fermented for 36 hours, baked this morning.
            </p>
            <div className="mt-4 flex items-center justify-between gap-2">
              <p className="whitespace-nowrap text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                $6.50 <span className="font-normal text-zinc-400 dark:text-zinc-500">· 800 g</span>
              </p>
              <div className="flex items-center rounded-full bg-zinc-100 dark:bg-zinc-800">
                <StepperButton ref={minusRef} hovered={hover === "minus"}>
                  <path d="M5 12h14" />
                </StepperButton>
                <span className="relative flex h-5 w-6 items-center justify-center overflow-hidden text-sm tabular-nums text-zinc-900 dark:text-zinc-50">
                  <AnimatePresence initial={false} custom={direction}>
                    <motion.span
                      key={count}
                      custom={direction}
                      variants={digit}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.18, ease: EASE_OUT }}
                      className="absolute"
                    >
                      {count}
                    </motion.span>
                  </AnimatePresence>
                </span>
                <StepperButton ref={plusRef} hovered={hover === "plus"}>
                  <path d="M12 5v14M5 12h14" />
                </StepperButton>
              </div>
            </div>
          </div>

          {/* Cursor: the wrapper's top-left corner is the hotspot. */}
          <div
            ref={cursorRef}
            className="pointer-events-none absolute left-0 top-0 z-10 opacity-0"
            style={{ transform: "translate(0px, 0px)" }}
          >
            <div
              ref={rippleRef}
              className="absolute -left-5 -top-5 h-10 w-10 rounded-full bg-zinc-900/25 opacity-0 dark:bg-white/30"
            />
            <div ref={pointerRef} className="origin-top-left">
              {hover ? <HandCursor /> : <ArrowCursor />}
            </div>
          </div>
        </div>
      </Pane>
    </div>
  );
}

function Pane({
  dir,
  file,
  dims,
  label,
  highlight = false,
  children,
}: {
  dir: string;
  file: string;
  dims: string;
  label: string;
  highlight?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="flex min-w-0 flex-col items-center gap-3">
      <div className="w-full overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex items-center gap-2 border-b border-zinc-200 px-3 py-2 text-xs dark:border-zinc-800">
          <svg
            viewBox="0 0 24 24"
            className="h-3.5 w-3.5 shrink-0 text-zinc-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
            aria-hidden
          >
            <rect x="3" y="5" width="18" height="14" rx="3" />
            <path d="M10 9.5v5l4.5-2.5z" fill="currentColor" />
          </svg>
          <span className="min-w-0 truncate text-zinc-400 dark:text-zinc-500">
            {dir}
            <span className="font-medium text-zinc-900 dark:text-zinc-100">{file}</span>
          </span>
          <span className="ml-auto shrink-0 tabular-nums text-zinc-400 dark:text-zinc-500">{dims}</span>
        </div>
        <div className="aspect-video overflow-hidden">{children}</div>
      </div>
      <span
        className={`rounded-full px-3 py-1 text-xs font-medium ${
          highlight
            ? "bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300"
            : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

const StepperButton = forwardRef<HTMLSpanElement, { hovered: boolean; children: ReactNode }>(
  function StepperButton({ hovered, children }, ref) {
  return (
    <span
      ref={ref}
      style={{ transform: "scale(1)" }}
      className={`flex h-8 w-8 items-center justify-center rounded-full text-zinc-900 transition-colors duration-150 ease-out dark:text-zinc-50 ${
        hovered ? "bg-zinc-200 dark:bg-zinc-700" : "bg-transparent"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-3.5 w-3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        aria-hidden
      >
        {children}
      </svg>
    </span>
  );
},
);

function ArrowCursor() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="-ml-[5px] -mt-[3.5px] block h-7 w-7 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]"
      aria-hidden
    >
      <path
        d="M4 3v16l4.5-4 3 6.5 2.5-1.2-3-6.3h6z"
        fill="#18181b"
        stroke="#fff"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HandCursor() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="-ml-[11px] -mt-[3.5px] block h-7 w-7 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]"
      fill="#fff"
      stroke="#18181b"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M8 13V4.5a1.5 1.5 0 0 1 3 0V11a1.5 1.5 0 0 1 3 0v.5a1.5 1.5 0 0 1 3 0v.5a1.5 1.5 0 0 1 3 0V16a6 6 0 0 1-6 6h-1.8a6 6 0 0 1-5-2.7l-.2-.3c-.3-.5-1.4-2.4-3.3-5.7a1.5 1.5 0 0 1 .5-2 1.9 1.9 0 0 1 2.3.2L8 13z" />
      <path d="M11 11v-1M14 11.5V11M17 12v-.5" fill="none" />
    </svg>
  );
}

const NAV = ["Home", "Today", "Assets", "Analytics", "Groceries", "Book a call"];

// The "before": the whole app window, captured small, with a cursor you can barely find.
function RawRecording({
  count,
  cursorRef,
}: {
  count: number;
  cursorRef: React.Ref<SVGGElement>;
}) {
  const ink = "fill-zinc-900 dark:fill-zinc-100";
  const muted = "fill-zinc-500 dark:fill-zinc-400";
  const line = "stroke-zinc-200 dark:stroke-zinc-800";

  return (
    <svg viewBox="0 0 800 450" className="block h-full w-full" aria-hidden>
      <rect width="800" height="450" className="fill-zinc-50 dark:fill-zinc-900" />

      <rect x="18" y="14" width="16" height="16" rx="4" className={ink} />
      <text x="42" y="26.5" fontSize="12" fontWeight="600" className={ink}>
        Workspace
      </text>
      <rect x="590" y="12" width="140" height="20" rx="10" className="fill-zinc-200/70 dark:fill-zinc-800" />
      <circle cx="754" cy="22" r="10" className="fill-zinc-200/70 dark:fill-zinc-800" />
      <line x1="0" y1="44" x2="800" y2="44" className={line} />
      <line x1="170" y1="44" x2="170" y2="450" className={line} />

      {NAV.map((item, index) => {
        const y = 78 + index * 26;
        const active = item === "Groceries";
        return (
          <g key={item}>
            {active && (
              <rect x="12" y={y - 15} width="146" height="22" rx="6" className="fill-zinc-200/70 dark:fill-zinc-800" />
            )}
            <text x="22" y={y} fontSize="10.5" fontWeight={active ? 600 : 400} className={active ? ink : muted}>
              {item}
            </text>
          </g>
        );
      })}
      <circle cx="30" cy="422" r="12" className={ink} />
      <text x="30" y="426" fontSize="10" fontWeight="600" textAnchor="middle" className="fill-white dark:fill-zinc-900">
        N
      </text>

      <text x="200" y="100" fontSize="18" fontWeight="600" className={ink}>
        Groceries
      </text>

      <rect
        x="200.5"
        y="130.5"
        width="270"
        height="104"
        rx="12"
        className={`fill-white dark:fill-zinc-950 ${line}`}
      />
      <text x="216" y="157" fontSize="12" fontWeight="600" className={ink}>
        Sourdough loaf
      </text>
      <text x="216" y="173" fontSize="8.5" className={muted}>
        Slow-fermented for 36 hours, baked this morning.
      </text>
      <text x="216" y="213" fontSize="11" fontWeight="600" className={ink}>
        $6.50
        <tspan dx="5" fontSize="9" fontWeight="400" className={muted}>
          800 g
        </tspan>
      </text>
      <rect x="376" y="198" width="78" height="22" rx="11" className="fill-zinc-100 dark:fill-zinc-800" />
      <g className="stroke-zinc-900 dark:stroke-zinc-100" strokeWidth="1.4" strokeLinecap="round">
        <path d="M386.5 209h7M436.5 209h7M440 205.5v7" />
      </g>
      <text x="415" y="213" fontSize="11" textAnchor="middle" className={ink}>
        {count}
      </text>

      <g ref={cursorRef} style={{ transform: `translate(${MINI.rest.x}px, ${MINI.rest.y}px)` }}>
        <path
          d="M0 0v9.6l2.7-2.4 1.8 3.9 1.5-.7-1.8-3.8h3.6z"
          fill="#18181b"
          stroke="#fff"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
