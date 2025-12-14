// ============================================
// FILE: app/api/spotify/now-playing/route.ts
// Updated API route with Turso integration
// ============================================

import { NextResponse } from "next/server"
import { saveLastTrack, getLastTrack } from "@/lib/spotify-db"

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN

const NOW_PLAYING_ENDPOINT = "https://api.spotify.com/v1/me/player/currently-playing"
const RECENTLY_PLAYED_ENDPOINT =
  "https://api.spotify.com/v1/me/player/recently-played?limit=1"
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token"

async function getAccessToken() {
  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
    throw new Error("Missing Spotify credentials in environment variables")
  }

  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")

  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: REFRESH_TOKEN,
    }),
    cache: "no-store",
  })

  if (!response.ok) {
    const error = await response.text()
    console.error("Spotify token error:", error)
    throw new Error("Failed to get access token")
  }

  return response.json()
}

async function getNowPlaying(accessToken: string) {
  return fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  })
}

async function getRecentlyPlayed(accessToken: string) {
  return fetch(RECENTLY_PLAYED_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  })
}

export async function GET() {
  try {
    // Check for environment variables
    if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
      console.error("Missing Spotify environment variables")
      
      // Try to return cached data from Turso
      const cachedTrack = await getLastTrack()
      if (cachedTrack) {
        return NextResponse.json(cachedTrack)
      }
      
      return NextResponse.json(
        { error: "Spotify credentials not configured" },
        { status: 500 }
      )
    }

    const { access_token } = await getAccessToken()
    const response = await getNowPlaying(access_token)

    // 204 means user is not playing anything right now
    if (response.status === 204) {
      const recentResponse = await getRecentlyPlayed(access_token)

      if (!recentResponse.ok) {
        // Return cached data from Turso
        const cachedTrack = await getLastTrack()
        if (cachedTrack) {
          return NextResponse.json(cachedTrack)
        }
        return new NextResponse(null, { status: 204 })
      }

      const recent = await recentResponse.json()
      const lastItem = recent?.items?.[0]

      if (!lastItem?.track) {
        // Return cached data from Turso
        const cachedTrack = await getLastTrack()
        if (cachedTrack) {
          return NextResponse.json(cachedTrack)
        }
        return new NextResponse(null, { status: 204 })
      }

      const track = lastItem.track

      const trackData = {
        isPlaying: false,
        title: track.name,
        artist: track.artists?.map((a: any) => a.name).join(", ") ?? "",
        album: track.album?.name ?? "",
        albumImageUrl: track.album?.images?.[0]?.url ?? "",
        songUrl: track.external_urls?.spotify ?? "",
        progress: 0,
        duration: track.duration_ms ?? 0,
        playedAt: lastItem.played_at,
      }

      // Save to Turso for caching
      await saveLastTrack(trackData)

      return NextResponse.json(trackData)
    }

    // Handle other error status codes
    if (response.status === 401) {
      console.error("Spotify token expired or invalid")
      
      // Return cached data from Turso
      const cachedTrack = await getLastTrack()
      if (cachedTrack) {
        return NextResponse.json(cachedTrack)
      }
      
      return NextResponse.json(
        { error: "Invalid Spotify token" },
        { status: 401 }
      )
    }

    if (!response.ok) {
      console.error(`Spotify API error: ${response.status}`)
      
      // Return cached data from Turso
      const cachedTrack = await getLastTrack()
      if (cachedTrack) {
        return NextResponse.json(cachedTrack)
      }
      
      return NextResponse.json(
        { error: "Failed to fetch from Spotify" },
        { status: response.status }
      )
    }

    const song = await response.json()

    if (!song.item) {
      // Return cached data from Turso
      const cachedTrack = await getLastTrack()
      if (cachedTrack) {
        return NextResponse.json(cachedTrack)
      }
      return new NextResponse(null, { status: 204 })
    }

    const trackData = {
      isPlaying: song.is_playing,
      title: song.item.name,
      artist: song.item.artists.map((artist: any) => artist.name).join(", "),
      album: song.item.album.name,
      albumImageUrl: song.item.album.images[0]?.url,
      songUrl: song.item.external_urls.spotify,
      progress: song.progress_ms,
      duration: song.item.duration_ms,
    }

    // Save to Turso for caching
    await saveLastTrack(trackData)

    return NextResponse.json(trackData)
  } catch (error) {
    console.error("Error fetching Spotify data:", error)
    
    // Try to return cached data from Turso on any error
    try {
      const cachedTrack = await getLastTrack()
      if (cachedTrack) {
        return NextResponse.json(cachedTrack)
      }
    } catch (dbError) {
      console.error("Error fetching from Turso:", dbError)
    }
    
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export const revalidate = 0
