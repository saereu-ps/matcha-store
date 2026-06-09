'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useState } from 'react';

/**
 * Interactive teacup — tilts with mouse movement, click to "drink"!
 * Steam increases when hovering, cup tilts when you move mouse.
 */
export function InteractiveTeacup() {
  const [isDrinking, setIsDrinking] = useState(false);
  const [sips, setSips] = useState(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-100, 100], [5, -5]);
  const rotateY = useTransform(mouseX, [-100, 100], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleClick = () => {
    setIsDrinking(true);
    setSips(s => s + 1);
    setTimeout(() => setIsDrinking(false), 800);
  };

  return (
    <div className="flex flex-col items-center">
      <motion.div
        className="relative cursor-pointer select-none"
        onMouseMove={handleMouseMove}
        onClick={handleClick}
        style={{ rotateX, rotateY, perspective: 800 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95, rotateX: 15 }}
      >
        {/* Steam — more when hovering */}
        <motion.div className="absolute -top-8 left-1/2 -translate-x-1/2 flex gap-2">
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              className="w-[2px] rounded-full bg-matcha-fg/10"
              animate={{
                height: [12, 20, 12],
                opacity: [0.2, 0.5, 0.2],
                y: [0, -8, 0],
              }}
              transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
            />
          ))}
        </motion.div>

        {/* Cup SVG */}
        <svg width="120" height="100" viewBox="0 0 120 100" fill="none">
          {/* Bowl */}
          <motion.path
            d="M20 35 C20 35 25 80 60 80 C95 80 100 35 100 35"
            stroke="currentColor"
            strokeWidth="2"
            className="text-matcha-fg/60"
            animate={isDrinking ? { rotate: -20, x: -5 } : { rotate: 0, x: 0 }}
          />
          {/* Rim */}
          <ellipse cx="60" cy="35" rx="40" ry="8" stroke="currentColor" strokeWidth="1.5" className="text-matcha-fg/60" />
          {/* Liquid */}
          <motion.ellipse
            cx="60" cy="35" rx="35" ry="6"
            className="text-matcha-accent/30"
            fill="currentColor"
            animate={isDrinking ? { ry: 3, opacity: 0.15 } : { ry: 6, opacity: 0.3 }}
          />
          {/* Handle */}
          <path d="M100 40 C115 40 118 55 115 60 C112 65 105 60 100 60" stroke="currentColor" strokeWidth="1.5" className="text-matcha-fg/50" />
        </svg>
      </motion.div>

      {/* Sip counter */}
      <motion.p
        className="text-matcha-fg-muted text-xs mt-3"
        animate={{ opacity: sips > 0 ? 1 : 0.5 }}
      >
        {sips === 0 ? 'Click to sip' : `${sips} sip${sips > 1 ? 's' : ''} taken`}
      </motion.p>
    </div>
  );
}
