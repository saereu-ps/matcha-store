import type { AuthContext, JwtClaims } from './types.js';

/**
 * Verify a JWT token and extract claims.
 * In production, this uses RS256 public key verification.
 * This is a simplified version — full implementation requires jsonwebtoken/jose library.
 */
export function verifyJwt(token: string, publicKey: string): JwtClaims {
  // Decode JWT parts (header.payload.signature)
  const parts = token.split('.');
  if (parts.length !== 3) {
    throw new Error('Invalid JWT format');
  }

  const payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString()) as JwtClaims;

  // Check expiration
  if (payload.exp && Date.now() / 1000 > payload.exp) {
    throw new Error('Token expired');
  }

  // Note: Full signature verification requires crypto library (jose/jsonwebtoken)
  // This will be completed when the auth service is implemented
  return payload;
}

/**
 * Extract AuthContext from verified JWT claims.
 */
export function extractClaims(claims: JwtClaims): AuthContext {
  return {
    userId: claims.sub,
    email: claims.email,
    roles: claims.roles,
    tier: claims.tier,
    locale: claims.locale,
    isAuthenticated: true,
  };
}
