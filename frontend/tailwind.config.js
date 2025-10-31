/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('https://static.cdninstagram.com/rsrc.php/v3/yM/r/8n91YnfPq0s.png')",
      }
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}