#!/usr/bin/env node
/**
 * Gets a new SPOTIFY_REFRESH_TOKEN for the "now playing" widget.
 *
 *   node scripts/spotify-token.mjs
 *
 * Before running, add this exact Redirect URI to the app in the Spotify
 * developer dashboard (https://developer.spotify.com/dashboard):
 *
 *   http://127.0.0.1:8888/callback
 *
 * The script reads SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET from
 * .env.local (or .env), opens Spotify's consent page, catches the redirect on
 * this machine, and prints the refresh token. Nothing is written to disk.
 * The site itself has no callback route: the token is only ever made here.
 */
import { exec } from "node:child_process";
import { randomBytes } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { createServer } from "node:http";

const PORT = 8888;
const REDIRECT_URI = `http://127.0.0.1:${PORT}/callback`;
const SCOPES = "user-read-currently-playing user-read-recently-played";

function readEnv(name) {
  if (process.env[name]) return process.env[name];
  for (const file of [".env.local", ".env"]) {
    if (!existsSync(file)) continue;
    const line = readFileSync(file, "utf8")
      .split("\n")
      .find((entry) => entry.startsWith(`${name}=`));
    if (line) return line.slice(name.length + 1).trim().replace(/^["']|["']$/g, "");
  }
  return undefined;
}

const clientId = readEnv("SPOTIFY_CLIENT_ID");
const clientSecret = readEnv("SPOTIFY_CLIENT_SECRET");
if (!clientId || !clientSecret) {
  console.error("SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET must be set in .env.local");
  process.exit(1);
}

// Ties the redirect to this run, so a stray request cannot complete it
const state = randomBytes(16).toString("hex");
const authorizeUrl = `https://accounts.spotify.com/authorize?${new URLSearchParams({
  client_id: clientId,
  response_type: "code",
  redirect_uri: REDIRECT_URI,
  scope: SCOPES,
  state,
})}`;

const server = createServer(async (request, response) => {
  const url = new URL(request.url ?? "/", REDIRECT_URI);
  if (url.pathname !== "/callback") {
    response.writeHead(404).end();
    return;
  }

  const finish = (message, code = 0) => {
    response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" }).end(message);
    server.close();
    process.exitCode = code;
  };

  const error = url.searchParams.get("error");
  if (error) return finish(`Spotify refused: ${error}`, 1);
  if (url.searchParams.get("state") !== state) return finish("State did not match. Run the script again.", 1);

  const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code: url.searchParams.get("code") ?? "",
      redirect_uri: REDIRECT_URI,
    }),
  });
  const body = await tokenResponse.json();
  if (!tokenResponse.ok || !body.refresh_token) {
    console.error("Token exchange failed:", body);
    return finish("Token exchange failed. See the terminal.", 1);
  }

  console.log("\nNew refresh token:\n");
  console.log(`SPOTIFY_REFRESH_TOKEN=${body.refresh_token}\n`);
  console.log("Put it in .env.local, and in the Vercel project's environment variables, then redeploy.");
  finish("Done. The refresh token is in your terminal; you can close this tab.");
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`Redirect URI (must be registered in the Spotify dashboard): ${REDIRECT_URI}\n`);
  console.log(`Opening Spotify. If nothing opens, visit:\n${authorizeUrl}\n`);
  const opener = process.platform === "darwin" ? "open" : process.platform === "win32" ? "start" : "xdg-open";
  exec(`${opener} "${authorizeUrl}"`);
});
