'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { AnimatedCounter } from './animated-counter';

const STATS = [
  { value: 5, suffix: '', label: 'Japanese Regions' },
  { value: 12, suffix: '+', label: 'Cultivar Varieties' },
  { value: 800, suffix: '+', label: 'Years of Tradition' },
  { value: 100, suffix: '%', label: 'Stone-Ground' },
];

export function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-16 sm:py-20 border-y border-matcha-border bg-matcha-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.5 }}
            >
              <div className="font-display text-3xl sm:text-5xl text-matcha-accent mb-2">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} duration={2} />
              </div>
              <p className="text-matcha-fg-muted text-xs sm:text-sm tracking-wide uppercase">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
