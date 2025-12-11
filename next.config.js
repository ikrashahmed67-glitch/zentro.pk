/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  // MOST IMPORTANT PARTS ↓↓↓
  experimental: {
    appDir: true,     // tells Next.js this is an App Router project
  },
  output: "standalone",  // required by Vercel to generate manifest
};

module.exports = nextConfig;
