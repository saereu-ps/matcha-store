import type { Express } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const SERVICE_URLS: Record<string, string> = {
  product: process.env.PRODUCT_SERVICE_URL ?? 'http://localhost:4001',
  user: process.env.USER_SERVICE_URL ?? 'http://localhost:4002',
  subscription: process.env.SUBSCRIPTION_SERVICE_URL ?? 'http://localhost:4003',
  cart: process.env.CART_SERVICE_URL ?? 'http://localhost:4004',
  loyalty: process.env.LOYALTY_SERVICE_URL ?? 'http://localhost:4005',
  education: process.env.EDUCATION_SERVICE_URL ?? 'http://localhost:4006',
  ai: process.env.AI_SERVICE_URL ?? 'http://localhost:4007',
  i18n: process.env.I18N_SERVICE_URL ?? 'http://localhost:4008',
  admin: process.env.ADMIN_SERVICE_URL ?? 'http://localhost:4009',
};

/**
 * Setup service proxy routes.
 * Each path prefix routes to the corresponding microservice.
 */
export function setupRoutes(app: Express): void {
  // Product service
  app.use(
    '/api/products',
    createProxyMiddleware({
      target: SERVICE_URLS.product,
      pathRewrite: { '^/api/products': '/products' },
      changeOrigin: true,
    }),
  );

  // User service
  app.use(
    '/api/users',
    createProxyMiddleware({
      target: SERVICE_URLS.user,
      pathRewrite: { '^/api/users': '/users' },
      changeOrigin: true,
    }),
  );

  // Subscription service
  app.use(
    '/api/subscriptions',
    createProxyMiddleware({
      target: SERVICE_URLS.subscription,
      pathRewrite: { '^/api/subscriptions': '/subscriptions' },
      changeOrigin: true,
    }),
  );

  // Cart service
  app.use(
    '/api/cart',
    createProxyMiddleware({
      target: SERVICE_URLS.cart,
      pathRewrite: { '^/api/cart': '/cart' },
      changeOrigin: true,
    }),
  );

  // Loyalty service
  app.use(
    '/api/loyalty',
    createProxyMiddleware({
      target: SERVICE_URLS.loyalty,
      pathRewrite: { '^/api/loyalty': '/loyalty' },
      changeOrigin: true,
    }),
  );

  // Education service
  app.use(
    '/api/education',
    createProxyMiddleware({
      target: SERVICE_URLS.education,
      pathRewrite: { '^/api/education': '/education' },
      changeOrigin: true,
    }),
  );

  // AI/Personalization service
  app.use(
    '/api/recommendations',
    createProxyMiddleware({
      target: SERVICE_URLS.ai,
      pathRewrite: { '^/api/recommendations': '/recommendations' },
      changeOrigin: true,
    }),
  );

  // i18n service
  app.use(
    '/api/i18n',
    createProxyMiddleware({
      target: SERVICE_URLS.i18n,
      pathRewrite: { '^/api/i18n': '/i18n' },
      changeOrigin: true,
    }),
  );

  // Admin service
  app.use(
    '/api/admin',
    createProxyMiddleware({
      target: SERVICE_URLS.admin,
      pathRewrite: { '^/api/admin': '/admin' },
      changeOrigin: true,
    }),
  );
}
