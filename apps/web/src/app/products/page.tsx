'use client';

import { JapaneseFrame } from '@/components/japanese-frame';
import { useCart } from '@/lib/cart';
import { ProductIllustration } from '@/components/product-illustration';
import { useCurrency } from '@/lib/currency';
import { Badge, Card, FadeIn } from '@matcha/ui';
import Link from 'next/link';
import { useState } from 'react';

type Grade = 'CEREMONIAL' | 'PREMIUM' | 'CULINARY';
type Stock = 'in-stock' | 'low-stock' | 'out-of-stock';

interface Product {
  id: string;
  name: string;
  grade: Grade;
  origin: string;
  price: number;
  weight: string;
  flavor: string;
  stock: Stock;
  cultivar?: string;
}

const PRODUCTS: Product[] = [
  // CEREMONIAL — High-end
  { id: '1', name: 'Uji Ceremonial Okumidori', grade: 'CEREMONIAL', origin: 'Uji, Kyoto', price: 1490, weight: '30g', flavor: 'Deep umami, creamy', stock: 'in-stock', cultivar: 'Okumidori' },
  { id: '3', name: 'Nishio First Flush', grade: 'CEREMONIAL', origin: 'Nishio, Aichi', price: 1890, weight: '30g', flavor: 'Intense umami, silky', stock: 'in-stock', cultivar: 'Samidori' },
  { id: '7', name: 'Kagoshima Ceremonial Asahi', grade: 'CEREMONIAL', origin: 'Kagoshima', price: 1690, weight: '30g', flavor: 'Smooth, sweet finish', stock: 'out-of-stock', cultivar: 'Asahi' },
  { id: '9', name: 'Uji Super Premium Gokou', grade: 'CEREMONIAL', origin: 'Uji, Kyoto', price: 2890, weight: '20g', flavor: 'Ultra-rich umami, lingering sweetness', stock: 'in-stock', cultivar: 'Gokou' },
  { id: '10', name: 'Yame Dento Hon Gyokuro Matcha', grade: 'CEREMONIAL', origin: 'Yame, Fukuoka', price: 3490, weight: '20g', flavor: 'Exceptional depth, complex layers', stock: 'low-stock', cultivar: 'Saemidori' },
  { id: '11', name: 'Uji Competition Grade', grade: 'CEREMONIAL', origin: 'Uji, Kyoto', price: 5990, weight: '20g', flavor: 'Award-winning, transcendent umami', stock: 'low-stock', cultivar: 'Samidori' },
  { id: '12', name: 'Nishio Ceremonial Blend', grade: 'CEREMONIAL', origin: 'Nishio, Aichi', price: 1290, weight: '30g', flavor: 'Balanced, everyday ceremony', stock: 'in-stock' },
  { id: '13', name: 'Kagoshima Spring Harvest', grade: 'CEREMONIAL', origin: 'Kagoshima', price: 1590, weight: '30g', flavor: 'Bright, fresh, grassy', stock: 'in-stock', cultivar: 'Yabukita' },

  // PREMIUM — Mid-range
  { id: '2', name: 'Kagoshima Premium Saemidori', grade: 'PREMIUM', origin: 'Kagoshima', price: 990, weight: '30g', flavor: 'Sweet, mild, versatile', stock: 'low-stock', cultivar: 'Saemidori' },
  { id: '4', name: 'Yame Mountain Blend', grade: 'PREMIUM', origin: 'Yame, Fukuoka', price: 1190, weight: '50g', flavor: 'Rich, full-bodied', stock: 'out-of-stock' },
  { id: '14', name: 'Shizuoka Premium Yabukita', grade: 'PREMIUM', origin: 'Shizuoka', price: 890, weight: '30g', flavor: 'Clean, vegetal, refreshing', stock: 'in-stock', cultivar: 'Yabukita' },
  { id: '15', name: 'Uji Daily Premium', grade: 'PREMIUM', origin: 'Uji, Kyoto', price: 1090, weight: '50g', flavor: 'Smooth umami for daily use', stock: 'in-stock' },
  { id: '16', name: 'Kagoshima Organic Premium', grade: 'PREMIUM', origin: 'Kagoshima', price: 1290, weight: '30g', flavor: 'Organic certified, mild sweetness', stock: 'in-stock' },
  { id: '17', name: 'Nishio Premium Autumn', grade: 'PREMIUM', origin: 'Nishio, Aichi', price: 790, weight: '50g', flavor: 'Deeper, more roasted notes', stock: 'in-stock' },
  { id: '8', name: 'Gift Set — Ceremony Essentials', grade: 'PREMIUM', origin: 'Mixed', price: 2990, weight: 'Set', flavor: 'Matcha 30g + chasen + chawan + chashaku', stock: 'in-stock' },

  // CULINARY — Affordable
  { id: '5', name: 'Shizuoka Culinary Grade', grade: 'CULINARY', origin: 'Shizuoka', price: 450, weight: '100g', flavor: 'Fresh, vegetal, for cooking', stock: 'in-stock' },
  { id: '6', name: 'Matcha Latte Blend', grade: 'CULINARY', origin: 'Kagoshima', price: 590, weight: '100g', flavor: 'Bold, designed for milk drinks', stock: 'in-stock' },
  { id: '18', name: 'Culinary Baking Grade', grade: 'CULINARY', origin: 'Shizuoka', price: 350, weight: '100g', flavor: 'Strong flavor for baking', stock: 'in-stock' },
  { id: '19', name: 'Iced Matcha Blend', grade: 'CULINARY', origin: 'Kagoshima', price: 490, weight: '80g', flavor: 'Optimized for cold drinks', stock: 'in-stock' },
  { id: '20', name: 'Smoothie Matcha Powder', grade: 'CULINARY', origin: 'Shizuoka', price: 390, weight: '100g', flavor: 'Fine grind for blending', stock: 'low-stock' },
  { id: '21', name: 'Kagoshima Culinary Value Pack', grade: 'CULINARY', origin: 'Kagoshima', price: 890, weight: '200g', flavor: 'Best value, daily latte', stock: 'in-stock' },
];

