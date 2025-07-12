/**
 * @file auth.middleware.ts
 * @description Express middleware to authenticate JWT tokens.
 */

import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';

export interface AuthRequest extends Request {
  user?: { userId: string };
}

/**
 * Middleware to protect routes using JWT.
 */
export function authenticateJWT(req: AuthRequest, res: Response, next: NextFunction) {
  const token = req.headers?.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - Token missing' });
  }

  try {
    const decoded = verifyToken<{ userId: string }>(token);
    req.user = { userId: decoded.userId };
    next();
  } catch {
    return res.status(403).json({ error: 'Forbidden - Invalid or expired token' });
  }
}
