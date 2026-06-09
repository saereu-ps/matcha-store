'use client';

import { ProductIllustration } from '@/components/product-illustration';
import { useCurrency } from '@/lib/currency';
import { Badge, Button, Card, FadeIn } from '@matcha/ui';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

// Questions designed to determine taste preferences and recommend real products
const QUESTIONS = [
  {
    id: 'experience',
    question: 'Your matcha experience level?',
    options: [
      { label: 'Just starting out', value: 'beginner', icon: '新' },
      { label: 'I drink it sometimes', value: 'casual', icon: '慣' },
      { label: 'Daily drinker', value: 'regular', icon: '日' },
      { label: 'Connoisseur', value: 'expert', icon: '匠' },
    ],
  },
  {
    id: 'preparation',
    question: 'How will you prepare it?',
    options: [
      { label: 'Traditional whisking (usucha)', value: 'traditional', icon: '茶' },
      { label: 'Matcha latte with milk', value: 'latte', icon: '乳' },
      { label: 'Smoothies & cold drinks', value: 'cold', icon: '冷' },
      { label: 'Baking & cooking', value: 'cooking', icon: '菓' },
    ],
  },
  {
    id: 'taste',
    question: 'Your flavor preference?',
    options: [
      { label: 'Rich umami & savory', value: 'umami', icon: '旨' },
      { label: 'Sweet & creamy', value: 'sweet', icon: '甘' },
      { label: 'Fresh & vegetal', value: 'vegetal', icon: '青' },
      { label: 'Bold & strong', value: 'bold', icon: '濃' },
    ],
  },
  {
    id: 'budget',
    question: 'Your budget range?',
    options: [
      { label: 'Value — best price per gram', value: 'budget', icon: '安' },
      { label: 'Mid-range — quality daily use', value: 'mid', icon: '中' },
      { label: 'Premium — special occasions', value: 'premium', icon: '上' },
      { label: 'No limit — only the finest', value: 'luxury', icon: '極' },
    ],
  },
  {
    id: 'origin',
    question: 'Preferred origin? (or let us decide)',
    options: [
      { label: 'Uji, Kyoto — classic tradition', value: 'uji', icon: '宇' },
      { label: 'Kagoshima — vibrant & sweet', value: 'kagoshima', icon: '鹿' },
      { label: 'Nishio — delicate & refined', value: 'nishio', icon: '西' },
      { label: 'Surprise me', value: 'any', icon: '運' },
    ],
  },
];

