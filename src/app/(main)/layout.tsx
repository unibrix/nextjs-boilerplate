'use client';

import type { ReactNode } from 'react';

import { SidebarLayout } from '@/layouts';
import { Header, Sidebar, Footer } from '@/components';

export default function MainGroupLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarLayout
      header={({ onMenuClick }: { onMenuClick: () => void }) => (
        <Header onMenuClick={onMenuClick} />
      )}
      sidebar={<Sidebar />}
      footer={<Footer />}
    >
      {children}
    </SidebarLayout>
  );
}
