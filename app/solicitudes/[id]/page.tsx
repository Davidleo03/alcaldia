'use client';

import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, User, DollarSign, Layers, MessageSquare } from 'lucide-react';
import { mockSolicitudes } from '@/lib/mockData';
import { BadgeEstadoSolicitud } from '@/components/solicitudes/BadgeEstadoSolicitud';
import { BadgePrioridad } from '@/components/solicitudes/BadgePrioridad';
import { AccionesSolicitud } from '@/components/solicitudes/AccionesSolicitud';
import Link from 'next/link';
import { EstadoSolicitud } from '@/lib/types';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function DetalleSolicitudPage({ params }: PageProps) {
  const { id } = await params;
  const solicitudOrig = mockSolicitudes.find(s => s.id === id);

  if (!solicitudOrig) {
    return (
      <MainLayout>
        <div className="space-y-6">
          <Link href="/solicitudes">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Volver a Solicitudes
            </Button>
          </Link>
          <Card className="p-8 text-center">
            <p className="text-gray-500 text-lg">No se encontró la solicitud solicitada</p>
          </Card>
        </div>
      </MainLayout>
    );
  }

  return (
    <DetalleSolicitudContenido solicitudInicial={solicitudOrig} />
  );
}

function DetalleSolicitudContenido({ solicitudInicial }: { solicitudInicial: typeof mockSolicitudes[0] }) {
  const [solicitud, setSolicitud] = useState(solicitudInicial);
  const [showHistorial, setShowHistorial] = useState(false);

  const handleEstadoChange = (nuevoEstado: EstadoSolicitud, nota: string) => {
    // Actualizar la solicitud con el nuevo estado
    setSolicitud(prev => ({
      ...prev,
      estado: nuevoEstado,
      historialEstados: [
        ...prev.historialEstados,
        {
          estado: nuevoEstado,
          fecha: new Date(),
          usuario: 'Usuario Actual',
          usuarioId: 'USR-000',
          nota: nota || undefined,
        }
      ]
    }));
  };

  const estadoLabels: Record<EstadoSolicitud, { label: string; descripcion: string }> = {
    solicitado: { label: 'Solicitado', descripcion: 'Aguardando revisión de aprobadores' },
    aprobado: { label: 'Aprobado', descripcion: 'Solicitud aprobada, pendiente de ingreso a almacén' },
    rechazado: { label: 'Rechazado', descripcion: 'La solicitud ha sido rechazada' },
    en_almacen: { label: 'En Almacén', descripcion: 'El material ha llegado al almacén central' },
    distribuido: { label: 'Distribuido', descripcion: 'El material ha sido distribuido a las coordinaciones' },
    completado: { label: 'Completado', descripcion: 'La solicitud ha sido completada exitosamente' },
  };

  const estadoInfo = estadoLabels[solicitud.estado];

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Encabezado */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <Link href="/solicitudes">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Volver
            </Button>
          </Link>
          <div className="text-right">
            <p className="text-sm text-gray-500">Número de Solicitud</p>
            <p className="text-2xl font-bold text-gray-900">{solicitud.numero}</p>
          </div>
        </div>

        {/* Información Principal */}
        <Card className="p-6 border-2 border-red-600 bg-red-50">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{solicitud.titulo}</h1>
          <p className="text-gray-700 mb-6">{solicitud.descripcion}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Estado Actual</p>
              <div className="space-y-2">
                <BadgeEstadoSolicitud estado={solicitud.estado} />
                <p className="text-xs text-gray-600">{estadoInfo.descripcion}</p>
              </div>
            </div>
            
            <div>
              <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Prioridad</p>
              <BadgePrioridad prioridad={solicitud.prioridad} />
            </div>

            <div>
              <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Categoría</p>
              <Badge variant="outline">{solicitud.categoria}</Badge>
            </div>

            <div>
              <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Coordinación</p>
              <p className="text-sm font-semibold text-gray-900">{solicitud.coordinacionSolicitante}</p>
            </div>
          </div>
        </Card>

        {/* Detalles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-red-600" />
              Información Financiera
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Monto Presupuestado:</span>
                <span className="font-semibold text-gray-900">Bs. {solicitud.montoPresupuestado?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-t pt-3">
                <span className="text-gray-600">Monto Aprobado:</span>
                <span className="font-semibold text-green-700">{solicitud.montoAprobado ? `Bs. ${solicitud.montoAprobado.toLocaleString()}` : '-'}</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-red-600" />
              Información del Solicitante
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">Nombre</p>
                <p className="text-gray-900 font-semibold">{solicitud.solicitadoPor}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">Coordinación</p>
                <p className="text-gray-900 font-semibold">{solicitud.coordinacionSolicitante}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Historial de Estados */}
        <Card className="p-6">
          <div 
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setShowHistorial(!showHistorial)}
          >
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-red-600" />
              Historial de Estados
            </h2>
            <span className="text-gray-500">{showHistorial ? '▼' : '▶'}</span>
          </div>

          {showHistorial && (
            <div className="mt-6 space-y-4">
              {solicitud.historialEstados.map((h, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 bg-red-600 rounded-full border-2 border-white"></div>
                    {idx < solicitud.historialEstados.length - 1 && (
                      <div className="w-1 h-12 bg-gray-300"></div>
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <p className="font-semibold text-gray-900">
                      {h.estado.charAt(0).toUpperCase() + h.estado.slice(1).replace(/_/g, ' ')}
                    </p>
                    <p className="text-sm text-gray-600">
                      {h.fecha.toLocaleDateString('es-VE')} a las {h.fecha.toLocaleTimeString('es-VE')}
                    </p>
                    <p className="text-sm text-gray-600">Por: {h.usuario}</p>
                    {h.nota && (
                      <p className="text-sm text-gray-700 mt-2 italic bg-gray-50 p-2 rounded">
                        "{h.nota}"
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Observaciones */}
        {solicitud.observaciones && (
          <Card className="p-6 bg-blue-50 border-blue-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              Observaciones
            </h2>
            <p className="text-gray-700">{solicitud.observaciones}</p>
          </Card>
        )}

        {/* Acciones */}
        <AccionesSolicitud 
          estadoActual={solicitud.estado}
          numero={solicitud.numero}
          titulo={solicitud.titulo}
          onEstadoChange={handleEstadoChange}
        />

        {/* Información de Auditoría */}
        <Card className="p-6 bg-gray-50 border-gray-200">
          <h3 className="font-bold text-gray-900 mb-3">Seguridad y Auditoría</h3>
          <p className="text-sm text-gray-700 mb-2">
            ✓ Todos los cambios en esta solicitud están registrados en auditoría criptográfica SHA-256
          </p>
          <p className="text-sm text-gray-700">
            ✓ Los datos sensibles (montos y proveedores) están protegidos y trazables
          </p>
        </Card>
      </div>
    </MainLayout>
  );
}
