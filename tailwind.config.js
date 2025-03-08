/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        animation: {
          "spin-fast": "spin 0.5s linear infinite",
          "spin-superfast": "spin 0.1s linear infinite",
        },
      },
    },
    plugins: [],
  }