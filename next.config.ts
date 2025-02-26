import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["next", "react", "react-dom"], // 最適化したいパッケージをリストに追加
  },
};

export default nextConfig;
