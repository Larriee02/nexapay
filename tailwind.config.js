/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        nexa: {
          50:  '#f4f2ff',
          100: '#ebe7ff',
          200: '#d9d0fd',
          300: '#bdb0fb',
          400: '#9e8bf5',
          500: '#6650d4',
          600: '#5540bd',
          700: '#443298',
          800: '#392b79',
          900: '#31275e',
          950: '#211a42',
        },
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 8px -4px rgba(27, 25, 60, 0.13)',
        glow: '0 0 32px -10px rgba(102, 80, 212, 0.30)',
      },
    },
  },
  plugins: [],
};
