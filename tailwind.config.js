/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#ffffff',
          dark: '#1a1a1a',
        },
        text: {
          light: '#000000',
          dark: '#ffffff',
        },
        card: {
          light: '#ffffff',
          dark: '#1a1a1a',
        },
      },
    },
  },
  plugins: [],
} 