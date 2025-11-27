import { NextResponse } from "next/server"

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
      return NextResponse.json(
        { error: "Spotify credentials not configured" },
        { status: 500 }
      )
    }

    const { access_token } = await getAccessToken()
    const response = await getNowPlaying(access_token)

    // 204 means user is not playing anything right now
    // Fallback to the most recently played track instead of "Not Playing"
    if (response.status === 204) {
      const recentResponse = await getRecentlyPlayed(access_token)

      if (!recentResponse.ok) {
        return new NextResponse(null, { status: 204 })
      }

      const recent = await recentResponse.json()
      const lastItem = recent?.items?.[0]

      if (!lastItem?.track) {
        return new NextResponse(null, { status: 204 })
      }

      const track = lastItem.track

      const title = track.name
      const artist = track.artists?.map((a: any) => a.name).join(", ") ?? ""
      const album = track.album?.name ?? ""
      const albumImageUrl = track.album?.images?.[0]?.url ?? ""
      const songUrl = track.external_urls?.spotify ?? ""
      const duration = track.duration_ms ?? 0

      return NextResponse.json({
        isPlaying: false,
        title,
        artist,
        album,
        albumImageUrl,
        songUrl,
        progress: 0,
        duration,
      })
    }

    // Handle other error status codes
    if (response.status === 401) {
      console.error("Spotify token expired or invalid")
      return NextResponse.json(
        { error: "Invalid Spotify token" },
        { status: 401 }
      )
    }

    if (!response.ok) {
      console.error(`Spotify API error: ${response.status}`)
      return NextResponse.json(
        { error: "Failed to fetch from Spotify" },
        { status: response.status }
      )
    }

    const song = await response.json()

    if (!song.item) {
      return new NextResponse(null, { status: 204 })
    }

    const isPlaying = song.is_playing
    const title = song.item.name
    const artist = song.item.artists.map((artist: any) => artist.name).join(", ")
    const album = song.item.album.name
    const albumImageUrl = song.item.album.images[0]?.url
    const songUrl = song.item.external_urls.spotify
    const progress = song.progress_ms
    const duration = song.item.duration_ms

    return NextResponse.json({
      isPlaying,
      title,
      artist,
      album,
      albumImageUrl,
      songUrl,
      progress,
      duration,
    })
  } catch (error) {
    console.error("Error fetching Spotify data:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export const revalidate = 0

