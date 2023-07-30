/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["cache.ptt.cc"],
  },
};

module.exports = nextConfig;
