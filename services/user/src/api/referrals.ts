import { Router, type Request, type Response } from 'express';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  // TODO: Return user's referral account (code, stats, history)
  res.json({ referralCode: 'MATCHA-ABC123', totalReferred: 0, totalEarned: 0, history: [] });
});

router.post('/validate/:code', async (req: Request, res: Response) => {
  // TODO: Validate referral code, check not self-referral
  res.json({ valid: true, referrerId: 'placeholder' });
});

export { router as referralRoutes };
