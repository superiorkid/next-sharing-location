/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ["picsum.photos", "ik.imagekit.io"],
  },
};

module.exports = nextConfig;
