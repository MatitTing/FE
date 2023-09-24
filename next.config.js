/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    KAKAO_KEY: process.env.KAKAO_KEY,
    KAKAO_RESTAPI_KEY: process.env.KAKAO_RESTAPI_KEY,
  },
  images: {
    domains: ["cdn.pixabay.com"],
    minimumCacheTTL: 60,
  },
};

module.exports = nextConfig;
