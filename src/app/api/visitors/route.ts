import { NextResponse } from "next/server";

/**
 * Total visitors and page views for the production site, from the Vercel
 * Web Analytics API (counts everything since Web Analytics was enabled).
 * https://vercel.com/docs/analytics/web-analytics-api
 *
 * Needs three environment variables (see README or .env.local):
 *   VERCEL_ANALYTICS_TOKEN       a Vercel access token (keep it server-side)
 *   VERCEL_ANALYTICS_PROJECT_ID  the project id, prj_…
 *   VERCEL_ANALYTICS_TEAM_ID     the team id, team_… (omit for a personal account)
 */
const ENDPOINT = "https://api.vercel.com/v1/query/web-analytics/visits/count";

// The total moves slowly; one upstream call an hour is plenty
const REVALIDATE_SECONDS = 3600;

export const revalidate = 3600;

export async function GET() {
  const token = process.env.VERCEL_ANALYTICS_TOKEN;
  const projectId = process.env.VERCEL_ANALYTICS_PROJECT_ID;
  const teamId = process.env.VERCEL_ANALYTICS_TEAM_ID;

  if (!token || !projectId) {
    return NextResponse.json({ error: "Visitor count is not configured" }, { status: 503 });
  }

  const url = new URL(ENDPOINT);
  url.searchParams.set("projectId", projectId);
  if (teamId) url.searchParams.set("teamId", teamId);

  try {
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!response.ok) {
      console.error(`Vercel Web Analytics API responded ${response.status}`);
      return NextResponse.json({ error: "Visitor count is unavailable" }, { status: 502 });
    }

    const json: { data?: { visitors?: unknown; pageviews?: unknown } } = await response.json();
    const { visitors, pageviews } = json.data ?? {};
    if (typeof visitors !== "number" || typeof pageviews !== "number") {
      return NextResponse.json({ error: "Unexpected analytics response" }, { status: 502 });
    }

    return NextResponse.json({ visitors, pageviews });
  } catch (error) {
    console.error("Vercel Web Analytics request failed", error);
    return NextResponse.json({ error: "Visitor count is unavailable" }, { status: 502 });
  }
}
