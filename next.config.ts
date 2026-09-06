import type { NextConfig } from "next";

const isGithubPages = process.env.DEPLOY_TARGET === "github-pages";
const basePath = "/noithatanhkhoa";

const nextConfig: NextConfig = {
  ...(isGithubPages && {
    output: "export",
    basePath,
    trailingSlash: true,
  }),
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
