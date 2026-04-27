'use client';

import { BarChart3, FileText, CheckCircle, Clock, AlertTriangle, Shield } from 'lucide-react';
import { StatCard } from './StatCard';
import { MonthlyChart } from './MonthlyChart';
import { estadisticasGobernanza, datosAnalisisGobernanza } from '@/lib/mockData';

export function DashboardView() {
  return (
    <div className="space-y-8">
      {/* Encabezado */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900">Tablero de Control</h1>
        <p className="text-gray-600 mt-2">
          Gobernanza Digital - Visión Integral de los 4 Pilares de Automatización
        </p>
      </div>

      {/* Tarjetas de Estadísticas - Pilar 1: Automatización Logística */}
      <div>
        <h2 className="text-xl font-bold text-red-700 mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Pilar 1: Automatización Logística
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Solicitudes Totales"
            value={estadisticasGobernanza.totalSolicitudes}
            icon={<FileText className="w-6 h-6" />}
            color="red"
            trend={{ value: 12, direction: 'up' }}
          />
          <StatCard
            title="Aprobadas"
            value={estadisticasGobernanza.solicitudesAprobadas}
            icon={<CheckCircle className="w-6 h-6" />}
            color="green"
          />
          <StatCard
            title="En Almacén"
            value={estadisticasGobernanza.solicitudesEnAlmacen}
            icon={<BarChart3 className="w-6 h-6" />}
            color="yellow"
          />
          <StatCard
            title="Distribuidas"
            value={estadisticasGobernanza.solicitudesDistribuidas}
            icon={<CheckCircle className="w-6 h-6" />}
            color="purple"
            trend={{ value: 8, direction: 'up' }}
          />
        </div>
      </div>

      {/* Tarjetas de Estadísticas - Pilar 2: Control de Inventario */}
      <div>
        <h2 className="text-xl font-bold text-yellow-700 mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          Pilar 2: Control de Inventario en Tiempo Real
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            title="Productos en Alerta"
            value={estadisticasGobernanza.productosEnAlerta}
            icon={<AlertTriangle className="w-6 h-6" />}
            color="orange"
          />
          <StatCard
            title="Stock Crítico"
            value={estadisticasGobernanza.stockCriticoTotal}
            icon={<AlertTriangle className="w-6 h-6" />}
            color="red"
          />
          <StatCard
            title="Valor Total Inventario"
            value={`$${(estadisticasGobernanza.valorInventarioTotal / 1000000).toFixed(1)}M`}
            icon={<BarChart3 className="w-6 h-6" />}
            color="blue"
          />
        </div>
      </div>

      {/* Tarjetas de Estadísticas - Pilar 3 & 4 */}
      <div>
        <h2 className="text-xl font-bold text-purple-700 mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Pilar 3 & 4: Auditoría e Inteligencia Administrativa
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            title="Registros de Auditoría"
            value={estadisticasGobernanza.registrosAuditoriaTotal}
            icon={<Shield className="w-6 h-6" />}
            color="purple"
          />
          <StatCard
            title="Ejecución Presupuestaria"
            value={`${estadisticasGobernanza.tasaEjecucion.toFixed(1)}%`}
            icon={<BarChart3 className="w-6 h-6" />}
            color="green"
          />
          <StatCard
            title="Gasto Ejecutado"
            value={`$${(estadisticasGobernanza.gastoEjecutado / 1000000).toFixed(1)}M`}
            icon={<FileText className="w-6 h-6" />}
            color="blue"
          />
        </div>
      </div>

      {/* Gráfico de Análisis Mensual */}
      <div className="grid grid-cols-1 gap-8">
        <MonthlyChart data={datosAnalisisGobernanza} />
      </div>

      {/* Información del Sistema */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="font-semibold text-red-900 mb-2">Automatización Logística</h3>
          <p className="text-sm text-red-800">
            Solicitudes en flujo: {estadisticasGobernanza.totalSolicitudes}. 
            Digitalizando el ciclo completo sin libros manuales.
          </p>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="font-semibold text-yellow-900 mb-2">Control de Inventario</h3>
          <p className="text-sm text-yellow-800">
            {estadisticasGobernanza.productosEnAlerta} productos en alerta. 
            Motor de alertas activo - notificaciones automáticas activadas.
          </p>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
          <h3 className="font-semibold text-purple-900 mb-2">Auditoría Inmutable</h3>
          <p className="text-sm text-purple-800">
            {estadisticasGobernanza.registrosAuditoriaTotal} registros SHA-256. 
            Cumplimiento normativo Contraloría garantizado.
          </p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-2">Inteligencia Administrativa</h3>
          <p className="text-sm text-blue-800">
            Ejecución: {estadisticasGobernanza.tasaEjecucion.toFixed(1)}%. 
            Reportes PDF generados - Análisis de consumo optimizado.
          </p>
        </div>
      </div>

      {/* Información de Actualización */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-300 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-2">Estado del Sistema</h3>
        <p className="text-sm text-gray-700">
          Sistema operativo. 
          Todos los módulos de Gobernanza Digital activos y sincronizados.
        </p>
      </div>
    </div>
  );
}
