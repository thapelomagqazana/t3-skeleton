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

const router = Router();

// /api/v1/users
router.get('/', authenticateJWT, getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
