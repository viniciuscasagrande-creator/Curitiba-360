/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          500: '#14b8a6',
          600: '#00a896', // Recommended brand Teal from SRS/Figma
          700: '#0f766e',
          900: '#134e4a',
        },
        brand: {
          blue: '#1e3a8a',
          azure: '#2563eb',
          green: '#16a34a',
          gold: '#f59e0b',
          orange: '#ea580c',
          dark: '#0f172a'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
