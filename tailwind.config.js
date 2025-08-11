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
    extend: {
      keyframes: {
        breathe: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.08)' },
        },
      },
      animation: {
        breathe: 'breathe 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
