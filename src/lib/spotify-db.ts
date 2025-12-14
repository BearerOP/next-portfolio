
// ============================================
// FILE: lib/spotify-db.ts
// Spotify database operations with Turso
// ============================================

import { turso } from './db';

export interface SpotifyTrack {
  isPlaying: boolean;
  title: string;
  artist: string;
  album: string;
  albumImageUrl: string;
  songUrl: string;
  progress: number;
  duration: number;
  playedAt?: string;
}

// Initialize database table (run this once)
export async function initSpotifyTable() {
  await turso.execute(`
    CREATE TABLE IF NOT EXISTS spotify_last_played (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      is_playing INTEGER NOT NULL,
      title TEXT NOT NULL,
      artist TEXT NOT NULL,
      album TEXT NOT NULL,
      album_image_url TEXT,
      song_url TEXT,
      progress INTEGER DEFAULT 0,
      duration INTEGER DEFAULT 0,
      played_at TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

// Save track to database (keeps only the last one)
export async function saveLastTrack(track: SpotifyTrack) {
  try {
    // Start transaction: delete old, insert new
    await turso.batch([
      { sql: 'DELETE FROM spotify_last_played', args: [] },
      {
        sql: `
          INSERT INTO spotify_last_played 
          (is_playing, title, artist, album, album_image_url, song_url, progress, duration, played_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        args: [
          track.isPlaying ? 1 : 0,
          track.title,
          track.artist,
          track.album,
          track.albumImageUrl,
          track.songUrl,
          track.progress,
          track.duration,
          track.playedAt || new Date().toISOString(),
        ],
      },
    ]);
    
    return true;
  } catch (error) {
    console.error('Error saving track to Turso:', error);
    return false;
  }
}

// Get last played track from database
export async function getLastTrack(): Promise<SpotifyTrack | null> {
  try {
    const result = await turso.execute({
      sql: `
        SELECT is_playing, title, artist, album, album_image_url, 
               song_url, progress, duration, played_at
        FROM spotify_last_played
        ORDER BY created_at DESC
        LIMIT 1
      `,
      args: [],
    });

    if (result.rows.length === 0) {
      return null;
    }

    const row = result.rows[0];
    return {
      isPlaying: Boolean(row.is_playing),
      title: row.title as string,
      artist: row.artist as string,
      album: row.album as string,
      albumImageUrl: row.album_image_url as string,
      songUrl: row.song_url as string,
      progress: Number(row.progress),
      duration: Number(row.duration),
      playedAt: row.played_at as string,
    };
  } catch (error) {
    console.error('Error fetching track from Turso:', error);
    return null;
  }
}

