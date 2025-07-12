/**
 * @file app.ts
 * @description Initializes the Express application with configured middleware and routes.
 */

import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import { applySecurityMiddleware } from './middleware/security';

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

// Automatically parse incoming JSON payloads
app.use(express.json());

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

// Export the configured Express app
export default app;
