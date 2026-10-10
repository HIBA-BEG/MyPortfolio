/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: '#07070b',
        panel: '#12121a',
        mist: '#b7b7c9',
        blush: {
          DEFAULT: '#ff4d8d',
          deep: '#d41462',
        },
      },
    },
  },
  plugins: [],
}
