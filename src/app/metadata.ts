import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://bearerop.live"),
  title: "Ankit Yadav - Full Stack Developer Portfolio",
  description:
    "Discover the diverse skills and projects of Ankit Yadav, an experienced full stack developer proficient in web development, software engineering, and more.",
  keywords: [
    "ankit yadav",
    "full stack developer",
    "portfolio",
    "web development",
    "software engineering",
    "javascript",
    "typescript",
    "react",
    "nextjs",
    "nodejs",
    "express",
    "mongodb",
    "postgresql",
    "css",
    "html",
    "tailwindcss",
    "git",
    "github",
    "docker",
    "aws",
    "devops",
  ],
  openGraph: {
    title: "Ankit Yadav - Full Stack Developer Portfolio",
    description:
      "Discover the diverse skills and projects of Ankit Yadav, an experienced full stack developer proficient in web development, software engineering, and more.",
    url: "https://bearerop.live",
    type: "website",
    images: [
      {
        url: "/images/og-twitter.png",
        width: 1200,
        height: 675,
        alt: "Ankit's Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@ankit_twt",
    title: "Ankit's Portfolio",
    description: "Portfolio of a Full Stack Developer.",
    images: ["/images/og-twitter.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  alternates: {
    canonical: "https://bearerop.live",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  authors: [
    {
      name: "Ankit Yadav",
      url: "https://bearerop.live",
    },
  ],
  creator: "Ankit Yadav",
  publisher: "Ankit Yadav",
  category: "technology",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const themeColor = [
  { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  { media: "(prefers-color-scheme: dark)", color: "#13151a" },
];
