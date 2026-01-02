"use client"

import { useEffect, useState } from "react"
import { ActivityCalendar, Activity } from "react-activity-calendar"
import { motion } from "motion/react"
import { useTheme } from "next-themes"

interface ContributionData {
  totalContributions: number
  activities: Activity[]
}

const LIGHT_COLORS = [
  "#ebedf0",
  "#9be9a8",
  "#40c463",
  "#30a14e",
  "#216e39",
]

const DARK_COLORS = [
  "#161b22",
  "#0e4429",
  "#006d32",
  "#26a641",
  "#39d353",
]

// Generate skeleton data (53 weeks x 7 days = 371 days)
function generateSkeletonData(): Activity[] {
  const today = new Date()
  const oneYearAgo = new Date(today)
  oneYearAgo.setFullYear(today.getFullYear() - 1)

  const activities: Activity[] = []
  const currentDate = new Date(oneYearAgo)

  // Generate 371 days (53 weeks)
  for (let i = 0; i < 371; i++) {
    activities.push({
      date: currentDate.toISOString().split('T')[0],
      count: 0,
      level: 0,
    })
    currentDate.setDate(currentDate.getDate() + 1)
  }

  return activities
}

// Skeleton component that matches ActivityCalendar structure
function ContributionSkeleton({ theme }: { theme: string | undefined }) {
  const skeletonData = generateSkeletonData()
  const isDark = theme === 'dark'

  const bgColor = isDark ? 'bg-neutral-800' : 'bg-neutral-200'

  return (
    <div className="w-full">
      {/* Month labels skeleton */}
      <div className="flex justify-between mb-2 px-7">
        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, i) => (
          <div
            key={month}
            className={`h-3 w-8 ${bgColor} rounded animate-pulse`}
            style={{ opacity: i % 2 === 0 ? 0.5 : 0.3 }}
          />
        ))}
      </div>

      <div className="flex gap-2">
        {/* Weekday labels skeleton */}
        {/* <div className="flex flex-col justify-between py-0.5 pr-2">
          {['Mon', 'Wed', 'Fri'].map((day) => (
            <div key={day} className={`h-2.5 w-8 ${bgColor} rounded animate-pulse`} style={{ opacity: 0.4 }} />
          ))}
        </div> */}

        {/* Grid skeleton */}
        <div className="flex-1">
          <div className="grid grid-cols-[repeat(53,min-content)] grid-rows-7 gap-[2px]">
            {skeletonData.map((_, index) => (
              <div
                key={index}
                className={`w-[11px] h-[11px] ${bgColor} rounded-[2px] animate-pulse`}
                style={{
                  animationDelay: `${(index % 7) * 0.03}s`,
                  opacity: 0.2 + (index % 4) * 0.15,
                }}
              />
            ))}
          </div>

          {/* Count and Legend row */}
          <div className="flex items-center justify-between mt-3">
            {/* Contribution count skeleton - left */}
            <div className={`h-4 w-40 ${bgColor} rounded animate-pulse`} style={{ opacity: 0.4 }} />

            {/* Legend skeleton - right */}
            <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
              <span className="opacity-50">Less</span>
              <div className="flex gap-[2px]">
                {[0, 1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className={`w-[11px] h-[11px] ${bgColor} rounded-[2px] animate-pulse`}
                    style={{ opacity: 0.2 + level * 0.12 }}
                  />
                ))}
              </div>
              <span className="opacity-50">More</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default function ContributionsPage() {
  const [data, setData] = useState<ContributionData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { theme, resolvedTheme } = useTheme()

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch("/api/github/contributions")

        if (!response.ok) {
          throw new Error("Failed to fetch contributions")
        }

        const contributionData = await response.json()

        if (contributionData.error) {
          throw new Error(contributionData.error)
        }

        // Ensure all activities have a level property
        const activitiesWithLevel: Activity[] = contributionData.activities.map((activity: any) => ({
          ...activity,
          level: activity.level ?? Math.min(4, Math.floor(activity.count / 5)),
        }))

        setData({
          ...contributionData,
          activities: activitiesWithLevel,
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load contributions")
        setData(null)
      } finally {
        setLoading(false)
      }
    }

    fetchContributions()
  }, [])

  const currentTheme = resolvedTheme || theme || "light"
  const colorScheme = currentTheme === "dark" ? "dark" : "light"

  if (error || (!loading && !data)) {
    return (
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center text-sm text-neutral-500 dark:text-neutral-400">
          {error || "Unable to load contribution data"}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 relative">
      {/* Skeleton - always rendered, faded out when data loads */}
      <div
        className={`transition-opacity duration-500 ${loading ? "opacity-100" : "opacity-0 pointer-events-none absolute"
          }`}
      >
        <ContributionSkeleton theme={currentTheme} />
      </div>

      {/* Actual graph - fades in when data loads */}
      {data && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
          className={loading ? "opacity-0" : "opacity-100"}
        >
          <ActivityCalendar
            data={data.activities}
            maxLevel={4}
            blockMargin={2}
            blockRadius={2}
            blockSize={11}
            loading={false}
            labels={{
              totalCount: `{{count}} contributions in the last year`,
            }}
            theme={{
              light: LIGHT_COLORS,
              dark: DARK_COLORS,
            }}
            colorScheme={colorScheme}
            fontSize={12}
            hideTotalCount={false}
            hideColorLegend={false}
            style={{
              width: "100%",
            }}
          />
        </motion.div>
      )}
    </div>
  )
}
