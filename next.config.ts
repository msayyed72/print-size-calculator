import type { NextConfig } from "next";

const isVercel = process.env.VERCEL === "1";
const basePath = isVercel ? "" : "/print-size-calculator";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
};

export default nextConfig;
