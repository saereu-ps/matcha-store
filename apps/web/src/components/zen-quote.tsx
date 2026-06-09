'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const QUOTES = [
  { text: '一期一会', translation: 'One time, one meeting — treasure every encounter' },
  { text: '和敬清寂', translation: 'Harmony, respect, purity, tranquility' },
  { text: '茶禅一味', translation: 'Tea and Zen are one taste' },
  { text: '日日是好日', translation: 'Every day is a good day' },
  { text: '喫茶去', translation: 'Go have some tea — just be present' },
];

/**
 * Rotating zen quotes with calligraphy-style animation.
 * Changes every 6 seconds.
 */
export function ZenQuote() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(i => (i + 1) % QUOTES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const quote = QUOTES[index];

  return (
    <div className="text-center py-12 sm:py-16">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-display text-3xl sm:text-5xl text-matcha-fg/80 mb-3 tracking-wider">
            {quote.text}
          </p>
          <p className="text-matcha-fg-muted text-sm italic">
            {quote.translation}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Dots indicator */}
      <div className="flex gap-1.5 justify-center mt-6">
        {QUOTES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-1.5 h-1.5 rounded-full transition-colors ${i === index ? 'bg-matcha-accent' : 'bg-matcha-border'}`}
          />
        ))}
      </div>
    </div>
  );
}
