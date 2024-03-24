/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,  
  output: 'export',
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    domains: ['sooyoung-jungho.github.io', 'sooyoung-jungho-wedding.netlify.app'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sooyoung-jungho.github.io',
      },
      {
        protocol: 'https',
        hostname: 'sooyoung-jungho-wedding.netlify.app',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_GITHUB_TOKEN: process.env.NEXT_PUBLIC_GITHUB_TOKEN
  }
};

export default nextConfig;
