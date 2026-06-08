/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        nexa: {
          50:  '#fff8f1',
          100: '#ffeedd',
          200: '#fdd9b5',
          300: '#fbb97a',
          400: '#f89444',
          500: '#f07120',
          600: '#d95510',
          700: '#b53f0e',
          800: '#923213',
          900: '#762b14',
          950: '#421207',
        },
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 24px -4px rgba(240, 113, 32, 0.10)',
        glow: '0 0 40px -8px rgba(240, 113, 32, 0.30)',
      },
    },
  },
  plugins: [],
};
