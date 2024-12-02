/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      sans: ['var(--font-geist-sans)', 'sans-serif'],
      mono: ['var(--font-geist-mono)', 'sans-serif'],
    },
    spacing: {
      '1': '5px',
      '2': '10px',
      '3': '15px',
      '4': '20px',
      '5': '25px',
      '6': '30px',
      '7': '35px',
      '8': '40px',
      'columnGap': '60px',
      'sectionGap': '140px',
      'nav': '75px',
      'sidebar': '300px',
    },
    extend: {},
  },
  plugins: [],
}

