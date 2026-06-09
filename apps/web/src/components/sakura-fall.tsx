'use client';

import { motion } from 'framer-motion';

/**
 * Falling sakura petals and tea leaves — very subtle, decorative.
 * Drifts slowly with gentle rotation. Fades in/out.
 */
export function SakuraFall() {
  const petals = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 8,
    duration: 10 + Math.random() * 8,
    size: 8 + Math.random() * 12,
    rotation: Math.random() * 360,
    drift: (Math.random() - 0.5) * 60,
    type: i % 3 === 0 ? 'leaf' : 'sakura', // mix leaves and sakura
  }));

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[1]">
      {petals.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{ left: `${p.x}%`, top: '-20px' }}
          animate={{
            y: ['0vh', '105vh'],
            x: [0, p.drift, p.drift * 0.5],
            rotate: [p.rotation, p.rotation + 180 + Math.random() * 180],
            opacity: [0, 0.25, 0.25, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {p.type === 'sakura' ? (
            // Sakura petal — SVG
            <svg width={p.size} height={p.size} viewBox="0 0 20 20" fill="none">
              <path
                d="M10 2C10 2 7 6 7 10C7 14 10 18 10 18C10 18 13 14 13 10C13 6 10 2 10 2Z"
                fill="currentColor"
                className="text-[#e8b4b8]/40"
              />
              <path
                d="M2 10C2 10 6 7 10 7C14 7 18 10 18 10C18 10 14 13 10 13C6 13 2 10 2 10Z"
                fill="currentColor"
                className="text-[#f0c4c8]/30"
              />
            </svg>
          ) : (
            // Tea leaf — SVG
            <svg width={p.size * 0.8} height={p.size * 1.2} viewBox="0 0 16 24" fill="none">
              <path
                d="M8 0C8 0 2 8 2 14C2 20 8 24 8 24C8 24 14 20 14 14C14 8 8 0 8 0Z"
                fill="currentColor"
                className="text-matcha-accent/20"
              />
              <path
                d="M8 4L8 20"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-matcha-accent/15"
              />
            </svg>
          )}
        </motion.div>
      ))}
    </div>
  );
}
