'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { CenteredLayout } from '@/layouts';
import { RegisterForm } from '@/components/forms';

export function RegisterPage() {
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
            {t('Create an account')}
          </h1>
          <p className="text-sm text-muted-foreground">
            {t('Enter your information to create your account')}
          </p>
        </>
      }
    >
      <RegisterForm />
    </CenteredLayout>
  );
}
