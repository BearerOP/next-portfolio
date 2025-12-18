import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ankit Yadav - Portfolio",
    short_name: "Ankit's Portfolio",
    description:
      "Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies. Portfolio showcasing projects and experience.",
    start_url: "/",
    id: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#6b9ff3",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
    screenshots: [
      {
        src: "/images/screenshot-desktop.png",
        sizes: "1920x1080",
        type: "image/png",
        form_factor: "wide",
        label: "Portfolio Desktop View",
      },
      {
        src: "/images/screenshot-mobile.png",
        sizes: "390x844",
        type: "image/png",
        form_factor: "narrow",
        label: "Portfolio Mobile View",
      },
    ] as any, // Type assertion needed as Next.js types don't include form_factor yet
    categories: ["portfolio", "technology", "development"],
    orientation: "any",
    lang: "en-US",
  };
}