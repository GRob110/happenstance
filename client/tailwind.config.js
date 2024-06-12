/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        customGreen: '#4CAF50',
        customGreenHover: '#45a049',
      },
    },
  },
  plugins: [],
};
