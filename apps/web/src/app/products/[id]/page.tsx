import { JapaneseFrame } from '@/components/japanese-frame';
import { ProductIllustration } from '@/components/product-illustration';
import { Badge, Button, Card, FadeIn } from '@matcha/ui';
import Link from 'next/link';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const productId = params.id;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      {/* Breadcrumb */}
      <FadeIn>
        <nav className="text-xs sm:text-sm text-matcha-fg-muted mb-6 sm:mb-8">
          <Link href="/products" className="hover:text-matcha-accent">Collection</Link>
          <span className="mx-2">→</span>
          <span className="text-matcha-fg">Uji Ceremonial Okumidori</span>
        </nav>
      </FadeIn>

      <div className="grid md:grid-cols-2 gap-6 sm:gap-12">
        {/* Left — Product Illustration */}
        <FadeIn direction="left">
          <JapaneseFrame variant="gold">
            <div className="aspect-square bg-matcha-bg flex items-center justify-center p-8">
              <ProductIllustration productId={productId} className="w-full h-full" />
            </div>
          </JapaneseFrame>
        </FadeIn>

        {/* Right — Product Info */}
        <FadeIn direction="right" delay={0.1}>
          <div className="flex flex-col">
            <Badge variant="ceremonial" className="self-start mb-3 sm:mb-4">CEREMONIAL</Badge>

            <h1 className="font-display text-3xl sm:text-4xl text-matcha-fg mb-2">Uji Ceremonial Okumidori</h1>
            <p className="text-matcha-accent text-base sm:text-lg mb-4 sm:mb-6">Uji, Kyoto · Spring 2026 First Flush</p>

            <p className="text-matcha-fg-muted text-sm sm:text-base mb-6 sm:mb-8 leading-relaxed">
              Our finest ceremonial-grade matcha from the misty hillsides of Uji. The Okumidori cultivar
              produces an exceptionally smooth cup with deep umami, subtle sweetness, and a creamy body.
              Stone-ground to preserve its vibrant emerald color and delicate flavor profile.
            </p>

            {/* Flavor Profile */}
            <div className="grid grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-display text-matcha-accent">85</div>
                <div className="text-[10px] sm:text-xs text-matcha-fg-muted">Umami</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-display text-matcha-accent">70</div>
                <div className="text-[10px] sm:text-xs text-matcha-fg-muted">Sweet</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-display text-matcha-accent">40</div>
                <div className="text-[10px] sm:text-xs text-matcha-fg-muted">Vegetal</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-display text-matcha-accent">75</div>
                <div className="text-[10px] sm:text-xs text-matcha-fg-muted">Body</div>
              </div>
            </div>

            {/* Provenance */}
            <Card hoverable={false} padding="sm" className="mb-4 sm:mb-6">
              <div className="grid grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm">
                <div><span className="text-matcha-fg-subtle">Origin:</span> <span className="text-matcha-fg">Uji, Kyoto</span></div>
                <div><span className="text-matcha-fg-subtle">Cultivar:</span> <span className="text-matcha-fg">Okumidori</span></div>
                <div><span className="text-matcha-fg-subtle">Harvest:</span> <span className="text-matcha-fg">Spring 2026</span></div>
                <div><span className="text-matcha-fg-subtle">Elevation:</span> <span className="text-matcha-fg">320m</span></div>
                <div><span className="text-matcha-fg-subtle">Processing:</span> <span className="text-matcha-fg">Stone-ground</span></div>
                <div><span className="text-matcha-fg-subtle">Best for:</span> <span className="text-matcha-fg">Usucha, Koicha</span></div>
              </div>
            </Card>

            {/* Configuration */}
            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              <div>
                <label className="text-xs sm:text-sm text-matcha-fg-muted block mb-2">Weight</label>
                <div className="flex gap-2">
                  <Button variant="primary" size="sm">30g</Button>
                  <Button variant="secondary" size="sm">50g</Button>
                  <Button variant="secondary" size="sm">100g</Button>
                </div>
              </div>
              <div>
                <label className="text-xs sm:text-sm text-matcha-fg-muted block mb-2">Grind</label>
                <div className="flex gap-2">
                  <Button variant="primary" size="sm">Fine</Button>
                  <Button variant="secondary" size="sm">Standard</Button>
                </div>
              </div>
            </div>

            {/* Price + Actions */}
            <div className="flex items-center gap-3 sm:gap-4 mb-4">
              <span className="font-display text-2xl sm:text-3xl text-matcha-fg">$42.00</span>
              <Badge variant="tier">Save 10% with subscription</Badge>
            </div>

            <div className="flex gap-3">
              <Button size="lg" className="flex-1">Add to Cart</Button>
              <Button variant="secondary" size="lg">Subscribe</Button>
            </div>

            <Link href="/education" className="mt-4 sm:mt-6 text-matcha-accent text-xs sm:text-sm hover:underline">
              → Brewing guide for this matcha
            </Link>
          </div>
        </FadeIn>
      </div>
    </main>
  );
}
