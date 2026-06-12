'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function CountdownBanner() {
  const [timeLeft, setTimeLeft] = useState({ days: 3, hours: 14, minutes: 22, seconds: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(t => {
        let { days, hours, minutes, seconds } = t;
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) { hours = 23; days--; }
        if (days < 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-8 sm:py-10 bg-matcha-fg text-matcha-bg">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <p className="text-[10px] uppercase tracking-[0.2em] opacity-60 mb-2">Limited Release</p>
        <p className="font-display text-xl sm:text-2xl mb-4">Spring First Flush 2026 — Uji Single Estate</p>

        <div className="flex justify-center gap-3 sm:gap-4 mb-4">
          {[
            { value: timeLeft.days, label: 'Days' },
            { value: timeLeft.hours, label: 'Hours' },
            { value: timeLeft.minutes, label: 'Min' },
            { value: timeLeft.seconds, label: 'Sec' },
          ].map(t => (
            <div key={t.label} className="text-center">
              <motion.p
                key={t.value}
                className="font-display text-2xl sm:text-3xl"
                initial={{ opacity: 0.5, y: -2 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {String(t.value).padStart(2, '0')}
              </motion.p>
              <p className="text-[9px] sm:text-[10px] opacity-50 uppercase">{t.label}</p>
            </div>
          ))}
        </div>

        <Link href="/products">
          <button className="px-5 py-2 border border-matcha-bg/30 text-matcha-bg text-xs rounded-full hover:bg-matcha-bg/10 transition-colors">
            Get Notified
          </button>
        </Link>
      </div>
    </section>
  );
}
