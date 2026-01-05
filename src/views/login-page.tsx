'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { CenteredLayout } from '@/layouts';
import { LoginForm } from '@/components/forms';

export function LoginPage() {
  const { t } = useTranslation();

  return (
    <CenteredLayout
      header={
        <>
          <Link href="/" className="mx-auto mb-4">
            <span className="text-2xl font-bold">
              {t('NextJS Boilerplate')}
            </span>
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight">
            {t('Welcome back')}
          </h1>
          <p className="text-sm text-muted-foreground">
            {t('Enter your credentials to sign in to your account')}
          </p>
        </>
      }
    >
      <LoginForm />
    </CenteredLayout>
  );
}
