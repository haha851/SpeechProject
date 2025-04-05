/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60
  },
  
  // Improved i18n support
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  
  // Experimental features
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
  
  // Compression for better perf
  compress: true,
  
  // Configure headers for better caching
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, must-revalidate'
          }
        ]
      }
    ];
  },
  
  // Webpack optimization
  webpack: (config, { dev, isServer }) => {
    // Only run optimization in production
    if (!dev && !isServer) {
      // Enable tree shaking and optimize for size
      config.optimization.minimize = true;
    }
    
    return config;
  }
}

module.exports = nextConfig