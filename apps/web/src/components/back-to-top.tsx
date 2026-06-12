'use client';

import { AnimatePresence, motion, useScroll } from 'framer-motion';
import { useEffect, useState } from 'react';

export function BackToTop() {
  const [show, setShow] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.on('change', (v) => setShow(v > 400));
  }, [scrollY]);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          className="fixed bottom-6 left-6 z-40 w-10 h-10 rounded-full bg-matcha-bg border border-matcha-border shadow-md flex items-center justify-center text-matcha-fg-muted hover:text-matcha-accent hover:border-matcha-accent transition-colors"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
        >
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
            <path d="M8 12V4M4 7L8 3L12 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
