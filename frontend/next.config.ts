import type { NextConfig } from "next";

const API_URL = process.env.API_URL || "http://looptfg-backend-o5hyfi:3000";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: 'bmumcurtyjxqdrmnzptq.supabase.co',
        pathname: '/storage/v1/object/public/avatars/**'
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${API_URL}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
