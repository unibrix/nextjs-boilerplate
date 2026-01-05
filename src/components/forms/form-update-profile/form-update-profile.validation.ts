import { z } from 'zod';

export const updateProfileSchema = z
  .object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    currentPassword: z.string().optional(),
    newPassword: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .optional(),
    confirmPassword: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.newPassword && !data.currentPassword) {
        return false;
      }
      return true;
    },
    {
      message: 'Current password is required to set a new password',
      path: ['currentPassword'],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && data.newPassword !== data.confirmPassword) {
        return false;
      }
      return true;
    },
    {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    }
  );

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
