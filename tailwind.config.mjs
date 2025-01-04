/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'wave-start': '#86efac', // green-200
        'wave-end': '#facc15', // yellow-400
      },
      transitionDuration: {
        200: '200ms', // 빠른 전환
      },
      backgroundImage: {
        'gradient-text': 'linear-gradient(to right, #8B5CF6, #EC4899)',
      },
      textGradient: {
        'from-violet-400': '#8B5CF6',
        'to-pink-600': '#EC4899',
        'from-sky-400': '#38BDF8',
        'to-blue-600': '#2563EB',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
