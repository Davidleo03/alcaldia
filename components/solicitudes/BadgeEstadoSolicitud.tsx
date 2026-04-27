import { EstadoSolicitud } from '@/lib/types';

interface BadgeEstadoSolicitudProps {
  estado: EstadoSolicitud;
}

export function BadgeEstadoSolicitud({ estado }: BadgeEstadoSolicitudProps) {
  const estilos: Record<EstadoSolicitud, { bg: string; text: string; label: string }> = {
    solicitado: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Solicitado' },
    aprobado: { bg: 'bg-green-100', text: 'text-green-800', label: 'Aprobado' },
    rechazado: { bg: 'bg-red-100', text: 'text-red-800', label: 'Rechazado' },
    en_almacen: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'En Almacén' },
    distribuido: { bg: 'bg-purple-100', text: 'text-purple-800', label: 'Distribuido' },
    completado: { bg: 'bg-emerald-100', text: 'text-emerald-800', label: 'Completado' },
  };

  const estilo = estilos[estado];

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${estilo.bg} ${estilo.text}`}>
      {estilo.label}
    </span>
  );
}
