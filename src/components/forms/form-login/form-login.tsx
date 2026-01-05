'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui';
import { FormProvider } from '@/core';
import { ControlledInput } from '@/components/fields';
import { FormError } from '@/lib/helpers';
import { useAuth } from '@/hooks/use-auth';
import { loginSchema, type LoginInput } from './form-login.validation';
import { GoogleAuthButton } from '@/components/google-auth-button';

export function LoginForm() {
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [rootError, setRootError] = useState<string>();

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginInput) => {
    setRootError(undefined);
    setIsLoading(true);

    try {
      await login(data);

      const redirect = searchParams.get('redirect');
      router.push((redirect as any) || '/dashboard'); // eslint-disable-line
    } catch (error) {
      setRootError(error instanceof Error ? error.message : t('Login failed'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormProvider form={form} onSubmit={onSubmit}>
      <FormError message={rootError} />

      <ControlledInput<LoginInput>
        name="email"
        label={t('Email')}
        type="email"
        placeholder={t('name@example.com')}
        disabled={isLoading}
        autoComplete="email"
      />

      <ControlledInput<LoginInput>
        name="password"
        label={t('Password')}
        type="password"
        placeholder={t('Enter your password')}
        disabled={isLoading}
        autoComplete="current-password"
      />

      <div className="flex items-center justify-end">
        <Link
          href="/auth/forgot-password"
          className="text-sm text-primary underline-offset-4 hover:underline"
        >
          {t('Forgot password?')}
        </Link>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? t('Signing in...') : t('Sign in')}
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            {t('Or continue with')}
          </span>
        </div>
      </div>

      <GoogleAuthButton />

      <p className="text-center text-sm text-muted-foreground">
        {t("Don't have an account?")}{' '}
        <Link
          href="/auth/register"
          className="text-primary underline-offset-4 hover:underline"
        >
          {t('Sign up')}
        </Link>
      </p>
    </FormProvider>
  );
}
