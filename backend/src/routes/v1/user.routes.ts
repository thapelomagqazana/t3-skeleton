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

const router = Router();

// /api/v1/users
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
