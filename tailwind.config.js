/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        green: {
          750: '#166534',
          800: '#14532d',
        }
      }
    }
  },
  plugins: []
}
