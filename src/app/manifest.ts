import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ankit Yadav - Portfolio",
    short_name: "Ankit's Portfolio",
    description:
      "Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies. Portfolio showcasing projects and experience.",
    start_url: "/",
    id: "/",
    scope: "/",
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
    categories: ["portfolio", "technology", "development"],
    orientation: "any",
    dir: "ltr",
    lang: "en-US",
  };
}