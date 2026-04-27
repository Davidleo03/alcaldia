'use client';

import { MainLayout } from '@/components/layout/MainLayout';
import { ListaSolicitudes } from '@/components/solicitudes/ListaSolicitudes';

export default function MisSolicitudesPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mis Solicitudes</h1>
          <p className="text-gray-600 mt-2">Solicitudes que has creado y en seguimiento</p>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-6">
          <h2 className="font-semibold text-blue-900 mb-2">Tus Solicitudes en Proceso</h2>
          <p className="text-blue-800 text-sm">
            Visualiza el estado de todas tus solicitudes de compra y recibe actualizaciones en tiempo real.
          </p>
        </div>

        <ListaSolicitudes />
      </div>
    </MainLayout>
  );
}
