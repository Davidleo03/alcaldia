'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  LayoutDashboard,
  FileText,
  Plus,
  Clock,
  CheckCircle,
  Package,
  Settings,
  ChevronDown,
  Truck,
  AlertTriangle,
  Shield,
  BarChart3,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const sections: NavSection[] = [
    {
      title: 'Panel Principal',
      items: [
        {
          label: 'Tablero de Control',
          href: '/',
          icon: <LayoutDashboard className="w-5 h-5" />,
        },
      ],
    },
    {
      title: 'Pilar 1: Automatización Logística',
      items: [
        {
          label: 'Todas las Solicitudes',
          href: '/solicitudes',
          icon: <FileText className="w-5 h-5" />,
        },
        {
          label: 'Nueva Solicitud',
          href: '/solicitudes/nueva',
          icon: <Plus className="w-5 h-5" />,
        },
        {
          label: 'Mis Solicitudes',
          href: '/mis-solicitudes',
          icon: <Truck className="w-5 h-5" />,
        },
        {
          label: 'Aprobaciones Pendientes',
          href: '/aprobaciones',
          icon: <Clock className="w-5 h-5" />,
          badge: 2,
        },
        {
          label: 'Completadas',
          href: '/completadas',
          icon: <CheckCircle className="w-5 h-5" />,
        },
      ],
    },
    {
      title: 'Pilar 2: Control de Inventario',
      items: [
        {
          label: 'Inventario',
          href: '/inventario',
          icon: <Package className="w-5 h-5" />,
        },
        {
          label: 'Alertas de Stock',
          href: '/alertas',
          icon: <AlertTriangle className="w-5 h-5" />,
          badge: 3,
        },
      ],
    },
    {
      title: 'Pilar 3: Auditoría e Historial',
      items: [
        {
          label: 'Registro de Auditoría',
          href: '/auditoria',
          icon: <Shield className="w-5 h-5" />,
        },
      ],
    },
    {
      title: 'Pilar 4: Inteligencia Administrativa',
      items: [
        {
          label: 'Reportes y Análisis',
          href: '/reportes',
          icon: <BarChart3 className="w-5 h-5" />,
        },
      ],
    },
    {
      title: 'Sistema',
      items: [
        {
          label: 'Configuración',
          href: '/configuracion',
          icon: <Settings className="w-5 h-5" />,
        },
      ],
    },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="fixed top-5 left-4 z-50 md:hidden bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Abrir menú"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Sidebar - Fixed en móvil, Static en desktop */}
      <aside
        className={`fixed left-0 top-16 w-64 h-[calc(100vh-4rem)] bg-gray-900 text-white transition-transform duration-300 ease-in-out z-30 md:static md:translate-x-0 md:top-0 md:h-auto md:flex md:flex-col overflow-hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <nav className="p-4 md:p-6 space-y-6 md:space-y-8 overflow-y-auto flex-1">
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-2">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center justify-between px-3 py-2 rounded-lg transition-all ${
                        isActive(item.href)
                          ? 'bg-red-600 text-white'
                          : 'text-gray-300 hover:bg-gray-800'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="flex items-center gap-3">
                        {item.icon}
                        <span className="text-sm font-medium">{item.label}</span>
                      </span>
                      {item.badge && (
                        <span className="bg-yellow-400 text-gray-900 text-xs font-bold px-2 py-1 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
