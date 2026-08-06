/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#fffdf8',
          100: '#fbf6eb',
          200: '#f3e8d2',
        },
        beige: {
          100: '#eee0ca',
          200: '#dfc9aa',
          300: '#cdb18b',
          400: '#b89268',
        },
        cocoa: {
          400: '#9a765d',
          500: '#795a46',
          600: '#614737',
          700: '#49352a',
          800: '#342720',
        },
      },
      fontFamily: {
        sans: ['Nunito', 'ui-rounded', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 18px 50px rgba(73, 53, 42, 0.12)',
      },
    },
  },
};
