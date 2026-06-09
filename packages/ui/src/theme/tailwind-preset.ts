import type { Config } from 'tailwindcss';

const matchaPreset: Partial<Config> = {
  theme: {
    extend: {
      colors: {
        matcha: {
          bg: 'var(--matcha-bg)',
          'bg-subtle': 'var(--matcha-bg-subtle)',
          'bg-muted': 'var(--matcha-bg-muted)',
          fg: 'var(--matcha-fg)',
          'fg-muted': 'var(--matcha-fg-muted)',
          'fg-subtle': 'var(--matcha-fg-subtle)',
          accent: 'var(--matcha-accent)',
          'accent-light': 'var(--matcha-accent-light)',
          'accent-dark': 'var(--matcha-accent-dark)',
          'accent-subtle': 'var(--matcha-accent-subtle)',
          border: 'var(--matcha-border)',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
      },
      boxShadow: {
        sm: 'var(--matcha-shadow-sm)',
        md: 'var(--matcha-shadow-md)',
        lg: 'var(--matcha-shadow-lg)',
      },
      transitionDuration: {
        fast: '150ms',
        normal: '300ms',
        slow: '500ms',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-up': {
          from: { transform: 'scale(0.95)', opacity: '0' },
          to: { transform: 'scale(1)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out',
        'scale-up': 'scale-up 0.2s ease-out',
        shimmer: 'shimmer 1.5s infinite linear',
      },
    },
  },
};

export default matchaPreset;
