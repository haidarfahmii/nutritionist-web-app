import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "randomuser.me",
      },
      {
        protocol: "https",
        hostname: "**.backendless.app",
      },
    ],
  },
  // Optimize build
  reactStrictMode: true,
  // Disable automatic static optimization for pages with dynamic data
  experimental: {
    optimizePackageImports: ["lucide-react", "@radix-ui/react-icons"],
  },
  // Logging untuk debugging
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
