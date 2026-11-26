"use client";

import { ArrowUpRight } from "lucide-react";
import { Annotation, Button, Label, Panel } from "@/components/ds";
import { cn } from "@/lib/utils";

const demos = [
  {
    title: "Origin Aware Card",
    description: "Expandable cards with layout animations",
    video: "/videos/demo/origin-aware-card.mp4",
    componentId: "origin-aware-cards",
  },
  {
    title: "Family Style Modal",
    description: "Multi-step animated modal with smooth transitions",
    video: "/videos/demo/family-style-modal.mp4",
    componentId: "family-style-modal",
  },
  {
    title: "Package My Work",
    description: "A Claude Code skill that records UI work as a crisp, shareable clip",
    // Rendered by the skill itself
    video: "/videos/demo/package-my-work.mp4",
    componentId: "package-my-work",
  },
] as const;

export function Crafts() {
  return (
    <Panel
      id="craft"
      annotation={<Annotation side="left">try these</Annotation>}
      label="Lab // Craft"
      meta={`Total: ${String(demos.length).padStart(2, "0")}`}
      footer={
        <>
          <Label>Sheet 05</Label>
          <Label>Interactive components</Label>
        </>
      }
    >
      <div className="grid md:grid-cols-2">
        {demos.map((demo, index) => (
          <article
            key={demo.componentId}
            className={cn(
              "media-mono-group flex flex-col border-b border-line last:border-b-0 md:border-b-0 md:odd:border-r",
              // Second row onwards needs a rule above it on the two-column grid
              index >= 2 && "md:border-t"
            )}
          >
            <video
              src={demo.video}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              aria-label={`${demo.title} demo`}
              className="media-mono aspect-video w-full border-b border-line bg-fill-strong object-cover"
            />
            <div className="flex items-center justify-between gap-4 p-4">
              <div className="min-w-0">
                <h3 className="truncate font-sans text-sm font-semibold">{demo.title}</h3>
                <p className="truncate text-xs text-muted-foreground">{demo.description}</p>
              </div>
              <Button
                href="/craft"
                size="sm"
                aria-label={`Open ${demo.title} in Craft`}
                // The craft page reads this to open on the right component
                onClick={() => sessionStorage.setItem("craft-selected-component", demo.componentId)}
                icon={<ArrowUpRight className="size-4" />}
              >
                Open
              </Button>
            </div>
          </article>
        ))}
        {/* An odd count leaves the last cell empty; hatch it like any other margin */}
        {demos.length % 2 === 1 && <div aria-hidden className="hidden border-t border-line bg-hatch md:block" />}
      </div>
    </Panel>
  );
}
