// ============================================================================
// GOBERNANZA DIGITAL - DEPARTAMENTO DE COMPRAS
// Sistema de Automatización del Flujo Logístico y Control de Inventario
// ============================================================================

// ============================================================================
// PILAR 1: AUTOMATIZACIÓN DEL FLUJO LOGÍSTICO
// ============================================================================

// Estados del flujo de solicitudes de compra
export type EstadoSolicitud = 
  | 'solicitado' 
  | 'aprobado' 
  | 'rechazado' 
  | 'en_almacen' 
  | 'distribuido' 
  | 'completado';

export type PrioridadSolicitud = 'baja' | 'media' | 'alta' | 'critica';

// Solicitud de compra/suministro (Pilar 1)
export interface SolicitudCompra {
  id: string;
  numero: string; // Número correlativo para trazabilidad
  titulo: string;
  descripcion: string;
  categoria: string;
  estado: EstadoSolicitud;
  prioridad: PrioridadSolicitud;
  fechaCreacion: Date;
  solicitadoPor: string; // Nombre del solicitante
  usuarioIdSolicitante: string;
  coordinacionSolicitante: string;
  montoPresupuestado?: number;
  montoAprobado?: number;
  observaciones?: string;
  historialEstados: EstadoHistorial[];
  registroAuditoriaId?: string;
}

export interface EstadoHistorial {
  estado: EstadoSolicitud;
  fecha: Date;
  usuario: string;
  usuarioId: string;
  nota?: string;
}

// ============================================================================
// PILAR 2: CONTROL DE INVENTARIO EN TIEMPO REAL
// ============================================================================

// Producto/Bien de inventario
export interface ProductoInventario {
  id: string;
  codigo: string;
  nombre: string;
  descripcion: string;
  categoria: string;
  stockActual: number;
  stockMinimo: number; // Punto de reorden - genera alerta
  stockMaximo: number;
  unidadMedida: string; // 'unidades', 'cajas', 'kilos', etc.
  precioUnitario: number; // Valor sensible - auditado
  proveedor: string;
  proveedorId: string;
  ultimaActualizacion: Date;
  enAlerta: boolean; // true si stockActual <= stockMinimo
  movimientos: MovimientoInventario[];
}

// Movimiento de inventario (ingreso/egreso/ajuste)
export interface MovimientoInventario {
  id: string;
  productoId: string;
  tipo: 'ingreso' | 'egreso' | 'ajuste';
  cantidad: number;
  fecha: Date;
  razon: string;
  usuario: string;
  usuarioId: string;
  solicitudId?: string;
  registroAuditoriaId: string; // Enlace inmutable a auditoría
}

// Alerta de inventario
export interface AlertaInventario {
  id: string;
  productoId: string;
  nombreProducto: string;
  stockActual: number;
  stockMinimo: number;
  tipo: 'stock_critico' | 'stock_bajo';
  fechaCreacion: Date;
  leida: boolean;
  accionTomada?: string;
}

// ============================================================================
// PILAR 3: AUDITORÍA Y TRAZABILIDAD INMUTABLE
// ============================================================================

// Registro de auditoría criptográfica (SHA-256)
export interface RegistroAuditoria {
  id: string;
  timestamp: Date;
  usuarioId: string;
  usuario: string;
  entidad: 'solicitud' | 'inventario' | 'proveedor' | 'precio' | 'movimiento';
  idEntidad: string;
  accion: 'crear' | 'actualizar' | 'eliminar' | 'aprobar' | 'rechazar' | 'distribuir';
  detallesCambios: CambioAuditado[];
  
  // Seguridad criptográfica
  hashSHA256: string; // Hash del registro completo
  hashAnterior?: string; // Hash del registro anterior - cadena de integridad
  hashVerificado: boolean; // Resultado de verificación de integridad
  
  // Contexto
  direccionIP?: string;
  navegador?: string;
  notas?: string;
}

export interface CambioAuditado {
  campo: string;
  valorAnterior: any;
  valorNuevo: any;
  tipoCantico: 'precio' | 'proveedor' | 'stock' | 'otro';
}

// ============================================================================
// PILAR 4: INTELIGENCIA ADMINISTRATIVA
// ============================================================================

// Estadísticas del dashboard
export interface EstadisticasGobernanza {
  // Flujo logístico
  totalSolicitudes: number;
  solicitudesAprobadas: number;
  solicitudesEnAlmacen: number;
  solicitudesDistribuidas: number;
  solicitudesRechazadas: number;
  
  // Inventario
  productosEnAlerta: number;
  stockCriticoTotal: number;
  valorInventarioTotal: number;
  
  // Auditoría
  registrosAuditoriaTotal: number;
  registrosDelMes: number;
  
  // Presupuesto
  gastoProgramado: number;
  gastoEjecutado: number;
  tasaEjecucion: number;
}

// Datos mensuales para gráficos
export interface DatosAnalisis {
  mes: string;
  solicitudes: number;
  distribuidas: number;
  gastoProgramado: number;
  gastoEjecutado: number;
}

// Reporte PDF exportable
export interface ReportePDF {
  id: string;
  titulo: string;
  tipo: 'inventario' | 'auditoria' | 'solicitudes' | 'presupuesto';
  fechaGeneracion: Date;
  usuarioGenerador: string;
  datos: any;
  urlDescarga?: string;
}

// ============================================================================
// ENTIDADES MAESTRAS
// ============================================================================

// Proveedor (datos sensibles)
export interface Proveedor {
  id: string;
  nombre: string;
  nit: string;
  contacto: string;
  telefono: string;
  email: string;
  direccion: string;
  ciudad: string;
  estado: 'activo' | 'inactivo' | 'suspendido';
  fechaRegistro: Date;
  fechaUltimaModificacion: Date;
  registroAuditoriaId?: string;
}

// Usuario del sistema
export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  rol: 'comprador' | 'almacenista' | 'aprobador' | 'auditor' | 'administrador';
  coordinacion: string;
  activo: boolean;
  fechaRegistro: Date;
}
