export interface JwtClaims {
  sub: string;
  email: string;
  roles: string[];
  tier: string | null;
  locale: string;
  exp: number;
  iat: number;
  jti: string;
}

export interface AuthContext {
  userId: string;
  email: string;
  roles: string[];
  tier: string | null;
  locale: string;
  isAuthenticated: true;
}

export interface AnonymousContext {
  isAuthenticated: false;
}

export type RequestContext = AuthContext | AnonymousContext;
