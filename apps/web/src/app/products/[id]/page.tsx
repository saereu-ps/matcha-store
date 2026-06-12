'use client';

import { JapaneseFrame } from '@/components/japanese-frame';
import { ProductIllustration } from '@/components/product-illustration';
import { useCart } from '@/lib/cart';
import { useCurrency } from '@/lib/currency';
import { Badge, Button, Card, FadeIn } from '@matcha/ui';
import Link from 'next/link';
import { useState } from 'react';

const PRODUCTS: Record<string, { name: string; grade: string; origin: string; basePrice: number; cultivar: string; harvest: string; elevation: string; desc: string; flavor: number[] }> = {
  '1': { name: 'Uji Ceremonial Okumidori', grade: 'CEREMONIAL', origin: 'Uji, Kyoto', basePrice: 1490, cultivar: 'Okumidori', harvest: 'Spring 2026', elevation: '320m', desc: 'Our finest ceremonial-grade matcha from the misty hillsides of Uji. The Okumidori cultivar produces an exceptionally smooth cup with deep umami, subtle sweetness, and a creamy body.', flavor: [85, 70, 40, 75] },
  '2': { name: 'Kagoshima Premium Saemidori', grade: 'PREMIUM', origin: 'Kagoshima', basePrice: 990, cultivar: 'Saemidori', harvest: 'Spring 2026', elevation: '180m', desc: 'Sweet, mild premium matcha perfect for daily drinking. Versatile enough for traditional preparation and lattes.', flavor: [60, 80, 55, 50] },
  '3': { name: 'Nishio First Flush', grade: 'CEREMONIAL', origin: 'Nishio, Aichi', basePrice: 1890, cultivar: 'Samidori', harvest: 'April 2026', elevation: '90m', desc: 'Pristine first-flush matcha with intense umami and silky texture. A rare find from Nishio.', flavor: [90, 65, 30, 80] },
  '4': { name: 'Yame Mountain Blend', grade: 'PREMIUM', origin: 'Yame, Fukuoka', basePrice: 1190, cultivar: 'Mixed', harvest: 'Spring 2026', elevation: '450m', desc: 'Rich, full-bodied blend from the foggy mountains of Yame. Deep flavor with complex layers.', flavor: [70, 55, 60, 85] },
  '5': { name: 'Shizuoka Culinary Grade', grade: 'CULINARY', origin: 'Shizuoka', basePrice: 450, cultivar: 'Yabukita', harvest: 'Summer 2026', elevation: '200m', desc: 'Fresh, vegetal matcha designed for cooking and baking. Strong flavor holds up in recipes.', flavor: [40, 30, 80, 60] },
  '6': { name: 'Matcha Latte Blend', grade: 'CULINARY', origin: 'Kagoshima', basePrice: 590, cultivar: 'Blend', harvest: '2026', elevation: '150m', desc: 'Bold matcha formulated specifically for milk-based drinks. Smooth and creamy when mixed.', flavor: [50, 70, 40, 70] },
  '7': { name: 'Kagoshima Ceremonial Asahi', grade: 'CEREMONIAL', origin: 'Kagoshima', basePrice: 1690, cultivar: 'Asahi', harvest: 'Spring 2026', elevation: '220m', desc: 'Smooth, sweet ceremonial matcha with a lingering finish. The Asahi cultivar is prized for its natural sweetness.', flavor: [75, 85, 35, 65] },
  '9': { name: 'Uji Super Premium Gokou', grade: 'CEREMONIAL', origin: 'Uji, Kyoto', basePrice: 2890, cultivar: 'Gokou', harvest: 'April 2026', elevation: '380m', desc: 'Ultra-rich umami with lingering sweetness. Gokou cultivar produces an exceptionally creamy bowl.', flavor: [95, 80, 25, 90] },
};

