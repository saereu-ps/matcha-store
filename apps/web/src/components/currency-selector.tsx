'use client';

import { CURRENCIES, useCurrency } from '@/lib/currency';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

export function CurrencySelector() {
  const { currency, setCurrency } = useCurrency();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 h-8 px-2.5 text-[11px] text-matcha-fg-muted hover:text-matcha-fg bg-matcha-bg-subtle/80 hover:bg-matcha-bg-muted border border-matcha-border/60 rounded-full transition-all"
      >
        <span className="font-display text-sm text-matcha-accent">{currency.symbol}</span>
        <span className="font-medium">{currency.code}</span>
        <svg className={`w-2.5 h-2.5 opacity-40 transition-transform ${open ? 'rotate-180' : ''}`} viewBox="0 0 10 10" fill="none">
          <path d="M2 4L5 7L8 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              className="absolute right-0 top-full mt-2 z-50 bg-matcha-bg border border-matcha-border rounded-lg shadow-lg overflow-hidden min-w-[160px]"
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.15 }}
            >
              <div className="p-1">
                {CURRENCIES.map((c) => (
                  <button
                    key={c.code}
                    onClick={() => { setCurrency(c.code); setOpen(false); }}
                    className={`w-full text-left px-3 py-2 rounded-md text-xs flex items-center gap-2.5 transition-colors ${
                      c.code === currency.code
                        ? 'bg-matcha-accent/10 text-matcha-accent'
                        : 'text-matcha-fg-muted hover:bg-matcha-bg-subtle hover:text-matcha-fg'
                    }`}
                  >
                    <span className="font-display text-base w-5 text-center">{c.symbol}</span>
                    <span className="font-medium">{c.code}</span>
                    <span className="ml-auto text-[10px] opacity-50">{c.name}</span>
                    {c.code === currency.code && (
                      <svg className="w-3 h-3 text-matcha-accent ml-1" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
