import { NextResponse } from "next/server"

const GITHUB_GRAPHQL_API = "https://api.github.com/graphql"
const GITHUB_USERNAME = process.env.GITHUB_USERNAME || "BearerOP"
/** Contribution counts change slowly; ask GitHub at most once an hour. */
const REVALIDATE_SECONDS = 3600

export async function GET() {
  try {
    // Try to use GitHub token if available, otherwise use public API
    const token = process.env.GITHUB_TOKEN

    if (token) {
      // Use GraphQL API with token
      const query = `
        query($userName: String!) {
          user(login: $userName) {
            contributionsCollection {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    contributionCount
                    date
                  }
                }
              }
            }
          }
        }
      `

      const res = await fetch(GITHUB_GRAPHQL_API, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          variables: { userName: GITHUB_USERNAME },
        }),
        next: { revalidate: REVALIDATE_SECONDS },
      })

      if (!res.ok) {
        throw new Error(`GitHub API error: ${res.status}`)
      }

      const json = await res.json()
      
      if (json.errors) {
        throw new Error(json.errors[0]?.message || "GitHub API error")
      }

      if (!json.data?.user?.contributionsCollection) {
        throw new Error("No contribution data received")
      }

      const calendar = json.data.user.contributionsCollection.contributionCalendar
      
      // Transform to react-activity-calendar format
      const activities = calendar.weeks.flatMap((week: any) =>
        week.contributionDays.map((day: any) => {
          const count = day.contributionCount || 0
          return {
            date: day.date,
            count,
            level: count === 0 ? 0 : Math.min(4, Math.max(1, Math.floor(count / 5) + 1)),
          }
        })
      )

      return NextResponse.json({
        totalContributions: calendar.totalContributions,
        activities,
      })
    } else {
      // Fallback to public API
      const response = await fetch(`https://github.vineet.pro/api/${GITHUB_USERNAME}`, {
        next: { revalidate: REVALIDATE_SECONDS },
      })

      if (!response.ok) {
        throw new Error(`Public API error: ${response.status}`)
      }

      const data = await response.json()
      
      if (!data.data) {
        throw new Error("No contribution data received")
      }

      // Ensure all activities have a level property
      const activities = data.data.map((day: any) => {
        const count = day.count || 0
        return {
          ...day,
          level: day.level ?? (count === 0 ? 0 : Math.min(4, Math.max(1, Math.floor(count / 5) + 1))),
        }
      })

      return NextResponse.json({
        totalContributions: activities.reduce((sum: number, day: any) => sum + day.count, 0),
        activities,
      })
    }
  } catch (error) {
    console.error("Error fetching GitHub contributions:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch contributions" },
      { status: 500 }
    )
  }
}

// Run on request, never at build time. The route used to ask for both a
// static, hourly-revalidated page and uncached fetches, which contradict each
// other: the build tried to prerender it, hit the uncached fetch, and logged
// "Dynamic server usage". The hourly caching now lives on the fetches above.
export const dynamic = "force-dynamic"

