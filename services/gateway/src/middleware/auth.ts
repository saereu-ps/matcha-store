import type { NextFunction, Request, Response } from 'express';

import { extractClaims, verifyJwt, type AuthContext } from '@matcha/shared-kernel';

declare global {
  namespace Express {
    interface Request {
      auth?: AuthContext;
    }
  }
}

/**
 * Auth middleware — extracts and verifies JWT from Authorization header.
 * Does NOT reject unauthenticated requests — individual routes handle that.
 * Attaches auth context to request if valid token present.
 */
export function authMiddleware() {
  const publicKey = process.env.JWT_PUBLIC_KEY ?? '';

  return (req: Request, _res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      next();
      return;
    }

    try {
      const token = authHeader.slice(7);
      const claims = verifyJwt(token, publicKey);
      req.auth = extractClaims(claims);
    } catch {
      // Invalid token — proceed as unauthenticated
      // Routes that require auth will reject
    }

    next();
  };
}

/**
 * Route-level middleware — requires authentication.
 * Returns 401 if no valid auth context.
 */
export function requireAuth() {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.auth) {
      res.status(401).json({
        type: '/errors/auth-required',
        title: 'Authentication Required',
        status: 401,
        detail: 'A valid access token is required',
      });
      return;
    }
    next();
  };
}
