'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { CenteredLayout } from '@/layouts';
import { ForgotPasswordForm } from '@/components/forms';

export function ForgotPasswordPage() {
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
            {t('Forgot password?')}
          </h1>
          <p className="text-sm text-muted-foreground">
            {t('Enter your email to receive a password reset link')}
          </p>
        </>
      }
    >
      <ForgotPasswordForm />
    </CenteredLayout>
  );
}