const WEIGHT_PRICES: Record<string, number> = { '30g': 1, '50g': 1.5, '100g': 2.7 };
const GRIND_PRICES: Record<string, number> = { 'Fine': 1, 'Standard': 0.9 };

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = PRODUCTS[params.id] ?? PRODUCTS['1'];
  const { format } = useCurrency();
  const { addItem } = useCart();
  const [weight, setWeight] = useState('30g');
  const [grind, setGrind] = useState('Fine');

  const finalPrice = Math.round(product.basePrice * WEIGHT_PRICES[weight] * GRIND_PRICES[grind]);

  const handleAddToCart = () => {
    addItem({
      id: params.id,
      name: product.name,
      grade: product.grade,
      price: finalPrice,
      weight: `${weight} · ${grind}`,
    });
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
      <FadeIn>
        <nav className="text-xs text-matcha-fg-muted mb-6">
          <Link href="/products" className="hover:text-matcha-accent">Collection</Link>
          <span className="mx-2">→</span>
          <span className="text-matcha-fg">{product.name}</span>
        </nav>
      </FadeIn>

      <div className="grid md:grid-cols-2 gap-6 sm:gap-12">
        {/* Left — Illustration */}
        <FadeIn direction="left">
          <JapaneseFrame variant="gold">
            <div className="aspect-square bg-matcha-bg flex items-center justify-center p-8">
              <ProductIllustration productId={params.id} className="w-full h-full" />
            </div>
          </JapaneseFrame>
        </FadeIn>

        {/* Right — Info */}
        <FadeIn direction="right" delay={0.1}>
          <div className="flex flex-col">
            <Badge variant={product.grade === 'CEREMONIAL' ? 'ceremonial' : product.grade === 'PREMIUM' ? 'premium' : 'culinary'} className="self-start mb-3">
              {product.grade}
            </Badge>

            <h1 className="font-display text-2xl sm:text-4xl text-matcha-fg mb-2">{product.name}</h1>
            <p className="text-matcha-accent text-sm sm:text-base mb-4">{product.origin} · {product.harvest}</p>
            <p className="text-matcha-fg-muted text-xs sm:text-sm mb-6 leading-relaxed">{product.desc}</p>

            {/* Flavor Profile */}
            <div className="grid grid-cols-4 gap-3 mb-6">
              {['Umami', 'Sweet', 'Vegetal', 'Body'].map((label, i) => (
                <div key={label} className="text-center">
                  <div className="font-display text-xl text-matcha-accent">{product.flavor[i]}</div>
                  <div className="text-[10px] text-matcha-fg-muted">{label}</div>
                </div>
              ))}
            </div>

            {/* Provenance */}
            <Card hoverable={false} padding="sm" className="mb-6">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div><span className="text-matcha-fg-subtle">Origin:</span> <span className="text-matcha-fg">{product.origin}</span></div>
                <div><span className="text-matcha-fg-subtle">Cultivar:</span> <span className="text-matcha-fg">{product.cultivar}</span></div>
                <div><span className="text-matcha-fg-subtle">Harvest:</span> <span className="text-matcha-fg">{product.harvest}</span></div>
                <div><span className="text-matcha-fg-subtle">Elevation:</span> <span className="text-matcha-fg">{product.elevation}</span></div>
              </div>
            </Card>

            {/* Weight selector */}
            <div className="mb-4">
              <label className="text-xs text-matcha-fg-muted block mb-2">Weight</label>
              <div className="flex gap-2">
                {Object.keys(WEIGHT_PRICES).map(w => (
                  <button
                    key={w}
                    onClick={() => setWeight(w)}
                    className={`px-3 py-1.5 text-xs rounded-md transition-all ${
                      weight === w
                        ? 'bg-matcha-accent text-white'
                        : 'border border-matcha-border text-matcha-fg-muted hover:border-matcha-accent hover:text-matcha-accent'
                    }`}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>

            {/* Grind selector */}
            <div className="mb-6">
              <label className="text-xs text-matcha-fg-muted block mb-2">Grind</label>
              <div className="flex gap-2">
                {Object.keys(GRIND_PRICES).map(g => (
                  <button
                    key={g}
                    onClick={() => setGrind(g)}
                    className={`px-3 py-1.5 text-xs rounded-md transition-all ${
                      grind === g
                        ? 'bg-matcha-accent text-white'
                        : 'border border-matcha-border text-matcha-fg-muted hover:border-matcha-accent hover:text-matcha-accent'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-4">
              <span className="font-display text-2xl sm:text-3xl text-matcha-fg">{format(finalPrice)}</span>
              <Badge variant="tier">Save 10% with subscription</Badge>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3 bg-matcha-accent text-white text-sm font-medium rounded-lg hover:bg-matcha-accent-dark transition-colors"
              >
                Add to Cart
              </button>
              <Button variant="secondary" size="lg">Subscribe</Button>
            </div>

            <Link href="/education" className="mt-4 text-matcha-accent text-xs hover:underline">
              → Brewing guide for this matcha
            </Link>
          </div>
        </FadeIn>
      </div>
    </main>
  );
}
