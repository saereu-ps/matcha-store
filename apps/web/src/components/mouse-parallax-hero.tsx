'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';

/**
 * Hero content that subtly shifts based on mouse position — creates depth.
 * Elements at different "depths" move at different speeds.
 */
export function MouseParallaxWrapper({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const moveX = useTransform(springX, [-0.5, 0.5], [-8, 8]);
  const moveY = useTransform(springY, [-0.5, 0.5], [-5, 5]);

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <div ref={ref} onMouseMove={handleMouse} className="relative">
      <motion.div style={{ x: moveX, y: moveY }}>
        {children}
      </motion.div>
    </div>
  );
}
