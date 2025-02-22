import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,  // より高速なminifyを有効化
};

export default nextConfig;
