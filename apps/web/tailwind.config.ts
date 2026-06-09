import matchaPreset from '@matcha/ui/tailwind-preset';
import type { Config } from 'tailwindcss';

const config: Config = {
  presets: [matchaPreset as Partial<Config>],
  content: [
    './src/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
