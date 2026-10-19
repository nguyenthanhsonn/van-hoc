import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  async rewrites() {
    return [{ source: '/fonts/:fontstack/:range.pbf', destination: '/data/fonts/:fontstack/:range.pbf' }];
  },
};

export default nextConfig;