// Price is stored in THB, formatted by useCurrency hook

export default function ProductsPage() {
  const [activeGrade, setActiveGrade] = useState<Grade | 'ALL'>('ALL');
  const [sortBy, setSortBy] = useState<'default' | 'price-low' | 'price-high'>('default');
  const { format } = useCurrency();
  const { addItem } = useCart();

  let filtered = activeGrade === 'ALL' ? PRODUCTS : PRODUCTS.filter(p => p.grade === activeGrade);

  if (sortBy === 'price-low') filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sortBy === 'price-high') filtered = [...filtered].sort((a, b) => b.price - a.price);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <FadeIn>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-matcha-fg mb-4">Our Collection</h1>
        <p className="text-matcha-fg-muted text-base sm:text-lg mb-8 sm:mb-10 max-w-2xl">
          Single-origin, stone-ground matcha from Japan&apos;s finest terroir. {PRODUCTS.length} products available.
        </p>
      </FadeIn>

      {/* Filters — working! */}
      <FadeIn delay={0.1}>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
          {(['ALL', 'CEREMONIAL', 'PREMIUM', 'CULINARY'] as const).map((grade) => (
            <button
              key={grade}
              onClick={() => setActiveGrade(grade)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-sm text-xs sm:text-sm font-medium transition-all ${
                activeGrade === grade
                  ? 'bg-matcha-accent text-white'
                  : 'bg-matcha-bg-muted text-matcha-fg-muted hover:text-matcha-fg border border-matcha-border'
              }`}
            >
              {grade === 'ALL' ? 'All' : grade.charAt(0) + grade.slice(1).toLowerCase()}
              <span className="ml-1 opacity-60">
                ({grade === 'ALL' ? PRODUCTS.length : PRODUCTS.filter(p => p.grade === grade).length})
              </span>
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2 mb-8">
          <span className="text-matcha-fg-subtle text-[10px] sm:text-xs">Sort:</span>
          <div className="flex gap-1">
            {[
              { value: 'default', label: 'Recommended' },
              { value: 'price-low', label: 'Price ↑' },
              { value: 'price-high', label: 'Price ↓' },
            ].map(opt => (
              <button
                key={opt.value}
                onClick={() => setSortBy(opt.value as typeof sortBy)}
                className={`px-2.5 py-1 text-[10px] sm:text-xs rounded-full transition-all ${
                  sortBy === opt.value
                    ? 'bg-matcha-fg text-matcha-bg font-medium'
                    : 'text-matcha-fg-muted hover:text-matcha-fg border border-matcha-border/60 hover:border-matcha-fg/30'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <span className="text-matcha-fg-subtle text-[10px] sm:text-xs ml-auto">{filtered.length} products</span>
        </div>
      </FadeIn>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
        {filtered.map((product, i) => (
          <FadeIn key={product.id} delay={Math.min(i * 0.03, 0.3)}>
            <Link href={`/products/${product.id}`}>
              <Card className={`flex flex-col h-full group ${product.stock === 'out-of-stock' ? 'opacity-55' : ''}`}>
                <JapaneseFrame variant="ink" className="mb-2 sm:mb-3">
                  <div className="aspect-square overflow-hidden relative">
                    <ProductIllustration productId={product.id} className="absolute inset-0" />
                    {product.stock === 'out-of-stock' && (
                      <div className="absolute inset-0 bg-matcha-bg/60 flex items-center justify-center">
                        <span className="text-matcha-fg/70 text-[10px] sm:text-xs font-medium tracking-wider uppercase px-2 py-0.5 border border-matcha-fg/20 rounded-sm bg-matcha-bg/80">
                          Sold Out
                        </span>
                      </div>
                    )}
                  </div>
                </JapaneseFrame>

                <div className="flex items-center gap-1.5 mb-1">
                  <Badge variant={product.grade === 'CEREMONIAL' ? 'ceremonial' : product.grade === 'PREMIUM' ? 'premium' : 'culinary'}>
                    {product.grade}
                  </Badge>
                  {product.stock === 'low-stock' && (
                    <span className="text-[9px] sm:text-[10px] text-matcha-warm font-medium">Low stock</span>
                  )}
                </div>

                <h3 className="font-medium text-matcha-fg text-[11px] sm:text-sm mb-0.5 line-clamp-2 group-hover:text-matcha-accent transition-colors">{product.name}</h3>
                <p className="text-matcha-fg-subtle text-[9px] sm:text-xs mb-0.5">{product.origin} · {product.weight}</p>
                <p className="text-matcha-fg-muted text-[9px] sm:text-xs mb-2 hidden sm:block line-clamp-1">{product.flavor}</p>

                <div className="mt-auto flex items-center justify-between">
                  <span className={`font-display text-sm sm:text-base ${product.stock === 'out-of-stock' ? 'text-matcha-fg-subtle line-through' : 'text-matcha-fg'}`}>
                    {format(product.price)}
                  </span>
                  {product.stock === 'out-of-stock' ? (
                    <span className="text-[9px] sm:text-[10px] text-matcha-fg-subtle border border-matcha-border px-1.5 py-0.5 rounded-sm">Notify</span>
                  ) : (
                    <button
                      onClick={(e) => { e.preventDefault(); addItem({ id: product.id, name: product.name, grade: product.grade, price: product.price, weight: product.weight }); }}
                      className="text-[10px] sm:text-xs px-2 py-1 bg-matcha-accent text-white rounded-sm hover:bg-matcha-accent-dark transition-colors"
                    >
                      + Add
                    </button>
                  )}
                </div>
              </Card>
            </Link>
          </FadeIn>
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-matcha-fg-muted">No products match this filter.</p>
        </div>
      )}
    </main>
  );
}
