'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Thin progress bar at the very top of the page showing scroll progress.
 * Matcha-green accent color.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-matcha-accent origin-left z-[100]"
      style={{ scaleX }}
    />
  );
}
