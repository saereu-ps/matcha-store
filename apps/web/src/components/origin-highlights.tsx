'use client';

import { Card } from '@matcha/ui';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { OriginKagoshimaIllustration } from './illustrations/origin-kagoshima';
import { OriginNishioIllustration } from './illustrations/origin-nishio';
import { OriginUjiIllustration } from './illustrations/origin-uji';
import { OriginYameIllustration } from './illustrations/origin-yame';
import { JapaneseFrame } from './japanese-frame';

const REGIONS = [
  { id: 'uji', name: 'Uji, Kyoto', signature: 'Deep umami, creamy', elevation: '200-400m', products: 12, Illustration: OriginUjiIllustration },
  { id: 'nishio', name: 'Nishio, Aichi', signature: 'Mild, sweet', elevation: '50-100m', products: 8, Illustration: OriginNishioIllustration },
  { id: 'kagoshima', name: 'Kagoshima', signature: 'Bold, vegetal', elevation: '100-300m', products: 6, Illustration: OriginKagoshimaIllustration },
  { id: 'yame', name: 'Yame, Fukuoka', signature: 'Rich, full-bodied', elevation: '200-500m', products: 5, Illustration: OriginYameIllustration },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export function OriginHighlights() {
  return (
    <motion.div
      className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {REGIONS.map((region) => (
        <motion.div key={region.id} variants={cardVariants}>
          <Link href={`/products?origin=${region.id}`}>
            <Card className="h-full p-0 overflow-hidden group">
              <JapaneseFrame variant="minimal">
                <div className="relative h-28 sm:h-36 bg-matcha-bg flex items-center justify-center">
                  <region.Illustration className="w-full h-full" />
                </div>
              </JapaneseFrame>
              <div className="p-3 sm:p-4">
                <h3 className="font-medium text-matcha-fg text-sm mb-0.5">{region.name}</h3>
                <p className="text-matcha-accent text-xs mb-1">{region.signature}</p>
                <p className="text-matcha-fg-subtle text-[10px] sm:text-xs">
                  {region.elevation} · {region.products} products
                </p>
              </div>
            </Card>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
