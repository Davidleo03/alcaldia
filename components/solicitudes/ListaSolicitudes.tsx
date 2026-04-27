'use client';

import { useState, useMemo } from 'react';
import { SolicitudCompra, EstadoSolicitud, PrioridadSolicitud } from '@/lib/types';
import { mockSolicitudes } from '@/lib/mockData';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Search, Filter, Eye, Trash2 } from 'lucide-react';
import { BadgeEstadoSolicitud } from './BadgeEstadoSolicitud';
import { BadgePrioridad } from './BadgePrioridad';

export function ListaSolicitudes() {
  const [solicitudes, setSolicitudes] = useState<SolicitudCompra[]>(mockSolicitudes);
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState<EstadoSolicitud | 'todas'>('todas');
  const [filtroPrioridad, setFiltroPrioridad] = useState<PrioridadSolicitud | 'todas'>('todas');

  const solicitudesFiltradas = useMemo(() => {
    return solicitudes.filter(solicitud => {
      const coincideBusqueda = 
        solicitud.numero.toLowerCase().includes(busqueda.toLowerCase()) ||
        solicitud.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
        solicitud.solicitadoPor.toLowerCase().includes(busqueda.toLowerCase());
      
      const coincideEstado = filtroEstado === 'todas' || solicitud.estado === filtroEstado;
      const coincidePrioridad = filtroPrioridad === 'todas' || solicitud.prioridad === filtroPrioridad;
      
      return coincideBusqueda && coincideEstado && coincidePrioridad;
    });
  }, [solicitudes, busqueda, filtroEstado, filtroPrioridad]);

  const estadoLabels: Record<EstadoSolicitud, string> = {
    solicitado: 'Solicitado',
    aprobado: 'Aprobado',
    rechazado: 'Rechazado',
    en_almacen: 'En Almacén',
    distribuido: 'Distribuido',
    completado: 'Completado',
  };

  const prioridadLabels: Record<PrioridadSolicitud, string> = {
    baja: 'Baja',
    media: 'Media',
    alta: 'Alta',
    critica: 'Crítica',
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Buscar por número, título o solicitante..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="pl-10"
            />
          </div>
          <Link href="/solicitudes/nueva">
            <Button className="bg-red-600 hover:bg-red-700 w-full sm:w-auto">
              + Nueva Solicitud
            </Button>
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <select
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value as EstadoSolicitud | 'todas')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white"
            >
              <option value="todas">Todos los estados</option>
              {Object.entries(estadoLabels).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <select
              value={filtroPrioridad}
              onChange={(e) => setFiltroPrioridad(e.target.value as PrioridadSolicitud | 'todas')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white"
            >
              <option value="todas">Todas las prioridades</option>
              {Object.entries(prioridadLabels).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {solicitudesFiltradas.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-gray-500">No se encontraron solicitudes que coincidan con los criterios</p>
        </Card>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Número</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Título</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Estado</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Prioridad</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Solicitado por</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Monto</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {solicitudesFiltradas.map((solicitud) => (
                <tr key={solicitud.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{solicitud.numero}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{solicitud.titulo}</td>
                  <td className="px-6 py-4">
                    <BadgeEstadoSolicitud estado={solicitud.estado} />
                  </td>
                  <td className="px-6 py-4">
                    <BadgePrioridad prioridad={solicitud.prioridad} />
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{solicitud.solicitadoPor}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    ${solicitud.montoAprobado ? solicitud.montoAprobado.toLocaleString() : '-'}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <Link href={`/solicitudes/${solicitud.id}`}>
                        <Button variant="outline" size="sm" className="gap-2">
                          <Eye className="w-4 h-4" />
                          Ver
                        </Button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
        <p className="font-semibold mb-2">Información del sistema:</p>
        <p>Se muestran {solicitudesFiltradas.length} de {solicitudes.length} solicitudes. Todos los cambios se registran en la auditoría criptográfica SHA-256.</p>
      </div>
    </div>
  );
}
