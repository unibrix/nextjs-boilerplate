import { z } from 'zod';

export const createUserSchema = z
  .object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
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
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type CreateUserInput = z.infer<typeof createUserSchema>;
