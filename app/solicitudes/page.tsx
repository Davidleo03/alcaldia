'use client';

import { MainLayout } from '@/components/layout/MainLayout';
import { ListaSolicitudes } from '@/components/solicitudes/ListaSolicitudes';

export default function SolicitudesPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Solicitudes de Compra</h1>
          <p className="text-gray-600 mt-2">Pilar 1: Automatización del Flujo Logístico</p>
        </div>

        <div className="bg-gradient-to-r from-red-50 to-yellow-50 border border-red-200 rounded-lg p-6">
          <h2 className="font-semibold text-red-900 mb-2">Gestión Centralizada de Solicitudes</h2>
          <p className="text-red-800 text-sm">
            Este módulo automatiza el ciclo completo de suministros, desde el ingreso al almacén hasta el despacho final. 
            Todos los cambios de estado se registran de forma inmutable para auditoría.
          </p>
        </div>

        <ListaSolicitudes />
      </div>
    </MainLayout>
  );
}
