/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#f7ede2',
        parchment: '#faf5ee',
        terra: '#c4674a',
        'terra-dark': '#a8522e',
        sun: '#e8a07a',
        ink: '#2c1f18',
        muted: '#7a6659',
        stone: '#d4c4b8',
        card: '#f2e8da',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Manrope"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 8px 32px rgba(44, 31, 24, 0.10)',
        float: '0 20px 60px rgba(44, 31, 24, 0.18)',
        soft: '0 2px 12px rgba(44, 31, 24, 0.08)',
      },
    },
  },
  plugins: [],
}
