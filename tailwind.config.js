/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: { brand: { cyan: '#20D5F5', ocean: '#078BCB', deep: '#07528C', navy: '#080F19', bg: '#050A12', surface: '#111E2D', border: '#18364B', muted: '#A8B8C9' } },
      fontFamily: { display: ['Sora', 'Inter', 'sans-serif'], sans: ['Inter', 'system-ui', 'sans-serif'] },
      backgroundImage: { 'brand-grad': 'linear-gradient(90deg,#07528C,#078BCB,#20D5F5)' },
      boxShadow: { glow: '0 0 30px rgba(32,213,245,.35)' },
      keyframes: { marquee: { to: { transform: 'translateX(-50%)' } }, float: { '50%': { transform: 'translateY(-16px)' } }, spin360: { to: { transform: 'rotate(360deg)' } } },
      animation: { marquee: '30s marquee linear infinite', float: '6s float ease-in-out infinite', 'spin-slow': '24s spin360 linear infinite', 'spin-rev': '24s spin360 linear infinite reverse' }
    }
  },
  plugins: []
}
