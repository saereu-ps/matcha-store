'use client';

import { useCurrency } from '@/lib/currency';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ProductIllustration } from './product-illustration';

const ALL_PRODUCTS = [
  { id: '1', name: 'Uji Ceremonial Okumidori', grade: 'CEREMONIAL', price: 1490 },
  { id: '2', name: 'Kagoshima Premium Saemidori', grade: 'PREMIUM', price: 990 },
  { id: '3', name: 'Nishio First Flush', grade: 'CEREMONIAL', price: 1890 },
  { id: '4', name: 'Yame Mountain Blend', grade: 'PREMIUM', price: 1190 },
  { id: '5', name: 'Shizuoka Culinary Grade', grade: 'CULINARY', price: 450 },
  { id: '6', name: 'Matcha Latte Blend', grade: 'CULINARY', price: 590 },
  { id: '7', name: 'Kagoshima Ceremonial Asahi', grade: 'CEREMONIAL', price: 1690 },
  { id: '9', name: 'Uji Super Premium Gokou', grade: 'CEREMONIAL', price: 2890 },
  { id: '10', name: 'Yame Dento Hon Gyokuro', grade: 'CEREMONIAL', price: 3490 },
  { id: '11', name: 'Uji Competition Grade', grade: 'CEREMONIAL', price: 5990 },
  { id: '14', name: 'Shizuoka Premium Yabukita', grade: 'PREMIUM', price: 890 },
  { id: '16', name: 'Kagoshima Organic Premium', grade: 'PREMIUM', price: 1290 },
];

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

export function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { format } = useCurrency();

  const results = query.length >= 1
    ? ALL_PRODUCTS.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.grade.toLowerCase().includes(query.toLowerCase()))
    : [];

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [open]);

  // Keyboard shortcut: Cmd+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose(); // toggle
      }
      if (e.key === 'Escape' && open) onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div className="absolute inset-0 bg-matcha-fg/10 backdrop-blur-sm" onClick={onClose} />

          <motion.div
            className="relative w-full max-w-lg bg-matcha-bg border border-matcha-border rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.1)] overflow-hidden"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            {/* Search input */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-matcha-border">
              <svg className="w-4 h-4 text-matcha-fg-subtle shrink-0" viewBox="0 0 16 16" fill="none">
                <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search matcha..."
                className="flex-1 bg-transparent text-sm text-matcha-fg placeholder:text-matcha-fg-subtle/50 focus:outline-none"
              />
              <kbd className="hidden sm:inline text-[10px] text-matcha-fg-subtle border border-matcha-border px-1.5 py-0.5 rounded">ESC</kbd>
            </div>

            {/* Results */}
            <div className="max-h-[50vh] overflow-y-auto">
              {query.length === 0 && (
                <div className="p-4 text-center text-matcha-fg-subtle text-xs">
                  <p>Type to search products</p>
                  <p className="mt-1 text-[10px]">Try: ceremonial, uji, latte, premium</p>
                </div>
              )}
              {query.length >= 1 && results.length === 0 && (
                <div className="p-4 text-center text-matcha-fg-subtle text-xs">
                  No results for &ldquo;{query}&rdquo;
                </div>
              )}
              {results.map((product, i) => (
                <Link key={product.id} href={`/products/${product.id}`} onClick={onClose}>
                  <motion.div
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-matcha-bg-subtle transition-colors cursor-pointer"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                  >
                    <div className="w-8 h-8 rounded-sm bg-matcha-bg-subtle overflow-hidden shrink-0">
                      <ProductIllustration productId={product.id} className="w-full h-full" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-matcha-fg truncate">{product.name}</p>
                      <p className="text-[10px] text-matcha-fg-subtle">{product.grade}</p>
                    </div>
                    <span className="text-xs font-display text-matcha-fg shrink-0">{format(product.price)}</span>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
