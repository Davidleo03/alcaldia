'use client';

import { MainLayout } from '@/components/layout/MainLayout';
import { TablaInventario } from '@/components/inventario/TablaInventario';

export default function InventarioPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Control de Inventario</h1>
          <p className="text-gray-600 mt-2">Pilar 2: Control de Inventario en Tiempo Real</p>
        </div>

        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-6">
          <h2 className="font-semibold text-yellow-900 mb-2">Gestión de Bienes con Actualización Instantánea</h2>
          <p className="text-yellow-800 text-sm">
            Este módulo gestiona el catálogo de bienes con actualización instantánea de existencias. 
            Incluye un motor de alertas que notifica automáticamente cuando los insumos alcanzan niveles críticos.
          </p>
        </div>

        <TablaInventario />
      </div>
    </MainLayout>
  );
}
