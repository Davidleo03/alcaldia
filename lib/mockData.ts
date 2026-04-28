import { 
  SolicitudCompra, 
  ProductoInventario, 
  RegistroAuditoria,
  EstadisticasGobernanza,
  DatosAnalisis,
  AlertaInventario,
  Proveedor,
  Usuario,
  Request
} from './types';


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
// DATOS MOCK - SOLICITUDES DE COMPRA (Precios en VES)
// ============================================================================

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
    montoPresupuestado: 3200, // Ajustado a ~80-90 USD en VES
    montoAprobado: 3150,
    observaciones: 'Entregado a almacén el 2024-03-20',
    historialEstados: [
      { estado: 'solicitado', fecha: new Date('2024-02-15'), usuario: 'Juan López', usuarioId: 'USR-001' },
      { estado: 'aprobado', fecha: new Date('2024-02-20'), usuario: 'Carlos Rodríguez', usuarioId: 'USR-002', nota: 'Aprobado por presupuesto' },
      { estado: 'en_almacen', fecha: new Date('2024-03-20'), usuario: 'María García', usuarioId: 'USR-003' },
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
    montoPresupuestado: 4500, // Ajustado a valor de mercado tecnológico
    montoAprobado: 4500,
    observaciones: 'En distribución a coordinaciones',
    historialEstados: [
      { estado: 'solicitado', fecha: new Date('2024-03-10'), usuario: 'María Sánchez', usuarioId: 'USR-005' },
      { estado: 'aprobado', fecha: new Date('2024-03-12'), usuario: 'Carlos Rodríguez', usuarioId: 'USR-002' },
      { estado: 'en_almacen', fecha: new Date('2024-03-25'), usuario: 'María García', usuarioId: 'USR-003' },
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
    montoPresupuestado: 85000, // ~2,300 USD aprox.
    montoAprobado: 0,
    observaciones: 'Rechazado - Excede presupuesto disponible para el trimestre',
    historialEstados: [
      { estado: 'solicitado', fecha: new Date('2024-02-20'), usuario: 'Felipe Domínguez', usuarioId: 'USR-008' },
      { estado: 'rechazado', fecha: new Date('2024-03-05'), usuario: 'Director de Finanzas', usuarioId: 'USR-009' },
    ],
  },
];

// Re-asignamos mockRequests para mantener consistencia
export const mockRequests = mockSolicitudes;

// ============================================================================
// DATOS MOCK - PRODUCTOS DE INVENTARIO (Precios Unitarios en VES)
// ============================================================================

export const mockProductos: ProductoInventario[] = [
  {
    id: 'PROD-001',
    codigo: 'PAP-0001',
    nombre: 'Papel Bond Blanco A4 (resma 500 hojas)',
    descripcion: 'Papel bond blanco de 75 g/m²',
    categoria: 'Materiales de Oficina',
    stockActual: 45,
    stockMinimo: 20,
    stockMaximo: 100,
    unidadMedida: 'resmas',
    precioUnitario: 350, // Precio unitario razonable en VES
    proveedor: 'Distribuidora Papelera Nacional',
    proveedorId: 'PROV-001',
    ultimaActualizacion: new Date('2024-04-20'),
    enAlerta: false,
    movimientos: [],
  },
  {
    id: 'PROD-002',
    codigo: 'TEC-0001',
    nombre: 'Tóner HP LaserJet Negro',
    descripcion: 'Cartucho compatible de alto rendimiento',
    categoria: 'Insumos Tecnológicos',
    stockActual: 8,
    stockMinimo: 10,
    stockMaximo: 30,
    unidadMedida: 'unidades',
    precioUnitario: 2200, 
    proveedor: 'TechSupply Venezuela',
    proveedorId: 'PROV-002',
    ultimaActualizacion: new Date('2024-04-15'),
    enAlerta: true,
    movimientos: [],
  },
  {
    id: 'PROD-004',
    codigo: 'SEG-0001',
    nombre: 'Guantes de Nitrilo (caja 100)',
    descripcion: 'Guantes de nitrilo desechables',
    categoria: 'Seguridad',
    stockActual: 5,
    stockMinimo: 10,
    stockMaximo: 40,
    unidadMedida: 'cajas',
    precioUnitario: 580,
    proveedor: 'Suministros Industriales C.A.',
    proveedorId: 'PROV-004',
    ultimaActualizacion: new Date('2024-04-22'),
    enAlerta: true,
    movimientos: [],
  },
];

// ============================================================================
// DATOS MOCK - PROVEEDORES (Adaptados a Venezuela)
// ============================================================================

export const mockProveedores: Proveedor[] = [
  {
    id: 'PROV-001',
    nombre: 'Distribuidora Papelera Nacional, C.A.',
    nit: 'J-30123456-7', // Formato RIF venezolano
    contacto: 'Jorge Morales',
    telefono: '0212-5550123',
    email: 'contacto@papelera.com.ve',
    direccion: 'Av. Urdaneta, Edif. Central',
    ciudad: 'Caracas',
    estado: 'activo',
    fechaRegistro: new Date('2020-01-15'),
    fechaUltimaModificacion: new Date('2024-03-10'),
  },
  {
    id: 'PROV-002',
    nombre: 'TechSupply Venezuela',
    nit: 'J-30987654-3',
    contacto: 'Sandra Gutiérrez',
    telefono: '0241-5550456',
    email: 'ventas@techsupply.com.ve',
    direccion: 'Zona Industrial Carabobo',
    ciudad: 'Valencia',
    estado: 'activo',
    fechaRegistro: new Date('2021-06-20'),
    fechaUltimaModificacion: new Date('2024-04-01'),
  },
];

// ============================================================================
// DATOS MOCK - ESTADÍSTICAS (Ajuste de montos globales)
// ============================================================================

export const estadisticasGobernanza: EstadisticasGobernanza = {
  totalSolicitudes: mockSolicitudes.length,
  solicitudesAprobadas: mockSolicitudes.filter(s => s.estado === 'aprobado').length,
  solicitudesEnAlmacen: mockSolicitudes.filter(s => s.estado === 'en_almacen').length,
  solicitudesDistribuidas: mockSolicitudes.filter(s => s.estado === 'distribuido').length,
  solicitudesRechazadas: mockSolicitudes.filter(s => s.estado === 'rechazado').length,
  
  productosEnAlerta: 2,
  stockCriticoTotal: 1,
  valorInventarioTotal: 45000, // Valor total aproximado en Bolívares
  
  registrosAuditoriaTotal: 24,
  registrosDelMes: 18,
  
  gastoProgramado: 550000,
  gastoEjecutado: 320000,
  tasaEjecucion: 58.1,
};

export const datosAnalisisGobernanza: DatosAnalisis[] = [
  { mes: 'Enero', solicitudes: 12, distribuidas: 10, gastoProgramado: 85000, gastoEjecutado: 60000 },
  { mes: 'Febrero', solicitudes: 15, distribuidas: 13, gastoProgramado: 90000, gastoEjecutado: 75000 },
  { mes: 'Marzo', solicitudes: 18, distribuidas: 16, gastoProgramado: 110000, gastoEjecutado: 95000 },
  { mes: 'Abril', solicitudes: 14, distribuidas: 12, gastoProgramado: 95000, gastoEjecutado: 80000 },
];