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
  updateUserSchema,
  type UpdateUserInput,
} from './form-admin-update-user.validation';
import type { UserResponseDto } from '@/api/generated/data-contracts';

interface AdminUpdateUserFormProps {
  user: UserResponseDto;
  onSubmit: (data: UpdateUserInput) => Promise<void>;
  onCancel: () => void;
}

export function AdminUpdateUserForm({
  user,
  onSubmit,
  onCancel,
}: AdminUpdateUserFormProps) {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [rootError, setRootError] = useState<string>();

  const form = useForm<UpdateUserInput>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      roles: user.roles,
      isActive: user.isActive,
    },
  });

  const handleSubmit = async (data: UpdateUserInput) => {
    setRootError(undefined);
    setIsLoading(true);

    try {
      await onSubmit(data);
    } catch (error) {
      setRootError(
        error instanceof Error ? error.message : t('Failed to update user')
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormProvider form={form} onSubmit={handleSubmit}>
      <FormError message={rootError} />

      <div className="rounded-lg bg-muted/50 p-3 text-sm">
        <p>
          <span className="font-medium">{t('Email')}:</span> {user.email}
        </p>
        <p>
          <span className="font-medium">{t('Provider')}:</span> {user.provider}
        </p>
      </div>

      <ControlledInput<UpdateUserInput>
        name="firstName"
        label={t('First Name')}
        type="text"
        placeholder={t('John')}
        disabled={isLoading}
      />

      <ControlledInput<UpdateUserInput>
        name="lastName"
        label={t('Last Name')}
        type="text"
        placeholder={t('Doe')}
        disabled={isLoading}
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

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          {...form.register('isActive')}
          disabled={isLoading}
          className="h-4 w-4 rounded border-gray-300"
        />
        <label className="text-sm font-medium">{t('Active')}</label>
      </div>

      <div className="flex gap-2">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? t('Updating...') : t('Update User')}
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
