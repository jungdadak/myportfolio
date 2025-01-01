/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				"wave-start": "#86efac", // green-200
				"wave-end": "#facc15", // yellow-400
			},
			transitionDuration: {
				200: "200ms", // 빠른 전환
			},
		},
	},
	safelist: [
		// 임의 속성 클래스 추가
		{
			pattern: /^\[clip-path:inset\(0_0_50%_0\)\]$/,
		},
		{
			pattern: /^\[clip-path:inset\(50%_0_0_0\)\]$/,
		},
		// 추가적으로 필요한 클래스 패턴을 여기에 추가하세요
	],
	plugins: [require("@tailwindcss/typography")],
};
