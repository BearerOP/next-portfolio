// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Lets a second build or dev server run beside the main one without the two
  // overwriting each other's output: NEXT_DIST_DIR=.next-verify next dev -p 3111
  distDir: process.env.NEXT_DIST_DIR || '.next',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'assets.aceternity.com',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 'ghchart.rshah.org',
      },
      {
        protocol: 'https',
        hostname: 'img.logo.dev',
      },
    ],
    deviceSizes: [640, 768, 1024, 1280, 1600], // Configure breakpoints for responsive images
    imageSizes: [16, 32, 48, 64, 96, 128, 144, 196], // Additional sizes for images
  },
};

export default nextConfig;