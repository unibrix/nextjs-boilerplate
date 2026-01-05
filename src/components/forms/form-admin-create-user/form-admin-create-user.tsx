'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui';
import { FormProvider } from '@/core';
import { ControlledInput } from '@/components/fields';
import { FormError } from '@/lib/helpers';
import {
  createUserSchema,
  type CreateUserInput,
} from './form-admin-create-user.validation';
import { CreateUserRequestDto } from '@/types';

interface AdminCreateUserFormProps {
  onSubmit: (data: CreateUserRequestDto) => Promise<void>;
  onCancel: () => void;
}

export function AdminCreateUserForm({
  onSubmit,
  onCancel,
}: AdminCreateUserFormProps) {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [rootError, setRootError] = useState<string>();

  const form = useForm<CreateUserInput>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      roles: ['user'],
      confirmPassword: '',
    },
  });

  const handleSubmit = async (data: CreateUserInput) => {
    setRootError(undefined);
    setIsLoading(true);

    try {
      const { confirmPassword: _, ...submitData } = data;
      await onSubmit(submitData);
    } catch (error) {
      setRootError(
        error instanceof Error ? error.message : t('Failed to create user')
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormProvider form={form} onSubmit={handleSubmit}>
      <FormError message={rootError} />

      <ControlledInput<CreateUserInput>
        name="email"
        label={t('Email')}
        type="email"
        placeholder={t('user@example.com')}
        disabled={isLoading}
        autoComplete="email"
      />

      <ControlledInput<CreateUserInput>
        name="firstName"
        label={t('First Name')}
        type="text"
        placeholder={t('John')}
        disabled={isLoading}
      />

      <ControlledInput<CreateUserInput>
        name="lastName"
        label={t('Last Name')}
        type="text"
        placeholder={t('Doe')}
        disabled={isLoading}
      />

      <ControlledInput<CreateUserInput>
        name="password"
        label={t('Password')}
        type="password"
        placeholder={t('Enter password')}
        disabled={isLoading}
        autoComplete="new-password"
      />

      <ControlledInput<CreateUserInput>
        name="confirmPassword"
        label={t('Confirm Password')}
        type="password"
        placeholder={t('Confirm password')}
        disabled={isLoading}
        autoComplete="new-password"
      />

      <div className="space-y-2">
        <label className="text-sm font-medium">{t('Roles')}</label>
        <div className="flex gap-4">
          {(['user', 'moderator', 'admin'] as const).map((role) => (
            <label key={role} className="flex items-center gap-2">
              <input
                type="checkbox"
                value={role}
                {...form.register('roles')}
                disabled={isLoading}
                className="h-4 w-4 rounded border-gray-300"
              />
              <span className="text-sm capitalize">{role}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? t('Creating...') : t('Create User')}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
        >
          {t('Cancel')}
        </Button>
      </div>
    </FormProvider>
  );
}
