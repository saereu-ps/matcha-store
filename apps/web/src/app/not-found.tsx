'use client';

import { TeaLeafIllustration } from '@/components/illustrations/tea-leaf';
import { Button } from '@matcha/ui';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center">
        <motion.div
          className="mx-auto w-24 h-24 mb-6 opacity-20"
          animate={{ rotate: [0, 5, -5, 0], y: [0, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <TeaLeafIllustration className="w-full h-full" />
        </motion.div>

        <motion.p
          className="font-display text-6xl sm:text-8xl text-matcha-fg/10 mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          404
        </motion.p>
        <motion.h1
          className="font-display text-2xl sm:text-3xl text-matcha-fg mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Page not found
        </motion.h1>
        <motion.p
          className="text-matcha-fg-muted text-sm mb-8 max-w-sm mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          This path does not exist — like water poured without a bowl.
        </motion.p>
        <motion.div
          className="flex gap-3 justify-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Link href="/"><Button>Return Home</Button></Link>
          <Link href="/products"><Button variant="secondary">Browse Matcha</Button></Link>
        </motion.div>
      </div>
    </main>
  );
}
