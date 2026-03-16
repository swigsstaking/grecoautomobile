/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f4ff',
          100: '#dce6f8',
          200: '#b3c5ed',
          300: '#8aa3de',
          400: '#5575b8',
          500: '#13427E',
          600: '#0f3568',
          700: '#062148',
          800: '#041838',
          900: '#030C1D',
        },
        secondary: {
          50: '#f5f7f9',
          100: '#e8ecf0',
          200: '#d1d8e0',
          300: '#b5bfc9',
          400: '#8696A5',
          500: '#6b7d8e',
          600: '#566574',
          700: '#414e5b',
          800: '#2d3743',
          900: '#1a2230',
        },
        accent: {
          50: '#eef6ff',
          100: '#d9ebff',
          200: '#bcdaff',
          300: '#8ec2ff',
          400: '#59a0ff',
          500: '#3380e0',
          600: '#13427E',
          700: '#0f3568',
          800: '#0c2a52',
          900: '#081e3d',
        },
        dark: {
          bg: '#030C1D',
          section: '#062148',
          card: '#0a2d5c',
        },
        text: {
          primary: '#F2F2F2',
          secondary: '#8696A5',
        }
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
