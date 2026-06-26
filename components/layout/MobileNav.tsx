'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Package,
  ClipboardList,
  Building2,
  Users,
  BarChart3,
} from 'lucide-react';

const iconMap = {
  LayoutDashboard,
  Package,
  ClipboardList,
  Building2,
  Users,
  BarChart3,
};

const navigationItems = {
  admin: [
    { href: '/dashboard', label: 'Tablero', icon: 'LayoutDashboard' },
    { href: '/inventory', label: 'Inventario', icon: 'Package' },
    { href: '/requests', label: 'Solicitudes', icon: 'ClipboardList' },
    { href: '/settings/departments', label: 'Dpto.', icon: 'Building2' },
    { href: '/settings/users', label: 'Usuarios', icon: 'Users' },
    { href: '/audit', label: 'Auditoría', icon: 'BarChart3' },
  ],
  'department-user': [
    { href: '/dashboard', label: 'Tablero', icon: 'LayoutDashboard' },
    { href: '/requests', label: 'Solicitudes', icon: 'ClipboardList' },
  ],
};

export function MobileNav() {
  const pathname = usePathname();
  const { session } = useAuth();

  if (!session) return null;

  const items = navigationItems[session.role];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 border-t-2 border-sidebar-border bg-sidebar">
      <div className="flex justify-around h-16">
        {items.map((item) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap];
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center flex-1 text-xs font-medium transition-colors',
                isActive
                  ? 'text-primary-foreground border-t-4 border-primary bg-sidebar/60'
                  : 'text-sidebar-foreground/70 hover:text-sidebar-foreground'
              )}
            >
              <Icon className="h-5 w-5 mb-1" />
              <span className="truncate px-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
