/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    poweredByHeader: false,
    env: {
        KAKAO_KEY: process.env.KAKAO_KEY,
        KAKAO_RESTAPI_KEY: process.env.KAKAO_RESTAPI_KEY,
        KAKAO_HOST_URL: process.env.KAKAO_HOST_URL,
        MATITTING_HOST_URL: process.env.MATITTING_HOST_URL,
        NAVER_CLIENT_ID: process.env.NAVER_CLIENT_ID, //ClientID
        SNS_CALLBACK_URL: process.env.SNS_CALLBACK_URL, // Callback URL
    },
    images: {
        domains: [
            'picsum.photos',
            'cdn.pixabay.com',
            'k.kakaocdn.net',
            'ssl.pstatic.net',
            'matitting.s3.ap-northeast-2.amazonaws.com',
        ],
        minimumCacheTTL: 60,
    },
};

module.exports = nextConfig;
