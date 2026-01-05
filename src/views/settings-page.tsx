'use client';

import { useTranslation } from 'react-i18next';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui';
import { UpdateProfileForm } from '@/components/forms';

export function SettingsPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('Settings')}</h1>
        <p className="text-muted-foreground">
          {t('Manage your profile and application settings.')}
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t('Profile Information')}</CardTitle>
            <CardDescription>
              {t('Update your personal information and password.')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <UpdateProfileForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
