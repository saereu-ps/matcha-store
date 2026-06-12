'use client';

import { Card, FadeIn } from '@matcha/ui';

const REVIEWS = [
  { name: 'Mika T.', role: 'Subscriber · 8 months', rating: 5, text: 'The Uji Okumidori completely changed my morning routine. Smooth, creamy, zero bitterness. I will never go back to coffee.', avatar: 'M' },
  { name: 'James L.', role: 'Connoisseur Tier', rating: 5, text: 'Finally — an online store that takes terroir seriously. The provenance data and tasting notes are exactly what I needed.', avatar: 'J' },
  { name: 'Sari P.', role: 'New customer', rating: 5, text: 'The taste quiz matched me perfectly. Got the Kagoshima Premium — sweet, mild, ideal for my daily latte. Subscription set up in seconds.', avatar: 'S' },
  { name: 'Kenji Y.', role: 'Subscriber · 1 year', rating: 5, text: 'Smart cadence is brilliant. It learned I drink more on weekdays and adjusted delivery perfectly. No more running out.', avatar: 'K' },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} className={`w-3 h-3 ${i < count ? 'text-matcha-accent' : 'text-matcha-border'}`} viewBox="0 0 12 12" fill="currentColor">
          <path d="M6 1L7.5 4.5L11 5L8.5 7.5L9 11L6 9.5L3 11L3.5 7.5L1 5L4.5 4.5L6 1Z"/>
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <FadeIn>
          <div className="text-center mb-10">
            <p className="text-matcha-accent text-xs uppercase tracking-wider mb-2">Community</p>
            <h2 className="font-display text-3xl sm:text-4xl text-matcha-fg">What Our Customers Say</h2>
          </div>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {REVIEWS.map((review, i) => (
            <FadeIn key={review.name} delay={i * 0.08}>
              <Card className="h-full flex flex-col">
                <Stars count={review.rating} />
                <p className="text-matcha-fg-muted text-xs leading-relaxed mt-3 flex-1">"{review.text}"</p>
                <div className="flex items-center gap-2 mt-4 pt-3 border-t border-matcha-border/50">
                  <div className="w-7 h-7 rounded-full bg-matcha-accent/10 flex items-center justify-center text-matcha-accent text-[10px] font-medium">
                    {review.avatar}
                  </div>
                  <div>
                    <p className="text-[11px] font-medium text-matcha-fg">{review.name}</p>
                    <p className="text-[9px] text-matcha-fg-subtle">{review.role}</p>
                  </div>
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
