import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  rewrites: async () => {
    return [
      {
        source: "/api/:path",
        destination:
          process.env.NODE_ENV === "development"
            ? "http://localhost:90749/api/:path"
            : "/api/",
      },
    ];
  },
};

export default nextConfig;
