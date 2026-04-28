import type { NextConfig } from "next";

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
        destination: "http://backend:3000/api/:path*",
      },
    ];
  },
};

export default nextConfig;
