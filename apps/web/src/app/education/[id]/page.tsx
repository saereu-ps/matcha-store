'use client';

import { Badge, Button, Card, FadeIn } from '@matcha/ui';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const GUIDES: Record<string, { title: string; difficulty: string; steps: { title: string; instruction: string; detail: string; timer?: number; temperature?: number; amount?: string }[] }> = {
  usucha: {
    title: 'Usucha — Thin Style',
    difficulty: 'Beginner',
    steps: [
      { title: 'Warm the bowl', instruction: 'Pour hot water into your chawan to warm it. Swirl and discard.', detail: 'This prevents the bowl from cooling your matcha too quickly.', temperature: 80 },
      { title: 'Sift the matcha', instruction: 'Sift 1.5-2g of matcha powder through a fine mesh strainer into the bowl.', detail: 'Sifting removes clumps and ensures a smooth consistency.', amount: '1.5-2g' },
      { title: 'Add water', instruction: 'Pour 70ml of water at 80°C over the matcha.', detail: 'Water that is too hot will make the matcha bitter. Let boiled water cool for 2-3 minutes.', temperature: 80, amount: '70ml' },
      { title: 'Whisk', instruction: 'Using your chasen, whisk vigorously in a W-motion until a fine foam forms on the surface.', detail: 'Keep the whisk tines just below the surface. Speed is key — whisk for about 15 seconds.', timer: 15 },
      { title: 'Enjoy', instruction: 'Your usucha is ready. The surface should have a fine, even layer of foam.', detail: 'Drink within 30 seconds for the best flavor. The matcha will settle if left too long.' },
    ],
  },
  koicha: {
    title: 'Koicha — Thick Style',
    difficulty: 'Advanced',
    steps: [
      { title: 'Warm the bowl', instruction: 'Pour hot water into your chawan, swirl, and discard.', detail: 'Essential for koicha — the thick paste cools quickly.', temperature: 80 },
      { title: 'Sift the matcha', instruction: 'Sift 3-4g of ceremonial-grade matcha into the bowl.', detail: 'Koicha requires double the amount of matcha compared to usucha. Only ceremonial grade is suitable.', amount: '3-4g' },
      { title: 'Add water (first pour)', instruction: 'Add 20ml of water at 80°C.', detail: 'Only a small amount — koicha is a thick paste, not a liquid.', temperature: 80, amount: '20ml' },
      { title: 'Knead', instruction: 'Using your chasen, slowly knead the matcha in circular motions. Do NOT whisk — this is a gentle kneading motion.', detail: 'The motion is slow and deliberate. You are creating a smooth, thick paste without foam.', timer: 30 },
      { title: 'Add water (second pour)', instruction: 'Add 10-20ml more water and continue kneading until smooth.', detail: 'The final consistency should be like thick paint — it should coat the chasen when lifted.', amount: '10-20ml', timer: 15 },
      { title: 'Serve', instruction: 'Rotate the bowl and present. Koicha is traditionally shared.', detail: 'The taste should be intensely umami and sweet with no bitterness. If bitter, the water was too hot or the grade too low.' },
    ],
  },
  latte: {
    title: 'Matcha Latte',
    difficulty: 'Beginner',
    steps: [
      { title: 'Sift matcha', instruction: 'Sift 2g of matcha into a small bowl or cup.', detail: 'Culinary or premium grade works well for lattes.', amount: '2g' },
      { title: 'Make matcha paste', instruction: 'Add 30ml hot water (80°C) and whisk until smooth paste forms.', detail: 'Creating a paste first prevents clumps in the milk.', temperature: 80, amount: '30ml', timer: 10 },
      { title: 'Heat milk', instruction: 'Heat 200ml of your preferred milk to 65°C. Froth if desired.', detail: 'Oat milk and whole milk work best. Over-heating makes it less sweet.', amount: '200ml', temperature: 65 },
      { title: 'Combine', instruction: 'Pour the frothed milk over the matcha paste. Stir gently.', detail: 'For iced: skip heating, pour cold milk over the paste, add ice.' },
    ],
  },
  'cold-brew': {
    title: 'Cold Brew Matcha',
    difficulty: 'Beginner',
    steps: [
      { title: 'Sift matcha', instruction: 'Sift 2g of matcha into a bottle or jar.', detail: 'Premium or culinary grade both work for cold brew.', amount: '2g' },
      { title: 'Add cold water', instruction: 'Add 300ml of cold filtered water.', detail: 'Cold water extracts less bitterness, resulting in a naturally sweeter taste.', amount: '300ml' },
      { title: 'Shake and wait', instruction: 'Shake vigorously for 10 seconds, then refrigerate for 4+ hours.', detail: 'The longer you wait, the smoother and more developed the flavor. Overnight is ideal.', timer: 10 },
    ],
  },
};

