import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Inter } from 'next/font/google';

import { Providers } from '@/core';

import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'NextJS Boilerplate',
    template: '%s | NextJS Boilerplate',
  },
  description: 'A modern Next.js boilerplate with TypeScript and shadcn/ui',
  keywords: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'shadcn/ui'],
  authors: [{ name: 'Your Name' }],
  creator: 'Your Name',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
