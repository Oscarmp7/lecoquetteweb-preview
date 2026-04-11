import type { NextConfig } from "next";

const productionBasePath =
  process.env.NODE_ENV === "production" ? "/lecoquetteweb-preview" : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: productionBasePath,
  assetPrefix: productionBasePath || undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: productionBasePath,
  },
  images: {
    remotePatterns: [],
    unoptimized: true
  },
  turbopack: {
    root: __dirname
  }
};

export default nextConfig;
