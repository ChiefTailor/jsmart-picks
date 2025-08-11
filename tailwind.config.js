/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
   safelist: [
    'animate-pulse-slow',
    'animate-pulse-medium',
    'animate-pulse-fast',
    'animate-float',
    'animate-float-delay',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

