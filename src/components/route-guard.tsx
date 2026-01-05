'use client';

import { type ReactNode, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';

interface RouteGuardProps {
  children: ReactNode;
}

export function RouteGuard({ children }: RouteGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isLoading } = useAuth();

  // Protected routes - require authentication
  const protectedRoutes = ['/dashboard', '/profile', '/settings', '/admin'];

  // Auth routes - redirect to dashboard if already logged in
  const authRoutes = ['/auth/login', '/auth/register'];

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  useEffect(() => {
    // Wait for auth state to load
    if (isLoading) {
      return;
    }

    // Redirect to login if trying to access protected route without authentication
    if (isProtectedRoute && !isAuthenticated) {
      router.push(`/auth/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }

    // Redirect to dashboard if trying to access auth routes while authenticated
    if (isAuthRoute && isAuthenticated) {
      router.push('/dashboard');
      return;
    }
  }, [
    isAuthenticated,
    isLoading,
    pathname,
    router,
    isProtectedRoute,
    isAuthRoute,
  ]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  // Block access to protected routes without authentication
  if (isProtectedRoute && !isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  // Block access to auth routes when authenticated
  if (isAuthRoute && isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return <>{children}</>;
}
