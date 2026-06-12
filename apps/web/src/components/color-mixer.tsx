'use client';

import { Card } from '@matcha/ui';
import { motion } from 'framer-motion';
import { useState } from 'react';

/**
 * Interactive matcha color mixer — slide to see how your drink looks.
 * Concentration: pure matcha → matcha latte → milk.
 */
export function ColorMixer() {
  const [concentration, setConcentration] = useState(70);
  const [temperature, setTemperature] = useState(80);

  // Generate color based on concentration (green → light green → white)
  const matchaGreen = { r: 88, g: 130, b: 60 };
  const milk = { r: 250, g: 247, b: 240 };
  const ratio = concentration / 100;
  const color = {
    r: Math.round(milk.r + (matchaGreen.r - milk.r) * ratio),
    g: Math.round(milk.g + (matchaGreen.g - milk.g) * ratio),
    b: Math.round(milk.b + (matchaGreen.b - milk.b) * ratio),
  };
  const bgColor = `rgb(${color.r}, ${color.g}, ${color.b})`;

  const drinkName = concentration > 80 ? 'Koicha (Thick)' : concentration > 50 ? 'Usucha (Thin)' : concentration > 25 ? 'Matcha Latte' : 'Matcha Milk';

  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-md mx-auto px-4">
        <div className="text-center mb-6">
          <p className="text-matcha-accent text-xs uppercase tracking-wider mb-1">Try It</p>
          <h3 className="font-display text-2xl text-matcha-fg">Mix Your Matcha</h3>
        </div>

        <Card className="text-center">
          {/* Cup preview */}
          <div className="relative w-32 h-32 mx-auto mb-6">
            <svg viewBox="0 0 120 120" className="w-full h-full">
              {/* Cup */}
              <path d="M25 40 C25 40 30 95 60 95 C90 95 95 40 95 40" stroke="currentColor" strokeWidth="1.5" className="text-matcha-fg/40" fill="none"/>
              <ellipse cx="60" cy="40" rx="35" ry="8" stroke="currentColor" strokeWidth="1.5" className="text-matcha-fg/40" fill="none"/>
              {/* Liquid */}
              <motion.ellipse
                cx="60" cy="42" rx="30" ry="6"
                animate={{ fill: bgColor }}
                transition={{ duration: 0.3 }}
              />
              {/* Steam if hot */}
              {temperature > 60 && (
                <>
                  <motion.path d="M50 30 C50 24 53 18 50 12" stroke="currentColor" strokeWidth="0.7" className="text-matcha-fg/15" animate={{ opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 2, repeat: Infinity }}/>
                  <motion.path d="M60 28 C60 22 63 16 60 10" stroke="currentColor" strokeWidth="0.7" className="text-matcha-fg/15" animate={{ opacity: [0.15, 0.35, 0.15] }} transition={{ duration: 2, delay: 0.5, repeat: Infinity }}/>
                  <motion.path d="M70 30 C70 24 73 18 70 12" stroke="currentColor" strokeWidth="0.7" className="text-matcha-fg/15" animate={{ opacity: [0.1, 0.25, 0.1] }} transition={{ duration: 2, delay: 1, repeat: Infinity }}/>
                </>
              )}
            </svg>
          </div>

          {/* Drink name */}
          <motion.p key={drinkName} className="font-display text-lg text-matcha-fg mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {drinkName}
          </motion.p>

          {/* Sliders */}
          <div className="space-y-4 text-left">
            <div>
              <div className="flex justify-between text-[10px] text-matcha-fg-muted mb-1">
                <span>Milk</span>
                <span>Matcha: {concentration}%</span>
                <span>Pure</span>
              </div>
              <input type="range" min={5} max={100} value={concentration} onChange={e => setConcentration(Number(e.target.value))} className="w-full accent-[#6b7f5e] h-1.5 rounded-full" />
            </div>
            <div>
              <div className="flex justify-between text-[10px] text-matcha-fg-muted mb-1">
                <span>Iced</span>
                <span>Temp: {temperature}°C</span>
                <span>Hot</span>
              </div>
              <input type="range" min={5} max={90} value={temperature} onChange={e => setTemperature(Number(e.target.value))} className="w-full accent-[#c75c2c] h-1.5 rounded-full" />
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
