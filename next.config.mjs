/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: 'localhost' },
      { protocol: 'https', hostname: '**.myjourmals.me' },
    ],
    unoptimized: true,
  },
  typedRoutes: true,
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  async rewrites() {
    return [
      { source: '/favicon.ico', destination: '/placeholder-logo.png' },
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
        ],
      },
    ];
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig
