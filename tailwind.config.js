/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        background: '#FAF9F6', // warm off-white
        foreground: '#111111', // near-black
        accent: {
          blue: '#D0E1F9',
          yellow: '#FDFD96',
          pink: '#FADADD',
          purple: '#E6E6FA',
          mint: '#98FF98'
        }
      }
    },
  },
  plugins: [],
}
