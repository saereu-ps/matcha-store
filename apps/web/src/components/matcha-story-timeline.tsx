'use client';

import { FadeIn } from '@matcha/ui';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const STEPS = [
  { title: 'Shade Growing', japanese: '覆下栽培', desc: 'Tea plants are shaded for 20-30 days before harvest, boosting chlorophyll and L-theanine.', time: '20 days' },
  { title: 'First Harvest', japanese: '一番茶', desc: 'Only the youngest, most tender spring leaves are hand-picked at dawn.', time: 'April-May' },
  { title: 'Steaming', japanese: '蒸し', desc: 'Leaves are steamed within hours to halt oxidation, preserving their vivid green.', time: '15-20 sec' },
  { title: 'Drying', japanese: '乾燥', desc: 'Dried into flat tencha leaves, then de-stemmed and de-veined for purity.', time: '24 hours' },
  { title: 'Stone Grinding', japanese: '石臼挽き', desc: 'Granite millstones grind tencha at 40g/hour into a 5-micron powder — never heated.', time: '1 hour/40g' },
  { title: 'Your Cup', japanese: '一服', desc: 'Whisked with 80°C water into a jade-green bowl of umami, sweetness, and calm.', time: '15 seconds' },
];

export function MatchaStoryTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section ref={containerRef} className="py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <FadeIn>
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-matcha-accent text-xs uppercase tracking-wider mb-2">From Leaf to Cup</p>
            <h2 className="font-display text-3xl sm:text-5xl text-matcha-fg">The Journey of Matcha</h2>
          </div>
        </FadeIn>

        <div className="relative">
          {/* Vertical timeline line (background) */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-[1px] bg-matcha-border sm:-translate-x-px" />
          {/* Animated fill line */}
          <motion.div
            className="absolute left-4 sm:left-1/2 top-0 w-[1px] bg-matcha-accent sm:-translate-x-px origin-top"
            style={{ height: lineHeight }}
          />

          {/* Steps */}
          <div className="space-y-12 sm:space-y-16">
            {STEPS.map((step, i) => (
              <FadeIn key={step.title} delay={i * 0.05}>
                <div className={`relative flex items-start gap-6 sm:gap-0 ${i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>
                  {/* Dot */}
                  <div className="absolute left-4 sm:left-1/2 w-3 h-3 rounded-full bg-matcha-accent border-2 border-matcha-bg -translate-x-1.5 sm:-translate-x-1.5 mt-1.5 z-10" />

                  {/* Content */}
                  <div className={`ml-10 sm:ml-0 sm:w-1/2 ${i % 2 === 0 ? 'sm:pr-12 sm:text-right' : 'sm:pl-12'}`}>
                    <div className="p-4 rounded-xl border border-matcha-border bg-matcha-bg hover:border-matcha-accent/30 transition-colors">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="font-display text-lg text-matcha-accent">{step.japanese}</span>
                        <span className="text-[10px] text-matcha-fg-subtle px-2 py-0.5 bg-matcha-bg-subtle rounded-full">{step.time}</span>
                      </div>
                      <h3 className="font-medium text-matcha-fg text-sm mb-1">{step.title}</h3>
                      <p className="text-matcha-fg-muted text-xs leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
