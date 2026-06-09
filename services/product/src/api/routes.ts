import { Router, type Request, type Response } from 'express';
import { z } from 'zod';

import { createError } from '@matcha/shared-kernel';

const router = Router();

const listQuerySchema = z.object({
  grade: z.enum(['CEREMONIAL', 'PREMIUM', 'CULINARY']).optional(),
  origin: z.string().optional(),
  cultivar: z.string().optional(),
  minPrice: z.coerce.number().min(0).optional(),
  maxPrice: z.coerce.number().min(0).optional(),
  search: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
  sort: z.enum(['price_asc', 'price_desc', 'name', 'newest']).default('newest'),
});

/**
 * GET /products — List products with faceted filtering.
 */
router.get('/', async (req: Request, res: Response) => {
  const result = listQuerySchema.safeParse(req.query);
  if (!result.success) {
    const error = createError('VALIDATION_FAILED', {
      detail: 'Invalid query parameters',
      errors: result.error.issues.map((i) => ({
        field: i.path.join('.'),
        code: i.code,
        message: i.message,
      })),
    });
    res.status(error.status).json(error.toJSON());
    return;
  }

  // TODO: Query database with filters and pagination
  // TODO: Return paginated results with facet counts

  res.json({
    items: [],
    total: 0,
    page: result.data.page,
    pageSize: result.data.pageSize,
    totalPages: 0,
    hasNext: false,
    hasPrevious: false,
    facets: {
      grades: { CEREMONIAL: 0, PREMIUM: 0, CULINARY: 0 },
      origins: {},
    },
  });
});

/**
 * GET /products/:id — Get product details with full provenance.
 */
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  // TODO: Query database for product + variants + flavor profile + images
  // TODO: Include contextual educational links

  res.json({
    id,
    name: 'Placeholder',
    // Full product details
  });
});

/**
 * GET /products/:id/variants — Get variant matrix for configuration wizard.
 */
router.get('/:id/variants', async (req: Request, res: Response) => {
  const { id } = req.params;

  // TODO: Return variant matrix with pricing per combination
  // TODO: Include stock per variant

  res.json({
    productId: id,
    dimensions: {
      grind: ['FINE', 'STANDARD'],
      weight: [30, 50, 100],
      packaging: ['POUCH', 'TIN', 'GIFT_BOX'],
    },
    variants: [],
  });
});

/**
 * POST /products/compare — Compare up to 4 products side-by-side.
 */
router.post('/compare', async (req: Request, res: Response) => {
  const { productIds } = req.body as { productIds: string[] };

  if (!productIds || productIds.length < 2 || productIds.length > 4) {
    const error = createError('VALIDATION_FAILED', {
      detail: 'Compare requires 2-4 product IDs',
    });
    res.status(error.status).json(error.toJSON());
    return;
  }

  // TODO: Fetch all products, return comparison data

  res.json({ products: [] });
});

/**
 * GET /products/search — Full-text search via Algolia (or fallback).
 */
router.get('/search/autocomplete', async (req: Request, res: Response) => {
  const query = req.query.q as string;

  if (!query || query.length < 2) {
    res.json({ suggestions: [] });
    return;
  }

  // TODO: Query Algolia for autocomplete suggestions
  // TODO: Return products, categories, and content matches

  res.json({
    suggestions: [],
    products: [],
    categories: [],
    content: [],
  });
});

export { router as productRoutes };
