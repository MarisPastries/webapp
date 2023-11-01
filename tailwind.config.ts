import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#EF1643',
        secondary: '#E37193',
        pink: '#FFCECD',
        'pink-light': '#FFEAEA',
        light: '#FFF4FC',
        dark: '#2D2D2D',
      },
    },
  },
  plugins: [],
};
export default config;
