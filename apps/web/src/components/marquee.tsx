'use client';

import { motion } from 'framer-motion';

interface MarqueeProps {
  items: string[];
  speed?: number;
  className?: string;
}

/**
 * Infinite horizontal scrolling text — luxury brand-style ticker.
 */
export function Marquee({ items, speed = 30, className }: MarqueeProps) {
  const content = [...items, ...items]; // duplicate for seamless loop

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className ?? ''}`}>
      <motion.div
        className="inline-flex gap-8"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
      >
        {content.map((item, i) => (
          <span key={i} className="text-matcha-fg-subtle text-sm tracking-widest uppercase">
            {item}
            <span className="mx-8 text-matcha-accent">·</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
