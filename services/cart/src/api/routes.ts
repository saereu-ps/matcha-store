import { createError } from '@matcha/shared-kernel';
import { Router, type Request, type Response } from 'express';
import { z } from 'zod';

const router = Router();

const addItemSchema = z.object({
  productId: z.string().uuid(),
  variantSku: z.string(),
  quantity: z.number().int().min(1).max(99),
  isSubscription: z.boolean().default(false),
  cadenceDays: z.number().int().min(7).max(90).optional(),
});

const checkoutSchema = z.object({
  addressId: z.string().uuid().optional(),
  address: z.object({
    line1: z.string(), line2: z.string().optional(), city: z.string(), state: z.string(), postalCode: z.string(), country: z.string(),
  }).optional(),
  currency: z.string().default('USD'),
  promoCode: z.string().optional(),
  isGift: z.boolean().default(false),
  giftMessage: z.string().max(200).optional(),
  giftWrapping: z.enum(['CLASSIC', 'PREMIUM', 'MINIMAL']).optional(),
  scheduledDeliveryDate: z.string().datetime().optional(),
});

router.get('/', async (_req: Request, res: Response) => {
  // TODO: Get current user's cart from Redis/DB
  res.json({ items: [], subtotal: 0, currency: 'USD', itemCount: 0 });
});

router.post('/items', async (req: Request, res: Response) => {
  const result = addItemSchema.safeParse(req.body);
  if (!result.success) { res.status(422).json(createError('VALIDATION_FAILED', { detail: 'Invalid item' }).toJSON()); return; }
  // TODO: Validate stock, add to cart, emit ItemAddedToCart
  res.status(201).json({ ...result.data, lineTotal: 0 });
});

router.put('/items/:sku', async (req: Request, res: Response) => {
  const { quantity } = req.body;
  // TODO: Update quantity, validate stock, recalculate
  res.json({ sku: req.params.sku, quantity, lineTotal: 0 });
});

router.delete('/items/:sku', async (req: Request, res: Response) => {
  // TODO: Remove from cart
  res.status(204).send();
});

router.post('/promo', async (req: Request, res: Response) => {
  const { code } = req.body;
  // TODO: Validate promo code, calculate discount
  res.json({ valid: true, code, discount: 0, type: 'PERCENTAGE' });
});

router.post('/checkout', async (req: Request, res: Response) => {
  const result = checkoutSchema.safeParse(req.body);
  if (!result.success) { res.status(422).json(createError('VALIDATION_FAILED', { detail: 'Invalid checkout data' }).toJSON()); return; }
  // TODO: Calculate shipping (Shippo), tax, process payment (Stripe), create order, emit OrderPlaced
  res.json({ orderId: 'placeholder', total: 0, currency: result.data.currency, status: 'CONFIRMED' });
});

router.post('/shipping-estimate', async (req: Request, res: Response) => {
  // TODO: Call Shippo for rates based on destination
  res.json({ rates: [{ carrier: 'Standard', price: 5.99, days: '3-5' }, { carrier: 'Express', price: 12.99, days: '1-2' }] });
});

export { router as cartRoutes };
