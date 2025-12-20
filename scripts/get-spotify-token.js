/*
 * This script helps you generate a Spotify Refresh Token.
 * 
 * Prerequisites:
 * 1. Go to https://developer.spotify.com/dashboard
 * 2. Create an app
 * 3. Add "http://localhost:3000/callback" to the Redirect URIs in your app settings.
 * 4. Get your Client ID and Client Secret.
 * 
 * Usage:
 * node scripts/get-spotify-token.js <CLIENT_ID> <CLIENT_SECRET>
 */

const http = require('http');
const url = require('url');
const querystring = require('querystring');

const clientId = process.argv[2];
const clientSecret = process.argv[3];
const port = 3000;
const redirectUri = `http://127.0.0.1:${port}/callback`;

if (!clientId || !clientSecret) {
    console.error('Usage: node scripts/get-spotify-token.js <CLIENT_ID> <CLIENT_SECRET>');
    process.exit(1);
}

const scopes = [
    'user-read-currently-playing',
    'user-read-recently-played',
];

const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url);
    const query = querystring.parse(parsedUrl.query);

    if (parsedUrl.pathname === '/callback') {
        const code = query.code;
        const error = query.error;

        if (error) {
            res.end(`Error: ${error}`);
            console.error(`Callback Error: ${error}`);
            server.close();
            return;
        }

        if (code) {
            res.end('Success! You can close this window. Check your terminal for the refresh token.');

            try {
                const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64'),
                    },
                    body: new URLSearchParams({
                        grant_type: 'authorization_code',
                        code: code,
                        redirect_uri: redirectUri,
                    }),
                });

                const data = await tokenResponse.json();

                if (data.error) {
                    console.error('Error fetching token:', data);
                } else {
                    console.log('\n=== YOUR SPOTIFY REFRESH TOKEN ===');
                    console.log(data.refresh_token);
                    console.log('==================================\n');
                    console.log('Add this to your .env.local file:');
                    console.log(`SPOTIFY_REFRESH_TOKEN=${data.refresh_token}`);
                    console.log(`SPOTIFY_CLIENT_ID=${clientId}`);
                    console.log(`SPOTIFY_CLIENT_SECRET=${clientSecret}`);
                }
            } catch (err) {
                console.error('Failed to exchange code for token:', err);
            } finally {
                server.close();
                process.exit(0);
            }
        }
    } else {
        res.end('Not found');
    }
});

server.listen(port, () => {
    const authUrl = 'https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: clientId,
            scope: scopes.join(' '),
            redirect_uri: redirectUri,
        });

    console.log(`
1. Ensure you have added "${redirectUri}" to your Spotify App's Redirect URIs.
2. Open this URL in your browser:

${authUrl}
  `);
});
