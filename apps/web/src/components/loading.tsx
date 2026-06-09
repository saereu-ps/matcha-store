'use client';

import { motion } from 'framer-motion';

/**
 * Premium loading screen — matcha leaf unfurling animation.
 */
export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[200] bg-matcha-bg flex items-center justify-center">
      <motion.div
        className="flex flex-col items-center gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* Animated logo */}
        <motion.div
          className="w-16 h-16 rounded-full border-2 border-matcha-accent/30 flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        >
          <motion.div
            className="w-3 h-3 rounded-full bg-matcha-accent"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </motion.div>
        <motion.span
          className="font-display text-xl text-matcha-fg-muted"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Matchá
        </motion.span>
      </motion.div>
    </div>
  );
}
