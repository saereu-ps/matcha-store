'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useContext, useEffect, type ReactNode } from 'react';

import { useReducedMotion } from '../hooks/use-reduced-motion.js';

import { CursorContext, type CursorType } from './cursor-provider.js';

const cursorSizes: Record<CursorType, number> = {
  default: 12,
  pointer: 20,
  expand: 48,
  text: 4,
  hidden: 0,
};

export function CustomCursor(): ReactNode {
  const context = useContext(CursorContext);
  const reducedMotion = useReducedMotion();

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springX = useSpring(cursorX, { stiffness: 500, damping: 28 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 28 });

  useEffect(() => {
    if (!context) return;
    cursorX.set(context.position.x);
    cursorY.set(context.position.y);
  }, [context?.position.x, context?.position.y, cursorX, cursorY]);

  if (!context || context.isTouch || reducedMotion) {
    return null;
  }

  const size = cursorSizes[context.cursorType];

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full bg-matcha-accent mix-blend-difference"
        style={{
          x: springX,
          y: springY,
          width: size,
          height: size,
          marginLeft: -size / 2,
          marginTop: -size / 2,
        }}
        animate={{ width: size, height: size }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      />
      {/* Trail dots (reduced motion disables these) */}
      {!reducedMotion && context.cursorType !== 'hidden' && (
        <>
          {[0.7, 0.5, 0.3, 0.15].map((opacity, i) => (
            <motion.div
              key={i}
              className="pointer-events-none fixed top-0 left-0 z-[9998] rounded-full bg-matcha-accent"
              style={{
                x: springX,
                y: springY,
                width: 6,
                height: 6,
                marginLeft: -3,
                marginTop: -3,
                opacity,
              }}
              transition={{ delay: (i + 1) * 0.03 }}
            />
          ))}
        </>
      )}
    </>
  );
}
