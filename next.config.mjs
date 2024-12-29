/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true, // 기존 설정 유지
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "avatars.githubusercontent.com",
			},
			{
				protocol: "https",
				hostname: "encrypted-tbn1.gstatic.com",
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
