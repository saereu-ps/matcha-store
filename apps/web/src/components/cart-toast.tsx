'use client';

import { useCart } from '@/lib/cart';
import { useCurrency } from '@/lib/currency';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ProductIllustration } from './product-illustration';

export function CartToast() {
  const { items, total, itemCount, subtotal } = useCart();
  const { format } = useCurrency();
  const [show, setShow] = useState(false);
  const [lastItem, setLastItem] = useState<typeof items[0] | null>(null);
  const [prevCount, setPrevCount] = useState(0);

  useEffect(() => {
    if (itemCount > prevCount && items.length > 0) {
      setLastItem(items[items.length - 1]);
      setShow(true);
      const timer = setTimeout(() => setShow(false), 5000);
      return () => clearTimeout(timer);
    }
    setPrevCount(itemCount);
  }, [itemCount, items, prevCount]);

  const freeShippingProgress = Math.min(100, (subtotal / 1500) * 100);

  return (
    <AnimatePresence>
      {show && lastItem && (
        <motion.div
          className="fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-50 w-[300px] sm:w-[340px]"
          initial={{ opacity: 0, y: 50, scale: 0.85, rotateX: 10 }}
          animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
          exit={{ opacity: 0, y: 30, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 28 }}
        >
          <div className="relative bg-matcha-bg rounded-xl border border-matcha-border shadow-[0_8px_40px_rgba(0,0,0,0.08)] overflow-hidden">
            {/* Decorative corner leaf */}
            <svg className="absolute top-2 right-2 w-6 h-6 text-matcha-accent/10" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C12 2 5 8 5 14C5 20 12 22 12 22C12 22 19 20 19 14C19 8 12 2 12 2Z"/>
            </svg>

            {/* Success checkmark animation */}
            <div className="flex items-center gap-2.5 px-4 pt-4 pb-2">
              <motion.div
                className="w-5 h-5 rounded-full bg-matcha-accent/10 flex items-center justify-center shrink-0"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 500 }}
              >
                <motion.svg
                  className="w-3 h-3 text-matcha-accent"
                  viewBox="0 0 12 12"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                >
                  <motion.path
                    d="M2 6L5 9L10 3"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.4, duration: 0.3 }}
                  />
                </motion.svg>
              </motion.div>
              <span className="text-xs text-matcha-fg font-medium">Added to cart</span>
              <button
                onClick={() => setShow(false)}
                className="ml-auto w-5 h-5 rounded-full hover:bg-matcha-bg-muted flex items-center justify-center transition-colors"
              >
                <svg className="w-3 h-3 text-matcha-fg-subtle" viewBox="0 0 12 12" fill="none">
                  <path d="M3 3L9 9M9 3L3 9" stroke="currentColor" strokeWidth="1"/>
                </svg>
              </button>
            </div>

            {/* Product card */}
            <motion.div
              className="mx-3 p-2.5 rounded-lg bg-matcha-bg-subtle/60 flex items-center gap-3"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
            >
              <div className="w-12 h-12 shrink-0 rounded-md bg-matcha-bg border border-matcha-border/40 overflow-hidden p-0.5">
                <ProductIllustration productId={lastItem.id} className="w-full h-full" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-matcha-fg text-[11px] sm:text-xs font-medium truncate">{lastItem.name}</p>
                <p className="text-matcha-fg-subtle text-[10px]">{lastItem.grade} · {lastItem.weight}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="font-display text-sm text-matcha-fg">{format(lastItem.price)}</p>
                <p className="text-[9px] text-matcha-fg-subtle">x{lastItem.quantity}</p>
              </div>
            </motion.div>

            {/* Free shipping progress */}
            <div className="px-4 pt-3 pb-1">
              <div className="flex items-center justify-between text-[10px] mb-1">
                <span className="text-matcha-fg-muted">
                  {freeShippingProgress >= 100 ? 'Free shipping unlocked' : `${format(1500 - subtotal)} more for free shipping`}
                </span>
                <span className="text-matcha-accent font-medium">
                  {freeShippingProgress >= 100 ? 'Free' : `${Math.round(freeShippingProgress)}%`}
                </span>
              </div>
              <div className="h-[3px] bg-matcha-bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-matcha-accent/60 to-matcha-accent rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${freeShippingProgress}%` }}
                  transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
                />
              </div>
            </div>

            {/* Total + actions */}
            <div className="px-4 pt-3 pb-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] text-matcha-fg-muted">{itemCount} item{itemCount > 1 ? 's' : ''}</span>
                <div className="text-right">
                  <span className="font-display text-lg text-matcha-fg">{format(total)}</span>
                  <span className="text-[9px] text-matcha-fg-subtle block">incl. VAT</span>
                </div>
              </div>

              <Link href="/checkout" onClick={() => setShow(false)}>
                <motion.button
                  className="w-full py-2.5 bg-matcha-accent text-white text-xs font-medium rounded-lg hover:bg-matcha-accent-dark transition-colors flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>View Cart</span>
                  <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                    <path d="M4 2L8 6L4 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                </motion.button>
              </Link>
            </div>

            {/* Bottom decoration — thin line */}
            <div className="h-[1px] bg-gradient-to-r from-transparent via-matcha-accent/20 to-transparent" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
