"use client";

import { useEffect, useState } from "react";
import { Label } from "@/components/ds";

const format = new Intl.NumberFormat("en-US");

/**
 * "Visitors: 12,345" in the footer. Renders nothing until the number is
 * known, and nothing at all if the count is unavailable, so a missing token
 * never shows as a broken or zero counter.
 */
export function VisitorCount() {
  const [visitors, setVisitors] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/visitors")
      .then((response) => (response.ok ? response.json() : null))
      .then((json) => {
        if (!cancelled && typeof json?.visitors === "number") setVisitors(json.visitors);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  if (visitors === null) return null;

  return (
    <p className="flex items-center justify-center gap-2 animate-in fade-in duration-ui">
      <Label>Visitors</Label>
      <Label tone="default">{format.format(visitors)}</Label>
    </p>
  );
}
