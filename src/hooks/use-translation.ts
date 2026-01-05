'use client';

import { useTranslation as useI18nTranslation } from 'react-i18next';

import type { SupportedLanguage } from '@/i18n';

/**
 * Custom hook for translations with typed namespace
 * Wraps react-i18next's useTranslation hook
 */
export function useTranslation(ns: string = 'common') {
  const { t, i18n } = useI18nTranslation(ns);

  const changeLanguage = (lang: SupportedLanguage) => {
    i18n.changeLanguage(lang);
  };

  return {
    t,
    i18n,
    language: i18n.language as SupportedLanguage,
    changeLanguage,
  };
}
