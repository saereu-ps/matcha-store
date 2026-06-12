'use client';

import { Button, FadeIn } from '@matcha/ui';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { MouseParallaxWrapper } from './mouse-parallax-hero';
import { TextReveal } from './text-reveal';

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] sm:min-h-screen flex items-center justify-center overflow-hidden">
      {/* Warm paper background with subtle ink wash gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-matcha-bg via-[#f2ede5] to-matcha-bg" />

      {/* Decorative ink-wash circle (like Japanese enso) */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full border border-matcha-accent/10"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] rounded-full border border-matcha-accent/5"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, delay: 0.3, ease: 'easeOut' }}
      />

      {/* Floating tea leaves (subtle) */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-matcha-accent/20"
          style={{ left: `${20 + i * 12}%`, top: `${30 + (i % 3) * 15}%` }}
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.5 }}
        />
      ))}

      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        <MouseParallaxWrapper>
        {/* Japanese-inspired subtitle */}
        <motion.p
          className="text-matcha-accent font-medium tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[10px] sm:text-xs mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          一期一会 · Ceremonial Grade · Single Origin
        </motion.p>

        {/* Main title — clean serif like the reference */}
        <TextReveal delay={0.5}>
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-matcha-fg leading-[0.9] tracking-tight">
            Matchá
          </h1>
        </TextReveal>

        {/* Tagline — zen simplicity */}
        <FadeIn delay={0.9}>
          <p className="text-matcha-fg-muted text-base sm:text-lg md:text-xl mb-10 sm:mb-14 max-w-lg mx-auto leading-relaxed mt-6 sm:mt-8">
            The finest stone-ground matcha from Japan.
            <br className="hidden sm:block" />
            Curated with intention, delivered with care.
          </p>
        </FadeIn>

        {/* CTA — minimal, refined */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <Link href="/products">
            <Button size="lg">Explore Collection</Button>
          </Link>
          <Link href="/education/taste-quiz">
            <Button variant="secondary" size="lg">Discover Your Taste</Button>
          </Link>
        </motion.div>
        </MouseParallaxWrapper>
      </div>

      {/* Scroll indicator — ink brush style */}
      <motion.div
        className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          className="w-[1px] h-10 sm:h-14 bg-gradient-to-b from-matcha-fg-subtle/50 to-transparent"
          animate={{ scaleY: [1, 0.6, 1] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
}
