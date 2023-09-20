/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["k.kakaocdn.net", "ssl.pstatic.net"],
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['cdn.pixabay.com'],
    minimumCacheTTL: 60,
  },
};

module.exports = nextConfig;
