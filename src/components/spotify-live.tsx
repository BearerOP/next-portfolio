"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Music2, Pause, Play } from "lucide-react"
import Image from "next/image"

interface SpotifyData {
  isPlaying: boolean
  title: string
  artist: string
  album: string
  albumImageUrl: string
  songUrl: string
  progress: number
  duration: number
}

// Skeleton loading component
function SpotifySkeleton() {
  return (
    <Card className="overflow-hidden bg-gradient-to-br from-neutral-100 to-neutral-50 dark:from-neutral-900 dark:to-neutral-800 border-neutral-200 dark:border-neutral-700 rounded-[32px] shadow-sm">
      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* Album Art Skeleton */}
          <div className="relative w-14 h-14 rounded-xl bg-neutral-200 dark:bg-neutral-700 animate-pulse flex-shrink-0" />
          
          {/* Song Details and Progress Skeleton */}
          <div className="flex-1 min-w-0">
            {/* Title and Badge Row */}
            <div className="flex items-start justify-between gap-2 mb-1">
              <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse flex-1 max-w-[60%]" />
              <div className="h-5 w-16 bg-neutral-200 dark:bg-neutral-700 rounded-xl animate-pulse flex-shrink-0" />
            </div>
            
            {/* Artist Skeleton */}
            <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse w-2/3 mb-2" />
            
            {/* Progress Bar Skeleton */}
            <div className="space-y-1">
              <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-1 overflow-hidden">
                <div className="h-full bg-neutral-300 dark:bg-neutral-600 rounded-full w-1/3 animate-pulse" />
              </div>
              <div className="flex justify-between">
                <div className="h-2.5 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse w-8" />
                <div className="h-2.5 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse w-8" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

export function SpotifyNowPlaying() {
  const [data, setData] = useState<SpotifyData | null>(null)
  const [isOnline, setIsOnline] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [localProgress, setLocalProgress] = useState(0)

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const response = await fetch("/api/spotify/now-playing")

        if (response.status === 204) {
          setIsOnline(false)
          setData(null)
          setError(null)
          setIsLoading(false)
          return
        }

        if (!response.ok) {
          const errorData = await response.json().catch(() => null)
          const errorMessage = errorData?.error || "Failed to fetch Spotify data"
          throw new Error(errorMessage)
        }

        const spotifyData = await response.json()
        setData(spotifyData)
        setLocalProgress(spotifyData.progress) // Update local progress with authoritative data
        setIsOnline(true)
        setError(null)
        setIsLoading(false)
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unable to load Spotify data"
        setError(message)
        setIsOnline(false)
        setData(null)
        setIsLoading(false)
      }
    }

    fetchNowPlaying()
    const interval = setInterval(fetchNowPlaying, 5000)

    return () => clearInterval(interval)
  }, [])

  // Smooth progress interpolation
  useEffect(() => {
    if (!data?.isPlaying || !data?.duration) return

    const interval = setInterval(() => {
      setLocalProgress((prev) => {
        if (prev >= data.duration) return data.duration
        return prev + 1000
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [data?.isPlaying, data?.duration])

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  // Loading state
  if (isLoading) {
    return <SpotifySkeleton />
  }

  // Error state - Red theme
  if (error) {
    return (
      <Card className="p-4 bg-gradient-to-br from-red-50 to-red-100/50 dark:from-red-950/30 dark:to-red-900/20 border-red-200 dark:border-red-900/50 rounded-3xl">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
            <Music2 className="w-6 h-6 text-red-600 dark:text-red-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-red-900 dark:text-red-100 truncate">Spotify Error</p>
            <p className="text-xs text-red-600 dark:text-red-400 truncate">{error}</p>
          </div>
        </div>
      </Card>
    )
  }

  // Offline state - Gray theme
  if (!isOnline || !data) {
    return (
      <Card className="p-4 bg-gradient-to-br from-neutral-50 to-neutral-100/50 dark:from-neutral-900/30 dark:to-neutral-800/20 border-neutral-200 dark:border-neutral-700 rounded-3xl">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-14 h-14 bg-neutral-200 dark:bg-neutral-700 rounded-xl flex items-center justify-center flex-shrink-0">
              <Music2 className="w-6 h-6 text-neutral-500 dark:text-neutral-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate">Not Playing</p>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">Spotify Offline</p>
            </div>
          </div>
          <Badge className="bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 border-0 text-xs px-2 py-0.5">
            Offline
          </Badge>
        </div>
      </Card>
    )
  }

  // Use local progress but clamp it between 0 and duration
  const currentProgress = Math.min(localProgress, data.duration)
  const progressPercentage = (currentProgress / data.duration) * 100

  // Playing state - Green Spotify theme
  if (data.isPlaying) {
    return (
      <Card className="overflow-hidden bg-gradient-to-br from-[#1DB954]/20 via-emerald-50 to-green-100/50 dark:from-[#1DB954]/20 dark:via-emerald-950/30 dark:to-green-900/20 border-[#1DB954]/30 dark:border-[#1DB954]/40 rounded-[32px] shadow-sm">
        <div className="p-4">
          <div className="flex items-start gap-3">
            {/* Album Art */}
            <div className="relative w-14 h-14 rounded-xl overflow-hidden shadow-md flex-shrink-0">
              <Image
                src={data.albumImageUrl || "/placeholder.svg"}
                alt={data.album}
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end justify-center pb-1">
                <div className="flex gap-0.5">
                  <span className="w-0.5 h-2 bg-[#1DB954] rounded-full animate-[bounce_0.6s_ease-in-out_infinite]" />
                  <span className="w-0.5 h-3 bg-[#1DB954] rounded-full animate-[bounce_0.6s_ease-in-out_0.1s_infinite]" />
                  <span className="w-0.5 h-1.5 bg-[#1DB954] rounded-full animate-[bounce_0.6s_ease-in-out_0.2s_infinite]" />
                </div>
              </div>
            </div>

            {/* Song Details and Progress */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <a 
                  href={data.songUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex-1 min-w-0 group"
                >
                  <h3 className="font-semibold text-sm text-neutral-900 dark:text-neutral-100 truncate group-hover:text-[#1DB954] transition-colors">
                    {data.title}
                  </h3>
                </a>
                <Badge className="bg-[#1DB954]/20  border-0 text-xs px-2 py-1 flex-shrink-0 hover:bg-[#1DB954]/30 dark:hover:bg-[#1DB954]/30 transition-colors rounded-lg align-middle gap-1.5  bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 bottom-1 border-emerald-200 dark:border-emerald-200 font-medium text-[8px] uppercase tracking-wider">
                  <Play className="w-2 h-2 fill-current" />
                  Now Playing
                </Badge>
              </div>
              
              <p className="text-xs text-neutral-600 dark:text-neutral-400 truncate mb-2">{data.artist}</p>

              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-1 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#1DB954] to-[#1ed760] rounded-full transition-all duration-1000 ease-linear"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-neutral-500 dark:text-neutral-500">
                  <span>{formatTime(currentProgress)}</span>
                  <span>{formatTime(data.duration)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    )
  }

  // Paused state - Dark/Black theme with Spotify logo badge
  return (
    <Card className="overflow-hidden bg-gradient-to-br from-neutral-100 to-neutral-50 dark:from-neutral-900 dark:to-neutral-950 border-neutral-200 dark:border-neutral-800 rounded-[32px] shadow-sm">
      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* Album Art - Grayscale */}
          <div className="relative w-14 h-14 rounded-xl overflow-hidden shadow-md flex-shrink-0 opacity-60 grayscale">
            <Image
              src={data.albumImageUrl || "/placeholder.svg"}
              alt={data.album}
              fill
              className="object-cover"
              unoptimized
            />
          </div>

          {/* Song Details and Progress */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <a 
                href={data.songUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex-1 min-w-0 group"
              >
                <h3 className="font-semibold text-sm text-neutral-900 dark:text-neutral-100 truncate group-hover:text-[#1DB954] transition-colors">
                  {data.title}
                </h3>
              </a>
              <div className="flex items-center gap-1.5 bg-[#1DB954]/10 dark:bg-[#1DB954]/20 px-2 py-1 rounded-full">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-[#1DB954]">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
                <span className="text-[10px] font-medium text-[#1DB954]">Last played</span>
              </div>
            </div>
            
            <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate mb-2">{data.artist}</p>

            {/* Progress Bar - Gray for paused */}
            <div className="space-y-1">
              <div className="w-full bg-neutral-200 dark:bg-neutral-800 rounded-full h-1 overflow-hidden">
                <div
                  className="h-full bg-neutral-400 dark:bg-neutral-600 rounded-full"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-neutral-400 dark:text-neutral-600">
                <span>{formatTime(currentProgress)}</span>
                <span>{formatTime(data.duration)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
