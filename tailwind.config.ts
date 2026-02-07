import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-dark': '#0a0f1d',
        'brand-card': '#1a2333',
        'brand-blue': '#306aff',
        'brand-gray': '#4B5563',
        'brand-light-gray': '#9CA3AF',
      },
    },
  },
  plugins: [],
}
export default config