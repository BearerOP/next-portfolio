"use client";

import { CraftLayout } from "@/components/craft/craft-layout";
import { CraftProvider } from "@/contexts/craft-context";

export default function CraftPage() {
  return (
    <CraftProvider>
      <CraftLayout />
    </CraftProvider>
  );
}
