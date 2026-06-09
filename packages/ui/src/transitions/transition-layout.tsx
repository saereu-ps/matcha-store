'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

import { useReducedMotion } from '../hooks/use-reduced-motion';

interface TransitionLayoutProps {
  children: ReactNode;
  mode?: 'fade' | 'slide' | 'crossfade' | 'none';
}

const variants = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slide: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  },
  crossfade: {
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.02 },
  },
  none: {
    initial: {},
    animate: {},
    exit: {},
  },
};

export function TransitionLayout({ children, mode = 'fade' }: TransitionLayoutProps): ReactNode {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();

  const activeMode = reducedMotion ? 'none' : mode;
  const variant = variants[activeMode];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={variant.initial}
        animate={variant.animate}
        exit={variant.exit}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
