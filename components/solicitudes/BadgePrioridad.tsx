import { PrioridadSolicitud } from '@/lib/types';

interface BadgePrioridadProps {
  prioridad: PrioridadSolicitud;
}

export function BadgePrioridad({ prioridad }: BadgePrioridadProps) {
  const estilos: Record<PrioridadSolicitud, { bg: string; text: string; label: string }> = {
    baja: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Baja' },
    media: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Media' },
    alta: { bg: 'bg-orange-100', text: 'text-orange-800', label: 'Alta' },
    critica: { bg: 'bg-red-100', text: 'text-red-800', label: 'Crítica' },
  };

  const estilo = estilos[prioridad];

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${estilo.bg} ${estilo.text}`}>
      {estilo.label}
    </span>
  );
}
