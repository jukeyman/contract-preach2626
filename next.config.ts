import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Static export for Cloudflare Pages
  output: 'export',
  trailingSlash: false,
  reactStrictMode: true,
  poweredByHeader: false,

  // Fix turbopack root resolution for Next.js 16
  turbopack: {
    root: '.',
  },

  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
      },
    ],
    // Required for static export — no server-side image optimization on Cloudflare
    unoptimized: true,
  },
}

export default nextConfig
