import { useId } from "react";
import { cn } from "@/lib/utils";
import { petalGradient } from "./tokens";

export interface PetalProps {
  size?: "sm" | "md" | "lg";
  /**
   * Which edge of the sheet the petal grows from. The artwork is drawn with
   * its stem on the right, so `right` is the drawing as-is and `left` is its
   * mirror image. Never rotate it by other amounts: the stem must meet the edge.
   */
  side: "left" | "right";
  /** Vertical position only (`top-40`, `top-1/3`). The side is set by `side`. */
  className?: string;
}

const sizes = { sm: "size-16", md: "size-24", lg: "size-36" } as const;

/**
 * A leaf growing in from the edge of the sheet: the one soft, coloured thing
 * on the page. Sits flush against its edge, fully visible, never cropped.
 * `PageFrame` already places them; decorative only.
 */
export function Petal({ size = "md", side, className }: PetalProps) {
  const gradient = useId();
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 127.5182 120.46875"
      className={cn(
        "pointer-events-none absolute opacity-70",
        sizes[size],
        side === "right" ? "right-0" : "left-0 -scale-x-100",
        className
      )}
    >
      <defs>
        <linearGradient
          id={gradient}
          x1="164.18384"
          y1="153.79353"
          x2="196.88547"
          y2="79.006691"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(-101.39452,-56.21875)"
        >
          <stop offset="0" stopColor={petalGradient.from} />
          <stop offset="1" stopColor={petalGradient.to} />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${gradient})`}
        d="m 127.18634,95.598676 c -1.73483,2.71285 -2.67621,6.105794 -5.45035,7.927804 -10.96588,7.13428 -25.33404,-2.8173 -35.44674,-8.727344 -9.63977,-7.55142 -11.02108,-8.44724 -1.7148,-18.27675 C 97.26817,59.078756 97.55154,50.893776 97.9526,38.369876 97.12967,23.385736 94.75008,15.464916 90.14059,10.214766 89.28281,8.7880563 82.52362,3.0976363 75.02824,0.55276627 79.62892,16.529356 62.64106,19.145756 57.246088,41.863796 c -2.01393,12.29656 1.27984,27.69425 11.340852,37.47141 4.41216,4.87423 6.50908,7.81909 9.66201,11.64395 1.15369,1.1406 1.51253,2.59913 1.48645,4.21164 -1.20808,2.04794 -3.09142,2.01675 -5.56614,1.64656 l -18.828502,-6.68908 c -8.18103,-3.22041 -26.64835,-9.34391 -40.62994,-5.45036 -10.3354106,3.7026 -13.5711306,9.52949 -14.12139063,18.828524 -0.71407,6.52738 3.35872003,11.68708 7.43232003,16.84655 2.0887206,-6.60842 3.8943306,-10.30659 7.3271006,-12.43483 15.20394,-12.835414 34.61679,-11.392944 53.103702,-8.406713 10.84134,1.516213 15.42819,1.114723 20.78763,1.868153 6.31948,1.23329 12.10162,3.50826 17.83564,6.38506 12.0003,4.25697 9.04394,3.31598 13.66923,4.16505 4.184,-0.94083 6.10252,-3.62046 7.68006,-6.68907 z"
      />
    </svg>
  );
}
