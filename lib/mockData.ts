import { 
  SolicitudCompra, 
  ProductoInventario, 
  RegistroAuditoria,
  EstadisticasGobernanza,
  DatosAnalisis,
  AlertaInventario,
  Proveedor,
  Usuario
} from './types';

// ============================================================================
// DATOS MOCK - SOLICITUDES DE COMPRA
// ============================================================================

export const mockRequests : SolicitudCompra[] = [
  {
    id: 'SOL-001',
    numero: 'SOL-2024-001',
    titulo: 'Resmas de papel A4 - 500 hojas',
    descripcion: 'Adquisición de papel bond blanco para oficinas de la coordinación de servicios administrativos',
    categoria: 'Materiales de Oficina',
    estado: 'completado',
    prioridad: 'media',
    fechaCreacion: new Date('2024-02-15'),
    solicitadoPor: 'Juan López',
    usuarioIdSolicitante: 'USR-001',
    coordinacionSolicitante: 'Servicios Administrativos',
    montoPresupuestado: 11250,
    montoAprobado: 10500,
    observaciones: 'Entregado a almacén el 2024-03-20',
    historialEstados: [
      { estado: 'solicitado', fecha: new Date('2024-02-15'), usuario: 'Juan López', usuarioId: 'USR-001' },
      { estado: 'aprobado', fecha: new Date('2024-02-20'), usuario: 'Carlos Rodríguez', usuarioId: 'USR-002', nota: 'Aprobado por presupuesto' },
      { estado: 'en_almacen', fecha: new Date('2024-03-20'), usuario: 'María García', usuarioId: 'USR-003' },
      { estado: 'distribuido', fecha: new Date('2024-03-25'), usuario: 'Pedro Martínez', usuarioId: 'USR-004' },
      { estado: 'completado', fecha: new Date('2024-03-25'), usuario: 'Pedro Martínez', usuarioId: 'USR-004' },
    ],
  },
];

