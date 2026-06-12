'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('matcha-cookies-accepted');
    if (!accepted) setTimeout(() => setShow(true), 3000);
  }, []);

  const accept = () => { localStorage.setItem('matcha-cookies-accepted', '1'); setShow(false); };
  const decline = () => { localStorage.setItem('matcha-cookies-accepted', 'essential'); setShow(false); };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:bottom-6 sm:w-[380px] z-[90]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          <div className="bg-matcha-bg border border-matcha-border rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] p-4 sm:p-5">
            <div className="flex gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-matcha-accent/10 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-matcha-accent" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2"/>
                  <circle cx="6" cy="7" r="1" fill="currentColor"/>
                  <circle cx="10" cy="6" r="0.8" fill="currentColor"/>
                  <circle cx="9" cy="10" r="1" fill="currentColor"/>
                  <circle cx="5.5" cy="10.5" r="0.6" fill="currentColor"/>
                </svg>
              </div>
              <div>
                <p className="text-xs font-medium text-matcha-fg mb-0.5">We value your privacy</p>
                <p className="text-[11px] text-matcha-fg-muted leading-relaxed">
                  We use cookies for cart, preferences, and analytics to improve your matcha experience.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={accept}
                className="flex-1 py-2 bg-matcha-accent text-white text-xs font-medium rounded-lg hover:bg-matcha-accent-dark transition-colors"
              >
                Accept All
              </button>
              <button
                onClick={decline}
                className="flex-1 py-2 text-matcha-fg-muted text-xs border border-matcha-border rounded-lg hover:border-matcha-fg-subtle hover:text-matcha-fg transition-colors"
              >
                Essential Only
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
