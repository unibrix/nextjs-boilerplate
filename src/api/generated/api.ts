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

import {
  CreateUserRequestDto,
  ForgotPasswordRequestDto,
  LoginRequestDto,
  LoginResponseDto,
  ResetPasswordRequestDto,
  SignupRequestDto,
  SignupResponseDto,
  UpdateProfileRequestDto,
  UpdateUserRequestDto,
  UserControllerFindOneParams,
  UserControllerRemoveParams,
  UserControllerUpdateParams,
  UserResponseDto,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Api<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Users
   * @name UserControllerCreate
   * @summary Create a new user
   * @request POST:/api/users
   * @secure
   */
  userControllerCreate = (
    data: CreateUserRequestDto,
    params: RequestParams = {}
  ) =>
    this.request<UserResponseDto, void>({
      path: `/api/users`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Users
   * @name UserControllerFindAll
   * @summary Get all users
   * @request GET:/api/users
   * @secure
   */
  userControllerFindAll = (params: RequestParams = {}) =>
    this.request<UserResponseDto[], any>({
      path: `/api/users`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Users
   * @name UserControllerGetProfile
   * @summary Get current user profile
   * @request GET:/api/users/me
   * @secure
   */
  userControllerGetProfile = (params: RequestParams = {}) =>
    this.request<UserResponseDto, any>({
      path: `/api/users/me`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Users
   * @name UserControllerUpdateProfile
   * @summary Update current user profile
   * @request PATCH:/api/users/me
   * @secure
   */
  userControllerUpdateProfile = (
    data: UpdateProfileRequestDto,
    params: RequestParams = {}
  ) =>
    this.request<UserResponseDto, void>({
      path: `/api/users/me`,
      method: 'PATCH',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Users
   * @name UserControllerFindOne
   * @summary Get user by ID
   * @request GET:/api/users/{id}
   * @secure
   */
  userControllerFindOne = (
    { id, ...query }: UserControllerFindOneParams,
    params: RequestParams = {}
  ) =>
    this.request<UserResponseDto, void>({
      path: `/api/users/${id}`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Users
   * @name UserControllerUpdate
   * @summary Update user
   * @request PATCH:/api/users/{id}
   * @secure
   */
  userControllerUpdate = (
    { id, ...query }: UserControllerUpdateParams,
    data: UpdateUserRequestDto,
    params: RequestParams = {}
  ) =>
    this.request<UserResponseDto, void>({
      path: `/api/users/${id}`,
      method: 'PATCH',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Users
   * @name UserControllerRemove
   * @summary Delete user
   * @request DELETE:/api/users/{id}
   * @secure
   */
  userControllerRemove = (
    { id, ...query }: UserControllerRemoveParams,
    params: RequestParams = {}
  ) =>
    this.request<void, void>({
      path: `/api/users/${id}`,
      method: 'DELETE',
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Auth
   * @name AuthControllerSignup
   * @summary Register a new user
   * @request POST:/api/auth/signup
   */
  authControllerSignup = (data: SignupRequestDto, params: RequestParams = {}) =>
    this.request<SignupResponseDto, void>({
      path: `/api/auth/signup`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Auth
   * @name AuthControllerLogin
   * @summary Login with email and password
   * @request POST:/api/auth/login
   */
  authControllerLogin = (data: LoginRequestDto, params: RequestParams = {}) =>
    this.request<LoginResponseDto, void>({
      path: `/api/auth/login`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Auth
   * @name AuthControllerGoogleAuth
   * @summary Initiate Google OAuth login
   * @request GET:/api/auth/google
   */
  authControllerGoogleAuth = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/auth/google`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags Auth
   * @name AuthControllerGoogleAuthRedirect
   * @summary Google OAuth callback
   * @request GET:/api/auth/google/callback
   */
  authControllerGoogleAuthRedirect = (params: RequestParams = {}) =>
    this.request<LoginResponseDto, any>({
      path: `/api/auth/google/callback`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Auth
   * @name AuthControllerForgotPassword
   * @summary Request password reset
   * @request POST:/api/auth/forgot-password
   */
  authControllerForgotPassword = (
    data: ForgotPasswordRequestDto,
    params: RequestParams = {}
  ) =>
    this.request<void, void>({
      path: `/api/auth/forgot-password`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Auth
   * @name AuthControllerResetPassword
   * @summary Reset password with token
   * @request POST:/api/auth/reset-password
   */
  authControllerResetPassword = (
    data: ResetPasswordRequestDto,
    params: RequestParams = {}
  ) =>
    this.request<void, void>({
      path: `/api/auth/reset-password`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
}
