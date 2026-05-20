export const APP_TITLE = 'Sistema de Inventario Alcaldía';
export const APP_VERSION = '1.0.0';

export const CATEGORIES = [
  'Mobiliario de oficina',
  'Suministros de oficina',
  'Equipo de TI',
  'Mantenimiento',
  'Limpieza',
  'Equipo de seguridad',
  'Otro',
];

export const UNITS_OF_MEASURE = [
  'unidades',
  'cajas',
  'resmas',
  'litros',
  'kilogramos',
  'juegos',
];

export const REQUEST_TYPES = [
  { value: 'office', label: 'Oficina' },
  { value: 'operative', label: 'Operativo' },
];

export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  INVENTORY: '/inventory',
  REQUESTS: '/requests',
  DEPARTMENTS: '/settings/departments',
  USERS: '/settings/users',
  AUDIT: '/audit',
};

export const NAVIGATION_ITEMS = {
  admin: [
    { href: '/dashboard', label: 'Panel de control', icon: 'LayoutDashboard' },
    { href: '/inventory', label: 'Inventario', icon: 'Package' },
    { href: '/requests', label: 'Solicitudes', icon: 'ClipboardList' },
    { href: '/settings/departments', label: 'Departamentos', icon: 'Building2' },
    { href: '/settings/users', label: 'Usuarios', icon: 'Users' },
    { href: '/audit', label: 'Auditoría', icon: 'BarChart3' },
  ],
  'department-user': [
    { href: '/dashboard', label: 'Panel de control', icon: 'LayoutDashboard' },
    { href: '/requests', label: 'Mis solicitudes', icon: 'ClipboardList' },
  ],
};
