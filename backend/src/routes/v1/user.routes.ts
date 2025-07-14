/**
 * @file v1/user.routes.ts
 * @description Versioned (v1) User CRUD routes.
 */

import { Router } from 'express';
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../../controllers/v1/user.controller';
import { authenticateJWT } from '../../middleware/auth.middleware';
import { UpdateUserSchema } from '../../schemas/user.schema';
import { validate } from '../../middleware/validate';

const router = Router();

// /api/v1/users
router.get('/', authenticateJWT, getAllUsers);
router.get('/:id', authenticateJWT, getUserById);
router.put('/:id', authenticateJWT, validate(UpdateUserSchema), updateUser);
router.delete('/:id', authenticateJWT, deleteUser);

export default router;
