import { createClient, Client } from '@libsql/client';

let tursoClient: Client | null = null;

function getTursoClient(): Client {
    if (!tursoClient) {
        const url = process.env.TURSO_DATABASE_URL;
        const authToken = process.env.TURSO_AUTH_TOKEN;

        if (!url || !authToken) {
            throw new Error('Turso database not configured. Please set TURSO_DATABASE_URL and TURSO_AUTH_TOKEN environment variables.');
        }

        tursoClient = createClient({
            url,
            authToken,
        });
    }

    return tursoClient;
}

// Use a Proxy to lazily initialize the client
export const turso = new Proxy({} as Client, {
    get(target, prop) {
        const client = getTursoClient();
        const value = (client as any)[prop];
        return typeof value === 'function' ? value.bind(client) : value;
    }
});

