import { Router, type Request, type Response } from 'express';

const router = Router();

// GET /loyalty/account — User's loyalty account
router.get('/account', async (_req: Request, res: Response) => {
  // TODO: Fetch from DB
  res.json({ points: 0, tier: 'NOVICE', nextTierAt: 500, achievements: [], streakDays: 0 });
});

// GET /loyalty/tiers — Tier definitions and benefits
router.get('/tiers', async (_req: Request, res: Response) => {
  res.json({
    tiers: [
      { name: 'NOVICE', minPoints: 0, benefits: ['Standard shipping'] },
      { name: 'ENTHUSIAST', minPoints: 500, benefits: ['Free shipping', '5% bonus points'] },
      { name: 'CONNOISSEUR', minPoints: 2000, benefits: ['Early access (48h)', 'Exclusive products', '10% bonus', 'Priority support'] },
      { name: 'MASTER', minPoints: 5000, benefits: ['All connoisseur benefits', 'Free express shipping', 'Birthday gift', 'Annual exclusive blend'] },
    ],
  });
});

// POST /loyalty/redeem — Redeem points for reward
router.post('/redeem', async (req: Request, res: Response) => {
  const { rewardId, points } = req.body;
  // TODO: Check balance, deduct points, apply reward, emit PointsRedeemed
  res.json({ redeemed: true, rewardId, pointsUsed: points, newBalance: 0 });
});

// GET /loyalty/achievements — All achievements + progress
router.get('/achievements', async (_req: Request, res: Response) => {
  res.json({
    achievements: [
      { id: 'first-brew', name: 'First Brew', description: 'Complete your first brewing guide', earned: false },
      { id: 'all-origins', name: 'Origin Explorer', description: 'Try matcha from all 5 regions', progress: 0, total: 5, earned: false },
      { id: 'ten-orders', name: 'Dedicated Drinker', description: 'Place 10 orders', progress: 0, total: 10, earned: false },
      { id: 'first-review', name: 'First Voice', description: 'Write your first review', earned: false },
    ],
  });
});

// GET /loyalty/challenges — Active seasonal challenges
router.get('/challenges', async (_req: Request, res: Response) => {
  res.json({ active: [], completed: [], upcoming: [] });
});

// GET /loyalty/leaderboard — Top users by points
router.get('/leaderboard', async (_req: Request, res: Response) => {
  // TODO: Redis sorted set for leaderboard
  res.json({ entries: [], userRank: null });
});

export { router as loyaltyRoutes };
