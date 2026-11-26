"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import {
  Button,
  CodeBlock,
  DataTable,
  Label,
  Panel,
  PanelSection,
  Tabs,
} from "@/components/ds";
import { useCraft } from "@/contexts/craft-context";
import { cn } from "@/lib/utils";
import { catalog, type CraftStep } from "./catalog";

const pad = (value: number) => String(value).padStart(2, "0");

const listingTabs = [
  { id: "usage", label: "Usage" },
  { id: "source", label: "Source code" },
] as const;

function Listings({ usage, source }: { usage: string; source: string }) {
  const [tab, setTab] = useState<(typeof listingTabs)[number]["id"]>("usage");
  return (
    <div className="flex flex-col gap-4">
      <Tabs aria-label="Listing" items={listingTabs} value={tab} onChange={setTab} />
      {tab === "usage" ? <CodeBlock code={usage} /> : <CodeBlock code={source} collapsible />}
    </div>
  );
}

function Step({ step, index }: { step: CraftStep; index: number }) {
  return (
    <PanelSection label={`Step ${pad(index + 1)}`}>
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="font-sans text-sm font-semibold">{step.title}</h3>
          {step.body && <p className="mt-1 text-xs text-muted-foreground">{step.body}</p>}
        </div>
        {step.code && <CodeBlock code={step.code} />}
        {step.listings && <Listings {...step.listings} />}
      </div>
    </PanelSection>
  );
}

export function CraftPage() {
  const { selectedComponent, setSelectedComponent } = useCraft();
  const index = Math.max(
    catalog.findIndex((entry) => entry.id === selectedComponent),
    0
  );
  const entry = catalog[index];
  const previous = catalog[index - 1];
  const next = catalog[index + 1];

  return (
    <main className="flex flex-col gap-6">
      <Panel label="Lab // Index" meta={`Total: ${pad(catalog.length)}`}>
        {/* The grid's own right and bottom rules double the panel edge; pull them under it */}
        <div className="-mb-px -mr-px overflow-hidden">
          <Tabs
            aria-label="Component"
            variant="cells"
            value={entry.id}
            onChange={setSelectedComponent}
            items={catalog.map((item, position) => ({
              id: item.id,
              label: item.name,
              annotation: `${pad(position + 1)} // ${item.category}`,
            }))}
          />
        </div>
      </Panel>

      {/* Keyed so tab and expand state reset when the component changes */}
      <div key={entry.id} className="flex flex-col gap-6">
        <Panel
          label={`Component // ${entry.category}`}
          meta={`${pad(index + 1)} of ${pad(catalog.length)}`}
          footer={
            <>
              {previous ? (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setSelectedComponent(previous.id)}
                  icon={<ChevronLeft className="size-4" />}
                >
                  {previous.name}
                </Button>
              ) : (
                <span />
              )}
              {next && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setSelectedComponent(next.id)}
                  icon={<ChevronRight className="size-4" />}
                >
                  {next.name}
                </Button>
              )}
            </>
          }
        >
          <PanelSection>
            <h1 className="font-sans text-2xl font-semibold tracking-tight">{entry.name}</h1>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{entry.description}</p>
          </PanelSection>
        </Panel>

        <Panel label="Demo // Live" meta="Interactive">
          <div
            className={cn(
              "font-sans",
              entry.stage === "centered"
                ? "flex min-h-96 items-center justify-center bg-hatch p-8"
                : "p-4"
            )}
          >
            {entry.demo}
          </div>
        </Panel>

        <Panel label="Install // Steps" meta={`Total: ${pad(entry.steps.length)}`}>
          {entry.steps.map((step, position) => (
            <Step key={step.title} step={step} index={position} />
          ))}
        </Panel>

        <Panel label={`Spec // ${entry.featuresLabel}`} meta={`Total: ${pad(entry.features.length)}`}>
          <ul className="-mb-px grid md:grid-cols-2">
            {entry.features.map((feature, position) => (
              <li key={feature.title} className="flex gap-4 border-b border-line p-4 md:odd:border-r">
                <Label>{pad(position + 1)}</Label>
                <div>
                  <p className="text-sm">{feature.title}</p>
                  {feature.description && (
                    <p className="mt-1 text-xs text-muted-foreground">{feature.description}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </Panel>

        {entry.props && (
          <Panel
            label="Spec // Props"
            meta={`Total: ${pad(entry.props.rows.length)}`}
            footer={entry.props.note ? <Label>{entry.props.note}</Label> : undefined}
          >
            <DataTable
              caption={`${entry.name} props`}
              columns={entry.props.columns}
              rows={entry.props.rows}
            />
          </Panel>
        )}
      </div>
    </main>
  );
}
