'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Package,
  ClipboardList,
  Building2,
  Users,
  BarChart3,
  ChevronLeft,
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
    { href: '/dashboard', label: 'Tablero de Control', icon: 'LayoutDashboard' },
    { href: '/inventory', label: 'Inventario', icon: 'Package' },
    { href: '/requests', label: 'Solicitudes', icon: 'ClipboardList' },
    { href: '/settings/departments', label: 'Departamentos', icon: 'Building2' },
    { href: '/settings/users', label: 'Usuarios', icon: 'Users' },
    { href: '/audit', label: 'Auditoría', icon: 'BarChart3' },
  ],
  'department-user': [
    { href: '/dashboard', label: 'Tablero de Control', icon: 'LayoutDashboard' },
    { href: '/requests', label: 'Mis Solicitudes', icon: 'ClipboardList' },
  ],
};

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();
  const { session } = useAuth();

  if (!session) return null;

  const items = navigationItems[session.role];

  return (
    <div
      className={cn(
        'hidden md:flex flex-col h-full bg-sidebar border-r border-sidebar-border transition-all duration-300',
        isOpen ? 'w-64' : 'w-20'
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border bg-sidebar">
        {isOpen && <h2 className="text-sm font-bold text-sidebar-foreground uppercase tracking-wider">Panel Principal</h2>}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="ml-auto text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar/70"
        >
          <ChevronLeft className={cn('h-4 w-4 transition-transform', isOpen && 'rotate-180')} />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-2 overflow-y-auto">
        {items.map((item) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap];
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? 'default' : 'ghost'}
                className={cn(
                  'w-full justify-start text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar/70',
                  isActive && 'bg-primary hover:bg-primary/90 text-primary-foreground'
                )}
              >
                <Icon className="h-5 w-5" />
                {isOpen && <span className="ml-3">{item.label}</span>}
              </Button>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
