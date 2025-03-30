// app/metadata.ts
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Ankit's Portfolio",
  description: "A Personal portfolio of a Full Stack Developer.",
  openGraph: {
    url: "https://bearerop.tech",
    type: "website",
    title: "Ankit's Portfolio",
    description: "A Personal portfolio of a Full Stack Developer.",
    images: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/theslugproject.appspot.com/o/portfolio%2FIMG_4874-3.jpg?alt=media&token=35d78679-3f58-4cee-909e-008d136f0280",
        width: 1200,
        height: 630,
        alt: "Ankit's Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@yourTwitterHandle", // Replace with your Twitter handle if available
    title: "Ankit's Portfolio",
    description: "A Personal portfolio of a Full Stack Developer.",
    images: [
      "https://firebasestorage.googleapis.com/v0/b/theslugproject.appspot.com/o/portfolio%2FIMG_4874-3.jpg?alt=media&token=35d78679-3f58-4cee-909e-008d136f0280",
    ],
  },
  icons: [
    {
      rel: "icon",
      type: "image/x-icon",
      url: "/favicon.ico",
      media: "(prefers-color-scheme: light)",
    },
    {
      rel: "icon",
      type: "image/png",
      url: "/favicon.ico",
      media: "(prefers-color-scheme: dark)",
    },
  ],
};
