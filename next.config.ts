import type { NextConfig } from "next";

const productionBasePath =
  process.env.NODE_ENV === "production" ? "/lecoquetteweb-preview" : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: productionBasePath,
  assetPrefix: productionBasePath || undefined,
  images: {
    remotePatterns: [],
    unoptimized: true
  },
  turbopack: {
    root: __dirname
  }
};

export default nextConfig;
