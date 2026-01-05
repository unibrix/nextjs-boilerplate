'use client';

import type { ReactNode } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './auth-provider';
import { I18nProvider } from './i18n-provider';
import { QueryProvider } from './query-provider';
import { Toaster } from './toaster';
import { RouteGuard } from '@/components/route-guard';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <QueryProvider>
        <I18nProvider>
          <AuthProvider>
            <RouteGuard>{children}</RouteGuard>
            <Toaster />
          </AuthProvider>
        </I18nProvider>
      </QueryProvider>
    </GoogleOAuthProvider>
  );
}
