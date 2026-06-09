import { Router, type Request, type Response } from 'express';
import { z } from 'zod';

import { createError } from '@matcha/shared-kernel';

const router = Router();

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(128),
  locale: z.string().default('en'),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

/**
 * POST /auth/register — Create a new user account.
 * Returns access + refresh tokens on success.
 */
router.post('/register', async (req: Request, res: Response) => {
  const result = registerSchema.safeParse(req.body);
  if (!result.success) {
    const error = createError('VALIDATION_FAILED', {
      detail: 'Registration validation failed',
      errors: result.error.issues.map((i) => ({
        field: i.path.join('.'),
        code: i.code,
        message: i.message,
      })),
    });
    res.status(error.status).json(error.toJSON());
    return;
  }

  const { email, password, locale } = result.data;

  // TODO: Check if email already exists
  // TODO: Hash password (bcrypt)
  // TODO: Create user in database
  // TODO: Generate JWT access + refresh tokens
  // TODO: Send verification email via SendGrid

  res.status(201).json({
    user: {
      id: 'placeholder-uuid',
      email,
      roles: ['customer'],
      locale,
    },
    tokens: {
      accessToken: 'placeholder-jwt',
      refreshToken: 'placeholder-refresh',
      expiresIn: 900, // 15 min
    },
  });
});

/**
 * POST /auth/login — Authenticate user, return tokens.
 */
router.post('/login', async (req: Request, res: Response) => {
  const result = loginSchema.safeParse(req.body);
  if (!result.success) {
    const error = createError('VALIDATION_FAILED', {
      detail: 'Login validation failed',
      errors: result.error.issues.map((i) => ({
        field: i.path.join('.'),
        code: i.code,
        message: i.message,
      })),
    });
    res.status(error.status).json(error.toJSON());
    return;
  }

  // TODO: Find user by email
  // TODO: Verify password hash
  // TODO: Generate new access + refresh tokens
  // TODO: Log login event

  res.json({
    user: {
      id: 'placeholder-uuid',
      email: result.data.email,
      roles: ['customer'],
    },
    tokens: {
      accessToken: 'placeholder-jwt',
      refreshToken: 'placeholder-refresh',
      expiresIn: 900,
    },
  });
});

/**
 * POST /auth/logout — Invalidate refresh token.
 */
router.post('/logout', async (req: Request, res: Response) => {
  // TODO: Extract refresh token from body/cookie
  // TODO: Invalidate in Redis
  res.status(204).send();
});

const authRoutes = router;
export { authRoutes };
