/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#0a0a0f',
          card: '#12121a',
          border: '#1e1e2e',
        },
        accent: {
          cyan: '#00f0ff',
          purple: '#7c3aed',
          neon: '#39ff14',
        },
      },
      fontFamily: {
        display: ['Orbitron', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        neon: '0 0 20px rgba(0, 240, 255, 0.25)',
        'neon-purple': '0 0 20px rgba(124, 58, 237, 0.25)',
      },
    },
  },
  plugins: [],
};
