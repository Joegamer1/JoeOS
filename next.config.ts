import type { NextConfig } from "next";

const repository = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isProjectPages = process.env.GITHUB_ACTIONS === "true" && repository && !repository.endsWith(".github.io");
const basePath = process.env.PAGES_BASE_PATH === "/" ? "" : process.env.PAGES_BASE_PATH || (isProjectPages ? `/${repository}` : "");

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath,
  assetPrefix: basePath || undefined,
};

export default nextConfig;
