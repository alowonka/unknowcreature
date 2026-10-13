import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Herramienta estática en public/houston-scout
      { source: "/houston-scout", destination: "/houston-scout/index.html" },
    ];
  },
};

export default nextConfig;
