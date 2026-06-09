'use client';

import {
    ChasenIllustration,
    GiftSetIllustration,
    MatchaBowlIllustration,
    MatchaLatteIllustration,
    MatchaPowderIllustration,
    TeaLeafIllustration,
    TeapotIllustration,
} from './illustrations';

/**
 * Maps product IDs to their SVG line art illustration.
 * Returns the appropriate illustration component for each product.
 */
const illustrationMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  '1': MatchaBowlIllustration,    // Uji Ceremonial — traditional bowl
  '2': TeapotIllustration,        // Kagoshima Premium — teapot preparation
  '3': MatchaPowderIllustration,  // Nishio First Flush — fresh powder
  '4': TeaLeafIllustration,       // Yame Mountain — single leaf
  '5': MatchaPowderIllustration,  // Shizuoka Culinary — powder for cooking
  '6': MatchaLatteIllustration,   // Matcha Latte Blend — latte glass
  '7': ChasenIllustration,        // Kagoshima Ceremonial — whisk
  '8': GiftSetIllustration,       // Gift Set — box with items
};

interface ProductIllustrationProps {
  productId: string;
  className?: string;
}

export function ProductIllustration({ productId, className }: ProductIllustrationProps) {
  const Illustration = illustrationMap[productId] ?? MatchaBowlIllustration;

  return (
    <div className={`flex items-center justify-center bg-matcha-bg-subtle/50 ${className ?? ''}`}>
      <Illustration className="w-3/4 h-3/4" />
    </div>
  );
}
