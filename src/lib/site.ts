/**
 * The address this site is served from, with no trailing slash.
 *
 * Everything that needs an absolute URL (social preview image, sitemap,
 * robots, structured data, copy-paste install commands) reads it from here,
 * so moving the site is one change. Set NEXT_PUBLIC_SITE_URL to override it,
 * for example when a custom domain is attached.
 */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://bearerop.in").replace(/\/$/, "");
