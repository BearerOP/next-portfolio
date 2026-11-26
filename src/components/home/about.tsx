import { ArrowUpRight } from "lucide-react";
import { Button, Label, Panel, PanelSection } from "@/components/ds";
import { personalInfo } from "@/lib/resume";
import { CopyCommand } from "./copy-command";

export function About() {
  return (
    <Panel
      id="about"
      label="Profile // About"
      meta="Rajasthan, IN"
      footer={
        <>
          <Label>Sheet 01</Label>
          <Label>{personalInfo.title}</Label>
        </>
      }
    >
      <PanelSection label="Greeting">
        <h1 className="font-sans text-2xl font-semibold tracking-tight">
          Hi! I&apos;m Ankit Yadav <span className="text-muted-foreground">aka BearerOP</span>
        </h1>
        <p className="mt-1 text-xs text-muted-foreground">
          22 · Rajasthan, IN · Frontend Developer/Designer
        </p>
      </PanelSection>
      <div className="grid border-b border-line md:grid-cols-2">
        <PanelSection label="01 // Who_I_am" className="md:border-b-0 md:border-r">
          <p className="text-sm leading-relaxed">{personalInfo.bio}</p>
        </PanelSection>
        <PanelSection label="02 // What_I_do">
          <p className="text-sm leading-relaxed">
            Welcome to my little corner on the Internet. I build web applications that look good,
            feel fast, and work flawlessly across devices.
          </p>
        </PanelSection>
      </div>
      <PanelSection className="flex flex-wrap items-center gap-2">
        <CopyCommand />
        <Button href={personalInfo.resumeUrl} icon={<ArrowUpRight className="size-4" />}>
          Resume
        </Button>
        <Button href="/craft" variant="ghost">
          Craft
        </Button>
      </PanelSection>
    </Panel>
  );
}
