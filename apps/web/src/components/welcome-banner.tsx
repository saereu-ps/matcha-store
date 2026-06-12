'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function WelcomeBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem('matcha-banner-dismissed');
    if (!dismissed) {
      setTimeout(() => setShow(true), 1500);
      // Auto dismiss after 8 seconds
      setTimeout(() => {
        setShow(false);
        sessionStorage.setItem('matcha-banner-dismissed', '1');
      }, 9500);
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
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Blur backdrop */}
          <motion.div
            className="absolute inset-0 bg-matcha-fg/5 backdrop-blur-md"
            onClick={dismiss}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-sm"
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28, delay: 0.1 }}
          >
            <div className="bg-matcha-bg border border-matcha-border rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.08)] overflow-hidden">
              {/* Top gradient accent */}
              <div className="h-1 bg-gradient-to-r from-matcha-accent/20 via-matcha-accent to-matcha-accent/20" />

              <div className="p-6 sm:p-8 text-center">
                {/* Close button */}
                <button
                  onClick={dismiss}
                  className="absolute top-4 right-4 w-7 h-7 rounded-full bg-matcha-bg-muted/50 hover:bg-matcha-bg-muted flex items-center justify-center transition-colors"
                >
                  <svg className="w-3 h-3 text-matcha-fg-subtle" viewBox="0 0 12 12" fill="none">
                    <path d="M3 3L9 9M9 3L3 9" stroke="currentColor" strokeWidth="1.2"/>
                  </svg>
                </button>

                {/* Decorative leaf */}
                <motion.div
                  className="mx-auto mb-4 w-12 h-12 rounded-full bg-matcha-accent/10 flex items-center justify-center"
                  initial={{ rotate: -10 }}
                  animate={{ rotate: [0, 5, 0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <svg className="w-6 h-6 text-matcha-accent" viewBox="0 0 24 24" fill="currentColor" opacity="0.6">
                    <path d="M12 2C12 2 5 8 5 14C5 20 12 22 12 22C12 22 19 20 19 14C19 8 12 2 12 2Z"/>
                  </svg>
                </motion.div>

                {/* Title */}
                <motion.p
                  className="font-display text-xl sm:text-2xl text-matcha-fg mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Welcome to Matchá
                </motion.p>

                <motion.p
                  className="text-matcha-fg-muted text-xs sm:text-sm mb-5 leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  Premium stone-ground matcha from Japan.
                  <br />
                  Enjoy ฿500 off your first order.
                </motion.p>

                {/* Promo code */}
                <motion.div
                  className="inline-flex items-center gap-2 px-4 py-2 bg-matcha-accent/8 border border-matcha-accent/20 rounded-lg mb-5"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, type: 'spring' }}
                >
                  <span className="text-xs text-matcha-fg-muted">Code:</span>
                  <span className="font-mono text-sm font-semibold text-matcha-accent tracking-wider">FIRST500</span>
                </motion.div>

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Link href="/products" onClick={dismiss}>
                    <button className="w-full py-3 bg-matcha-accent text-white text-sm font-medium rounded-lg hover:bg-matcha-accent-dark transition-colors">
                      Explore Collection
                    </button>
                  </Link>
                </motion.div>

                {/* Auto-dismiss indicator */}
                <motion.div
                  className="mt-4 h-[2px] bg-matcha-border rounded-full overflow-hidden"
                >
                  <motion.div
                    className="h-full bg-matcha-accent/40 rounded-full"
                    initial={{ width: '100%' }}
                    animate={{ width: '0%' }}
                    transition={{ duration: 8, ease: 'linear', delay: 0 }}
                  />
                </motion.div>
                <p className="text-[9px] text-matcha-fg-subtle mt-1.5">Closing automatically...</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
