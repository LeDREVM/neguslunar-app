/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '375px',      // iPhone SE, 12 mini
        'sm': '390px',      // iPhone 12, 13, 14
        'md': '768px',      // iPad portrait
        'lg': '1024px',     // iPad landscape
        'xl': '1280px',     // Desktop
        '2xl': '1536px',    // Large desktop
      },
    },
  },
  plugins: [],
}
