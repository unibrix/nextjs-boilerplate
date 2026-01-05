'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { CenteredLayout } from '@/layouts';
import { ResetPasswordForm } from '@/components/forms';

export function ResetPasswordPage() {
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
            {t('Reset password')}
          </h1>
          <p className="text-sm text-muted-foreground">
            {t('Enter your new password below')}
          </p>
        </>
      }
    >
      <ResetPasswordForm />
    </CenteredLayout>
  );
}
