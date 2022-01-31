module.exports = {
  mode: 'jit',
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        body: ['Roboto', 'san-serif'],
      },
      colors: {
        'dark-blue': "#0F1624"
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}