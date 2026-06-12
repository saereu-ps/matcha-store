'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

export function ChatButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[80]">
      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute bottom-14 right-0 w-72 sm:w-80 bg-matcha-bg border border-matcha-border rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.1)] overflow-hidden"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
          >
            <div className="p-4 bg-matcha-accent text-white">
              <p className="text-sm font-medium">Matchá Support</p>
              <p className="text-[10px] opacity-80">Usually replies within minutes</p>
            </div>
            <div className="p-4 h-48 flex items-center justify-center">
              <div className="text-center">
                <p className="text-matcha-fg-muted text-xs mb-2">How can we help?</p>
                <p className="text-[10px] text-matcha-fg-subtle">Ask about matcha, orders, or subscriptions</p>
              </div>
            </div>
            <div className="p-3 border-t border-matcha-border">
              <div className="flex gap-2">
                <input type="text" placeholder="Type a message..." className="flex-1 px-3 py-2 text-xs bg-matcha-bg-subtle border border-matcha-border rounded-lg focus:outline-none focus:border-matcha-accent" />
                <button className="px-3 py-2 bg-matcha-accent text-white text-xs rounded-lg hover:bg-matcha-accent-dark transition-colors">Send</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen(!open)}
        className="w-12 h-12 rounded-full bg-matcha-accent text-white shadow-lg flex items-center justify-center hover:bg-matcha-accent-dark transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.svg key="close" className="w-5 h-5" viewBox="0 0 16 16" fill="none" initial={{ rotate: -90 }} animate={{ rotate: 0 }}>
              <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </motion.svg>
          ) : (
            <motion.svg key="chat" className="w-5 h-5" viewBox="0 0 16 16" fill="none" initial={{ rotate: 90 }} animate={{ rotate: 0 }}>
              <path d="M2 4C2 3 3 2 4 2H12C13 2 14 3 14 4V9C14 10 13 11 12 11H5L3 13V11H4C3 11 2 10 2 9V4Z" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M5 6H11M5 8H9" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round"/>
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
