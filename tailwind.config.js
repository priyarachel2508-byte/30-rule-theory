/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        almond: '#f5eee4',
        parchment: '#f9f4ed',
        clay: '#b88c72',
        rose: '#c99599',
        moss: '#8a9b85',
        bark: '#645247',
        ink: '#3d342f',
      },
      boxShadow: {
        paper: '0 18px 45px rgba(86, 68, 57, 0.12)',
        float: '0 28px 60px rgba(86, 68, 57, 0.16)',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Manrope"', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        grain:
          'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.65), transparent 30%), radial-gradient(circle at 80% 0%, rgba(201,149,153,0.12), transparent 28%), radial-gradient(circle at 30% 100%, rgba(138,155,133,0.16), transparent 32%)',
        paper:
          'linear-gradient(135deg, rgba(255,255,255,0.65), rgba(255,255,255,0.18))',
      },
      keyframes: {
        drift: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)', opacity: '0.45' },
          '50%': { transform: 'translate3d(0, -14px, 0)', opacity: '0.8' },
        },
      },
      animation: {
        drift: 'drift 8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
