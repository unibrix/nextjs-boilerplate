import { z } from 'zod';

export const updateUserSchema = z.object({
  firstName: z
    .string()
    .min(2, 'First name must be at least 2 characters')
    .optional()
    .or(z.literal('')),
  lastName: z
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .optional()
    .or(z.literal('')),
  roles: z.array(z.enum(['admin', 'user', 'moderator'])).optional(),
  isActive: z.boolean().optional(),
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>;
