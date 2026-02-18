import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  basePath: '/enpitsu-hausu',
  assetPrefix: '/enpitsu-hausu/',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
