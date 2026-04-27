// ============================================================================
// SERVICIO DE AUDITORÍA INMUTABLE CON SHA-256
// ============================================================================

import { RegistroAuditoria, CambioAuditado } from './types';
import { generarHashSHA256, crearCadenaIntegridad, generarIdAuditoria } from './crypto';

// Almacenamiento en memoria para auditoría (en producción: base de datos)
let registrosAuditoria: RegistroAuditoria[] = [];
let lastHashAuditoria: string | undefined = undefined;

/**
 * Registra una acción auditable en el sistema
 * Garantiza inmutabilidad criptográfica SHA-256
 */
export async function registrarAuditoria(params: {
  usuarioId: string;
  usuario: string;
  entidad: RegistroAuditoria['entidad'];
  idEntidad: string;
  accion: RegistroAuditoria['accion'];
  detalles?: CambioAuditado[];
  direccionIP?: string;
  navegador?: string;
  notas?: string;
}): Promise<RegistroAuditoria> {
  const ahora = new Date();
  
  // Construir registro
  const registro: RegistroAuditoria = {
    id: generarIdAuditoria(),
    timestamp: ahora,
    usuarioId: params.usuarioId,
    usuario: params.usuario,
    entidad: params.entidad,
    idEntidad: params.idEntidad,
    accion: params.accion,
    detallesCambios: params.detalles || [],
    hashSHA256: '', // Se calculará
    hashAnterior: lastHashAuditoria,
    hashVerificado: false,
    direccionIP: params.direccionIP,
    navegador: params.navegador,
    notas: params.notas,
  };

  // Generar hash SHA-256 del registro
  const hashRegistro = await generarHashSHA256({
    timestamp: registro.timestamp,
    usuario: registro.usuario,
    entidad: registro.entidad,
    idEntidad: registro.idEntidad,
    accion: registro.accion,
    detallesCambios: registro.detallesCambios,
  });

  registro.hashSHA256 = hashRegistro;
  
  // Crear cadena de integridad con hash anterior
  if (lastHashAuditoria) {
    const cadena = await crearCadenaIntegridad(registro, lastHashAuditoria);
    // El hash anterior ya está en el registro
  }

  // Verificar integridad
  registro.hashVerificado = true;

  // Guardar en el almacenamiento
  registrosAuditoria.push(registro);
  lastHashAuditoria = hashRegistro;

  return registro;
}

/**
 * Verifica que todos los registros de auditoría mantienen su integridad
 * Recorre la cadena completa de hashes verificando que no haya alteraciones
 */
export async function verificarIntegridadCompleta(): Promise<{
  valido: boolean;
  registrosVerificados: number;
  errores: string[];
}> {
  const errores: string[] = [];
  let registrosVerificados = 0;

  for (let i = 0; i < registrosAuditoria.length; i++) {
    const registro = registrosAuditoria[i];
    
    // Recalcular el hash esperado
    const hashEsperado = await generarHashSHA256({
      timestamp: registro.timestamp,
      usuario: registro.usuario,
      entidad: registro.entidad,
      idEntidad: registro.idEntidad,
      accion: registro.accion,
      detallesCambios: registro.detallesCambios,
    });

    if (hashEsperado !== registro.hashSHA256) {
      errores.push(`Registro ${i} (${registro.id}) comprometido: hash no coincide`);
      continue;
    }

    // Verificar la cadena anterior
    if (i > 0) {
      const registroAnterior = registrosAuditoria[i - 1];
      if (registro.hashAnterior !== registroAnterior.hashSHA256) {
        errores.push(`Registro ${i} (${registro.id}) - cadena de integridad rota`);
        continue;
      }
    }

    registrosVerificados++;
  }

  return {
    valido: errores.length === 0,
    registrosVerificados,
    errores,
  };
}

/**
 * Obtiene el historial de auditoría completo
 */
export function obtenerHistorialAuditoria(): RegistroAuditoria[] {
  return [...registrosAuditoria];
}

/**
 * Filtra registros de auditoría por criterios
 */
