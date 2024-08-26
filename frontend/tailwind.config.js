// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'vintage-gray': '#1a1a1a',
        'vintage-blue': '#00ffcc',
        'darkAmber': '#FFB000',
        'lightAmber': '#FFCC00',
      },
      fontFamily: {
        'mono': ['"JetBrains Mono"', 'monospace'],
      },

    },
  },
  plugins: [],
}
