import { z } from 'zod';

/**
 * 1. Zod Schema Definition for a User
 * This represents a user profile in our system.
 */
export const UserSchema = z.object({
  id: z.string(),
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email format"),
  avatarUrl: z.string().url().optional(), // The user might not have uploaded an avatar yet
  preferences: z.object({
    theme: z.enum(['dark', 'light', 'system']).default('dark'),
    currency: z.enum(['USD', 'EUR', 'GBP']).default('USD'),
  }),
});

/**
 * 2. TypeScript Type Inference
 */
export type User = z.infer<typeof UserSchema>;
