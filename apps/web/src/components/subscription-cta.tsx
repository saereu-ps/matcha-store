'use client';

import { Button, FadeIn } from '@matcha/ui';
import Link from 'next/link';

export function SubscriptionCTA() {
  return (
    <section className="py-20 sm:py-32 border-y border-matcha-border bg-gradient-to-b from-matcha-bg-subtle to-matcha-bg">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <FadeIn>
          <p className="text-matcha-accent font-medium tracking-widest uppercase text-sm mb-4">
            Never Run Out
          </p>
          <h2 className="font-display text-4xl md:text-6xl text-matcha-fg mb-6">
            Subscribe & Save 10%
          </h2>
          <p className="text-matcha-fg-muted text-lg mb-10 max-w-xl mx-auto">
            Smart delivery learns your pace. Skip, swap, or pause anytime.
            Earn loyalty points with every delivery and unlock exclusive harvests.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/subscriptions">
              <Button size="lg">Start Subscription</Button>
            </Link>
            <Link href="/subscriptions#how-it-works">
              <Button variant="secondary" size="lg">How It Works</Button>
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
