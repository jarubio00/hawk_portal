/** @type {import('next').NextConfig} */
const withImages = require("next-images");
const nextConfig = {
  images: {
    domains: [
      "firebasestorage.googleapis.com",
      "res.cloudinary.com",
      "www.googleapis.com",
      "img.mlstatic.com",
    ],
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    return config;
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
