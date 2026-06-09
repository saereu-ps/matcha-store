'use client';

import { useState, type ReactNode } from 'react';

import { useWebGLCapability } from '../hooks/use-webgl-capability.js';

interface CeremonyStep {
  id: string;
  label: string;
  timestamp: number; // seconds into animation
  description: string;
}

interface CeremonySceneProps {
  className?: string;
  fallbackVideoUrl?: string;
  onStepChange?: (step: CeremonyStep) => void;
}

const CEREMONY_STEPS: CeremonyStep[] = [
  { id: 'sift', label: 'Sift', timestamp: 0, description: 'Sift matcha through a fine mesh strainer' },
  { id: 'scoop', label: 'Scoop', timestamp: 5, description: 'Add 1-2g of sifted matcha to the chawan' },
  { id: 'water', label: 'Water', timestamp: 10, description: 'Pour 70ml of water at 80°C' },
  { id: 'whisk', label: 'Whisk', timestamp: 15, description: 'Whisk in a W-motion until frothy' },
  { id: 'serve', label: 'Serve', timestamp: 25, description: 'Present the chawan with the front facing the guest' },
];

/**
 * Interactive 3D Tea Ceremony Scene.
 *
 * Displays an animated sequence of traditional matcha preparation.
 * Falls back to video on devices without high WebGL capability.
 *
 * Full 3D implementation requires:
 * - Three.js scene with chawan, chasen, natsume, water particle effects
 * - Animation timeline synced to steps
 * - Camera lerp between step viewpoints
 * - Optional narration audio sync
 */
export function CeremonyScene({
  className,
  fallbackVideoUrl,
  onStepChange,
}: CeremonySceneProps): ReactNode {
  const { tier } = useWebGLCapability();
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleStepClick = (index: number): void => {
    setCurrentStep(index);
    onStepChange?.(CEREMONY_STEPS[index]);
  };

  // Use video fallback for low-tier and unsupported devices
  if (tier !== 'high') {
    return (
      <div className={className}>
        {fallbackVideoUrl ? (
          <video
            src={fallbackVideoUrl}
            className="w-full rounded-lg"
            controls
            playsInline
            preload="metadata"
          />
        ) : (
          <div className="w-full aspect-video bg-matcha-bg-subtle rounded-lg flex items-center justify-center">
            <p className="text-matcha-fg-muted">3D ceremony requires a device with WebGL2 support</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={className}>
      {/* 3D Scene placeholder — Canvas with ceremony models */}
      <div className="relative w-full aspect-video bg-matcha-bg-subtle rounded-lg overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-matcha-fg-muted text-sm">
            3D Tea Ceremony — {CEREMONY_STEPS[currentStep].description}
          </p>
        </div>

        {/* Controls overlay */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-3 py-1.5 bg-matcha-accent text-white rounded-md text-sm"
            type="button"
          >
            {isPlaying ? 'Pause' : 'Play Ceremony'}
          </button>

          {/* Step indicators */}
          <div className="flex gap-1 ml-auto">
            {CEREMONY_STEPS.map((step, i) => (
              <button
                key={step.id}
                onClick={() => handleStepClick(i)}
                className={`px-2 py-1 rounded text-xs transition-colors ${
                  i === currentStep
                    ? 'bg-matcha-accent text-white'
                    : 'bg-matcha-bg-muted text-matcha-fg-muted hover:bg-matcha-border'
                }`}
                type="button"
              >
                {step.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
