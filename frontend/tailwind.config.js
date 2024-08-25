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
      },
      fontFamily: {
        'mono': ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
