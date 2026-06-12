'use client';

import { FadeIn } from '@matcha/ui';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

const FAQS = [
  { q: 'What makes ceremonial grade different from culinary?', a: 'Ceremonial grade uses only the youngest first-flush leaves, shade-grown for 20+ days, and stone-ground to a fine 5-micron powder. It is meant to be whisked with water alone. Culinary grade uses later harvests and is designed for lattes, baking, and cooking where milk or sugar will be added.' },
  { q: 'How should I store my matcha?', a: 'Keep unopened matcha in the freezer for up to 12 months. Once opened, store in an airtight tin in the refrigerator and use within 4-6 weeks for optimal freshness. Always let it come to room temperature before opening to prevent condensation.' },
  { q: 'What water temperature should I use?', a: '75-80°C (167-176°F) for ceremonial matcha. Boiling water will scorch the delicate amino acids and create bitterness. Let boiled water cool for 2-3 minutes, or mix 1 part cold water with 2 parts boiling water.' },
  { q: 'How does the subscription work?', a: 'Choose your matcha and delivery frequency (weekly, bi-weekly, or monthly). Save 10% on every delivery. Skip, swap, or pause anytime from your dashboard — no commitment, no fees. Our smart cadence system learns your usage and suggests optimal frequency.' },
  { q: 'Do you ship internationally?', a: 'Currently we ship within Thailand (free over ฿1,500). International shipping to Japan, Singapore, and the US is coming in Q3 2026. Sign up for our newsletter to be notified.' },
  { q: 'What is your return policy?', a: 'Unopened products in original packaging can be returned within 30 days for a full refund. Opened matcha cannot be returned due to freshness concerns. Damaged or incorrect orders are replaced immediately at no cost.' },
  { q: 'How do loyalty points work?', a: 'Earn 1 point per ฿1 spent (1.5x for subscriptions). Redeem for free products, discounts, or exclusive access. Points expire after 12 months of inactivity. Progress through tiers (Novice → Enthusiast → Connoisseur → Master) to unlock benefits.' },
  { q: 'Can I visit your branches?', a: 'Yes! We have 5 locations in Bangkok — Thonglor, Siam, Ari, Ekkamai (HQ), and Sathorn. Each features a matcha bar where you can try before you buy. Our Thonglor flagship also offers tasting sessions and whisking workshops.' },
];

function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <FadeIn delay={index * 0.03}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left p-4 rounded-xl border border-matcha-border hover:border-matcha-accent/30 transition-colors bg-matcha-bg"
      >
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-sm font-medium text-matcha-fg pr-4">{q}</h3>
          <motion.svg
            className="w-4 h-4 text-matcha-fg-subtle shrink-0"
            viewBox="0 0 16 16"
            fill="none"
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </motion.svg>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <p className="text-matcha-fg-muted text-xs leading-relaxed pt-3 border-t border-matcha-border/50 mt-3">{a}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </FadeIn>
  );
}

export default function FaqPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <FadeIn>
        <div className="text-center mb-10">
          <p className="text-matcha-accent text-xs uppercase tracking-wider mb-2">Support</p>
          <h1 className="font-display text-4xl sm:text-5xl text-matcha-fg mb-3">Frequently Asked</h1>
          <p className="text-matcha-fg-muted text-sm">Everything about matcha, orders, and our service.</p>
        </div>
      </FadeIn>

      <div className="space-y-2">
        {FAQS.map((faq, i) => (
          <FaqItem key={i} q={faq.q} a={faq.a} index={i} />
        ))}
      </div>
    </main>
  );
}
