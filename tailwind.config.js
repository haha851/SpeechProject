module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      fontFamily: {
        sans: ['SF Pro Display', 'Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      colors: {
        'brand': {
          50: '#e6f2ff',
          100: '#cce5ff',
          200: '#99cbff',
          300: '#66b0ff',
          400: '#3396ff',
          500: '#0071e3',
          600: '#0058b0',
          700: '#00448a',
          800: '#002f61',
          900: '#001b38',
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
