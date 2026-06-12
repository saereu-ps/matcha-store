'use client';

import { LOCALE_NAMES, useI18n, type Locale } from '@/lib/i18n';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

const LOCALES: { code: Locale; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: 'EN' },
  { code: 'th', label: 'ภาษาไทย', flag: 'TH' },
  { code: 'ja', label: '日本語', flag: 'JA' },
];

export function LanguageSelector() {
  const { locale, setLocale } = useI18n();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 h-8 px-2 text-[11px] text-matcha-fg-muted hover:text-matcha-fg border border-matcha-border/60 rounded-full transition-colors"
      >
        <span className="font-medium">{LOCALE_NAMES[locale]}</span>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              className="absolute right-0 top-full mt-1 z-50 bg-matcha-bg border border-matcha-border rounded-lg shadow-lg overflow-hidden min-w-[120px]"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
            >
              {LOCALES.map(l => (
                <button
                  key={l.code}
                  onClick={() => { setLocale(l.code); setOpen(false); }}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center gap-2 transition-colors ${
                    l.code === locale ? 'bg-matcha-accent/10 text-matcha-accent' : 'text-matcha-fg-muted hover:bg-matcha-bg-subtle'
                  }`}
                >
                  <span className="font-medium">{l.flag}</span>
                  <span>{l.label}</span>
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
