// ============================================================================
// UTILIDADES CRIPTOGRÁFICAS PARA AUDITORÍA INMUTABLE
// ============================================================================

/**
 * Genera un hash SHA-256 de un objeto o string
 * Usado para crear la cadena de integridad en auditoría
 */
export async function generarHashSHA256(dato: any): Promise<string> {
  const datosStringificados = typeof dato === 'string' ? dato : JSON.stringify(dato);
  const buffer = new TextEncoder().encode(datosStringificados);
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  
  // Convertir el buffer a string hexadecimal
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  return hashHex;
}

/**
 * Verifica la integridad de un registro comparando su hash
 */
export async function verificarIntegridad(
  datosOriginales: any,
  hashEsperado: string
): Promise<boolean> {
  const hashCalculado = await generarHashSHA256(datosOriginales);
  return hashCalculado === hashEsperado;
}

/**
 * Crea una cadena de integridad concatenando hashes anteriores
 * Esto garantiza que no se pueda modificar el historial sin ser detectado
 */
export async function crearCadenaIntegridad(
  registro: any,
  hashAnterior?: string
): Promise<string> {
  const datoCadena = hashAnterior ? `${JSON.stringify(registro)}${hashAnterior}` : JSON.stringify(registro);
  return await generarHashSHA256(datoCadena);
}

/**
 * Genera un ID único para auditoría basado en timestamp y aleatorio
 */
export function generarIdAuditoria(): string {
  const timestamp = Date.now().toString(36);
  const aleatorio = Math.random().toString(36).substring(2);
  return `AUD-${timestamp}-${aleatorio}`;
}

/**
 * Formatea un dato sensible para auditoría (ej: precio, proveedor)
 */
export function formatearDatoSensible(campo: string, valor: any): string {
  if (campo === 'precio' || campo === 'precioUnitario') {
    return `$${parseFloat(valor).toFixed(2)}`;
  }
  return String(valor);
}
