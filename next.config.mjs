/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "cdn.dummyjson.com",
        protocol: "https",
      },
      {
        hostname: "lh3.googleusercontent.com",
        protocol: "https",
      },
      {
        hostname: "rfxujkcyzpaqbojdznsb.supabase.co",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
