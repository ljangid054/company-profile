import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      // Google Drive file / thumbnail URLs
      { protocol: "https", hostname: "drive.google.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com", pathname: "/**" },
      { protocol: "https", hostname: "*.googleusercontent.com", pathname: "/**" },
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "i.imgur.com", pathname: "/**" },
      { protocol: "https", hostname: "cdn.shopify.com", pathname: "/**" },
      { protocol: "https", hostname: "*.amazonaws.com", pathname: "/**" },
      { protocol: "https", hostname: "*.cloudinary.com", pathname: "/**" },
      { protocol: "https", hostname: "*.supabase.co", pathname: "/**" },
    ],
  },
};

export default nextConfig;
