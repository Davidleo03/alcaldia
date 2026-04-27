'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { CheckCircle, XCircle, Package, Truck } from 'lucide-react';
import { EstadoSolicitud } from '@/lib/types';

interface AccionesSolicitudProps {
  estadoActual: EstadoSolicitud;
  numero: string;
  titulo: string;
  onEstadoChange?: (nuevoEstado: EstadoSolicitud, nota: string) => void;
}

export function AccionesSolicitud({ 
  estadoActual, 
  numero, 
  titulo,
  onEstadoChange 
}: AccionesSolicitudProps) {
  const [showDialog, setShowDialog] = useState(false);
  const [accionSeleccionada, setAccionSeleccionada] = useState<EstadoSolicitud | null>(null);
  const [nota, setNota] = useState('');
  const [procesando, setProcesando] = useState(false);

  const puedoAprobar = estadoActual === 'solicitado';
  const puedoRechazar = estadoActual === 'solicitado';
  const puedoEnviארAlmacen = estadoActual === 'aprobado';
  const puedoDistribuir = estadoActual === 'en_almacen';
  const puedoCompletар = estadoActual === 'distribuido';

  const handleAccion = (nuevoEstado: EstadoSolicitud) => {
    setAccionSeleccionada(nuevoEstado);
    setShowDialog(true);
  };

  const confirmarAccion = async () => {
    if (!accionSeleccionada) return;
    
    setProcesando(true);
    
    // Simular delay de procesamiento
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onEstadoChange?.(accionSeleccionada, nota);
    
    setProcesando(false);
    setShowDialog(false);
    setAccionSeleccionada(null);
    setNota('');
  };

  const getDialogTitle = () => {
    switch (accionSeleccionada) {
      case 'aprobado':
        return 'Aprobar Solicitud';
      case 'rechazado':
        return 'Rechazar Solicitud';
      case 'en_almacen':
        return 'Enviar a Almacén';
      case 'distribuido':
        return 'Marcar como Distribuida';
      case 'completado':
        return 'Completar Solicitud';
      default:
        return 'Confirmar Acción';
    }
  };

  const getDialogDescription = () => {
    switch (accionSeleccionada) {
      case 'aprobado':
        return `¿Estás seguro de que quieres aprobar la solicitud ${numero}? Se notificará al solicitante.`;
      case 'rechazado':
        return `¿Estás seguro de que quieres rechazar la solicitud ${numero}? El solicitante recibirá notificación.`;
      case 'en_almacen':
        return `¿Confirmas que la solicitud ${numero} ha llegado al almacén?`;
      case 'distribuido':
        return `¿Confirmas que la solicitud ${numero} ha sido distribuida a las coordinaciones?`;
      case 'completado':
        return `¿Quieres marcar la solicitud ${numero} como completada?`;
      default:
        return 'Por favor confirma esta acción.';
    }
  };

  return (
    <>
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <h3 className="font-bold text-blue-900 mb-4">Acciones Disponibles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {puedoAprobar && (
            <Button
              onClick={() => handleAccion('aprobado')}
              className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              Aprobar Solicitud
            </Button>
          )}
          
          {puedoRechazar && (
            <Button
              onClick={() => handleAccion('rechazado')}
              variant="destructive"
              className="flex items-center gap-2"
            >
              <XCircle className="w-4 h-4" />
              Rechazar Solicitud
            </Button>
          )}

          {puedoEnviארAlmacen && (
            <Button
              onClick={() => handleAccion('en_almacen')}
              className="bg-yellow-600 hover:bg-yellow-700 text-white flex items-center gap-2"
            >
              <Package className="w-4 h-4" />
              Enviar a Almacén
            </Button>
          )}

          {puedoDistribuir && (
            <Button
              onClick={() => handleAccion('distribuido')}
              className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2"
            >
              <Truck className="w-4 h-4" />
              Marcar Distribuida
            </Button>
          )}

          {puedoCompletар && (
            <Button
              onClick={() => handleAccion('completado')}
              className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              Completar
            </Button>
          )}

          {!puedoAprobar && !puedoRechazar && !puedoEnviארAlmacen && !puedoDistribuir && !puedoCompletар && (
            <div className="col-span-1 md:col-span-2 p-4 bg-white rounded border border-gray-300">
              <p className="text-gray-600 text-sm">
                No hay acciones disponibles para este estado. La solicitud ha completado su ciclo de vida.
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* Dialog de Confirmación */}
      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{getDialogTitle()}</AlertDialogTitle>
            <AlertDialogDescription>
              {getDialogDescription()}
            </AlertDialogDescription>
          </AlertDialogHeader>

          {(accionSeleccionada === 'rechazado' || accionSeleccionada === 'aprobado') && (
            <div className="my-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nota (opcional):
              </label>
              <textarea
                value={nota}
                onChange={(e) => setNota(e.target.value)}
                placeholder="Agrega un comentario sobre esta acción..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows={3}
              />
            </div>
          )}

          <AlertDialogFooter>
            <AlertDialogCancel disabled={procesando}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmarAccion}
              disabled={procesando}
              className={
                accionSeleccionada === 'rechazado'
                  ? 'bg-red-600 hover:bg-red-700'
                  : 'bg-green-600 hover:bg-green-700'
              }
            >
              {procesando ? 'Procesando...' : 'Confirmar'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
