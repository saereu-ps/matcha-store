import rateLimit from 'express-rate-limit';

/**
 * Global rate limiter — 100 requests per minute per IP.
 * More restrictive limits applied per-route where needed.
 */
export function rateLimiter() {
  return rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      type: '/errors/rate-limited',
      title: 'Rate Limited',
      status: 429,
      detail: 'Too many requests. Please try again later.',
    },
  });
}

/**
 * Stricter rate limit for auth endpoints (10 per minute).
 */
export function authRateLimiter() {
  return rateLimit({
    windowMs: 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      type: '/errors/rate-limited',
      title: 'Rate Limited',
      status: 429,
      detail: 'Too many authentication attempts. Please wait.',
    },
  });
}
