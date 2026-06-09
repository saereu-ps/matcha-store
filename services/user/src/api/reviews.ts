import { createError } from '@matcha/shared-kernel';
import { Router, type Request, type Response } from 'express';
import { z } from 'zod';

const router = Router();

const reviewSchema = z.object({
  productId: z.string().uuid(),
  rating: z.number().int().min(1).max(5),
  title: z.string().max(100).optional(),
  body: z.string().min(10).max(5000),
  flavorTags: z.array(z.enum(['umami', 'sweet', 'vegetal', 'smooth', 'creamy', 'nutty', 'grassy'])),
  brewMethod: z.string().optional(),
  photoUrl: z.string().url().optional(),
});

router.get('/product/:productId', async (req: Request, res: Response) => {
  // TODO: Fetch reviews for product, paginated, filterable by rating/flavorTag
  res.json({ items: [], total: 0, averageRating: 0, flavorTagCounts: {} });
});

router.post('/', async (req: Request, res: Response) => {
  const result = reviewSchema.safeParse(req.body);
  if (!result.success) {
    const error = createError('VALIDATION_FAILED', { detail: 'Invalid review data' });
    res.status(error.status).json(error.toJSON());
    return;
  }
  // TODO: Verify purchase, create review (status: PENDING), emit ReviewPublished
  res.status(201).json({ id: 'placeholder', status: 'PENDING', ...result.data });
});

router.post('/:reviewId/helpful', async (req: Request, res: Response) => {
  // TODO: Increment helpful count
  res.json({ helpfulCount: 1 });
});

export { router as reviewRoutes };
