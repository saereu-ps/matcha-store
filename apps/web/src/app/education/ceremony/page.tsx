'use client';

import { Button, Card, FadeIn } from '@matcha/ui';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useCallback, useRef, useState } from 'react';

type GamePhase = 'intro' | 'scoop' | 'pour' | 'whisk' | 'serve' | 'complete';

export default function CeremonyPage() {
  const [phase, setPhase] = useState<GamePhase>('intro');
  const [score, setScore] = useState(0);
  const [scoopCount, setScoopCount] = useState(0);
  const [waterLevel, setWaterLevel] = useState(0);
  const [froth, setFroth] = useState(0);
  const [whisking, setWhisking] = useState(false);
  const [lastAngle, setLastAngle] = useState(0);
  const [message, setMessage] = useState('');
  const whiskRef = useRef<HTMLDivElement>(null);

  const nextPhase = useCallback((next: GamePhase, points: number, msg: string) => {
    setScore(s => s + points);
    setMessage(msg);
    setTimeout(() => { setPhase(next); setMessage(''); }, 1500);
  }, []);

  // SCOOP — click to scoop matcha
  const handleScoop = () => {
    setScoopCount(c => {
      const next = c + 1;
      if (next >= 3) {
        nextPhase('pour', 20, 'Perfect amount');
      }
      return next;
    });
  };

  // POUR — hold button to pour water
  const handlePour = () => {
    setWaterLevel(w => {
      const next = Math.min(100, w + 2);
      if (next >= 70 && next <= 80) {
        // Perfect range
      }
      return next;
    });
  };

  const finishPour = () => {
    if (waterLevel >= 60 && waterLevel <= 85) {
      nextPhase('whisk', 30, waterLevel >= 68 && waterLevel <= 75 ? 'Perfect pour' : 'Good enough');
    } else if (waterLevel > 85) {
      setMessage('Too much water! Try again.');
      setWaterLevel(0);
    } else {
      setMessage('Need more water...');
    }
  };

  // WHISK — circular mouse motion
  const handleWhiskMove = (e: React.MouseEvent) => {
    if (!whisking || !whiskRef.current) return;
    const rect = whiskRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const angle = Math.atan2(e.clientY - cy, e.clientX - cx) * (180 / Math.PI);
    const diff = Math.abs(angle - lastAngle);
    if (diff > 3 && diff < 180) {
      setFroth(f => {
        const next = Math.min(100, f + diff * 0.08);
        if (next >= 100) {
          nextPhase('serve', 40, 'Beautiful froth');
          setWhisking(false);
        }
        return next;
      });
    }
    setLastAngle(angle);
  };

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <FadeIn>
        <nav className="text-xs text-matcha-fg-muted mb-4">
          <Link href="/education" className="hover:text-matcha-accent">Learn</Link>
          <span className="mx-2">/</span>
          <span className="text-matcha-fg">Tea Ceremony Game</span>
        </nav>
      </FadeIn>

      {/* Score */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-display text-2xl sm:text-3xl text-matcha-fg">Tea Ceremony</h1>
        <div className="text-right">
          <p className="text-matcha-accent font-display text-xl">{score}</p>
          <p className="text-matcha-fg-subtle text-[10px] uppercase tracking-wider">points</p>
        </div>
      </div>

      {/* Phase progress */}
      <div className="flex gap-1 mb-8">
        {['scoop', 'pour', 'whisk', 'serve'].map((p, i) => (
          <div key={p} className={`h-1 flex-1 rounded-full ${
            ['scoop', 'pour', 'whisk', 'serve'].indexOf(phase) > i || phase === 'complete'
              ? 'bg-matcha-accent'
              : phase === p ? 'bg-matcha-accent/50' : 'bg-matcha-border'
          }`} />
        ))}
      </div>

      {/* Message toast */}
      <AnimatePresence>
        {message && (
          <motion.div
            className="text-center mb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <span className="px-4 py-2 bg-matcha-accent/10 text-matcha-accent text-sm rounded-full border border-matcha-accent/20">
              {message}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Game area */}
      <Card className="min-h-[400px] sm:min-h-[450px] flex flex-col items-center justify-center relative overflow-hidden">

        {/* INTRO */}
        {phase === 'intro' && (
          <motion.div className="text-center px-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p className="font-display text-4xl sm:text-5xl text-matcha-fg mb-2">茶道</p>
            <p className="text-matcha-fg-muted text-sm mb-2">The Way of Tea</p>
            <p className="text-matcha-fg-subtle text-xs mb-8 max-w-sm mx-auto">
              Prepare matcha step by step. Scoop, pour, whisk, and serve — each action requires your hands.
            </p>
            <Button onClick={() => setPhase('scoop')}>Begin Ceremony</Button>
          </motion.div>
        )}

        {/* SCOOP */}
        {phase === 'scoop' && (
          <motion.div className="text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p className="text-matcha-fg-muted text-xs mb-2 uppercase tracking-wider">Step 1 — Scoop</p>
            <p className="text-matcha-fg text-sm mb-6">Tap to scoop matcha into the bowl ({scoopCount}/3)</p>

            {/* Natsume + scoop interaction */}
            <div className="relative w-48 h-48 mx-auto mb-4">
              {/* Tea caddy */}
              <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full">
                <ellipse cx="100" cy="140" rx="35" ry="8" stroke="currentColor" strokeWidth="1" className="text-matcha-fg/30" fill="none" />
                <path d="M65 140 L65 100 C65 90 80 85 100 85 C120 85 135 90 135 100 L135 140" stroke="currentColor" strokeWidth="1.2" className="text-matcha-fg/40" fill="none" />
                <ellipse cx="100" cy="100" rx="35" ry="8" stroke="currentColor" strokeWidth="1" className="text-matcha-fg/30" fill="none" />
                {/* Matcha inside (decreases with scoops) */}
                <ellipse cx="100" cy={105 + scoopCount * 5} rx={30 - scoopCount * 3} ry="5" fill="currentColor" className="text-matcha-accent/25" />
              </svg>

              {/* Tap target */}
              <motion.button
                className="absolute inset-0 rounded-full"
                onClick={handleScoop}
                whileTap={{ scale: 0.95 }}
              />

              {/* Scoop animation */}
              <AnimatePresence>
                {scoopCount > 0 && (
                  <motion.div
                    className="absolute top-1/4 right-1/4 w-3 h-3 rounded-full bg-matcha-accent/40"
                    initial={{ scale: 1.5, opacity: 1 }}
                    animate={{ scale: 0, opacity: 0, y: 30 }}
                    transition={{ duration: 0.5 }}
                    key={scoopCount}
                  />
                )}
              </AnimatePresence>
            </div>

            {/* Scoop indicator */}
            <div className="flex gap-2 justify-center">
              {[0, 1, 2].map(i => (
                <div key={i} className={`w-3 h-3 rounded-full border ${i < scoopCount ? 'bg-matcha-accent border-matcha-accent' : 'border-matcha-border'}`} />
              ))}
            </div>
          </motion.div>
        )}

        {/* POUR */}
        {phase === 'pour' && (
          <motion.div className="text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p className="text-matcha-fg-muted text-xs mb-2 uppercase tracking-wider">Step 2 — Pour</p>
            <p className="text-matcha-fg text-sm mb-6">Hold the button to pour water. Target: 70ml</p>

            {/* Bowl with water level */}
            <div className="relative w-48 h-36 mx-auto mb-6">
              <svg viewBox="0 0 200 140" className="w-full h-full">
                {/* Bowl */}
                <path d="M30 40 C30 40 40 120 100 120 C160 120 170 40 170 40" stroke="currentColor" strokeWidth="1.5" className="text-matcha-fg/50" fill="none" />
                <ellipse cx="100" cy="40" rx="70" ry="12" stroke="currentColor" strokeWidth="1.5" className="text-matcha-fg/50" fill="none" />
                {/* Water level */}
                <motion.rect
                  x="40" y={110 - waterLevel * 0.7} width="120" height={waterLevel * 0.7}
                  rx="30"
                  fill="currentColor" className="text-matcha-accent/20"
                  animate={{ height: waterLevel * 0.7, y: 110 - waterLevel * 0.7 }}
                />
                {/* Target zone indicator */}
                <rect x="35" y={110 - 75 * 0.7} width="2" height={(80 - 60) * 0.7} fill="currentColor" className="text-matcha-accent/40" />
                <text x="25" y={110 - 70 * 0.7} className="text-[6px]" fill="currentColor" style={{ fill: 'var(--matcha-accent)' }} opacity={0.5}>70</text>
              </svg>
              {/* Pouring stream */}
              {waterLevel > 0 && waterLevel < 100 && (
                <motion.div
                  className="absolute top-0 left-1/2 w-[2px] h-10 bg-gradient-to-b from-matcha-fg/20 to-transparent rounded-full"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 0.3, repeat: Infinity }}
                />
              )}
            </div>

            <p className="text-matcha-accent font-display text-lg mb-4">{waterLevel}ml</p>
            <div className="flex gap-3 justify-center">
              <button
                className="px-4 py-2 bg-matcha-accent text-white text-sm rounded-md font-medium active:scale-95 transition-transform select-none"
                onMouseDown={() => {
                  const interval = setInterval(() => {
                    setWaterLevel(w => Math.min(100, w + 2));
                  }, 50);
                  const up = () => { clearInterval(interval); document.removeEventListener('mouseup', up); };
                  document.addEventListener('mouseup', up);
                }}
                onTouchStart={(e) => {
                  e.preventDefault();
                  const interval = setInterval(() => {
                    setWaterLevel(w => Math.min(100, w + 2));
                  }, 50);
                  const up = () => { clearInterval(interval); document.removeEventListener('touchend', up); };
                  document.addEventListener('touchend', up);
                }}
              >
                Hold to Pour
              </button>
              <Button variant="secondary" size="sm" onClick={finishPour}>
                Done
              </Button>
            </div>
          </motion.div>
        )}

        {/* WHISK */}
        {phase === 'whisk' && (
          <motion.div className="text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p className="text-matcha-fg-muted text-xs mb-2 uppercase tracking-wider">Step 3 — Whisk</p>
            <p className="text-matcha-fg text-sm mb-6">Move your mouse/finger in circles to whisk</p>

            <div
              ref={whiskRef}
              className="relative w-48 h-48 mx-auto mb-4 cursor-grab active:cursor-grabbing"
              onMouseDown={() => setWhisking(true)}
              onMouseUp={() => setWhisking(false)}
              onMouseLeave={() => setWhisking(false)}
              onMouseMove={handleWhiskMove}
              onTouchStart={() => setWhisking(true)}
              onTouchEnd={() => setWhisking(false)}
              onTouchMove={(e) => {
                const touch = e.touches[0];
                handleWhiskMove({ clientX: touch.clientX, clientY: touch.clientY, currentTarget: e.currentTarget } as unknown as React.MouseEvent);
              }}
            >
              <svg viewBox="0 0 200 200" className="w-full h-full">
                {/* Bowl from above */}
                <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="1.5" className="text-matcha-fg/40" fill="none" />
                <circle cx="100" cy="100" r="70" fill="currentColor" className="text-matcha-accent/15" />
                {/* Froth bubbles */}
                {Array.from({ length: Math.floor(froth / 5) }, (_, i) => (
                  <motion.circle
                    key={i}
                    cx={100 + Math.cos(i * 1.2) * (15 + (i % 4) * 12)}
                    cy={100 + Math.sin(i * 1.2) * (15 + (i % 4) * 12)}
                    r={1.5 + (i % 3)}
                    fill="currentColor" className="text-matcha-accent/30"
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                  />
                ))}
                {/* Center whisk mark */}
                <motion.circle
                  cx="100" cy="100" r="5"
                  stroke="currentColor" strokeWidth="1" className="text-[#b8956b]/50" fill="none"
                  animate={whisking ? { rotate: 360 } : {}}
                  transition={{ duration: 0.3, repeat: Infinity, ease: 'linear' }}
                />
              </svg>
            </div>

            {/* Froth meter */}
            <div className="w-40 mx-auto">
              <div className="h-2 bg-matcha-bg-muted rounded-full overflow-hidden">
                <motion.div className="h-full bg-matcha-accent rounded-full" animate={{ width: `${froth}%` }} />
              </div>
              <p className="text-matcha-fg-subtle text-xs mt-1">{Math.round(froth)}% froth</p>
            </div>
          </motion.div>
        )}

        {/* SERVE */}
        {phase === 'serve' && (
          <motion.div className="text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p className="text-matcha-fg-muted text-xs mb-2 uppercase tracking-wider">Step 4 — Serve</p>
            <p className="text-matcha-fg text-sm mb-6">Tap the bowl to present it to your guest</p>

            <motion.button
              className="relative w-40 h-32 mx-auto block"
              onClick={() => nextPhase('complete', 10, 'Beautifully served')}
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95, rotate: 15, x: 30 }}
            >
              <svg viewBox="0 0 200 150" className="w-full h-full">
                <path d="M40 60 C40 60 50 120 100 120 C150 120 160 60 160 60" stroke="currentColor" strokeWidth="2" className="text-matcha-fg/60" fill="none" />
                <ellipse cx="100" cy="60" rx="60" ry="12" stroke="currentColor" strokeWidth="2" className="text-matcha-fg/60" fill="none" />
                <ellipse cx="100" cy="60" rx="52" ry="9" fill="currentColor" className="text-matcha-accent/25" />
                {/* Froth dots */}
                {Array.from({ length: 6 }, (_, i) => (
                  <circle key={i} cx={75 + i * 10} cy={58 + (i % 2) * 3} r="2" fill="currentColor" className="text-matcha-accent/30" />
                ))}
                {/* Steam */}
                <path d="M85 45 C85 38 88 32 85 25" stroke="currentColor" strokeWidth="0.7" className="text-matcha-fg/15" />
                <path d="M100 42 C100 35 103 28 100 20" stroke="currentColor" strokeWidth="0.7" className="text-matcha-fg/15" />
                <path d="M115 44 C115 37 118 30 115 23" stroke="currentColor" strokeWidth="0.7" className="text-matcha-fg/15" />
              </svg>
            </motion.button>
          </motion.div>
        )}

        {/* COMPLETE */}
        {phase === 'complete' && (
          <motion.div className="text-center px-4" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <p className="font-display text-4xl sm:text-5xl text-matcha-fg mb-2">御点前</p>
            <p className="text-matcha-accent text-sm mb-4">Ceremony complete</p>
            <p className="font-display text-3xl text-matcha-accent mb-2">{score} points</p>
            <p className="text-matcha-fg-muted text-xs mb-6">
              {score >= 90 ? 'Tea Master — flawless technique' :
               score >= 70 ? 'Well practiced — refinement comes with time' :
               'Keep practicing — the way of tea is a lifelong journey'}
            </p>
            <div className="flex gap-3 justify-center">
              <Button onClick={() => { setPhase('intro'); setScore(0); setScoopCount(0); setWaterLevel(0); setFroth(0); }}>
                Play Again
              </Button>
              <Link href="/education"><Button variant="secondary">Back</Button></Link>
            </div>
          </motion.div>
        )}
      </Card>
    </main>
  );
}