// Product catalog with matching criteria
const CATALOG = [
  { id: '1', name: 'Uji Ceremonial Okumidori', grade: 'Ceremonial', price: 1490, origin: 'Uji, Kyoto', match: { experience: ['regular', 'expert'], preparation: ['traditional'], taste: ['umami', 'sweet'], budget: ['premium', 'luxury'], origin: ['uji', 'any'] } },
  { id: '3', name: 'Nishio First Flush', grade: 'Ceremonial', price: 1890, origin: 'Nishio, Aichi', match: { experience: ['regular', 'expert'], preparation: ['traditional'], taste: ['umami'], budget: ['premium', 'luxury'], origin: ['nishio', 'any'] } },
  { id: '9', name: 'Uji Super Premium Gokou', grade: 'Ceremonial', price: 2890, origin: 'Uji, Kyoto', match: { experience: ['expert'], preparation: ['traditional'], taste: ['umami', 'sweet'], budget: ['luxury'], origin: ['uji', 'any'] } },
  { id: '11', name: 'Uji Competition Grade', grade: 'Ceremonial', price: 5990, origin: 'Uji, Kyoto', match: { experience: ['expert'], preparation: ['traditional'], taste: ['umami'], budget: ['luxury'], origin: ['uji', 'any'] } },
  { id: '13', name: 'Kagoshima Spring Harvest', grade: 'Ceremonial', price: 1590, origin: 'Kagoshima', match: { experience: ['casual', 'regular'], preparation: ['traditional'], taste: ['vegetal', 'sweet'], budget: ['premium', 'mid'], origin: ['kagoshima', 'any'] } },
  { id: '12', name: 'Nishio Ceremonial Blend', grade: 'Ceremonial', price: 1290, origin: 'Nishio, Aichi', match: { experience: ['beginner', 'casual'], preparation: ['traditional'], taste: ['sweet', 'umami'], budget: ['mid', 'premium'], origin: ['nishio', 'any'] } },
  { id: '2', name: 'Kagoshima Premium Saemidori', grade: 'Premium', price: 990, origin: 'Kagoshima', match: { experience: ['beginner', 'casual', 'regular'], preparation: ['traditional', 'latte'], taste: ['sweet', 'umami'], budget: ['mid'], origin: ['kagoshima', 'any'] } },
  { id: '15', name: 'Uji Daily Premium', grade: 'Premium', price: 1090, origin: 'Uji, Kyoto', match: { experience: ['casual', 'regular'], preparation: ['traditional', 'latte'], taste: ['umami', 'sweet'], budget: ['mid'], origin: ['uji', 'any'] } },
  { id: '14', name: 'Shizuoka Premium Yabukita', grade: 'Premium', price: 890, origin: 'Shizuoka', match: { experience: ['beginner', 'casual'], preparation: ['traditional', 'latte', 'cold'], taste: ['vegetal'], budget: ['mid', 'budget'], origin: ['any'] } },
  { id: '6', name: 'Matcha Latte Blend', grade: 'Culinary', price: 590, origin: 'Kagoshima', match: { experience: ['beginner', 'casual'], preparation: ['latte', 'cold'], taste: ['bold', 'sweet'], budget: ['budget', 'mid'], origin: ['kagoshima', 'any'] } },
  { id: '19', name: 'Iced Matcha Blend', grade: 'Culinary', price: 490, origin: 'Kagoshima', match: { experience: ['beginner', 'casual'], preparation: ['cold'], taste: ['vegetal', 'sweet'], budget: ['budget'], origin: ['kagoshima', 'any'] } },
  { id: '18', name: 'Culinary Baking Grade', grade: 'Culinary', price: 350, origin: 'Shizuoka', match: { experience: ['beginner', 'casual'], preparation: ['cooking'], taste: ['bold', 'vegetal'], budget: ['budget'], origin: ['any'] } },
  { id: '21', name: 'Kagoshima Value Pack', grade: 'Culinary', price: 890, origin: 'Kagoshima', match: { experience: ['casual', 'regular'], preparation: ['latte', 'cold', 'cooking'], taste: ['bold'], budget: ['budget', 'mid'], origin: ['kagoshima', 'any'] } },
];

function getRecommendations(answers: Record<string, string>) {
  // Score each product based on how well it matches answers
  const scored = CATALOG.map(product => {
    let score = 0;
    if (product.match.experience.includes(answers.experience)) score += 3;
    if (product.match.preparation.includes(answers.preparation)) score += 4;
    if (product.match.taste.includes(answers.taste)) score += 3;
    if (product.match.budget.includes(answers.budget)) score += 2;
    if (product.match.origin.includes(answers.origin)) score += 2;
    return { ...product, score, maxScore: 14 };
  });

  // Sort by score, return top 3
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, 3);
}

