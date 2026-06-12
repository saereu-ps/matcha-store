import { FadeIn } from '@matcha/ui';

import { BrewingCTA } from '@/components/brewing-cta';
import { CountdownBanner } from '@/components/countdown-banner';
import { NewsletterSignup } from '@/components/newsletter-signup';
import { FeaturedProducts } from '@/components/featured-products';
import { HeroSection } from '@/components/hero-section';
import { InteractiveTeacup } from '@/components/interactive-teacup';
import { Marquee } from '@/components/marquee';
import { MatchaMixer } from '@/components/matcha-mixer';
import { OriginHighlights } from '@/components/origin-highlights';
import { StatsSection } from '@/components/stats-section';
import { SubscriptionCTA } from '@/components/subscription-cta';
import { ZenQuote } from '@/components/zen-quote';

export default function HomePage() {
  return (
    <main className="flex flex-col">
      {/* Hero */}
      <HeroSection />

      {/* Brand marquee */}
      <div className="py-6 border-y border-matcha-border bg-matcha-bg-subtle/50">
        <Marquee
          items={['Ceremonial Grade', 'Stone-Ground', 'Single Origin', 'First Flush', 'Shade-Grown', 'Uji', 'Kagoshima', 'Nishio', 'Yame', 'Shizuoka']}
          speed={40}
        />
      </div>

      {/* Zen Quote rotator */}
      <ZenQuote />

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <FadeIn>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-matcha-fg mb-3 sm:mb-4">
            Curated for You
          </h2>
          <p className="text-matcha-fg-muted text-sm sm:text-lg mb-8 sm:mb-12 max-w-2xl">
            Discover our selection of single-origin, stone-ground matcha from Japan&apos;s finest terroir.
          </p>
        </FadeIn>
        <FeaturedProducts />
      </section>

      {/* Interactive section — whisking game + teacup */}
      <section className="py-16 sm:py-20 border-y border-matcha-border bg-matcha-bg-subtle/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <h2 className="font-display text-2xl sm:text-3xl text-matcha-fg text-center mb-3">Try It Yourself</h2>
            <p className="text-matcha-fg-muted text-sm text-center mb-10 max-w-md mx-auto">
              Interactive matcha experiences — whisk your own bowl or enjoy a virtual sip.
            </p>
          </FadeIn>
          <div className="grid sm:grid-cols-2 gap-12 max-w-2xl mx-auto">
            <FadeIn delay={0.1}>
              <div className="text-center">
                <h3 className="text-matcha-fg text-sm font-medium mb-4">· Whisk It</h3>
                <MatchaMixer />
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="text-center">
                <h3 className="text-matcha-fg text-sm font-medium mb-4">· Sip It</h3>
                <InteractiveTeacup />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Stats */}
      <StatsSection />

      {/* Brewing Guide CTA */}
      <BrewingCTA />

      {/* Origin Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <FadeIn>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-matcha-fg mb-8 sm:mb-12">
            Explore Origins
          </h2>
        </FadeIn>
        <OriginHighlights />
      </section>

      {/* Subscription CTA */}
      <SubscriptionCTA />

      {/* Countdown — limited release */}
      <CountdownBanner />

      {/* Newsletter */}
      <NewsletterSignup />

      {/* Bottom marquee */}
      <div className="py-6 border-t border-matcha-border">
        <Marquee
          items={['Free Shipping over $50', 'Subscribe & Save 10%', 'Loyalty Rewards', 'Carbon Neutral', '30-Day Returns']}
          speed={35}
        />
      </div>
    </main>
  );
}
