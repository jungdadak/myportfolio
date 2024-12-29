/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // 기존 설정 유지
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        // 필요한 경우 pathname을 추가할 수 있습니다.
        // pathname: "/images/**",
      },
      // 추가 도메인이 있다면 여기에 추가
      // {
      //   protocol: "https",
      //   hostname: "another-domain.com",
      // },
    ],
  },
};

export default nextConfig;
