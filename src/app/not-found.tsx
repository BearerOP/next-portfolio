import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { Annotation, Button, Label, PageFrame, Panel, PanelSection } from "@/components/ds";
import { SiteFooter } from "@/components/home/site-footer";
import { Navbar } from "@/components/navbar";
import { RequestedPath } from "@/components/not-found/requested-path";
import { Tiles404 } from "@/components/not-found/tiles-404";

export const metadata: Metadata = {
  title: "404 // Sheet not found",
};

export default function NotFound() {
  return (
    <>
      <Navbar />
      <PageFrame>
        <main>
          <Panel
            label="Error // 404"
            meta={<RequestedPath />}
            annotation={<Annotation side="right">hover the tiles</Annotation>}
            footer={
              <>
                <Label>Sheet --</Label>
                <Label>Hover the tiles</Label>
              </>
            }
          >
            <PanelSection padding="none">
              <div className="bg-grid bg-grid-cell">
                <Tiles404 />
              </div>
            </PanelSection>
            <PanelSection label="Status // Not_found">
              <h1 className="font-sans text-2xl font-semibold tracking-tight">
                This sheet isn&apos;t in the set.
              </h1>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                The page you asked for was never drawn, or it has been moved. Everything that
                does exist is one click away.
              </p>
            </PanelSection>
            <PanelSection className="flex flex-wrap items-center gap-2">
              <Button href="/" icon={<ArrowLeft className="size-4" />}>
                Back to home
              </Button>
              <Button href="/#projects" variant="ghost">
                Projects
              </Button>
              <Button href="/craft" variant="ghost">
                Craft
              </Button>
            </PanelSection>
          </Panel>
        </main>
        <SiteFooter />
      </PageFrame>
    </>
  );
}
