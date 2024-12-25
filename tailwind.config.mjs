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
	plugins: [],
};
