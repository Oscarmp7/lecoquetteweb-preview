import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isUserPagesRepo = repoName.toLowerCase() === "oscarmp7.github.io";
const basePath =
  isGithubActions && repoName && !isUserPagesRepo ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  images: {
    remotePatterns: [],
    unoptimized: true
  },
  turbopack: {
    root: __dirname
  }
};

export default nextConfig;
