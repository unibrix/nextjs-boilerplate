'use client';

import { type ReactNode, useState } from 'react';

import { cn } from '@/lib/utils';

type HeaderRenderFunction = (props: { onMenuClick: () => void }) => ReactNode;

interface SidebarLayoutProps {
  children: ReactNode;
  header?: ReactNode | HeaderRenderFunction;
  sidebar?: ReactNode;
  footer?: ReactNode;
  className?: string;
}

/**
 * Sidebar Layout - Layout wireframe with sidebar
 * Defines slots for header, sidebar, main content, and footer
 * Handles responsive sidebar toggle logic
 */
export function SidebarLayout({
  children,
  header,
  sidebar,
  footer,
  className,
}: SidebarLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderHeader = () => {
    if (!header) return null;
    if (typeof header === 'function') {
      return (header as HeaderRenderFunction)({
        onMenuClick: () => setSidebarOpen(!sidebarOpen),
      });
    }
    return header;
  };

  return (
    <div className={cn('relative flex min-h-screen flex-col', className)}>
      {/* Header slot with sidebar toggle callback */}
      {header && <div className="sticky top-0 z-50">{renderHeader()}</div>}

      <div className="flex flex-1">
        {/* Sidebar slot */}
        {sidebar && (
          <>
            {/* Mobile overlay */}
            {sidebarOpen && (
              <div
                className="fixed inset-0 z-40 bg-black/50 md:hidden"
                onClick={() => setSidebarOpen(false)}
              />
            )}
            {/* Sidebar container */}
            <aside
              className={cn(
                'fixed inset-y-0 left-0 z-50 w-64 transform border-r bg-background transition-transform duration-200 ease-in-out md:relative md:translate-x-0',
                sidebarOpen ? 'translate-x-0' : '-translate-x-full'
              )}
            >
              {sidebar}
            </aside>
          </>
        )}

        {/* Main content slot */}
        <main className="flex-1 overflow-auto">
          <div className="container py-6">{children}</div>
        </main>
      </div>

      {/* Footer slot */}
      {footer && <div className="mt-auto">{footer}</div>}
    </div>
  );
}
