import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/about", destination: "/#our-approach", permanent: true },
      { source: "/products", destination: "/#our-services", permanent: true },
      { source: "/services", destination: "/#our-services", permanent: true },
      { source: "/brochure", destination: "/#journal-preview", permanent: true },
      { source: "/journal", destination: "/#journal-preview", permanent: true },
    ];
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "framerusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
