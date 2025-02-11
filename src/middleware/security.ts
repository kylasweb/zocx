import helmet from 'helmet';
import { RequestHandler } from 'express';

export const securityHeaders: RequestHandler[] = [
  helmet(),
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:', 'https://*.stripe.com'],
      connectSrc: ["'self'", 'https://api.stripe.com'],
    },
  }),
  helmet.hsts({
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  }),
]; 