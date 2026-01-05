'use client';

import type { ElementType } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Route } from 'next';
import { useTranslation } from 'react-i18next';

import { Home, LayoutDashboard, Settings, Users, Shield } from 'lucide-react';

import { Button, Separator } from '@/components/ui';
import { useAuth } from '@/hooks/use-auth';
import { cn } from '@/lib/utils';

interface SidebarProps {
  className?: string;
}

interface NavItem {
  title: string;
  href: Route;
  icon: ElementType;
}

const navItems: NavItem[] = [
  {
    title: 'Home',
    href: '/',
    icon: Home,
  },
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Profile',
    href: '/profile',
    icon: Users,
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
  },
];

export function Sidebar({ className }: SidebarProps) {
  const { t } = useTranslation();
  const pathname = usePathname();
  const { user } = useAuth();

  const isAdmin = user?.roles?.includes('admin');

  return (
    <aside className={cn('pb-12', className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            {t('Navigation')}
          </h2>
          <div className="space-y-1">
            {navItems.map((item) => (
              <Button
                key={item.href}
                variant={pathname === item.href ? 'secondary' : 'ghost'}
                className="w-full justify-start"
                asChild
              >
                <Link href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {t(item.title)}
                </Link>
              </Button>
            ))}
            {isAdmin && (
              <Button
                variant={pathname === '/admin' ? 'secondary' : 'ghost'}
                className="w-full justify-start"
                asChild
              >
                <Link href="/admin">
                  <Shield className="mr-2 h-4 w-4" />
                  {t('Admin')}
                </Link>
              </Button>
            )}
          </div>
        </div>
        <Separator />
      </div>
    </aside>
  );
}
