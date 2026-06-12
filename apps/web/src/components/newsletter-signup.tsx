'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="py-10 sm:py-14 border-t border-matcha-border">
      <div className="max-w-xl mx-auto px-4 text-center">
        {submitted ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <p className="text-matcha-accent text-sm font-medium mb-1">Welcome to the community</p>
            <p className="text-matcha-fg-muted text-xs">Seasonal updates and exclusive offers — straight to your inbox.</p>
          </motion.div>
        ) : (
          <>
            <p className="font-display text-lg sm:text-xl text-matcha-fg mb-2">Stay in the loop</p>
            <p className="text-matcha-fg-muted text-xs mb-4">New harvests, brewing tips, and subscriber-only offers.</p>
            <form onSubmit={handleSubmit} className="flex gap-2 max-w-sm mx-auto">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 px-3 py-2.5 text-xs bg-matcha-bg border border-matcha-border rounded-lg text-matcha-fg placeholder:text-matcha-fg-subtle/40 focus:outline-none focus:border-matcha-accent focus:ring-1 focus:ring-matcha-ring"
              />
              <button type="submit" className="px-4 py-2.5 bg-matcha-accent text-white text-xs font-medium rounded-lg hover:bg-matcha-accent-dark transition-colors shrink-0">
                Subscribe
              </button>
            </form>
            <p className="text-[9px] text-matcha-fg-subtle mt-2">No spam. Unsubscribe anytime.</p>
          </>
        )}
      </div>
    </section>
  );
}
