'use client';

import { MainLayout } from '@/components/layout/MainLayout';
import { mockAlertas, mockProductos } from '@/lib/mockData';
import { Card } from '@/components/ui/card';
import { AlertTriangle, TrendingDown, Bell } from 'lucide-react';

export default function AlertasPage() {
  const alertasCriticas = mockAlertas.filter(a => a.tipo === 'stock_critico');
  const alertasBajas = mockAlertas.filter(a => a.tipo === 'stock_bajo');

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Centro de Alertas</h1>
          <p className="text-gray-600 mt-2">Motor de Alertas Automáticas de Inventario</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6 border-red-200 bg-red-50">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-red-700 font-semibold">Alertas Críticas</p>
                <p className="text-4xl font-bold text-red-900 mt-2">{alertasCriticas.length}</p>
              </div>
              <AlertTriangle className="w-10 h-10 text-red-600" />
            </div>
          </Card>

          <Card className="p-6 border-orange-200 bg-orange-50">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-orange-700 font-semibold">Alertas Bajas</p>
                <p className="text-4xl font-bold text-orange-900 mt-2">{alertasBajas.length}</p>
              </div>
              <TrendingDown className="w-10 h-10 text-orange-600" />
            </div>
          </Card>

          <Card className="p-6 border-blue-200 bg-blue-50">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-blue-700 font-semibold">Total Alertas Activas</p>
                <p className="text-4xl font-bold text-blue-900 mt-2">{mockAlertas.length}</p>
              </div>
              <Bell className="w-10 h-10 text-blue-600" />
            </div>
          </Card>
        </div>

        {/* Alertas Críticas */}
        {alertasCriticas.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-red-900 mb-4">Alertas Críticas - Acción Inmediata Requerida</h2>
            <div className="grid gap-4">
              {alertasCriticas.map((alerta) => (
                <Card key={alerta.id} className="border-red-300 bg-red-50 p-6">
                  <div className="flex gap-4">
                    <AlertTriangle className="w-8 h-8 text-red-600 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="font-bold text-red-900 text-lg">{alerta.nombreProducto}</h3>
                      <div className="grid grid-cols-2 gap-4 mt-3">
                        <div>
                          <p className="text-sm text-red-700">Stock Actual</p>
                          <p className="text-2xl font-bold text-red-900">{alerta.stockActual}</p>
                        </div>
                        <div>
                          <p className="text-sm text-red-700">Nivel Mínimo</p>
                          <p className="text-2xl font-bold text-red-600">{alerta.stockMinimo}</p>
                        </div>
                      </div>
                      {alerta.accionTomada && (
                        <p className="text-sm text-red-800 mt-3 bg-red-100 p-2 rounded">
                          <span className="font-semibold">Acción: </span>{alerta.accionTomada}
                        </p>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Alertas Bajas */}
        {alertasBajas.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-orange-900 mb-4">Alertas de Stock Bajo</h2>
            <div className="grid gap-4">
              {alertasBajas.map((alerta) => (
                <Card key={alerta.id} className="border-orange-300 bg-orange-50 p-6">
                  <div className="flex gap-4">
                    <TrendingDown className="w-8 h-8 text-orange-600 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="font-bold text-orange-900 text-lg">{alerta.nombreProducto}</h3>
                      <div className="grid grid-cols-2 gap-4 mt-3">
                        <div>
                          <p className="text-sm text-orange-700">Stock Actual</p>
                          <p className="text-2xl font-bold text-orange-900">{alerta.stockActual}</p>
                        </div>
                        <div>
                          <p className="text-sm text-orange-700">Nivel Mínimo</p>
                          <p className="text-2xl font-bold text-orange-600">{alerta.stockMinimo}</p>
                        </div>
                      </div>
                      {alerta.accionTomada && (
                        <p className="text-sm text-orange-800 mt-3 bg-orange-100 p-2 rounded">
                          <span className="font-semibold">Acción: </span>{alerta.accionTomada}
                        </p>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Info del Motor de Alertas */}
        <Card className="p-6 bg-blue-50 border border-blue-200">
          <h3 className="font-bold text-blue-900 mb-3">Cómo Funciona el Motor de Alertas</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li className="flex gap-2">
              <span className="font-semibold text-blue-600 min-w-fit">•</span>
              Monitoreo en tiempo real del nivel de cada producto
            </li>
            <li className="flex gap-2">
              <span className="font-semibold text-blue-600 min-w-fit">•</span>
              Notificación automática cuando stock ≤ punto de reorden (mínimo)
            </li>
            <li className="flex gap-2">
              <span className="font-semibold text-blue-600 min-w-fit">•</span>
              Clasificación por severidad: crítico vs. bajo
            </li>
            <li className="flex gap-2">
              <span className="font-semibold text-blue-600 min-w-fit">•</span>
              Cada alerta genera una solicitud de compra automáticamente
            </li>
            <li className="flex gap-2">
              <span className="font-semibold text-blue-600 min-w-fit">•</span>
              Todas las acciones se registran en auditoría inmutable
            </li>
          </ul>
        </Card>
      </div>
    </MainLayout>
  );
}
