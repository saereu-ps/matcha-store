'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // Could integrate with Mailchimp/ConvertKit
    setSubmitted(true);
  };

  return (
    <section className="border-t border-matcha-border bg-matcha-bg-subtle/30 py-10 sm:py-14">
      <div className="max-w-xl mx-auto px-4 sm:px-6 text-center">
        {submitted ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <p className="font-display text-xl text-matcha-fg mb-1">Thank you</p>
            <p className="text-matcha-fg-muted text-xs">You will receive matcha updates and seasonal announcements.</p>
          </motion.div>
        ) : (
          <>
            <p className="font-display text-lg sm:text-xl text-matcha-fg mb-1">Stay in the Loop</p>
            <p className="text-matcha-fg-muted text-xs sm:text-sm mb-5">New harvests, seasonal drops, and brewing tips. No spam — just matcha.</p>
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
            <p className="text-[9px] text-matcha-fg-subtle mt-2">Unsubscribe anytime. We respect your inbox.</p>
          </>
        )}
      </div>
    </section>
  );
}
