import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: false,
  },
  reactStrictMode: true,
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
