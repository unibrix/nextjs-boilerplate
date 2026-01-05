/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface CreateUserRequestDto {
  /** @example "user@example.com" */
  email: string;
  /** @example "StrongPassword123" */
  password: string;
  /** @example "John" */
  firstName?: string;
  /** @example "Doe" */
  lastName?: string;
  /** @example ["user"] */
  roles?: ('admin' | 'user' | 'moderator')[];
  /** @example "local" */
  provider?: 'local' | 'google';
  providerId?: string;
}

export interface UserResponseDto {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  roles: ('admin' | 'user' | 'moderator')[];
  provider: 'local' | 'google';
  isActive: boolean;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface UpdateProfileRequestDto {
  /**
   * First name
   * @example "John"
   */
  firstName?: string;
  /**
   * Last name
   * @example "Doe"
   */
  lastName?: string;
  /**
   * Current password (required if changing password)
   * @minLength 6
   * @example "OldPassword123!"
   */
  currentPassword?: string;
  /**
   * New password
   * @minLength 6
   * @example "NewPassword123!"
   */
  newPassword?: string;
}

export interface UpdateUserRequestDto {
  /** @example "John" */
  firstName?: string;
  /** @example "Doe" */
  lastName?: string;
  /** @example ["user"] */
  roles?: ('admin' | 'user' | 'moderator')[];
  /** @example true */
  isActive?: boolean;
}

export interface SignupRequestDto {
  /** @example "user@example.com" */
  email: string;
  /** @example "StrongPassword123" */
  password: string;
  /** @example "John" */
  firstName?: string;
  /** @example "Doe" */
  lastName?: string;
}

export interface SignupResponseDto {
  accessToken: string;
  user: UserResponseDto;
}

export interface LoginRequestDto {
  /** @example "user@example.com" */
  email: string;
  /** @example "StrongPassword123" */
  password: string;
}

export interface LoginResponseDto {
  accessToken: string;
  user: UserResponseDto;
}

export interface ForgotPasswordRequestDto {
  /**
   * User email address
   * @example "user@example.com"
   */
  email: string;
}

export interface ResetPasswordRequestDto {
  /**
   * Password reset token
   * @example "abc123def456"
   */
  token: string;
  /**
   * New password
   * @minLength 6
   * @example "NewPassword123!"
   */
  newPassword: string;
}

export interface UserControllerFindOneParams {
  id: string;
}

export interface UserControllerUpdateParams {
  id: string;
}

export interface UserControllerRemoveParams {
  id: string;
}
