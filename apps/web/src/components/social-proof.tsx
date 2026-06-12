'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * Shows "X people viewing" and "Sold Y this week" on product pages.
 * Numbers are simulated but realistic.
 */
export function SocialProof({ productId }: { productId: string }) {
  const [viewers, setViewers] = useState(0);
  const soldThisWeek = 12 + (parseInt(productId) * 7) % 30;

  useEffect(() => {
    setViewers(2 + Math.floor(Math.random() * 8));
    const interval = setInterval(() => {
      setViewers(v => Math.max(1, v + (Math.random() > 0.5 ? 1 : -1)));
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-4 text-[10px] sm:text-xs text-matcha-fg-muted mt-4">
      <div className="flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-matcha-accent animate-pulse" />
        <AnimatePresence mode="wait">
          <motion.span key={viewers} initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }}>
            {viewers} viewing now
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="text-matcha-border">|</span>
      <span>Sold {soldThisWeek} this week</span>
    </div>
  );
}
