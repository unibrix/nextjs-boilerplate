'use client';

import { useTranslation } from 'react-i18next';

export function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            &copy; {currentYear} {t('NextJS Boilerplate. All rights reserved.')}
          </p>
        </div>
        <nav className="flex items-center space-x-4 text-sm">
          {/* Privacy and Terms pages to be added */}
        </nav>
      </div>
    </footer>
  );
}
