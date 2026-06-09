'use client';

import { useCurrency } from '@/lib/currency';
import { Badge, Button, Card } from '@matcha/ui';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { JapaneseFrame } from './japanese-frame';
import { ProductIllustration } from './product-illustration';

const MOCK_PRODUCTS = [
  { id: '1', name: 'Uji Ceremonial Okumidori', grade: 'CEREMONIAL', origin: 'Uji, Kyoto', price: 1490 },
  { id: '2', name: 'Kagoshima Premium Saemidori', grade: 'PREMIUM', origin: 'Kagoshima', price: 990 },
  { id: '3', name: 'Nishio First Flush', grade: 'CEREMONIAL', origin: 'Nishio, Aichi', price: 1890 },
  { id: '4', name: 'Yame Mountain Blend', grade: 'PREMIUM', origin: 'Yame, Fukuoka', price: 1190 },
];

const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
const cardVariants = { hidden: { opacity: 0, y: 30, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } } };

export function FeaturedProducts() {
  const { format } = useCurrency();

  return (
    <motion.div
      className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      {MOCK_PRODUCTS.map((product) => (
        <motion.div key={product.id} variants={cardVariants}>
          <Link href={`/products/${product.id}`}>
            <motion.div className="group" whileHover={{ y: -8 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
              <Card className="flex flex-col h-full overflow-hidden">
                <JapaneseFrame variant="ink" className="mb-3 sm:mb-4">
                  <div className="aspect-square overflow-hidden relative">
                    <ProductIllustration productId={product.id} className="absolute inset-0" />
                  </div>
                </JapaneseFrame>
                <Badge variant={product.grade === 'CEREMONIAL' ? 'ceremonial' : 'premium'} className="self-start mb-1 sm:mb-2">
                  {product.grade}
                </Badge>
                <h3 className="font-medium text-matcha-fg text-xs sm:text-sm mb-0.5 group-hover:text-matcha-accent transition-colors line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-matcha-fg-subtle text-[10px] sm:text-xs mb-2 sm:mb-3">{product.origin}</p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="font-display text-sm sm:text-lg text-matcha-fg">{format(product.price)}</span>
                  <Button variant="ghost" size="sm" className="hidden sm:inline-flex">View</Button>
                </div>
              </Card>
            </motion.div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
