import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "www.idmarouk.ma",
        pathname: "/img/**",
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
