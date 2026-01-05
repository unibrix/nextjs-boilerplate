'use client';

import { useTranslation } from 'react-i18next';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui';

function StatsCard({
  title,
  value,
  change,
}: {
  title: string;
  value: string;
  change: string;
}) {
  const { t } = useTranslation();
  const isPositive = change.startsWith('+');

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p
          className={`text-xs ${isPositive ? 'text-green-600' : 'text-red-600'}`}
        >
          {change} {t('from last month')}
        </p>
      </CardContent>
    </Card>
  );
}

export function DashboardPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('Dashboard')}</h1>
        <p className="text-muted-foreground">
          {t("Welcome to your dashboard. Here's an overview of your account.")}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard title={t('Total Users')} value="2,350" change="+12.5%" />
        <StatsCard title={t('Active Sessions')} value="1,247" change="+8.2%" />
        <StatsCard title={t('Revenue')} value="$45,231" change="+20.1%" />
        <StatsCard title={t('Pending Tasks')} value="12" change="-4.5%" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t('Recent Activity')}</CardTitle>
            <CardDescription>
              {t('Your latest actions and updates')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: t('Logged in'), time: t('2 minutes ago') },
                { action: t('Updated profile'), time: t('1 hour ago') },
                { action: t('Created new project'), time: t('3 hours ago') },
                { action: t('Invited team member'), time: t('1 day ago') },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between border-b pb-2 last:border-0"
                >
                  <span className="text-sm">{item.action}</span>
                  <span className="text-xs text-muted-foreground">
                    {item.time}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('Quick Actions')}</CardTitle>
            <CardDescription>{t('Frequently used features')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              {[
                t('Create New Project'),
                t('Invite Team Member'),
                t('Generate Report'),
                t('View Analytics'),
              ].map((action, i) => (
                <button
                  key={i}
                  className="w-full rounded-md border p-3 text-left text-sm transition-colors hover:bg-accent"
                >
                  {action}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
