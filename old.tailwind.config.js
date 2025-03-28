/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      sans: ['var(--font-geist-sans)', 'sans-serif'],
      mono: ['var(--font-geist-mono)', 'monospace'],
    },
    spacing: {
      '0': '0px',
      '1': '5px',
      '2': '10px',
      '3': '15px',
      '4': '20px',
      '5': '25px',
      '6': '30px',
      '7': '35px',
      '8': '40px',
      '64': '16rem',
      'columnGap': '60px',
      'sectionGap': '140px',
      'nav': '75px',
      'sidebar': '320px',
    },
    extend: {
      scale: {
        '101': '1.01',
        '102': '1.02',
      },
      colors: {
        neutral: {
          925: '#0f0f0f',
        }
      }
    },
  },
  plugins: [],
}

