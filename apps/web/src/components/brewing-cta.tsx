'use client';

import { Button, FadeIn } from '@matcha/ui';
import Link from 'next/link';
import { BrewingSceneIllustration } from './illustrations/brewing-scene';
import { JapaneseFrame } from './japanese-frame';

export function BrewingCTA() {
  return (
    <section className="py-16 sm:py-24 bg-matcha-bg-subtle/50 border-y border-matcha-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
        {/* Left — content */}
        <FadeIn direction="left">
          <p className="text-matcha-accent font-medium tracking-widest uppercase text-xs sm:text-sm mb-3 sm:mb-4">
            Learn the Art
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-matcha-fg mb-4 sm:mb-6">
            Interactive Brewing Guides
          </h2>
          <p className="text-matcha-fg-muted text-sm sm:text-base mb-6 sm:mb-8 leading-relaxed">
            Step-by-step guides with real-time timers, technique illustrations, and our immersive
            3D tea ceremony experience. Perfect your preparation, from usucha to koicha.
          </p>
          <div className="flex gap-3 sm:gap-4">
            <Link href="/education">
              <Button>Start Brewing</Button>
            </Link>
            <Link href="/education">
              <Button variant="secondary">3D Ceremony</Button>
            </Link>
          </div>
        </FadeIn>

        {/* Right — illustration */}
        <FadeIn direction="right" delay={0.2}>
          <JapaneseFrame variant="gold">
            <div className="aspect-[4/3] bg-matcha-bg flex items-center justify-center p-4">
              <BrewingSceneIllustration className="w-full h-full" />
            </div>
          </JapaneseFrame>
        </FadeIn>
      </div>
    </section>
  );
}
