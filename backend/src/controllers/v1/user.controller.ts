/**
 * @file user.controller.ts
 * @description Contains controller logic for User CRUD operations.
 */

import { Request, Response, NextFunction } from 'express';
import prisma from '../../db';
import { AppError } from '../../utils/AppError';

/**
 * GET /api/users
 * Get all users
 */
export const getAllUsers = async (_req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
};

/**
 * GET /api/users/:id
 * Get a user by ID
 */
export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) return next(new AppError('User not found', 404));

  res.json(user);
};

/**
 * PUT /api/users/:id
 * Update user
 */
export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    const user = await prisma.user.update({
      where: { id },
      data: { name, email },
    });

    res.json(user);
  } catch {
    next(new AppError('User update failed. Possibly email already taken.', 400));
  }
};

/**
 * DELETE /api/users/:id
 * Delete a user
 */
export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    await prisma.user.delete({ where: { id } });
    res.status(204).send();
  } catch {
    next(new AppError('User deletion failed', 400));
  }
};
