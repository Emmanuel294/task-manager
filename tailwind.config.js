/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        'system-gray': '#424242',
        'system-gray-1': '#303030',
      }
    },
  },
  plugins: [],
}
