import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';
import daisyui from 'daisyui';

export default {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/modules/**/*.{ts,tsx}',
    './sanity/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  daisyui: {
    themes: [
      'light',
      'dark',
      'retro',
      'cyberpunk',
      'halloween',
      'luxury',
      'dracula',
    ],
  },
  plugins: [typography, daisyui],
} satisfies Config;