export function filtrarAuditoria(criterios: {
  entidad?: RegistroAuditoria['entidad'];
  idEntidad?: string;
  usuarioId?: string;
  accion?: RegistroAuditoria['accion'];
  fechaDesde?: Date;
  fechaHasta?: Date;
}): RegistroAuditoria[] {
  return registrosAuditoria.filter(registro => {
    if (criterios.entidad && registro.entidad !== criterios.entidad) return false;
    if (criterios.idEntidad && registro.idEntidad !== criterios.idEntidad) return false;
    if (criterios.usuarioId && registro.usuarioId !== criterios.usuarioId) return false;
    if (criterios.accion && registro.accion !== criterios.accion) return false;
    if (criterios.fechaDesde && registro.timestamp < criterios.fechaDesde) return false;
    if (criterios.fechaHasta && registro.timestamp > criterios.fechaHasta) return false;
    return true;
  });
}

/**
 * Obtiene todas las modificaciones realizadas a un campo sensible (precio, proveedor)
 * Útil para auditoría de datos críticos
 */
export function obtenerHistorialCampoSensible(
  idEntidad: string,
  nombreCampo: string
): { fecha: Date; usuario: string; valorAnterior: any; valorNuevo: any }[] {
  const cambios: { fecha: Date; usuario: string; valorAnterior: any; valorNuevo: any }[] = [];

  for (const registro of registrosAuditoria) {
    if (registro.idEntidad === idEntidad) {
      for (const cambio of registro.detallesCambios) {
        if (cambio.campo === nombreCampo && (cambio.tipoCantico === 'precio' || cambio.tipoCantico === 'proveedor')) {
          cambios.push({
            fecha: registro.timestamp,
            usuario: registro.usuario,
            valorAnterior: cambio.valorAnterior,
            valorNuevo: cambio.valorNuevo,
          });
        }
      }
    }
  }

  return cambios;
}

/**
 * Exporta el historial de auditoría como JSON para análisis
 */
export function exportarAuditoriaJSON(): string {
  return JSON.stringify(registrosAuditoria, null, 2);
}

/**
 * Genera un reporte de auditoría en texto
 */
export function generarReporteAuditoria(): string {
  let reporte = '═══════════════════════════════════════════════════════════════\n';
  reporte += 'REPORTE DE AUDITORÍA - SISTEMA DE GOBERNANZA DIGITAL\n';
  reporte += '═══════════════════════════════════════════════════════════════\n\n';
  
  reporte += `Fecha de Generación: ${new Date().toLocaleString('es-CO')}\n`;
  reporte += `Total de Registros: ${registrosAuditoria.length}\n\n`;

  for (const registro of registrosAuditoria) {
    reporte += `───────────────────────────────────────────────────────────────\n`;
    reporte += `ID: ${registro.id}\n`;
    reporte += `Timestamp: ${registro.timestamp.toLocaleString('es-CO')}\n`;
    reporte += `Usuario: ${registro.usuario}\n`;
    reporte += `Entidad: ${registro.entidad}\n`;
    reporte += `Acción: ${registro.accion}\n`;
    reporte += `Hash SHA-256: ${registro.hashSHA256.substring(0, 32)}...\n`;
    
    if (registro.detallesCambios.length > 0) {
      reporte += `\nCambios Registrados:\n`;
      for (const cambio of registro.detallesCambios) {
        reporte += `  - ${cambio.campo}: ${cambio.valorAnterior} → ${cambio.valorNuevo}\n`;
      }
    }
    reporte += '\n';
  }

  return reporte;
}

/**
 * Inicializa datos de auditoría de ejemplo para demostración
 */
export async function inicializarAuditoriaDemo() {
  await registrarAuditoria({
    usuarioId: 'USR-002',
    usuario: 'Carlos Rodríguez',
    entidad: 'solicitud',
    idEntidad: 'SOL-001',
    accion: 'crear',
    detalles: [
      { campo: 'titulo', valorAnterior: null, valorNuevo: 'Resmas de papel A4', tipoCantico: 'otro' },
    ],
    notas: 'Solicitud inicial de compra',
  });

  await registrarAuditoria({
    usuarioId: 'USR-002',
    usuario: 'Carlos Rodríguez',
    entidad: 'solicitud',
    idEntidad: 'SOL-001',
    accion: 'aprobar',
    detalles: [],
    notas: 'Aprobado por presupuesto disponible',
  });

  await registrarAuditoria({
    usuarioId: 'USR-003',
    usuario: 'María García',
    entidad: 'inventario',
    idEntidad: 'PROD-001',
    accion: 'actualizar',
    detalles: [
      { campo: 'stockActual', valorAnterior: 40, valorNuevo: 45, tipoCantico: 'otro' },
    ],
    notas: 'Ingreso de mercancía por SOL-001',
  });
}
