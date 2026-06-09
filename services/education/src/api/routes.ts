import { Router, type Request, type Response } from 'express';

const router = Router();

// GET /education/brewing-guides — List all brewing guides
router.get('/brewing-guides', async (_req: Request, res: Response) => {
  res.json({
    guides: [
      { id: 'usucha', title: 'Usucha (Thin Style)', difficulty: 'Beginner', duration: '5 min', steps: 5 },
      { id: 'koicha', title: 'Koicha (Thick Style)', difficulty: 'Advanced', duration: '7 min', steps: 6 },
      { id: 'latte', title: 'Matcha Latte', difficulty: 'Beginner', duration: '3 min', steps: 4 },
      { id: 'cold-brew', title: 'Cold Brew Matcha', difficulty: 'Beginner', duration: '1 min + 4h', steps: 3 },
    ],
  });
});

// GET /education/brewing-guides/:id — Get guide with steps + timers
router.get('/brewing-guides/:id', async (req: Request, res: Response) => {
  // TODO: Fetch guide with all steps, images, videos, timer configs
  res.json({
    id: req.params.id,
    title: 'Usucha',
    steps: [
      { order: 1, title: 'Sift', description: 'Sift 1-2g matcha through fine mesh', timer: null, imageUrl: null },
      { order: 2, title: 'Add water', description: 'Pour 70ml water at 80°C', timer: null, temperature: 80 },
      { order: 3, title: 'Whisk', description: 'Whisk in W-motion', timer: { seconds: 15 }, technique: 'w-motion' },
      { order: 4, title: 'Check froth', description: 'Surface should have fine foam', timer: null },
      { order: 5, title: 'Serve', description: 'Present with front facing guest', timer: null },
    ],
  });
});

// GET /education/origins — Origin map data
router.get('/origins', async (_req: Request, res: Response) => {
  res.json({
    regions: [
      { id: 'uji', name: 'Uji, Kyoto', lat: 34.89, lng: 135.80, elevation: '200-400m', climate: 'Temperate, misty', signature: 'Deep umami, creamy', productCount: 12 },
      { id: 'nishio', name: 'Nishio, Aichi', lat: 34.86, lng: 137.06, elevation: '50-100m', climate: 'Warm, coastal', signature: 'Mild, sweet', productCount: 8 },
      { id: 'kagoshima', name: 'Kagoshima', lat: 31.56, lng: 130.56, elevation: '100-300m', climate: 'Subtropical', signature: 'Bold, vegetal', productCount: 6 },
      { id: 'yame', name: 'Yame, Fukuoka', lat: 33.21, lng: 130.69, elevation: '200-500m', climate: 'Mountain fog', signature: 'Rich, full-bodied', productCount: 5 },
      { id: 'shizuoka', name: 'Shizuoka', lat: 34.97, lng: 138.38, elevation: '100-600m', climate: 'Varied', signature: 'Fresh, vegetal', productCount: 4 },
    ],
  });
});

// GET /education/masterclasses — Video masterclass library
router.get('/masterclasses', async (_req: Request, res: Response) => {
  res.json({
    masterclasses: [
      { id: 'mc1', title: 'Understanding Matcha Grades', instructor: 'Kenji Tanaka', duration: 1200, difficulty: 'Beginner', isExclusive: false },
      { id: 'mc2', title: 'The Art of Chasen', instructor: 'Yuki Sato', duration: 1800, difficulty: 'Intermediate', isExclusive: false },
      { id: 'mc3', title: 'Seasonal Harvests & Terroir', instructor: 'Kenji Tanaka', duration: 2400, difficulty: 'Advanced', isExclusive: true },
    ],
  });
});

export { router as educationRoutes };
