import type { Metadata, Viewport } from "next";

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
  metadataBase: new URL("https://bearerop.live"),

  title: {
    default: "Ankit Yadav - Full Stack Developer | React, Next.js, Node.js",
    template: "%s | Ankit Yadav",
  },

  description:
    "Full Stack Developer specializing in React, Next.js, Node.js, TypeScript, and modern web technologies. View my portfolio of projects, experience, and get in touch for collaboration.",

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
      url: "https://bearerop.live",
    },
  ],

  creator: "Ankit Yadav",
  publisher: "Ankit Yadav",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bearerop.live",
    siteName: "Ankit Yadav Portfolio",
    title: "Ankit Yadav - Full Stack Developer",
    description:
      "Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies. Building innovative web applications.",
    images: [
      {
        url: "https://bearerop.live/images/og-twitter.png",
        width: 1200,
        height: 630,
        alt: "Ankit Yadav - Full Stack Developer Portfolio",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Ankit Yadav - Full Stack Developer",
    description:
      "Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies.",
    images: ["https://bearerop.live/images/og-twitter.png"],
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
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
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

  manifest: "/manifest.json", // ✅ CORRECTED: Changed from /manifest.webmanifest

  verification: {
    google: "xmaUG5cyzz03GizUm6bniYzI2CWZAGswioMrduKg0DE",
  },

  alternates: {
    canonical: "https://bearerop.live",
  },

  category: "technology",

  other: {
    "msapplication-TileColor": "#ffffff",
  },
};