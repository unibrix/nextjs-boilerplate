import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: ReactNode;
  header?: ReactNode;
  sidebar?: ReactNode;
  stats?: ReactNode;
  className?: string;
}

/**
 * Dashboard Layout - Layout wireframe for dashboard pages
 * Defines grid with stats area and main content
 */
export function DashboardLayout({
  children,
  header,
  sidebar: _sidebar,
  stats,
  className,
}: DashboardLayoutProps) {
  return (
    <div className={cn('space-y-6', className)}>
      {/* Page header slot */}
      {header && <div>{header}</div>}

      {/* Stats grid slot */}
      {stats && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">{stats}</div>
      )}

      {/* Main content grid */}
      <div className="grid gap-4 md:grid-cols-2">{children}</div>
    </div>
  );
}
