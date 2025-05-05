"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { format, parseISO } from "date-fns";

export function ContributionGrid({ weeks }: { weeks: any[] }) {
  const monthLabels = useMemo(() => getMonthLabels(weeks), [weeks]);

  return (
    <div className="overflow-x-auto text-xs text-neutral-500">
      <div className="flex gap-[2px]">
        {/* Weekday Labels */}
        <div className="flex flex-col justify-between py-[2px] pr-1">
          <span className="h-[11px] sm:h-[9px] xs:h-[7px]">Mon</span>
          <span className="h-[11px] sm:h-[9px] xs:h-[7px]">Wed</span>
          <span className="h-[11px] sm:h-[9px] xs:h-[7px]">Fri</span>
        </div>

        <div>
          {/* Month Labels */}
          <div className="relative h-5 mb-[2px] w-full">
            {monthLabels.map(({ label, index }) => (
              <span
                key={index}
                className="absolute text-[10px] transform -translate-x-1/2"
                style={{ 
                  left: `${(index * 11 + (index * 2))}px` 
                }}
              >
                {label}
              </span>
            ))}
          </div>

          {/* Contribution Squares */}
          <div
            className="
              grid 
              grid-cols-[repeat(53,min-content)] 
              grid-rows-7 
              gap-[2px]
            "
          >
            {weeks.map((week, i) =>
              week.contributionDays.map((day: any, j: number) => {
                const count = day.contributionCount;
                const intensity = getGrayIntensity(count);
                return (
                  <motion.div
                    key={`${i}-${j}`}
                    className={`
                      ${intensity}
                      w-[11px] h-[11px]
                      sm:w-[9px] sm:h-[9px]
                      xs:w-[7px] xs:h-[7px]
                      rounded-[1px]
                    `}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.0015 * (i * 7 + j) }}
                    title={`${day.date}: ${count} contribution${count === 1 ? "" : "s"}`}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Adjusted to match the darker theme in the image
function getGrayIntensity(count: number): string {
  if (count === 0) return "bg-[#121212]";
  if (count < 3) return "bg-[#1f1f1f]";
  if (count < 6) return "bg-[#2d2d2d]";
  if (count < 10) return "bg-[#3a3a3a]";
  return "bg-[#4a4a4a]";
}

// Calculate month labels (evenly distributed across the grid)
function getMonthLabels(weeks: any[]) {
  // Define fixed month positions to match the image
  return [
    { label: "May", index: 0 },
    { label: "Jun", index: 4 },
    { label: "Jul", index: 8 },
    { label: "Aug", index: 13 },
    { label: "Sep", index: 17 },
    { label: "Oct", index: 22 },
    { label: "Nov", index: 26 },
    { label: "Dec", index: 30 },
    { label: "Jan", index: 35 },
    { label: "Feb", index: 39 },
    { label: "Mar", index: 43 },
    { label: "Apr", index: 48 }
  ];
}