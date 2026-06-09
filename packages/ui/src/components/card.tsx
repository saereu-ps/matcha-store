'use client';

import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

import { useReducedMotion } from '../hooks/use-reduced-motion';

interface CardProps {
  children: ReactNode;
  hoverable?: boolean;
  padding?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

const paddingStyles = {
  sm: 'p-3',
  md: 'p-4 md:p-6',
  lg: 'p-6 md:p-8',
};

export function Card({ children, hoverable = true, padding = 'md', className, onClick }: CardProps): ReactNode {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={clsx(
        'rounded-lg border border-matcha-border bg-matcha-bg-subtle shadow-sm transition-shadow duration-normal',
        paddingStyles[padding],
        hoverable && 'cursor-pointer',
        className,
      )}
      onClick={onClick}
      whileHover={
        reducedMotion || !hoverable
          ? undefined
          : { y: -2, boxShadow: 'var(--matcha-shadow-lg)', transition: { duration: 0.2 } }
      }
    >
      {children}
    </motion.div>
  );
}
