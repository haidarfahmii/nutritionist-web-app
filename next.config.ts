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
        hostname: "i.pinimg.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "**.backendless.app",
      },
      {
        protocol: "https",
        hostname: "backendlessappcontent.com",
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
