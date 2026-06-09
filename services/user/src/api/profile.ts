import { createError } from '@matcha/shared-kernel';
import { Router, type Request, type Response } from 'express';
import { z } from 'zod';

const router = Router();

const tasteProfileSchema = z.object({
  umami: z.number().min(0).max(100),
  sweet: z.number().min(0).max(100),
  vegetal: z.number().min(0).max(100),
  body: z.number().min(0).max(100),
  preferredGrade: z.enum(['CEREMONIAL', 'PREMIUM', 'CULINARY']).optional(),
  preferredOrigin: z.string().optional(),
  brewingPreference: z.enum(['usucha', 'koicha']).optional(),
});

router.get('/:userId', async (req: Request, res: Response) => {
  // TODO: Fetch user profile + taste profile from DB
  res.json({ id: req.params.userId, profile: null, tasteProfile: null });
});

router.put('/:userId/taste-profile', async (req: Request, res: Response) => {
  const result = tasteProfileSchema.safeParse(req.body);
  if (!result.success) {
    const error = createError('VALIDATION_FAILED', { detail: 'Invalid taste profile data' });
    res.status(error.status).json(error.toJSON());
    return;
  }
  // TODO: Upsert taste profile, emit TasteProfileUpdated event
  res.json({ ...result.data, userId: req.params.userId });
});

export { router as profileRoutes };
