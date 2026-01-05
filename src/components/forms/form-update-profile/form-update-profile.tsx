'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui';
import { FormProvider } from '@/core';
import { ControlledInput } from '@/components/fields';
import { FormError } from '@/lib/helpers';
import { useAuth } from '@/hooks/use-auth';
import { useUpdateProfile } from '@/hooks/use-users';
import {
  updateProfileSchema,
  type UpdateProfileInput,
} from './form-update-profile.validation';

interface UpdateProfileFormProps {
  onSuccess?: () => void;
}

export function UpdateProfileForm({ onSuccess }: UpdateProfileFormProps) {
  const { t } = useTranslation();
  const { user, updateUser } = useAuth();
  const [rootError, setRootError] = useState<string>();
  const [success, setSuccess] = useState(false);

  const updateProfileMutation = useUpdateProfile();

  const form = useForm<UpdateProfileInput>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: UpdateProfileInput) => {
    setRootError(undefined);
    setSuccess(false);

    try {
      const { confirmPassword: _confirmPassword, ...updateData } = data;

      const cleanData: any = {}; // eslint-disable-line
      if (updateData.firstName) cleanData.firstName = updateData.firstName;
      if (updateData.lastName) cleanData.lastName = updateData.lastName;
      if (updateData.newPassword) {
        cleanData.newPassword = updateData.newPassword;
        cleanData.currentPassword = updateData.currentPassword;
      }

      const updatedUser = await updateProfileMutation.mutateAsync(cleanData);
      updateUser(updatedUser);
      setSuccess(true);

      form.setValue('currentPassword', '');
      form.setValue('newPassword', '');
      form.setValue('confirmPassword', '');

      setTimeout(() => setSuccess(false), 3000);

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      setRootError(
        error instanceof Error ? error.message : t('Failed to update profile')
      );
    }
  };

  return (
    <FormProvider form={form} onSubmit={onSubmit}>
      <FormError message={rootError} />

      {success && (
        <div className="rounded-lg bg-green-50 p-4 text-green-800 dark:bg-green-900/20 dark:text-green-400">
          <p className="text-sm">{t('Profile updated successfully!')}</p>
        </div>
      )}

      <ControlledInput<UpdateProfileInput>
        name="firstName"
        label={t('First Name')}
        type="text"
        placeholder={t('John')}
        disabled={updateProfileMutation.isPending}
      />

      <ControlledInput<UpdateProfileInput>
        name="lastName"
        label={t('Last Name')}
        type="text"
        placeholder={t('Doe')}
        disabled={updateProfileMutation.isPending}
      />

      <div className="border-t pt-4">
        <h3 className="mb-4 text-sm font-medium">{t('Change Password')}</h3>

        <ControlledInput<UpdateProfileInput>
          name="currentPassword"
          label={t('Current Password')}
          type="password"
          placeholder={t('Enter current password')}
          disabled={updateProfileMutation.isPending}
          autoComplete="current-password"
        />

        <ControlledInput<UpdateProfileInput>
          name="newPassword"
          label={t('New Password')}
          type="password"
          placeholder={t('Enter new password')}
          disabled={updateProfileMutation.isPending}
          autoComplete="new-password"
        />

        <ControlledInput<UpdateProfileInput>
          name="confirmPassword"
          label={t('Confirm New Password')}
          type="password"
          placeholder={t('Confirm new password')}
          disabled={updateProfileMutation.isPending}
          autoComplete="new-password"
        />
      </div>

      <Button type="submit" disabled={updateProfileMutation.isPending}>
        {updateProfileMutation.isPending ? t('Saving...') : t('Save Changes')}
      </Button>
    </FormProvider>
  );
}
