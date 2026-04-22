import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 1. هادي هي اللي كتدعم الـ AVIF و الـ WebP أوتوماتيكياً
    formats: ['image/avif', 'image/webp'],
    
    // 2. حيدنا unoptimized: true باش Next.js يقدر يصغر حجم التصاور
    remotePatterns: [
      {
        protocol: "http",
        hostname: "www.idmarouk.ma",
        pathname: "/img/**",
      },
    ],
  },
  // تقدر تزيد هنا أي config أخرى بحال compress: true
};

export default nextConfig;