/** @type {import('next').NextConfig} */
const nextConfig = {
  // Compress responses for better Core Web Vitals
  compress: true,

  // Vercel Edge Image Optimization: enable modern AVIF & WebP formats and long TTL
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
  },

  // Tree-shake heavy UI package imports + enable React View Transitions
  experimental: {
    optimizePackageImports: ['lucide-react', 'radix-ui'],
    viewTransition: true,
  },

  // Turbopack explicit root resolution
  turbopack: {
    root: process.cwd(),
  },

  // Security + SEO headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Security headers
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache OG images at edge
        source: '/opengraph-image(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=86400',
          },
        ],
      },
    ]
  },

  // Canonical redirects — trailing slash enforcement
  trailingSlash: false,
}

export default nextConfig

