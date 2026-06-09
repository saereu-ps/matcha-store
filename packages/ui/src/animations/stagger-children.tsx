'use client';

import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

import { useReducedMotion } from '../hooks/use-reduced-motion.js';

interface StaggerChildrenProps {
  children: ReactNode;
  stagger?: number;
  once?: boolean;
  className?: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (stagger: number) => ({
    opacity: 1,
    transition: { staggerChildren: stagger },
  }),
};

const childVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } },
};

export function StaggerChildren({
  children,
  stagger = 0.05,
  once = true,
  className,
}: StaggerChildrenProps): ReactNode {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      custom={stagger}
      variants={containerVariants}
    >
      {children}
    </motion.div>
  );
}

export { childVariants as staggerChildVariants };
