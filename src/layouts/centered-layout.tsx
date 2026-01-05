import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface CenteredLayoutProps {
  children: ReactNode;
  header?: ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const maxWidthClasses = {
  sm: 'sm:w-[350px]',
  md: 'sm:w-[450px]',
  lg: 'sm:w-[550px]',
  xl: 'sm:w-[650px]',
};

/**
 * Centered Layout - Layout wireframe for centered content
 * Used for auth pages, error pages, simple forms
 * Defines slots for optional header and centered content
 */
export function CenteredLayout({
  children,
  header,
  maxWidth = 'sm',
  className,
}: CenteredLayoutProps) {
  return (
    <div
      className={cn(
        'container flex min-h-screen flex-col items-center justify-center',
        className
      )}
    >
      <div
        className={cn(
          'mx-auto flex w-full flex-col justify-center space-y-6',
          maxWidthClasses[maxWidth]
        )}
      >
        {/* Header slot for titles, logos, etc */}
        {header && (
          <div className="flex flex-col space-y-2 text-center">{header}</div>
        )}
        {/* Main content slot */}
        {children}
      </div>
    </div>
  );
}
