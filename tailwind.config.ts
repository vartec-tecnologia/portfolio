// tailwind.config.ts
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0B1220',
        paper: '#FAFBFC',
        primary: {
          DEFAULT: '#2563EB',
          dark: '#1D4ED8',
        },
        line: '#E4E8F0',
        muted: '#5B6478',
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
        sans: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.5rem',
        '2xl': '2rem',
        '3xl': '2.75rem',
        '4xl': '3.5rem',
      },
    },
  },
  plugins: [
    typography,
  ],
};
export default config;