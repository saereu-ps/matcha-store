'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

import { useReducedMotion } from '../hooks/use-reduced-motion';

interface ScaleOnHoverProps {
  children: ReactNode;
  scale?: number;
  className?: string;
}

export function ScaleOnHover({ children, scale = 1.03, className }: ScaleOnHoverProps): ReactNode {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      whileHover={{ scale, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.div>
  );
}
