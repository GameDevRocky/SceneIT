/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable dark mode using a class
  theme: {
    extend: {
      colors: {
        light: {
          background: '#ffffff',
          text: '#1f2937',
          primary: '#4f46e5',
          secondary: '#9ca3af',
        },
        dark: {
          background: '#1f2937',
          text: '#ffffff',
          primary: '#6366f1',
          secondary: '#6b7280',
          purple : '#4f46e5'
        },
      },
    },
  },
  plugins: [],
}