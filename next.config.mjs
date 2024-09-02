// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['images.unsplash.com', 'assets.aceternity.com','firebasestorage.googleapis.com'], // Replace with your allowed domains
      deviceSizes: [640, 768, 1024, 1280, 1600], // Configure breakpoints for responsive images
      imageSizes: [16, 32, 48, 64, 96,128,144,196], // Additional sizes for images
    },
  };
  
  export default nextConfig;