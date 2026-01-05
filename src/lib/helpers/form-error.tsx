'use client';

import { cn } from '@/lib/utils';

interface FormErrorProps {
  message?: string;
  className?: string;
}

export function FormError({ message, className }: FormErrorProps) {
  if (!message) return null;

  return (
    <div
      className={cn(
        'rounded-md bg-destructive/10 p-3 text-sm text-destructive',
        className
      )}
      role="alert"
    >
      {message}
    </div>
  );
}