export const mockSolicitudes: SolicitudCompra[] = [
  {
    id: 'SOL-001',
    numero: 'SOL-2024-001',
    titulo: 'Resmas de papel A4 - 500 hojas',
    descripcion: 'Adquisición de papel bond blanco para oficinas de la coordinación de servicios administrativos',
    categoria: 'Materiales de Oficina',
    estado: 'completado',
    prioridad: 'media',
    fechaCreacion: new Date('2024-02-15'),
    solicitadoPor: 'Juan López',
    usuarioIdSolicitante: 'USR-001',
    coordinacionSolicitante: 'Servicios Administrativos',
    montoPresupuestado: 11250,
    montoAprobado: 10500,
    observaciones: 'Entregado a almacén el 2024-03-20',
    historialEstados: [
      { estado: 'solicitado', fecha: new Date('2024-02-15'), usuario: 'Juan López', usuarioId: 'USR-001' },
      { estado: 'aprobado', fecha: new Date('2024-02-20'), usuario: 'Carlos Rodríguez', usuarioId: 'USR-002', nota: 'Aprobado por presupuesto' },
      { estado: 'en_almacen', fecha: new Date('2024-03-20'), usuario: 'María García', usuarioId: 'USR-003' },
      { estado: 'distribuido', fecha: new Date('2024-03-25'), usuario: 'Pedro Martínez', usuarioId: 'USR-004' },
      { estado: 'completado', fecha: new Date('2024-03-25'), usuario: 'Pedro Martínez', usuarioId: 'USR-004' },
    ],
  },
  {
    id: 'SOL-002',
    numero: 'SOL-2024-002',
    titulo: 'Tóner para impresora HP LaserJet',
    descripcion: 'Cartuchos de tóner negro compatible con modelos HP LaserJet Enterprise',
    categoria: 'Insumos Tecnológicos',
    estado: 'en_almacen',
    prioridad: 'alta',
    fechaCreacion: new Date('2024-03-10'),
    solicitadoPor: 'María Sánchez',
    usuarioIdSolicitante: 'USR-005',
    coordinacionSolicitante: 'Tecnología',
    montoPresupuestado: 22400,
    montoAprobado: 22400,
    observaciones: 'En distribución a coordinaciones',
    historialEstados: [
      { estado: 'solicitado', fecha: new Date('2024-03-10'), usuario: 'María Sánchez', usuarioId: 'USR-005' },
      { estado: 'aprobado', fecha: new Date('2024-03-12'), usuario: 'Carlos Rodríguez', usuarioId: 'USR-002' },
      { estado: 'en_almacen', fecha: new Date('2024-03-25'), usuario: 'María García', usuarioId: 'USR-003' },
    ],
  },
  {
    id: 'SOL-003',
    numero: 'SOL-2024-003',
    titulo: 'Desinfectante multiusos concentrado',
    descripcion: 'Solución desinfectante para limpieza de instalaciones municipales',
    categoria: 'Materiales de Limpieza',
    estado: 'aprobado',
    prioridad: 'media',
    fechaCreacion: new Date('2024-03-18'),
    solicitadoPor: 'Roberto Vargas',
    usuarioIdSolicitante: 'USR-006',
    coordinacionSolicitante: 'Servicios Generales',
    montoPresupuestado: 5400,
    montoAprobado: 5400,
    observaciones: 'Pendiente de ingreso a almacén. Proveedor confirmó envío para 2024-04-10',
    historialEstados: [
      { estado: 'solicitado', fecha: new Date('2024-03-18'), usuario: 'Roberto Vargas', usuarioId: 'USR-006' },
      { estado: 'aprobado', fecha: new Date('2024-03-22'), usuario: 'Ana Martínez', usuarioId: 'USR-007', nota: 'Fondos disponibles Q2' },
    ],
  },
  {
    id: 'SOL-004',
    numero: 'SOL-2024-004',
    titulo: 'Mobiliario para reuniones - Sillas ejecutivas',
    descripcion: '12 sillas ejecutivas para sala de juntas principal',
    categoria: 'Mobiliario y Equipos',
    estado: 'rechazado',
    prioridad: 'baja',
    fechaCreacion: new Date('2024-02-20'),
    solicitadoPor: 'Felipe Domínguez',
    usuarioIdSolicitante: 'USR-008',
    coordinacionSolicitante: 'Infraestructura',
    montoPresupuestado: 102000,
    montoAprobado: 0,
    observaciones: 'Rechazado - Excede presupuesto disponible. Requiere revisión de especificaciones',
    historialEstados: [
      { estado: 'solicitado', fecha: new Date('2024-02-20'), usuario: 'Felipe Domínguez', usuarioId: 'USR-008' },
      { estado: 'rechazado', fecha: new Date('2024-03-05'), usuario: 'Director de Finanzas', usuarioId: 'USR-009', nota: 'Presupuesto insuficiente para este trimestre' },
    ],
  },
  {
    id: 'SOL-005',
    numero: 'SOL-2024-005',
    titulo: 'Equipos de protección personal - Guantes de nitrilo',
    descripcion: 'Cajas de guantes de nitrilo desechables para personal operativo',
    categoria: 'Seguridad',
    estado: 'solicitado',
    prioridad: 'critica',
    fechaCreacion: new Date('2024-04-15'),
    solicitadoPor: 'Luis Hernández',
    usuarioIdSolicitante: 'USR-010',
    coordinacionSolicitante: 'Operaciones',
    montoPresupuestado: 600,
    observaciones: 'Requiere aprobación urgente - Stock crítico en almacén',
    historialEstados: [
      { estado: 'solicitado', fecha: new Date('2024-04-15'), usuario: 'Luis Hernández', usuarioId: 'USR-010', nota: 'Solicitud urgente' },
    ],
  },
];

// ============================================================================
// DATOS MOCK - PRODUCTOS DE INVENTARIO
// ============================================================================

