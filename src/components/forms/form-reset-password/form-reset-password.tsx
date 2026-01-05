'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { FormProvider } from '@/core';
import { ControlledInput } from '@/components/fields';
import { FormError } from '@/lib/helpers';
import { Button } from '@/components/ui';

import { api } from '@/lib/api-client';
import {
  resetPasswordSchema,
  type ResetPasswordInput,
} from './form-reset-password.validation';

export function ResetPasswordForm() {
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [isLoading, setIsLoading] = useState(false);
  const [rootError, setRootError] = useState<string>();
  const [success, setSuccess] = useState(false);

  const form = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token: token || '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: ResetPasswordInput) => {
    setRootError(undefined);
    setIsLoading(true);

    try {
      await api.authControllerResetPassword({
        token: data.token,
        newPassword: data.newPassword,
      });
      setSuccess(true);
      setTimeout(() => router.push('/auth/login'), 2000);
    } catch (error) {
      setRootError(
        error instanceof Error ? error.message : t('Failed to reset password')
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="space-y-4">
        <div className="rounded-lg bg-red-50 p-4 text-red-800 dark:bg-red-900/20 dark:text-red-400">
          <p className="text-sm">{t('Invalid or missing reset token.')}</p>
        </div>
        <Link href="/auth/forgot-password">
          <Button variant="outline" className="w-full">
            {t('Request new reset link')}
          </Button>
        </Link>
      </div>
    );
  }

  if (success) {
    return (
      <div className="space-y-4">
        <div className="rounded-lg bg-green-50 p-4 text-green-800 dark:bg-green-900/20 dark:text-green-400">
          <p className="text-sm">
            {t('Password reset successful! Redirecting to login...')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <FormProvider form={form} onSubmit={onSubmit}>
      <FormError message={rootError} />

      <ControlledInput<ResetPasswordInput>
        name="newPassword"
        label={t('New Password')}
        type="password"
        placeholder={t('Enter new password')}
        disabled={isLoading}
        autoComplete="new-password"
      />

      <ControlledInput<ResetPasswordInput>
        name="confirmPassword"
        label={t('Confirm Password')}
        type="password"
        placeholder={t('Confirm new password')}
        disabled={isLoading}
        autoComplete="new-password"
      />

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? t('Resetting...') : t('Reset password')}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        {t('Remember your password?')}{' '}
        <Link
          href="/auth/login"
          className="text-primary underline-offset-4 hover:underline"
        >
          {t('Sign in')}
        </Link>
      </p>
    </FormProvider>
  );
}
