'use client';

import { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card } from '@/components/ui/card';
import { Shield, CheckCircle, AlertCircle, Lock } from 'lucide-react';
import { 
  obtenerHistorialAuditoria, 
  verificarIntegridadCompleta, 
  inicializarAuditoriaDemo,
  generarReporteAuditoria
} from '@/lib/auditService';
import { RegistroAuditoria } from '@/lib/types';

export default function AuditoriaPage() {
  const [registros, setRegistros] = useState<RegistroAuditoria[]>([]);
  const [integridad, setIntegridad] = useState<{ valido: boolean; registrosVerificados: number; errores: string[] } | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarAuditoria = async () => {
      // Inicializar datos de demostración
      await inicializarAuditoriaDemo();
      
      // Obtener registros
      const regs = obtenerHistorialAuditoria();
      setRegistros(regs);

      // Verificar integridad
      const resultadoIntegridad = await verificarIntegridadCompleta();
      setIntegridad(resultadoIntegridad);

      setCargando(false);
    };

    cargarAuditoria();
  }, []);

  const obtenerEtiquetaEntidad = (entidad: string) => {
    const etiquetas: Record<string, string> = {
      solicitud: 'Solicitud',
      inventario: 'Inventario',
      proveedor: 'Proveedor',
      precio: 'Precio',
      movimiento: 'Movimiento',
    };
    return etiquetas[entidad] || entidad;
  };

  const obtenerColorEntidad = (entidad: string) => {
    const colores: Record<string, string> = {
      solicitud: 'bg-blue-100 text-blue-800',
      inventario: 'bg-yellow-100 text-yellow-800',
      proveedor: 'bg-purple-100 text-purple-800',
      precio: 'bg-red-100 text-red-800',
      movimiento: 'bg-green-100 text-green-800',
    };
    return colores[entidad] || 'bg-gray-100 text-gray-800';
  };

  const descargarReporte = () => {
    const reporte = generarReporteAuditoria();
    const elemento = document.createElement('a');
    elemento.setAttribute('href', 'data:text/plain;charset=utf-u,' + encodeURIComponent(reporte));
    elemento.setAttribute('download', `auditoria-${new Date().toISOString().slice(0, 10)}.txt`);
    elemento.style.display = 'none';
    document.body.appendChild(elemento);
    elemento.click();
    document.body.removeChild(elemento);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Auditoría y Trazabilidad Inmutable</h1>
          <p className="text-gray-600 mt-2">Pilar 3: Registro Criptográfico SHA-256</p>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-lg p-6">
          <h2 className="font-semibold text-purple-900 mb-2">Auditoría Criptográfica Inmutable</h2>
          <p className="text-purple-800 text-sm mb-3">
            Este módulo implementa un registro histórico protegido criptográficamente con SHA-256 que almacena quién, 
            cuándo y qué se modificó. Garantiza la integridad de variables sensibles como precios y proveedores, 
            cumpliendo con las normas de la Contraloría.
          </p>
          <ul className="text-sm text-purple-800 space-y-1">
            <li>• Cada cambio genera un hash SHA-256 único e inmutable</li>
            <li>• Cadena de integridad: cada registro enlaza con el anterior</li>
            <li>• Imposible modificar datos sin ser detectado</li>
            <li>• Cumplimiento normativo garantizado</li>
          </ul>
        </div>

        {/* Estado de Integridad */}
        {!cargando && integridad && (
          <div className={`border rounded-lg p-6 ${integridad.valido ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                {integridad.valido ? (
                  <CheckCircle className="w-8 h-8 text-green-600" />
                ) : (
                  <AlertCircle className="w-8 h-8 text-red-600" />
                )}
                <div>
                  <h3 className={`font-bold text-lg ${integridad.valido ? 'text-green-900' : 'text-red-900'}`}>
                    {integridad.valido ? 'Sistema de Auditoría Íntegro' : 'Alertas de Integridad'}
                  </h3>
                  <p className={`text-sm ${integridad.valido ? 'text-green-800' : 'text-red-800'}`}>
                    {integridad.registrosVerificados} registros verificados correctamente
                  </p>
                </div>
              </div>
              <Lock className={`w-8 h-8 ${integridad.valido ? 'text-green-600' : 'text-red-600'}`} />
            </div>
            {integridad.errores.length > 0 && (
              <div className="mt-3">
                <p className="font-semibold text-red-900 mb-2">Errores detectados:</p>
                <ul className="space-y-1">
                  {integridad.errores.map((error, idx) => (
                    <li key={idx} className="text-sm text-red-800">• {error}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Botón de Descarga de Reporte */}
        <button
          onClick={descargarReporte}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
        >
          Descargar Reporte de Auditoría (TXT)
        </button>

        {/* Registros de Auditoría */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Registros de Auditoría ({registros.length})</h2>
          
          {registros.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-gray-500">No hay registros de auditoría cargados</p>
            </Card>
          ) : (
            <div className="space-y-4">
              {registros.map((registro, idx) => (
                <Card key={registro.id} className="p-6 border-l-4 border-l-purple-600">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-semibold">ID Auditoría</p>
                      <p className="text-sm font-mono text-gray-900">{registro.id}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-semibold">Timestamp</p>
                      <p className="text-sm text-gray-900">{registro.timestamp.toLocaleString('es-CO')}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-semibold">Usuario</p>
                      <p className="text-sm text-gray-900">{registro.usuario}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-semibold">Acción</p>
                      <span className={`inline-block px-3 py-1 rounded text-xs font-semibold ${obtenerColorEntidad(registro.entidad)}`}>
                        {registro.accion.toUpperCase()} - {obtenerEtiquetaEntidad(registro.entidad)}
                      </span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded p-4 mb-4 font-mono text-xs overflow-x-auto">
                    <p className="text-gray-600 mb-2">Hash SHA-256:</p>
                    <p className="text-gray-900 break-all">{registro.hashSHA256}</p>
                    {registro.hashAnterior && (
                      <>
                        <p className="text-gray-600 mt-3 mb-2">Hash Anterior (Cadena de Integridad):</p>
                        <p className="text-gray-900 break-all">{registro.hashAnterior}</p>
                      </>
                    )}
                  </div>

                  {registro.detallesCambios.length > 0 && (
                    <div className="mb-4">
                      <p className="font-semibold text-gray-900 mb-2">Cambios Registrados:</p>
                      <div className="space-y-2">
                        {registro.detallesCambios.map((cambio, idx) => (
                          <div key={idx} className="bg-blue-50 p-3 rounded text-sm">
                            <p className="font-semibold text-gray-900">{cambio.campo}</p>
                            <p className="text-gray-700">
                              De: <span className="font-mono text-red-600">{JSON.stringify(cambio.valorAnterior)}</span>
                            </p>
                            <p className="text-gray-700">
                              Para: <span className="font-mono text-green-600">{JSON.stringify(cambio.valorNuevo)}</span>
                            </p>
                            {(cambio.tipoCantico === 'precio' || cambio.tipoCantico === 'proveedor') && (
                              <p className="text-xs text-red-600 font-semibold mt-1">
                                ⚠️ DATO SENSIBLE - {cambio.tipoCantico.toUpperCase()}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {registro.notas && (
                    <div className="bg-yellow-50 p-3 rounded text-sm">
                      <p className="font-semibold text-gray-900 mb-1">Notas:</p>
                      <p className="text-gray-700">{registro.notas}</p>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-xs text-gray-600 mt-4 pt-4 border-t">
                    <Lock className="w-4 h-4" />
                    {registro.hashVerificado ? (
                      <span className="text-green-600 font-semibold">Integridad verificada</span>
                    ) : (
                      <span className="text-red-600 font-semibold">Alerta de integridad</span>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Información de Cumplimiento */}
        <Card className="p-6 bg-indigo-50 border border-indigo-200">
          <h3 className="font-bold text-indigo-900 mb-3 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Cumplimiento Normativo
          </h3>
          <ul className="space-y-2 text-sm text-indigo-800">
            <li className="flex gap-2">
              <span className="font-semibold text-indigo-600 min-w-fit">✓</span>
              Normas de Contraloría: Registro inmutable de cambios críticos
            </li>
            <li className="flex gap-2">
              <span className="font-semibold text-indigo-600 min-w-fit">✓</span>
              Trazabilidad completa: Quién, cuándo, qué y por qué
            </li>
            <li className="flex gap-2">
              <span className="font-semibold text-indigo-600 min-w-fit">✓</span>
              Protección de datos sensibles: Precios y proveedores auditados
            </li>
            <li className="flex gap-2">
              <span className="font-semibold text-indigo-600 min-w-fit">✓</span>
              Imposibilidad de alteración: Cadena criptográfica SHA-256
            </li>
          </ul>
        </Card>
      </div>
    </MainLayout>
  );
}
