import type { Metadata } from "next";
import { PageFrame } from "@/components/ds";
import { SiteFooter } from "@/components/home/site-footer";
import { Navbar } from "@/components/navbar";
import { SplitGuide } from "@/components/split-tool/split-guide";
import { SplitTool } from "@/components/split-tool/split-tool";

export const metadata: Metadata = {
  title: "Split // Cut a wide image into parts",
  description:
    "Cut a wide image into two, three or four parts that read as one continuous picture in a multi-image post. Runs in your browser; nothing is uploaded.",
};

export default function Split() {
  return (
    <>
      <Navbar />
      <PageFrame>
        <main className="flex flex-col gap-6">
          <SplitTool />
          <SplitGuide />
        </main>
        <SiteFooter />
      </PageFrame>
    </>
  );
}
