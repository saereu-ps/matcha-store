'use client';

import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

import { useReducedMotion } from '../hooks/use-reduced-motion.js';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-matcha-accent text-white hover:bg-matcha-accent-dark focus-visible:ring-2 focus-visible:ring-matcha-ring',
  secondary:
    'bg-transparent text-matcha-fg border border-matcha-border hover:border-matcha-accent hover:text-matcha-accent focus-visible:ring-2 focus-visible:ring-matcha-ring',
  ghost:
    'text-matcha-fg-muted hover:text-matcha-accent focus-visible:ring-2 focus-visible:ring-matcha-ring',
};

const sizeStyles: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm rounded-md',
  md: 'px-4 py-2 text-base rounded-md',
  lg: 'px-6 py-3 text-lg rounded-lg',
};

export function Button({ variant = 'primary', size = 'md', loading = false, className, children, disabled, onClick, type = 'button' }: ButtonProps): ReactNode {
  const reducedMotion = useReducedMotion();

  return (
    <motion.button
      type={type}
      className={clsx(
        'inline-flex items-center justify-center font-medium transition-colors duration-fast',
        variantStyles[variant],
        sizeStyles[size],
        (disabled || loading) && 'opacity-50 cursor-not-allowed',
        className,
      )}
      disabled={disabled || loading}
      onClick={onClick}
      whileHover={reducedMotion ? undefined : { scale: 1.02 }}
      whileTap={reducedMotion ? undefined : { scale: 0.98 }}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" aria-hidden="true">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </motion.button>
  );
}
