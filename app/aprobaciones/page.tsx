'use client';

import { MainLayout } from '@/components/layout/MainLayout';
import { Card } from '@/components/ui/card';
import { Clock, CheckCircle, XCircle } from 'lucide-react';
import { mockSolicitudes } from '@/lib/mockData';
import { BadgeEstadoSolicitud } from '@/components/solicitudes/BadgeEstadoSolicitud';
import { BadgePrioridad } from '@/components/solicitudes/BadgePrioridad';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AprobacionesPage() {
  const solicitudesEnRevision = mockSolicitudes.filter(s => s.estado === 'solicitado' || s.estado === 'aprobado');

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Aprobaciones Pendientes</h1>
          <p className="text-gray-600 mt-2">Solicitudes esperando tu revisión y aprobación</p>
        </div>

        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-6">
          <h2 className="font-semibold text-amber-900 mb-2">Panel de Control de Aprobaciones</h2>
          <p className="text-amber-800 text-sm">
            Revisa y aprueba solicitudes de compra que requieren tu autorización para proceder.
          </p>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 border-yellow-200 bg-yellow-50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-yellow-700 font-semibold">Pendientes de Revisar</p>
                <p className="text-3xl font-bold text-yellow-900 mt-1">
                  {mockSolicitudes.filter(s => s.estado === 'solicitado').length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </Card>

          <Card className="p-4 border-green-200 bg-green-50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700 font-semibold">Aprobadas</p>
                <p className="text-3xl font-bold text-green-900 mt-1">
                  {mockSolicitudes.filter(s => s.estado === 'aprobado').length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </Card>

          <Card className="p-4 border-red-200 bg-red-50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-700 font-semibold">Rechazadas</p>
                <p className="text-3xl font-bold text-red-900 mt-1">
                  {mockSolicitudes.filter(s => s.estado === 'rechazado').length}
                </p>
              </div>
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
          </Card>
        </div>

        {/* Solicitudes en Revisión */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Solicitudes en Revisión</h2>
          {solicitudesEnRevision.length === 0 ? (
            <Card className="p-8 text-center bg-green-50 border border-green-200">
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <p className="text-green-800 font-semibold">¡Todas las solicitudes han sido revisadas!</p>
              <p className="text-green-700 text-sm mt-1">No hay aprobaciones pendientes en este momento.</p>
            </Card>
          ) : (
            <div className="space-y-4">
              {solicitudesEnRevision.map((solicitud) => (
                <Card key={solicitud.id} className="p-6 hover:shadow-md transition-shadow">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-semibold">Número</p>
                      <p className="text-sm font-bold text-gray-900">{solicitud.numero}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-semibold">Título</p>
                      <p className="text-sm text-gray-700 truncate">{solicitud.titulo}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-semibold">Estado</p>
                      <BadgeEstadoSolicitud estado={solicitud.estado} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-semibold">Prioridad</p>
                      <BadgePrioridad prioridad={solicitud.prioridad} />
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/solicitudes/${solicitud.id}`}>
                        <Button size="sm" className="w-full">
                          Revisar
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Información */}
        <Card className="p-6 bg-blue-50 border border-blue-200">
          <h3 className="font-bold text-blue-900 mb-2">Proceso de Aprobación</h3>
          <ol className="text-sm text-blue-800 space-y-2">
            <li>1. Revisa los detalles de la solicitud</li>
            <li>2. Verifica disponibilidad de presupuesto</li>
            <li>3. Consulta el historial de auditoría si es necesario</li>
            <li>4. Aprueba o rechaza con comentarios</li>
            <li>5. El sistema automáticamente notificará al solicitante</li>
          </ol>
        </Card>
      </div>
    </MainLayout>
  );
}
