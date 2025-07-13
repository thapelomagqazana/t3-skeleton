/**
 * @file user.schema.ts
 * @description Zod schemas for user-related input validation (signup and signin).
 */

import { z } from 'zod';
import { Role } from '@prisma/client';

/**
 * Schema for validating user signup data.
 * - name: required string
 * - email: must be a valid email
 * - password: must be at least 6 characters
 */
export const SignUpSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(50),
  email: z.string().toLowerCase().trim().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})
.strict(); // If Zod is configured with `.strict()`, extra unknown fields will throw an error


/**
 * Schema for validating user signin data.
 * - email: must be a valid email
 * - password: must be at least 6 characters
 */
export const SignInSchema = z.object({
  email: z.string().toLowerCase().trim().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})
.strict(); // If Zod is configured with `.strict()`, extra unknown fields will throw an error

// User Update Schema (for PUT /api/v1/users/:id)
export const UpdateUserSchema = z.object({
  name: z.string().trim().min(1).max(50).optional(),
  email: z.string().toLowerCase().trim().email('Invalid email').optional(),
  password: z.string().min(6).optional(),
  isActive: z.boolean().optional(),
  role: z.enum([Role.ADMIN, Role.USER]).optional(),
}).refine((data) => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update.',
}).strict();

// Optional: Export schema types for strong typing
export type SignUpInput = z.infer<typeof SignUpSchema>;
export type SignInInput = z.infer<typeof SignInSchema>;
export type UpdateUserInput = z.infer<typeof UpdateUserSchema>;