export default function TasteQuizPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [completed, setCompleted] = useState(false);
  const { format } = useCurrency();

  const currentQ = QUESTIONS[step];

  const selectOption = (value: string) => {
    const newAnswers = { ...answers, [currentQ.id]: value };
    setAnswers(newAnswers);

    // Auto-advance after short delay
    setTimeout(() => {
      if (step < QUESTIONS.length - 1) {
        setStep(step + 1);
      } else {
        setCompleted(true);
      }
    }, 300);
  };

  const recommendations = completed ? getRecommendations(answers) : [];

  if (completed) {
    return (
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <FadeIn>
          <div className="text-center mb-10">
            <p className="font-display text-4xl sm:text-5xl text-matcha-fg mb-3">Your Matches</p>
            <p className="text-matcha-fg-muted text-sm">Based on your preferences, here are our top recommendations.</p>
          </div>
        </FadeIn>

        <div className="space-y-4 mb-10">
          {recommendations.map((product, i) => (
            <FadeIn key={product.id} delay={i * 0.15}>
              <Link href={`/products/${product.id}`}>
                <Card className="flex items-center gap-4 sm:gap-6 group hover:border-matcha-accent/30 transition-colors">
                  <div className="w-16 h-16 sm:w-24 sm:h-24 shrink-0 rounded-sm bg-matcha-bg-subtle overflow-hidden">
                    <ProductIllustration productId={product.id} className="w-full h-full" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {i === 0 && <span className="text-[10px] font-medium text-matcha-accent bg-matcha-accent/10 px-1.5 py-0.5 rounded-sm">Best Match</span>}
                      <Badge variant={product.grade === 'Ceremonial' ? 'ceremonial' : product.grade === 'Premium' ? 'premium' : 'culinary'}>
                        {product.grade}
                      </Badge>
                    </div>
                    <h3 className="font-medium text-matcha-fg text-sm sm:text-base group-hover:text-matcha-accent transition-colors">{product.name}</h3>
                    <p className="text-matcha-fg-subtle text-xs">{product.origin}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-display text-lg sm:text-xl text-matcha-fg">{format(product.price)}</p>
                    <p className="text-matcha-accent text-[10px] sm:text-xs font-medium">{Math.round((product.score / product.maxScore) * 100)}% match</p>
                  </div>
                </Card>
              </Link>
            </FadeIn>
          ))}
        </div>

        {/* Summary of choices */}
        <FadeIn delay={0.5}>
          <Card className="mb-8">
            <p className="text-matcha-fg-muted text-xs uppercase tracking-wider mb-3">Your Profile</p>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
              {QUESTIONS.map(q => (
                <div key={q.id} className="text-xs">
                  <p className="text-matcha-fg-subtle mb-0.5">{q.id}</p>
                  <p className="text-matcha-fg font-medium capitalize">{answers[q.id]}</p>
                </div>
              ))}
            </div>
          </Card>
        </FadeIn>

        <div className="flex gap-3 justify-center">
          <Button onClick={() => { setStep(0); setAnswers({}); setCompleted(false); }} variant="secondary">Retake Quiz</Button>
          <Link href="/products"><Button>View All Products</Button></Link>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      {/* Progress */}
      <div className="flex gap-1.5 mb-10">
        {QUESTIONS.map((_, i) => (
          <div key={i} className={`h-[3px] flex-1 rounded-full transition-all duration-300 ${i < step ? 'bg-matcha-accent' : i === step ? 'bg-matcha-accent/50' : 'bg-matcha-border'}`} />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.25 }}
        >
          {/* Question number */}
          <p className="text-matcha-fg-subtle text-xs mb-2">{step + 1} / {QUESTIONS.length}</p>

          {/* Question */}
          <h1 className="font-display text-2xl sm:text-3xl text-matcha-fg mb-8">{currentQ.question}</h1>

          {/* Options — card style */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentQ.options.map((opt) => {
              const selected = answers[currentQ.id] === opt.value;
              return (
                <motion.button
                  key={opt.value}
                  onClick={() => selectOption(opt.value)}
                  className={`text-left p-4 sm:p-5 rounded-lg border transition-all ${
                    selected
                      ? 'border-matcha-accent bg-matcha-accent/5 ring-1 ring-matcha-accent/30'
                      : 'border-matcha-border hover:border-matcha-accent/40 hover:bg-matcha-bg-subtle'
                  }`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-display text-2xl text-matcha-accent/60 w-8">{opt.icon}</span>
                    <span className={`text-sm ${selected ? 'text-matcha-accent font-medium' : 'text-matcha-fg'}`}>
                      {opt.label}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Back button */}
          {step > 0 && (
            <button
              onClick={() => setStep(step - 1)}
              className="mt-6 text-matcha-fg-muted text-xs hover:text-matcha-fg transition-colors"
            >
              ← Previous question
            </button>
          )}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
