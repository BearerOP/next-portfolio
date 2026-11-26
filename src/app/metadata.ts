import type { Metadata, Viewport } from "next";
import { siteUrl } from "@/lib/site";

// Kept inside what previews show without cutting off: about 155 characters
// for search results, about 125 for social cards.
const DESCRIPTION =
  "Full stack developer working in React, Next.js, Node.js and TypeScript. Projects, experience, and how to get in touch.";
const SOCIAL_DESCRIPTION =
  "Full stack developer working in React, Next.js and Node.js. Projects, experience and contact.";

// Viewport configuration
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

// Enhanced metadata configuration
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Ankit Yadav - Full Stack Developer | React, Next.js, Node.js",
    template: "%s | Ankit Yadav",
  },

  description: DESCRIPTION,

  keywords: [
    "Ankit Yadav",
    "bearerop",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "TypeScript Developer",
    "Web Developer",
    "Frontend Developer",
    "Backend Developer",
    "JavaScript Developer",
    "MERN Stack Developer",
    "Portfolio",
    "Software Engineer",
    "India Developer",
    "Freelancer",
    "Open Source Developer",
  ],

  authors: [
    {
      name: "Ankit Yadav",
      url: siteUrl,
    },
  ],

  creator: "Ankit Yadav",
  publisher: "Ankit Yadav",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Ankit Yadav Portfolio",
    title: "Ankit Yadav - Full Stack Developer",
    description: SOCIAL_DESCRIPTION,
    images: [
      {
        url: `${siteUrl}/images/og.jpg`,
        width: 1200,
        height: 630,
        alt: "Ankit Yadav - Full Stack Developer Portfolio",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Ankit Yadav - Full Stack Developer",
    description: SOCIAL_DESCRIPTION,
    images: [`${siteUrl}/images/og.jpg`],
    creator: "@ankit_twt",
    site: "@ankit_twt",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    // The tab icon is src/app/favicon.ico (Next adds that <link> itself).
    // These are the larger sizes.
    icon: [
      // Scales to any size; outlines, so it needs no font
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
      },
    ],
  },

  // No `manifest` here: src/app/manifest.ts serves /manifest.webmanifest and
  // Next links it by itself. This used to point at /manifest.json, which is a 404.

  verification: {
    google: "xmaUG5cyzz03GizUm6bniYzI2CWZAGswioMrduKg0DE",
  },

  alternates: {
    canonical: siteUrl,
  },

  category: "technology",

  other: {
    "msapplication-TileColor": "#ffffff",
  },
};