/**
 * @file user.controller.ts
 * @description Contains controller logic for User CRUD operations.
 */

import { Request, Response, NextFunction } from 'express';
import prisma from '../../db';
import { Role } from '@prisma/client';
import { AppError } from '../../utils/AppError';
import { AuthRequest } from '../../middleware/auth.middleware';

/**
 * GET /api/users
 * Get all users
 */
export const getAllUsers = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    // Check for role-based access
    if (req.user?.role !== Role.ADMIN) {
      throw new AppError('Forbidden: Admins only', 403);
    }

    // Extract and validate query params
    const { page = 1, limit = 10, role, active, search } = req.query;

    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);

    if (isNaN(pageNumber) || isNaN(limitNumber) || pageNumber < 1 || limitNumber < 1) {
      throw new AppError('Invalid pagination input', 400);
    }

    const where: any = {};

    if (role) {
      const normalizedRole = role.toString().toUpperCase();
      if (!Object.values(Role).includes(normalizedRole as Role)) {
        throw new AppError('Invalid role filter', 400);
      }
      where.role = normalizedRole as Role;
    }

    if (typeof active !== 'undefined') {
      if (active !== 'true' && active !== 'false') {
        throw new AppError('Invalid active filter', 400);
      }
      where.isActive = active === 'true';
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }

    const users = await prisma.user.findMany({
      where,
      skip: (pageNumber - 1) * limitNumber,
      take: limitNumber,
    });

    res.status(200).json({ users });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/users/:id
 * Get a user by ID
 */
export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) return next(new AppError('User not found', 404));

  res.json({ user });
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

    res.json({ user });
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
