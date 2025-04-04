module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      colors: {
        'brand': {
          50: '#fff1f1',
          100: '#ffe1e1',
          200: '#ffc7c7',
          300: '#ffa0a0',
          400: '#ff6b6b',
          500: '#ff5a60',
          600: '#e5484d',
          700: '#bf3033',
          800: '#9a2a2d',
          900: '#7e2a2d',
        },
        'accent': {
          50: '#f0f0ff',
          100: '#e4e3ff',
          200: '#d0ceff',
          300: '#b0acff',
          400: '#8e87ff',
          500: '#5955e8',
          600: '#4945d1',
          700: '#3935ab',
          800: '#312e8b',
          900: '#2c2b73',
        },
      },
      boxShadow: {
        'soft': '0 10px 25px -5px rgba(0, 0, 0, 0.05)',
        'hover': '0 20px 35px -10px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
