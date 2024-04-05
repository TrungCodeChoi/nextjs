/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  images: {
    domains: ["image.tmdb.org"],
    unoptimized: true,
  },
};

export default nextConfig;
