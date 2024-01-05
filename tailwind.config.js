/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  "./src/*.js",
  "./src/*.ts"
  ],

  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        logoColor: '#21293D',
        logoColorLight: '#27334f'
      },
      height: {
        auto: 'auto'
      },

    },
  },
  plugins: [],
}
