'use client';

import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

import { useReducedMotion } from '../hooks/use-reduced-motion';

type TransitionVariant = 'fade' | 'slideUp' | 'slideLeft' | 'crossfade';

interface PageTransitionProps {
  children: ReactNode;
  variant?: TransitionVariant;
  className?: string;
}

const transitionVariants: Record<TransitionVariant, Variants> = {
  fade: {
    initial: { opacity: 0 },
    enter: { opacity: 1, transition: { duration: 0.25 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  },
  slideUp: {
    initial: { opacity: 0, y: 16 },
    enter: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
  },
  slideLeft: {
    initial: { opacity: 0, x: 24 },
    enter: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -24, transition: { duration: 0.2 } },
  },
  crossfade: {
    initial: { opacity: 0, scale: 0.97 },
    enter: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 1.03, transition: { duration: 0.2 } },
  },
};

export function PageTransition({
  children,
  variant = 'fade',
  className,
}: PageTransitionProps): ReactNode {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="initial"
      animate="enter"
      exit="exit"
      variants={transitionVariants[variant]}
    >
      {children}
    </motion.div>
  );
}
