// ============================================
// FILE: scripts/init-db.ts
// Run this once to create the table
// Usage: npx tsx src/scripts/init-db.ts
// ============================================

import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') });

import { initSpotifyTable } from '../lib/spotify-db';

async function main() {
    console.log('Creating Spotify table in Turso...');
    await initSpotifyTable();
    console.log('✅ Table created successfully!');
    process.exit(0);
}

main().catch((error) => {
    console.error('❌ Error:', error);
    process.exit(1);
});