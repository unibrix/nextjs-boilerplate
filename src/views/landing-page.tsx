'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui';

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
}

export function LandingPage() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-8 px-4 py-16">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            {t('NextJS Boilerplate')}
          </h1>
          <p className="max-w-[600px] text-center text-base text-muted-foreground sm:text-lg">
            {t(
              'A modern, production-ready boilerplate with Next.js, TypeScript, Tailwind CSS, and shadcn/ui. Built with feature-based architecture and clean separation of concerns.'
            )}
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/dashboard">{t('Get Started')}</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/auth/login">{t('Sign In')}</Link>
          </Button>
        </div>

        <div className="mt-12 w-full grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            title={t('Feature-Based')}
            description={t(
              'Components organized by feature with prefix naming for clear structure and maintainability.'
            )}
          />
          <FeatureCard
            title={t('Clean Architecture')}
            description={t(
              'Separation of concerns with dedicated directories for routes, views, components, and layouts.'
            )}
          />
          <FeatureCard
            title={t('shadcn/ui')}
            description={t(
              'Beautiful, accessible components built with Radix UI and Tailwind CSS.'
            )}
          />
          <FeatureCard
            title={t('Type Safe')}
            description={t(
              'Full TypeScript support with strict type checking and Zod validation.'
            )}
          />
          <FeatureCard
            title={t('API Ready')}
            description={t(
              'Auto-generated API client from OpenAPI/Swagger with full type safety.'
            )}
          />
          <FeatureCard
            title={t('Authentication')}
            description={t(
              'Complete auth flow with login, register, Google OAuth, and protected routes.'
            )}
          />
        </div>
      </div>
    </div>
  );
}
