import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  cacheComponents: true,
  allowedDevOrigins: ["192.168.1.7"],
};

export default nextConfig;