"use client";

import { CraftPage } from "@/components/craft-page/craft-page";
import { PageFrame } from "@/components/ds";
import { SiteFooter } from "@/components/home/site-footer";
import { Navbar } from "@/components/navbar";
import { CraftProvider } from "@/contexts/craft-context";

export default function Craft() {
  return (
    <CraftProvider>
      <Navbar />
      <PageFrame>
        <CraftPage />
        <SiteFooter />
      </PageFrame>
    </CraftProvider>
  );
}
