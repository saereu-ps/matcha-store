import { FlavorVector, Money, ProductId, SKU, type Grade } from '@matcha/shared-kernel';

export interface Product {
  id: ProductId;
  name: string;
  slug: string;
  description: string | null;
  grade: Grade;
  origin: string;
  cultivar: string | null;
  harvestDate: Date | null;
  elevation: number | null;
  processing: string | null;
  flavorProfile: FlavorVector | null;
  cuppingNotes: string | null;
  variants: ProductVariant[];
  categories: string[];
  images: ProductImage[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductVariant {
  id: string;
  sku: SKU;
  grind: 'FINE' | 'STANDARD';
  weight: number; // grams
  packaging: 'POUCH' | 'TIN' | 'GIFT_BOX';
  price: Money;
  stock: number;
  isActive: boolean;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string | null;
  sortOrder: number;
  is3D: boolean;
  modelUrl: string | null;
}

export interface ProductFilter {
  grade?: Grade;
  origin?: string;
  cultivar?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  search?: string;
}
