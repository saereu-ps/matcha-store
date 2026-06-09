import { createError } from '@matcha/shared-kernel';
import { Router, type Request, type Response } from 'express';
import { z } from 'zod';

const router = Router();

const createSubSchema = z.object({
  productId: z.string().uuid(),
  variantSku: z.string(),
  cadenceDays: z.number().int().min(7).max(90),
  quantity: z.number().int().min(1).max(10).default(1),
});

const giftSubSchema = z.object({
  productId: z.string().uuid(),
  variantSku: z.string(),
  durationMonths: z.number().int().min(1).max(12),
  recipientEmail: z.string().email(),
  personalMessage: z.string().max(500).optional(),
  startDate: z.string().datetime(),
});

// POST /subscriptions — Create subscription
router.post('/', async (req: Request, res: Response) => {
  const result = createSubSchema.safeParse(req.body);
  if (!result.success) {
    const error = createError('VALIDATION_FAILED', { detail: 'Invalid subscription data' });
    res.status(error.status).json(error.toJSON());
    return;
  }
  // TODO: Create Stripe subscription, store in DB, emit SubscriptionCreated
  res.status(201).json({ id: 'placeholder', status: 'ACTIVE', ...result.data, nextDelivery: new Date() });
});

// GET /subscriptions/:id — Get subscription details + dashboard
router.get('/:id', async (req: Request, res: Response) => {
  res.json({ id: req.params.id, status: 'ACTIVE', nextDelivery: null, actions: ['skip', 'swap', 'pause', 'cancel'] });
});

// POST /subscriptions/:id/skip — Skip next delivery
router.post('/:id/skip', async (_req: Request, res: Response) => {
  // TODO: Skip next delivery, move date forward, emit DeliverySkipped
  res.json({ skipped: true, newNextDelivery: new Date() });
});

// POST /subscriptions/:id/swap — Swap product
router.post('/:id/swap', async (req: Request, res: Response) => {
  const { newProductId, newVariantSku } = req.body;
  // TODO: Update next delivery product, emit ProductSwapped
  res.json({ swapped: true, newProductId, newVariantSku });
});

// POST /subscriptions/:id/pause — Pause subscription
router.post('/:id/pause', async (_req: Request, res: Response) => {
  // TODO: Set status PAUSED, start 60-day tier decay timer, emit SubscriptionPaused
  res.json({ paused: true, tierDecayStartsAt: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000) });
});

// POST /subscriptions/:id/cancel — Cancel with retention flow
router.post('/:id/cancel', async (req: Request, res: Response) => {
  const { reason, skipRetention } = req.body;
  if (!skipRetention) {
    // TODO: Present retention offer (20% off next 2 deliveries)
    res.json({ retention: true, offer: { discount: 20, duration: 2 } });
    return;
  }
  // TODO: Cancel subscription, emit SubscriptionCancelled
  res.json({ cancelled: true, reason });
});

// POST /subscriptions/:id/cadence — Adjust cadence
router.post('/:id/cadence', async (req: Request, res: Response) => {
  const { cadenceDays } = req.body;
  // TODO: Update delivery frequency, emit CadenceAdjusted
  res.json({ cadenceDays, nextDelivery: new Date() });
});

// POST /subscriptions/gift — Create gift subscription
router.post('/gift', async (req: Request, res: Response) => {
  const result = giftSubSchema.safeParse(req.body);
  if (!result.success) {
    const error = createError('VALIDATION_FAILED', { detail: 'Invalid gift subscription data' });
    res.status(error.status).json(error.toJSON());
    return;
  }
  // TODO: Create gift sub, schedule start, emit GiftSubscriptionStarted
  res.status(201).json({ id: 'placeholder', type: 'GIFT', ...result.data });
});

// GET /subscriptions/:id/cadence-suggestion — Smart cadence prediction
router.get('/:id/cadence-suggestion', async (_req: Request, res: Response) => {
  // TODO: Analyze skip/reorder patterns, suggest optimal cadence
  res.json({ suggestion: null, confidence: 0, reason: 'Insufficient data' });
});

export { router as subscriptionRoutes };
