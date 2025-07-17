/**
 * @file app.ts
 * @description Initializes the Express application with configured middleware and routes.
 */

import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import { applySecurityMiddleware } from './middleware/security';
import v1AuthRoutes from './routes/v1/auth.routes';
import v1UserRoutes from './routes/v1/user.routes';
import testRoutes from './routes/test.routes';
import { globalErrorHandler } from './middleware/errorHandler';
import { AppError } from './utils/AppError';

// Load environment variables from .env file into process.env
dotenv.config();

// Initialize the Express application
const app: Application = express();

// ─────────────────────────────────────────────
// Security Middleware
// ─────────────────────────────────────────────
applySecurityMiddleware(app);

// ─────────────────────────────────────────────
// Core Middleware
// ─────────────────────────────────────────────
app.use(express.json()); // Automatically parse incoming JSON payloads

// ─────────────────────────────────────────────
// Routes
// ─────────────────────────────────────────────

/**
 * @route GET /
 * @description Health check route to verify backend is running
 * @access Public
 */
app.get('/', (_req: Request, res: Response) => {
  res.status(200).json({
    message: 'T3 backend is running 🚀',
  });
});

// API routes
app.use('/api/v1/test', testRoutes); 
// (v1)
app.use('/api/v1/auth', v1AuthRoutes);
app.use('/api/v1/users', v1UserRoutes);

// ─────────────────────────────────────────────
// Catch-All 404 Route (FIXED)
// ─────────────────────────────────────────────
app.use((_req, _res, next) => {
  next(new AppError('Route not found', 404));
});

// ─────────────────────────────────────────────
// Global Error Handler
// ─────────────────────────────────────────────
app.use(globalErrorHandler);

export default app;
