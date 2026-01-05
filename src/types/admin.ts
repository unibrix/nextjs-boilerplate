export type {
  UserResponseDto,
  CreateUserRequestDto,
  UpdateUserRequestDto,
} from '@/api/generated/data-contracts';

// Re-export form types for convenience
export type { CreateUserInput } from '@/components/forms/form-admin-create-user';
export type { UpdateUserInput } from '@/components/forms/form-admin-update-user';
