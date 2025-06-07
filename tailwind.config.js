/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin-slow 12s linear infinite',
        'spin-slower': 'spin-slower 20s linear infinite',
      },
    },
  },
  plugins: [],
};