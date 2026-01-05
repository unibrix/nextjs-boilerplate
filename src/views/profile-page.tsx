'use client';

import { useTranslation } from 'react-i18next';
import { UserAvatar } from '@/components';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Separator,
} from '@/components/ui';
import { useAuth } from '@/hooks/use-auth';

export function ProfilePage() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const userName =
    user?.firstName || user?.lastName
      ? `${user?.firstName || ''} ${user?.lastName || ''}`.trim()
      : t('Not set');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('Profile')}</h1>
        <p className="text-muted-foreground">
          {t('Manage your account settings and preferences.')}
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t('Profile Information')}</CardTitle>
            <CardDescription>
              {t('Update your profile details and avatar.')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-6">
              <UserAvatar name={userName} size="lg" className="h-20 w-20" />
              <div>
                <Button variant="outline" size="sm">
                  {t('Change Avatar')}
                </Button>
                <p className="mt-1 text-xs text-muted-foreground">
                  {t('JPG, GIF or PNG. Max size 2MB.')}
                </p>
              </div>
            </div>

            <Separator />

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium">{t('Name')}</label>
                <p className="mt-1 text-sm text-muted-foreground">{userName}</p>
              </div>
              <div>
                <label className="text-sm font-medium">{t('Email')}</label>
                <p className="mt-1 text-sm text-muted-foreground">
                  {user?.email || t('Not set')}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium">{t('Roles')}</label>
                <p className="mt-1 text-sm capitalize text-muted-foreground">
                  {user?.roles?.join(', ') || t('User')}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium">
                  {t('Member Since')}
                </label>
                <p className="mt-1 text-sm text-muted-foreground">
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : t('N/A')}
                </p>
              </div>
            </div>

            <div className="flex justify-end">
              <Button>{t('Edit Profile')}</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('Password')}</CardTitle>
            <CardDescription>
              {t('Change your password to keep your account secure.')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline">{t('Change Password')}</Button>
          </CardContent>
        </Card>

        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">
              {t('Danger Zone')}
            </CardTitle>
            <CardDescription>
              {t('Irreversible actions for your account.')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="destructive">{t('Delete Account')}</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
