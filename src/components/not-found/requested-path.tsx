"use client";

import { usePathname } from "next/navigation";

/** The address that was asked for, shown as the panel's metadata. */
export function RequestedPath() {
  const pathname = usePathname();
  return <>Requested: {pathname}</>;
}
