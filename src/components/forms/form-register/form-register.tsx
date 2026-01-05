'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { FormProvider } from '@/core';
import { ControlledInput } from '@/components/fields';
import { FormError } from '@/lib/helpers';
import { Button } from '@/components/ui';

import { useAuth } from '@/hooks/use-auth';
import { registerSchema, type RegisterInput } from './form-register.validation';
import { GoogleAuthButton } from '@/components/google-auth-button';

export function RegisterForm() {
  const { t } = useTranslation();
  const router = useRouter();
  const { register: registerUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [rootError, setRootError] = useState<string>();

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: RegisterInput) => {
    setRootError(undefined);
    setIsLoading(true);

    try {
      await registerUser(data);
      router.push('/dashboard');
    } catch (error) {
      setRootError(
        error instanceof Error ? error.message : t('Registration failed')
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormProvider form={form} onSubmit={onSubmit}>
      <FormError message={rootError} />

      <ControlledInput<RegisterInput>
        name="email"
        label={t('Email')}
        type="email"
        placeholder={t('name@example.com')}
        disabled={isLoading}
        autoComplete="email"
      />

      <ControlledInput<RegisterInput>
        name="firstName"
        label={t('First Name (Optional)')}
        type="text"
        placeholder={t('John')}
        disabled={isLoading}
        autoComplete="given-name"
      />

      <ControlledInput<RegisterInput>
        name="lastName"
        label={t('Last Name (Optional)')}
        type="text"
        placeholder={t('Doe')}
        disabled={isLoading}
        autoComplete="family-name"
      />

      <ControlledInput<RegisterInput>
        name="password"
        label={t('Password')}
        type="password"
        placeholder={t('Create a password')}
        disabled={isLoading}
        autoComplete="new-password"
      />

      <ControlledInput<RegisterInput>
        name="confirmPassword"
        label={t('Confirm Password')}
        type="password"
        placeholder={t('Confirm your password')}
        disabled={isLoading}
        autoComplete="new-password"
      />

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? t('Creating account...') : t('Create account')}
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
        {t('Already have an account?')}{' '}
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
