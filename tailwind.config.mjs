/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      scrollbar: {
        DEFAULT: {
          thumb: 'rounded bg-gray-600/50',
          track: 'rounded bg-gray-800/50',
        },
      },
    },
  },  
  plugins: [require('tailwind-scrollbar')],
};
