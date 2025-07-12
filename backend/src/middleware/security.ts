/**
 * @file security.ts
 * @description Middleware setup for securing the Express app using Helmet, CORS, and Rate Limiting.
 */

import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { Application } from 'express';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Applies essential security middlewares to the Express app.
 *
 * @param app - The Express application instance
 */
export const applySecurityMiddleware = (app: Application) => {
  // ──────────────── Helmet ────────────────
  // Sets various HTTP headers for security (e.g., XSS, Content Security Policy)
  app.use(helmet());

  // ──────────────── CORS ────────────────
  // Allow requests from the frontend origin defined in .env
  const allowedOrigin = process.env.FRONTEND_URL || '*';

  app.use(
    cors({
      origin: allowedOrigin,
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true,
    }),
  );

  // ──────────────── Rate Limiting ────────────────
  // Limits repeated requests to public APIs
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per window
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true, // Use `RateLimit-*` headers
    legacyHeaders: false, // Disable `X-RateLimit-*` headers
  });

  app.use(limiter);
};
