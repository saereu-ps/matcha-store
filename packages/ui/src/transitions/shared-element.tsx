'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

import { useReducedMotion } from '../hooks/use-reduced-motion';

interface SharedElementProps {
  layoutId: string;
  children: ReactNode;
  className?: string;
}

export function SharedElement({ layoutId, children, className }: SharedElementProps): ReactNode {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      layoutId={layoutId}
      className={className}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {children}
    </motion.div>
  );
}
