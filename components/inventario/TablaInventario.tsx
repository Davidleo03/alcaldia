'use client';

import { useState } from 'react';
import { ProductoInventario, AlertaInventario } from '@/lib/types';
import { mockProductos, mockAlertas } from '@/lib/mockData';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { AlertTriangle, TrendingDown } from 'lucide-react';

export function TablaInventario() {
  const [productos] = useState<ProductoInventario[]>(mockProductos);
  const [alertas] = useState<AlertaInventario[]>(mockAlertas);
  const [busqueda, setBusqueda] = useState('');

  const productosFiltrados = productos.filter(p =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.codigo.toLowerCase().includes(busqueda.toLowerCase())
  );

  const obtenerEstadoStock = (producto: ProductoInventario) => {
    if (producto.stockActual <= producto.stockMinimo) {
      return { clase: 'text-red-600 bg-red-50', estado: 'Crítico' };
    } else if (producto.stockActual <= producto.stockMinimo * 1.5) {
      return { clase: 'text-orange-600 bg-orange-50', estado: 'Bajo' };
    }
    return { clase: 'text-green-600 bg-green-50', estado: 'Normal' };
  };

  const porcentajeStock = (actual: number, minimo: number, maximo: number) => {
    return Math.round(((actual - minimo) / (maximo - minimo)) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Búsqueda */}
      <div className="relative">
        <Input
          placeholder="Buscar por nombre o código..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full"
        />
      </div>

      {/* Panel de Alertas */}
      {alertas.length > 0 && (
        <Card className="border-red-200 bg-red-50 p-6">
          <div className="flex gap-4">
            <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="font-bold text-red-900 mb-3">Alertas de Inventario Activas</h3>
              <div className="space-y-2">
                {alertas.map((alerta) => (
                  <div key={alerta.id} className="bg-white rounded p-3 text-sm">
                    <p className="font-semibold text-gray-900">{alerta.nombreProducto}</p>
                    <p className="text-gray-600">
                      Stock actual: <span className="font-bold text-red-600">{alerta.stockActual}</span> / Mínimo: {alerta.stockMinimo}
                    </p>
                    {alerta.accionTomada && (
                      <p className="text-gray-500 text-xs mt-1">Acción: {alerta.accionTomada}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Tabla de Inventario */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Código</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Producto</th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Stock Actual</th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Mínimo</th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Máximo</th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Estado</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Precio Unit.</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Valor Total</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {productosFiltrados.map((producto) => {
              const estadoStock = obtenerEstadoStock(producto);
              const porcentaje = porcentajeStock(producto.stockActual, producto.stockMinimo, producto.stockMaximo);
              const valorTotal = producto.stockActual * producto.precioUnitario;

              return (
                <tr key={producto.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{producto.codigo}</td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{producto.nombre}</p>
                      <p className="text-xs text-gray-500">{producto.categoria}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                    {producto.stockActual}
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-600">{producto.stockMinimo}</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-600">{producto.stockMaximo}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${estadoStock.clase}`}>
                        {estadoStock.estado}
                      </span>
                      <div className="w-full bg-gray-200 rounded-full h-2 max-w-xs">
                        <div
                          className={`h-2 rounded-full transition-all ${
                            porcentaje >= 75 ? 'bg-green-500' :
                            porcentaje >= 50 ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${Math.max(0, Math.min(100, porcentaje))}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium text-gray-900">
                    ${producto.precioUnitario.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-bold text-gray-900">
                    ${valorTotal.toLocaleString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {productosFiltrados.length === 0 && (
        <Card className="p-8 text-center">
          <p className="text-gray-500">No se encontraron productos en el inventario</p>
        </Card>
      )}

      {/* Resumen */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <p className="text-sm text-gray-600 mb-1">Total de Productos</p>
          <p className="text-3xl font-bold text-gray-900">{productos.length}</p>
        </Card>
        <Card className="p-4 border-orange-200 bg-orange-50">
          <p className="text-sm text-orange-700 font-semibold mb-1">Productos en Alerta</p>
          <p className="text-3xl font-bold text-orange-900">{productos.filter(p => p.enAlerta).length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-600 mb-1">Valor Total Inventario</p>
          <p className="text-2xl font-bold text-gray-900">
            ${(productos.reduce((sum, p) => sum + (p.stockActual * p.precioUnitario), 0)).toLocaleString()}
          </p>
        </Card>
      </div>

      {/* Información del Motor de Alertas */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
        <p className="font-semibold mb-1">Motor de Alertas Automáticas</p>
        <p>
          El sistema notifica automáticamente cuando el stock alcanza el nivel mínimo (punto de reorden).
          {alertas.length > 0 && ` Actualmente hay ${alertas.length} alerta(s) activa(s).`}
        </p>
      </div>
    </div>
  );
}
