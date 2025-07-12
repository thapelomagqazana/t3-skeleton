/**
 * @file user.schema.ts
 * @description Zod schemas for user-related input validation (signup and signin).
 */

import { z } from 'zod';

/**
 * Schema for validating user signup data.
 * - name: required string
 * - email: must be a valid email
 * - password: must be at least 6 characters
 */
export const SignUpSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

/**
 * Schema for validating user signin data.
 * - email: must be a valid email
 * - password: must be at least 6 characters
 */
export const SignInSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

// Optional: Export schema types for strong typing
export type SignUpInput = z.infer<typeof SignUpSchema>;
export type SignInInput = z.infer<typeof SignInSchema>;
