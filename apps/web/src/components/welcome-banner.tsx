'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function WelcomeBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem('matcha-banner-dismissed');
    if (!dismissed) {
      setTimeout(() => setShow(true), 2000);
    }
  }, []);

  const dismiss = () => {
    setShow(false);
    sessionStorage.setItem('matcha-banner-dismissed', '1');
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed top-16 sm:top-20 left-4 right-4 sm:left-auto sm:right-6 sm:w-[340px] z-50"
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          <div className="bg-matcha-bg border border-matcha-border rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] overflow-hidden">
            <div className="h-[2px] bg-gradient-to-r from-matcha-accent/30 via-matcha-accent to-matcha-accent/30" />
            <div className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-matcha-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-matcha-accent" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 1C8 1 3 5 3 9C3 13 8 15 8 15C8 15 13 13 13 9C13 5 8 1 8 1Z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-matcha-fg mb-0.5">Welcome to Matchá</p>
                  <p className="text-[11px] text-matcha-fg-muted leading-relaxed">
                    Use code <span className="font-mono text-matcha-accent font-medium">FIRST500</span> for ฿500 off your first order.
                  </p>
                  <Link href="/products" onClick={dismiss} className="inline-block mt-2 text-[11px] text-matcha-accent font-medium hover:underline">
                    Shop now →
                  </Link>
                </div>
                <button onClick={dismiss} className="text-matcha-fg-subtle hover:text-matcha-fg transition-colors">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none">
                    <path d="M4 4L10 10M10 4L4 10" stroke="currentColor" strokeWidth="1"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
