"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { ActivityCalendar, type Activity } from "react-activity-calendar";
import { Label, Panel, PanelSection, graphRamp } from "@/components/ds";
import { cn } from "@/lib/utils";

interface ContributionData {
  totalContributions: number;
  activities: Activity[];
}

type State =
  | { status: "loading" }
  | { status: "error" }
  | { status: "ready"; data: ContributionData };

export function GithubActivity() {
  const [state, setState] = useState<State>({ status: "loading" });
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    let cancelled = false;
    fetch("/api/github/contributions")
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((json) => {
        if (cancelled || json.error) throw new Error();
        const activities: Activity[] = json.activities.map(
          (activity: Omit<Activity, "level"> & { level?: Activity["level"] }) => ({
            ...activity,
            level: activity.level ?? Math.min(4, Math.floor(activity.count / 5)),
          })
        );
        setState({ status: "ready", data: { ...json, activities } });
      })
      .catch(() => {
        if (!cancelled) setState({ status: "error" });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Panel
      id="activity"
      label="Activity // GitHub"
      meta={state.status === "ready" ? `Total: ${state.data.totalContributions}` : "Last 12 months"}
      footer={
        <>
          <Label>Sheet 03</Label>
          <Label>@BearerOP</Label>
        </>
      }
    >
      <PanelSection>
        {/* Skeleton and graph share one grid cell, so swapping them never shifts the layout */}
        <div className="grid min-h-40 overflow-x-auto scrollbar-hide">
          <div
            aria-hidden="true"
            className={cn(
              "col-start-1 row-start-1 bg-fill-strong transition-opacity duration-ui ease-out motion-safe:animate-pulse",
              state.status === "loading" ? "opacity-100" : "opacity-0"
            )}
          />
          {state.status === "error" && (
            <p className="col-start-1 row-start-1 self-center text-center text-xs text-muted-foreground">
              Couldn&apos;t load contribution data.
            </p>
          )}
          {state.status === "ready" && (
            <div className="col-start-1 row-start-1 animate-in fade-in duration-ui">
              <ActivityCalendar
                data={state.data.activities}
                maxLevel={4}
                blockMargin={2}
                blockRadius={0}
                blockSize={11}
                fontSize={11}
                theme={{ light: [...graphRamp.light], dark: [...graphRamp.dark] }}
                colorScheme={resolvedTheme === "light" ? "light" : "dark"}
                labels={{ totalCount: "{{count}} contributions in the last year" }}
              />
            </div>
          )}
        </div>
      </PanelSection>
    </Panel>
  );
}
