/**
 * @file auth.controller.ts
 * @description Handles user registration, login, logout
 */

import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../../db';
import { signToken } from '../../utils/jwt';
import { SignInInput, SignUpInput } from '../../schemas/user.schema';
import { AppError } from '../../utils/AppError';

/**
 * Handles user signup
 */
export const signup = async (
  req: Request<object, object, SignUpInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return next(new AppError('Email already in use.', 409));

    const hashed = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: { name, email, password: hashed },
    });

    const token = signToken({ userId: user.id });
    res.status(201).json({
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Handles user signin
 */
export const signin = async (
  req: Request<object, object, SignInInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return next(new AppError('Invalid credentials.', 401));

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return next(new AppError('Invalid credentials.', 401));

    const token = signToken({ userId: user.id });
    res.status(200).json({
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Handles user signout (stateless)
 */
export const signout = async (_req: Request, res: Response) => {
  // If using cookies: res.clearCookie('token');
  res.status(200).json({ message: 'Signed out successfully.' });
};
