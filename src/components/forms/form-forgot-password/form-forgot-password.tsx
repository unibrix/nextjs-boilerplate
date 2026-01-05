'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';

import Link from 'next/link';

import { FormProvider } from '@/core';
import { ControlledInput } from '@/components/fields';
import { FormError } from '@/lib/helpers';
import { Button } from '@/components/ui';

import { api } from '@/lib/api-client';
import {
  forgotPasswordSchema,
  type ForgotPasswordInput,
} from './form-forgot-password.validation';

export function ForgotPasswordForm() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [rootError, setRootError] = useState<string>();
  const [success, setSuccess] = useState(false);

  const form = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordInput) => {
    setRootError(undefined);
    setSuccess(false);
    setIsLoading(true);

    try {
      await api.authControllerForgotPassword(data);
      setSuccess(true);
      form.reset();
    } catch (error) {
      setRootError(
        error instanceof Error ? error.message : t('Failed to send reset email')
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="space-y-4">
        <div className="rounded-lg bg-green-50 p-4 text-green-800 dark:bg-green-900/20 dark:text-green-400">
          <p className="text-sm">
            {t(
              'If an account exists with this email, you will receive a password reset link shortly.'
            )}
          </p>
        </div>
        <Link href="/auth/login">
          <Button variant="outline" className="w-full">
            {t('Back to sign in')}
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <FormProvider form={form} onSubmit={onSubmit}>
      <FormError message={rootError} />

      <ControlledInput<ForgotPasswordInput>
        name="email"
        label={t('Email')}
        type="email"
        placeholder={t('name@example.com')}
        disabled={isLoading}
        autoComplete="email"
      />

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? t('Sending...') : t('Send reset link')}
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