export const mockProductos: ProductoInventario[] = [
  {
    id: 'PROD-001',
    codigo: 'PAP-0001',
    nombre: 'Papel Bond Blanco A4 (resma 500 hojas)',
    descripcion: 'Papel bond blanco de 75 g/m², ideal para impresión en oficinas',
    categoria: 'Materiales de Oficina',
    stockActual: 45,
    stockMinimo: 20,
    stockMaximo: 100,
    unidadMedida: 'resmas',
    precioUnitario: 250,
    proveedor: 'Distribuidora Papelera Nacional',
    proveedorId: 'PROV-001',
    ultimaActualizacion: new Date('2024-04-20'),
    enAlerta: false,
    movimientos: [],
  },
  {
    id: 'PROD-002',
    codigo: 'TEC-0001',
    nombre: 'Cartuchos de Tóner HP LaserJet Negro',
    descripcion: 'Cartuchos compatibles para impresoras HP LaserJet Enterprise',
    categoria: 'Insumos Tecnológicos',
    stockActual: 8,
    stockMinimo: 10,
    stockMaximo: 30,
    unidadMedida: 'unidades',
    precioUnitario: 2800,
    proveedor: 'TechSupply Solutions',
    proveedorId: 'PROV-002',
    ultimaActualizacion: new Date('2024-04-15'),
    enAlerta: true, // ALERTA: Stock bajo
    movimientos: [],
  },
  {
    id: 'PROD-003',
    codigo: 'LIM-0001',
    nombre: 'Desinfectante Multiusos Concentrado (5L)',
    descripcion: 'Solución desinfectante concentrada de uso general',
    categoria: 'Materiales de Limpieza',
    stockActual: 12,
    stockMinimo: 15,
    stockMaximo: 50,
    unidadMedida: 'botellas',
    precioUnitario: 450,
    proveedor: 'ChemClean Industries',
    proveedorId: 'PROV-003',
    ultimaActualizacion: new Date('2024-04-18'),
    enAlerta: true, // ALERTA: Stock crítico
    movimientos: [],
  },
  {
    id: 'PROD-004',
    codigo: 'SEG-0001',
    nombre: 'Guantes de Nitrilo Desechables (caja 100)',
    descripcion: 'Guantes de nitrilo en paquetes de 100 unidades',
    categoria: 'Seguridad',
    stockActual: 5,
    stockMinimo: 10,
    stockMaximo: 40,
    unidadMedida: 'cajas',
    precioUnitario: 120,
    proveedor: 'SafeWork Equipment',
    proveedorId: 'PROV-004',
    ultimaActualizacion: new Date('2024-04-22'),
    enAlerta: true, // ALERTA: Stock crítico
    movimientos: [],
  },
  {
    id: 'PROD-005',
    codigo: 'MUB-0001',
    nombre: 'Silla Ejecutiva Ergonómica',
    descripcion: 'Sillas ejecutivas con respaldo alto y ajustes ergonómicos',
    categoria: 'Mobiliario y Equipos',
    stockActual: 3,
    stockMinimo: 2,
    stockMaximo: 10,
    unidadMedida: 'unidades',
    precioUnitario: 8500,
    proveedor: 'Muebles Premium Ltda',
    proveedorId: 'PROV-005',
    ultimaActualizacion: new Date('2024-04-20'),
    enAlerta: false,
    movimientos: [],
  },
];

// ============================================================================
// DATOS MOCK - ALERTAS DE INVENTARIO
// ============================================================================

export const mockAlertas: AlertaInventario[] = [
  {
    id: 'ALT-001',
    productoId: 'PROD-002',
    nombreProducto: 'Cartuchos de Tóner HP LaserJet Negro',
    stockActual: 8,
    stockMinimo: 10,
    tipo: 'stock_bajo',
    fechaCreacion: new Date('2024-04-15'),
    leida: false,
    accionTomada: 'Solicitud SOL-2024-002 enviada',
  },
  {
    id: 'ALT-002',
    productoId: 'PROD-003',
    nombreProducto: 'Desinfectante Multiusos Concentrado',
    stockActual: 12,
    stockMinimo: 15,
    tipo: 'stock_bajo',
    fechaCreacion: new Date('2024-04-18'),
    leida: false,
    accionTomada: 'Solicitud SOL-2024-003 en aprobación',
  },
  {
    id: 'ALT-003',
    productoId: 'PROD-004',
    nombreProducto: 'Guantes de Nitrilo Desechables',
    stockActual: 5,
    stockMinimo: 10,
    tipo: 'stock_critico',
    fechaCreacion: new Date('2024-04-22'),
    leida: false,
    accionTomada: 'Solicitud SOL-2024-005 URGENTE enviada',
  },
];

// ============================================================================
// DATOS MOCK - PROVEEDORES
// ============================================================================

export const mockProveedores: Proveedor[] = [
  {
    id: 'PROV-001',
    nombre: 'Distribuidora Papelera Nacional',
    nit: '890.123.456-7',
    contacto: 'Jorge Morales',
    telefono: '(571) 555-0123',
    email: 'contacto@papelera.com',
    direccion: 'Carrera 10 #25-45',
    ciudad: 'Bogotá',
    estado: 'activo',
    fechaRegistro: new Date('2020-01-15'),
    fechaUltimaModificacion: new Date('2024-03-10'),
  },
  {
    id: 'PROV-002',
    nombre: 'TechSupply Solutions',
    nit: '890.234.567-8',
    contacto: 'Sandra Gutiérrez',
    telefono: '(571) 555-0456',
    email: 'ventas@techsupply.com',
    direccion: 'Calle 50 #12-30',
    ciudad: 'Bogotá',
    estado: 'activo',
    fechaRegistro: new Date('2021-06-20'),
    fechaUltimaModificacion: new Date('2024-04-01'),
  },
  {
    id: 'PROV-003',
    nombre: 'ChemClean Industries',
    nit: '890.345.678-9',
    contacto: 'Martín Castillo',
    telefono: '(571) 555-0789',
    email: 'pedidos@chemclean.com',
    direccion: 'Av. Caracas #45-60',
    ciudad: 'Bogotá',
    estado: 'activo',
    fechaRegistro: new Date('2019-08-10'),
    fechaUltimaModificacion: new Date('2024-02-15'),
  },
  {
    id: 'PROV-004',
    nombre: 'SafeWork Equipment',
    nit: '890.456.789-0',
    contacto: 'Patricia Rojas',
    telefono: '(571) 555-1011',
    email: 'ventas@safework.com',
    direccion: 'Calle 100 #18-90',
    ciudad: 'Bogotá',
    estado: 'activo',
    fechaRegistro: new Date('2022-03-05'),
    fechaUltimaModificacion: new Date('2024-04-10'),
  },
];

