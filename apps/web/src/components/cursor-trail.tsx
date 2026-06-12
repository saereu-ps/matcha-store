'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
}

/**
 * Matcha powder cursor trail — tiny green dots that follow the mouse
 * and fade out like matcha dust. Only on desktop (no touch).
 */
export function CursorTrail() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isTouch, setIsTouch] = useState(true);

  useEffect(() => {
    setIsTouch(window.matchMedia('(pointer: coarse)').matches);
  }, []);

  useEffect(() => {
    if (isTouch) return;

    let counter = 0;
    let lastX = 0;
    let lastY = 0;

    const handleMove = (e: MouseEvent) => {
      // Only emit particles when moving fast enough
      const dist = Math.sqrt((e.clientX - lastX) ** 2 + (e.clientY - lastY) ** 2);
      if (dist < 15) return;

      lastX = e.clientX;
      lastY = e.clientY;
      counter++;

      const particle: Particle = {
        id: counter,
        x: e.clientX + (Math.random() - 0.5) * 10,
        y: e.clientY + (Math.random() - 0.5) * 10,
      };

      setParticles(prev => [...prev.slice(-12), particle]);
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-matcha-accent"
            style={{ left: p.x, top: p.y }}
            initial={{ width: 6, height: 6, opacity: 0.5, scale: 1 }}
            animate={{ width: 2, height: 2, opacity: 0, scale: 0.3, y: 20 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            onAnimationComplete={() => {
              setParticles(prev => prev.filter(pp => pp.id !== p.id));
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
