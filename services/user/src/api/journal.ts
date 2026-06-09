import { createError } from '@matcha/shared-kernel';
import { Router, type Request, type Response } from 'express';
import { z } from 'zod';

const router = Router();

const journalEntrySchema = z.object({
  productId: z.string().uuid(),
  rating: z.number().int().min(1).max(5),
  umami: z.number().min(0).max(100),
  sweet: z.number().min(0).max(100),
  vegetal: z.number().min(0).max(100),
  body: z.number().min(0).max(100),
  notes: z.string().max(2000).optional(),
  brewMethod: z.string().optional(),
  photoUrl: z.string().url().optional(),
});

router.get('/', async (req: Request, res: Response) => {
  // TODO: Fetch user's journal entries, paginated, chronological
  res.json({ items: [], total: 0 });
});

router.post('/', async (req: Request, res: Response) => {
  const result = journalEntrySchema.safeParse(req.body);
  if (!result.success) {
    const error = createError('VALIDATION_FAILED', { detail: 'Invalid journal entry' });
    res.status(error.status).json(error.toJSON());
    return;
  }
  // TODO: Create entry, emit JournalEntryCreated event
  res.status(201).json({ id: 'placeholder', ...result.data });
});

router.get('/evolution', async (req: Request, res: Response) => {
  // TODO: Return taste evolution chart data (5+ entries required)
  res.json({ dataPoints: [], hasSufficientData: false });
});

export { router as journalRoutes };
