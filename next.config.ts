import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: "/print-size-calculator",
  assetPrefix: "/print-size-calculator/",
};

export default nextConfig;
