export type {
  LoginRequestDto,
  SignupRequestDto,
  ForgotPasswordRequestDto,
  ResetPasswordRequestDto,
  LoginResponseDto,
  SignupResponseDto,
  UserResponseDto,
} from '@/api/generated/data-contracts';

// Re-export form types for convenience
export type { LoginInput } from '@/components/forms/form-login';
export type { RegisterInput } from '@/components/forms/form-register';
export type { ForgotPasswordInput } from '@/components/forms/form-forgot-password';
export type { ResetPasswordInput } from '@/components/forms/form-reset-password';
export type { UpdateProfileInput } from '@/components/forms/form-update-profile';

export interface AuthState {
  user: import('@/api/generated/data-contracts').UserResponseDto | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
