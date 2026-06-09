'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

/**
 * Interactive matcha whisking game!
 * Move mouse in circles to "whisk" matcha — the faster you whisk, the frothier it gets.
 */
export function MatchaMixer() {
  const [frothLevel, setFrothLevel] = useState(0);
  const [isWhisking, setIsWhisking] = useState(false);
  const [lastAngle, setLastAngle] = useState(0);
  const [totalRotation, setTotalRotation] = useState(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isWhisking) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const angle = Math.atan2(e.clientY - cy, e.clientX - cx);
    const angleDeg = angle * (180 / Math.PI);

    const diff = Math.abs(angleDeg - lastAngle);
    if (diff > 5 && diff < 180) {
      setTotalRotation(t => t + diff);
      setFrothLevel(f => Math.min(100, f + diff * 0.05));
    }
    setLastAngle(angleDeg);
  };

  const getFrothMessage = () => {
    if (frothLevel === 0) return 'Hold and move in circles to whisk!';
    if (frothLevel < 30) return 'Keep going...';
    if (frothLevel < 60) return 'Nice technique.';
    if (frothLevel < 90) return 'Almost perfect froth.';
    return '抹茶の達人 — Master whisker.';
  };

  return (
    <div className="flex flex-col items-center">
      <motion.div
        className="relative w-40 h-40 rounded-full cursor-grab active:cursor-grabbing select-none"
        onMouseDown={() => setIsWhisking(true)}
        onMouseUp={() => setIsWhisking(false)}
        onMouseLeave={() => setIsWhisking(false)}
        onMouseMove={handleMouseMove}
      >
        {/* Bowl from above */}
        <svg viewBox="0 0 160 160" className="w-full h-full">
          {/* Outer bowl */}
          <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="2" className="text-matcha-fg/40" fill="none" />
          {/* Inner bowl */}
          <circle cx="80" cy="80" r="60" stroke="currentColor" strokeWidth="1" className="text-matcha-fg/20" fill="none" />
          {/* Matcha liquid */}
          <circle cx="80" cy="80" r="55" fill="currentColor" className="text-matcha-accent/20" />
          {/* Froth (more circles = more froth) */}
          {Array.from({ length: Math.floor(frothLevel / 5) }, (_, i) => (
            <motion.circle
              key={i}
              cx={80 + Math.cos(i * 0.8) * (20 + (i % 3) * 10)}
              cy={80 + Math.sin(i * 0.8) * (20 + (i % 3) * 10)}
              r={2 + Math.random() * 2}
              fill="currentColor"
              className="text-matcha-accent/30"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.02 }}
            />
          ))}
          {/* Whisk center */}
          <motion.circle
            cx="80" cy="80" r="4"
            fill="currentColor"
            className="text-[#b8956b]/60"
            animate={isWhisking ? { rotate: 360 } : {}}
            transition={{ duration: 0.5, repeat: Infinity, ease: 'linear' }}
          />
        </svg>
      </motion.div>

      {/* Froth meter */}
      <div className="w-32 mt-4">
        <div className="h-1.5 bg-matcha-bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-matcha-accent rounded-full"
            animate={{ width: `${frothLevel}%` }}
            transition={{ type: 'spring', stiffness: 100 }}
          />
        </div>
      </div>
      <p className="text-matcha-fg-muted text-xs mt-2 text-center">{getFrothMessage()}</p>
    </div>
  );
}
