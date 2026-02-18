import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/enpitsu-hausu',
  assetPrefix: '/enpitsu-hausu/',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