function Timer({ seconds, onComplete }: { seconds: number; onComplete: () => void }) {
  const [remaining, setRemaining] = useState(seconds);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && remaining > 0) {
      intervalRef.current = setInterval(() => {
        setRemaining(r => {
          if (r <= 1) {
            setIsRunning(false);
            onComplete();
            return 0;
          }
          return r - 1;
        });
      }, 1000);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isRunning, remaining, onComplete]);

  const reset = () => { setRemaining(seconds); setIsRunning(false); };
  const progress = 1 - remaining / seconds;

  return (
    <div className="flex flex-col items-center gap-3 my-4">
      {/* Circular progress */}
      <div className="relative w-24 h-24">
        <svg className="w-full h-full -rotate-90">
          <circle cx="48" cy="48" r="40" strokeWidth="3" stroke="currentColor" fill="none" className="text-matcha-border" />
          <motion.circle
            cx="48" cy="48" r="40" strokeWidth="3" stroke="currentColor" fill="none"
            className="text-matcha-accent"
            strokeDasharray={251}
            animate={{ strokeDashoffset: 251 * (1 - progress) }}
            transition={{ duration: 0.3 }}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-xl text-matcha-fg">{remaining}s</span>
        </div>
      </div>
      <div className="flex gap-2">
        {!isRunning ? (
          <Button size="sm" onClick={() => setIsRunning(true)}>{remaining === seconds ? 'Start' : 'Resume'}</Button>
        ) : (
          <Button size="sm" variant="secondary" onClick={() => setIsRunning(false)}>Pause</Button>
        )}
        <Button size="sm" variant="ghost" onClick={reset}>Reset</Button>
      </div>
    </div>
  );
}

export default function BrewingGuidePage({ params }: { params: { id: string } }) {
  const guide = GUIDES[params.id];
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  if (!guide) {
    return (
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-16 text-center">
        <h1 className="font-display text-3xl text-matcha-fg mb-4">Guide Not Found</h1>
        <Link href="/education"><Button variant="secondary">Back to Guides</Button></Link>
      </main>
    );
  }

  const step = guide.steps[currentStep];
  const isLast = currentStep === guide.steps.length - 1;

  const markComplete = () => {
    setCompletedSteps(s => new Set([...s, currentStep]));
  };

  const nextStep = () => {
    markComplete();
    if (!isLast) setCurrentStep(c => c + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(c => c - 1);
  };

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      {/* Header */}
      <FadeIn>
        <nav className="text-xs text-matcha-fg-muted mb-6">
          <Link href="/education" className="hover:text-matcha-accent">Learn</Link>
          <span className="mx-2">/</span>
          <span className="text-matcha-fg">{guide.title}</span>
        </nav>
        <div className="flex items-center gap-3 mb-8">
          <h1 className="font-display text-3xl sm:text-4xl text-matcha-fg">{guide.title}</h1>
          <Badge variant={guide.difficulty === 'Advanced' ? 'ceremonial' : 'premium'}>{guide.difficulty}</Badge>
        </div>
      </FadeIn>

      {/* Progress bar */}
      <div className="flex gap-1 mb-8">
        {guide.steps.map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors cursor-pointer ${
              completedSteps.has(i) ? 'bg-matcha-accent' : i === currentStep ? 'bg-matcha-accent/50' : 'bg-matcha-border'
            }`}
            onClick={() => setCurrentStep(i)}
          />
        ))}
      </div>

      {/* Current step */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
        >
          <Card className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-full bg-matcha-accent/10 text-matcha-accent flex items-center justify-center text-sm font-medium">
                {currentStep + 1}
              </span>
              <h2 className="font-display text-xl sm:text-2xl text-matcha-fg">{step.title}</h2>
            </div>

            <p className="text-matcha-fg text-sm sm:text-base mb-3 leading-relaxed">{step.instruction}</p>
            <p className="text-matcha-fg-muted text-xs sm:text-sm leading-relaxed">{step.detail}</p>

            {/* Info pills */}
            <div className="flex flex-wrap gap-2 mt-4">
              {step.temperature && (
                <span className="px-2 py-1 rounded text-xs bg-matcha-warm-subtle text-matcha-warm border border-matcha-warm/20">
                  {step.temperature}°C
                </span>
              )}
              {step.amount && (
                <span className="px-2 py-1 rounded text-xs bg-matcha-accent-subtle text-matcha-accent-dark border border-matcha-accent/20">
                  {step.amount}
                </span>
              )}
            </div>

            {/* Timer */}
            {step.timer && (
              <Timer seconds={step.timer} onComplete={markComplete} />
            )}
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button variant="ghost" size="sm" onClick={prevStep} disabled={currentStep === 0}>
          Previous
        </Button>
        <span className="text-matcha-fg-muted text-xs">
          {currentStep + 1} of {guide.steps.length}
        </span>
        {isLast ? (
          <Button size="sm" onClick={markComplete}>
            Complete
          </Button>
        ) : (
          <Button size="sm" onClick={nextStep}>
            Next Step
          </Button>
        )}
      </div>

      {/* Completion */}
      {completedSteps.size === guide.steps.length && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 text-center p-6 border border-matcha-accent/30 rounded-lg bg-matcha-accent-subtle"
        >
          <p className="font-display text-2xl text-matcha-fg mb-2">Well done</p>
          <p className="text-matcha-fg-muted text-sm mb-4">You have completed the {guide.title} guide.</p>
          <Link href="/education"><Button variant="secondary" size="sm">Back to Guides</Button></Link>
        </motion.div>
      )}
    </main>
  );
}
