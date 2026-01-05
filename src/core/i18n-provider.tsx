'use client';

import { type ReactNode, useEffect, useState } from 'react';

import { I18nextProvider } from 'react-i18next';

import i18n from '@/i18n';

interface I18nProviderProps {
  children: ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // i18n is already initialized in the config, but we wait for it to be ready
    if (i18n.isInitialized) {
      setIsInitialized(true);
    } else {
      i18n.on('initialized', () => {
        setIsInitialized(true);
      });
    }
  }, []);

  // Prevent hydration mismatch by rendering null on server
  if (!isInitialized) {
    return null;
  }

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
