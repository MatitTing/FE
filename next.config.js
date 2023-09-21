/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["cdn.pixabay.com", "k.kakaocdn.net", "ssl.pstatic.net"],
    minimumCacheTTL: 60,
  },
};

module.exports = nextConfig;
