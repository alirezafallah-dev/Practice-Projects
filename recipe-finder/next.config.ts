// فایل: next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // دور زدن کامل ارورهای DNS و پردازش تصویر
    remotePatterns: [
      { protocol: "https", hostname: "img.spoonacular.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  allowedDevOrigins: ['127.0.0.1'], // رفع ارور HMR
};

export default nextConfig;