// ============================================================================
// DATOS MOCK - USUARIOS DEL SISTEMA
// ============================================================================

export const mockUsuarios: Usuario[] = [
  {
    id: 'USR-001',
    nombre: 'Juan López',
    email: 'juan.lopez@municipio.gov',
    rol: 'comprador',
    coordinacion: 'Servicios Administrativos',
    activo: true,
    fechaRegistro: new Date('2023-01-10'),
  },
  {
    id: 'USR-002',
    nombre: 'Carlos Rodríguez',
    email: 'carlos.rodriguez@municipio.gov',
    rol: 'aprobador',
    coordinacion: 'Finanzas',
    activo: true,
    fechaRegistro: new Date('2022-06-15'),
  },
  {
    id: 'USR-003',
    nombre: 'María García',
    email: 'maria.garcia@municipio.gov',
    rol: 'almacenista',
    coordinacion: 'Almacén Central',
    activo: true,
    fechaRegistro: new Date('2021-03-20'),
  },
  {
    id: 'USR-004',
    nombre: 'Pedro Martínez',
    email: 'pedro.martinez@municipio.gov',
    rol: 'almacenista',
    coordinacion: 'Distribución',
    activo: true,
    fechaRegistro: new Date('2023-05-10'),
  },
  {
    id: 'USR-007',
    nombre: 'Ana Martínez',
    email: 'ana.martinez@municipio.gov',
    rol: 'aprobador',
    coordinacion: 'Presupuesto',
    activo: true,
    fechaRegistro: new Date('2022-01-05'),
  },
  {
    id: 'USR-009',
    nombre: 'Director de Finanzas',
    email: 'director.finanzas@municipio.gov',
    rol: 'administrador',
    coordinacion: 'Finanzas',
    activo: true,
    fechaRegistro: new Date('2020-01-01'),
  },
];

// ============================================================================
// DATOS MOCK - ESTADÍSTICAS Y ANÁLISIS
// ============================================================================

export const estadisticasGobernanza: EstadisticasGobernanza = {
  totalSolicitudes: mockSolicitudes.length,
  solicitudesAprobadas: mockSolicitudes.filter(s => s.estado === 'aprobado').length,
  solicitudesEnAlmacen: mockSolicitudes.filter(s => s.estado === 'en_almacen').length,
  solicitudesDistribuidas: mockSolicitudes.filter(s => s.estado === 'distribuido').length,
  solicitudesRechazadas: mockSolicitudes.filter(s => s.estado === 'rechazado').length,
  
  productosEnAlerta: mockAlertas.length,
  stockCriticoTotal: mockAlertas.filter(a => a.tipo === 'stock_critico').length,
  valorInventarioTotal: mockProductos.reduce((total, p) => total + (p.stockActual * p.precioUnitario), 0),
  
  registrosAuditoriaTotal: 24,
  registrosDelMes: 18,
  
  gastoProgramado: 7230000,
  gastoEjecutado: 3780000,
  tasaEjecucion: 52.3,
};

export const datosAnalisisGobernanza: DatosAnalisis[] = [
  { mes: 'Enero', solicitudes: 12, distribuidas: 10, gastoProgramado: 1200000, gastoEjecutado: 850000 },
  { mes: 'Febrero', solicitudes: 15, distribuidas: 13, gastoProgramado: 1400000, gastoEjecutado: 920000 },
  { mes: 'Marzo', solicitudes: 18, distribuidas: 16, gastoProgramado: 1500000, gastoEjecutado: 1100000 },
  { mes: 'Abril', solicitudes: 14, distribuidas: 12, gastoProgramado: 1300000, gastoEjecutado: 910000 },
  { mes: 'Mayo', solicitudes: 16, distribuidas: 14, gastoProgramado: 1200000, gastoEjecutado: 0 },
  { mes: 'Junio', solicitudes: 12, distribuidas: 10, gastoProgramado: 1100000, gastoEjecutado: 0 },
];
