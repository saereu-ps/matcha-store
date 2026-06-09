import { Router, type Request, type Response } from 'express';
import { z } from 'zod';

import { createError } from '@matcha/shared-kernel';

const router = Router();

const refreshSchema = z.object({
  refreshToken: z.string().min(1),
});

/**
 * POST /token/refresh — Exchange refresh token for new access + refresh pair.
 * Implements refresh token rotation (old token invalidated).
 */
router.post('/refresh', async (req: Request, res: Response) => {
  const result = refreshSchema.safeParse(req.body);
  if (!result.success) {
    const error = createError('VALIDATION_FAILED', { detail: 'Refresh token required' });
    res.status(error.status).json(error.toJSON());
    return;
  }

  // TODO: Validate refresh token exists in Redis
  // TODO: Check expiry (7 days)
  // TODO: Generate new access token
  // TODO: Rotate refresh token (invalidate old, issue new)
  // TODO: Return new token pair

  res.json({
    tokens: {
      accessToken: 'new-placeholder-jwt',
      refreshToken: 'new-placeholder-refresh',
      expiresIn: 900,
    },
  });
});

/**
 * POST /token/introspect — Verify token validity for sensitive operations.
 * Used by services before processing payment/subscription changes.
 */
router.post('/introspect', async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    res.json({ active: false });
    return;
  }

  // TODO: Verify JWT signature
  // TODO: Check token not revoked
  // TODO: Return token claims if valid

  res.json({
    active: true,
    sub: 'placeholder-user-id',
    email: 'user@example.com',
    roles: ['customer'],
    tier: null,
    locale: 'en',
    exp: Math.floor(Date.now() / 1000) + 900,
  });
});

const tokenRoutes = router;
export { tokenRoutes };
