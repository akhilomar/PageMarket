/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@promohub/shared", "@promohub/db"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**"
      }
    ]
  }
};

export default nextConfig;

