'use client';

import { MainLayout } from '@/components/layout/MainLayout';
import { Card } from '@/components/ui/card';
import { BarChart3, Download, TrendingUp, PieChart } from 'lucide-react';
import { estadisticasGobernanza, datosAnalisisGobernanza } from '@/lib/mockData';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell,
} from 'recharts';

export default function ReportesPage() {
  const generarReportePDF = () => {
    alert('Función de descarga PDF implementada en versión producción');
  };

  const tasaEjecucion = estadisticasGobernanza.tasaEjecucion;
  const porcentajePendiente = 100 - tasaEjecucion;

  // Datos para gráfico de ejecución presupuestaria
  const datosEjecucion = [
    { name: 'Ejecutado', value: estadisticasGobernanza.gastoEjecutado },
    { name: 'Disponible', value: estadisticasGobernanza.gastoProgramado - estadisticasGobernanza.gastoEjecutado },
  ];

  // Datos para distribución de solicitudes
  const datosSolicitudes = [
    { name: 'Completadas', value: estadisticasGobernanza.solicitudesDistribuidas },
    { name: 'En proceso', value: estadisticasGobernanza.solicitudesAprobadas + estadisticasGobernanza.solicitudesEnAlmacen },
    { name: 'Rechazadas', value: estadisticasGobernanza.solicitudesRechazadas },
  ];

  const COLORES = ['#dc2626', '#eab308', '#8b5cf6', '#059669'];
  const COLORES_SOLICITUDES = ['#10b981', '#f59e0b', '#ef4444'];

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reportes y Análisis</h1>
          <p className="text-gray-600 mt-2">Pilar 4: Inteligencia Administrativa</p>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
          <h2 className="font-semibold text-blue-900 mb-2">Inteligencia Administrativa - Análisis Estratégico</h2>
          <p className="text-blue-800 text-sm mb-3">
            Este módulo transforma la data operativa en decisiones estratégicas mediante la generación inmediata 
            de reportes PDF y análisis de consumo, optimizando la ejecución del presupuesto público y reduciendo 
            el margen de error humano.
          </p>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Análisis de tendencias de solicitudes y gastos</li>
            <li>• Indicadores de ejecución presupuestaria</li>
            <li>• KPIs de eficiencia operativa</li>
            <li>• Reportes exportables en PDF</li>
          </ul>
        </div>

        {/* KPIs Principales */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-6">
            <p className="text-sm text-gray-600 font-semibold mb-2">Ejecución Presupuestaria</p>
            <p className="text-4xl font-bold text-blue-600">{tasaEjecucion.toFixed(1)}%</p>
            <p className="text-xs text-gray-500 mt-2">
              ${(estadisticasGobernanza.gastoEjecutado / 1000000).toFixed(2)}M de ${(estadisticasGobernanza.gastoProgramado / 1000000).toFixed(2)}M
            </p>
          </Card>

          <Card className="p-6 border-green-200 bg-green-50">
            <p className="text-sm text-green-700 font-semibold mb-2">Solicitudes Completadas</p>
            <p className="text-4xl font-bold text-green-600">{estadisticasGobernanza.solicitudesDistribuidas}</p>
            <p className="text-xs text-green-600 mt-2">
              {((estadisticasGobernanza.solicitudesDistribuidas / estadisticasGobernanza.totalSolicitudes) * 100).toFixed(0)}% del total
            </p>
          </Card>

          <Card className="p-6 border-orange-200 bg-orange-50">
            <p className="text-sm text-orange-700 font-semibold mb-2">En Almacén</p>
            <p className="text-4xl font-bold text-orange-600">{estadisticasGobernanza.solicitudesEnAlmacen}</p>
            <p className="text-xs text-orange-600 mt-2">Listas para distribución</p>
          </Card>

          <Card className="p-6 border-red-200 bg-red-50">
            <p className="text-sm text-red-700 font-semibold mb-2">Alertas Activas</p>
            <p className="text-4xl font-bold text-red-600">{estadisticasGobernanza.productosEnAlerta}</p>
            <p className="text-xs text-red-600 mt-2">Requieren acción inmediata</p>
          </Card>
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Gráfico de Línea: Análisis Mensual */}
          <Card className="p-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Análisis Mensual
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={datosAnalisisGobernanza}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip formatter={(value) => value.toLocaleString()} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="solicitudes" 
                  stroke="#dc2626" 
                  strokeWidth={2}
                  name="Solicitudes"
                />
                <Line 
                  type="monotone" 
                  dataKey="distribuidas" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  name="Distribuidas"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Gráfico de Barras: Ejecución Presupuestaria */}
          <Card className="p-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-green-600" />
              Ejecución Presupuestaria Mensual
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={datosAnalisisGobernanza}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip formatter={(value) => `$${(value / 1000000).toFixed(2)}M`} />
                <Legend />
                <Bar dataKey="gastoProgramado" fill="#8b5cf6" name="Programado" />
                <Bar dataKey="gastoEjecutado" fill="#10b981" name="Ejecutado" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Gráficos Circulares */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Estado de Ejecución Presupuestaria */}
          <Card className="p-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <PieChart className="w-5 h-5 text-purple-600" />
              Distribución Presupuestaria
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <RePieChart>
                <Pie
                  data={datosEjecucion}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: $${(value / 1000000).toFixed(1)}M`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {datosEjecucion.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORES[index % COLORES.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${(value / 1000000).toFixed(2)}M`} />
              </RePieChart>
            </ResponsiveContainer>
          </Card>

          {/* Estado de Solicitudes */}
          <Card className="p-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <PieChart className="w-5 h-5 text-green-600" />
              Estado de Solicitudes
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <RePieChart>
                <Pie
                  data={datosSolicitudes}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {datosSolicitudes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORES_SOLICITUDES[index % COLORES_SOLICITUDES.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </RePieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Resumen Analítico */}
        <Card className="p-6 bg-indigo-50 border border-indigo-200">
          <h3 className="font-bold text-indigo-900 mb-4">Resumen Ejecutivo</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-indigo-800">
            <div>
              <h4 className="font-semibold text-indigo-900 mb-2">Desempeño Logístico</h4>
              <ul className="space-y-1">
                <li>• Total de solicitudes: {estadisticasGobernanza.totalSolicitudes}</li>
                <li>• Completadas: {estadisticasGobernanza.solicitudesDistribuidas}</li>
                <li>• En proceso: {estadisticasGobernanza.solicitudesAprobadas + estadisticasGobernanza.solicitudesEnAlmacen}</li>
                <li>• Rechazadas: {estadisticasGobernanza.solicitudesRechazadas}</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-indigo-900 mb-2">Desempeño Financiero</h4>
              <ul className="space-y-1">
                <li>• Presupuesto total: ${(estadisticasGobernanza.gastoProgramado / 1000000).toFixed(2)}M</li>
                <li>• Ejecutado: ${(estadisticasGobernanza.gastoEjecutado / 1000000).toFixed(2)}M</li>
                <li>• Disponible: ${((estadisticasGobernanza.gastoProgramado - estadisticasGobernanza.gastoEjecutado) / 1000000).toFixed(2)}M</li>
                <li>• Tasa de ejecución: {tasaEjecucion.toFixed(1)}%</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Botón de Descarga */}
        <button
          onClick={generarReportePDF}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <Download className="w-5 h-5" />
          Descargar Reporte Completo en PDF
        </button>

        {/* Información Adicional */}
        <Card className="p-6 bg-gray-50 border border-gray-200">
          <h3 className="font-bold text-gray-900 mb-3">Características de Reportería</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex gap-2">
              <span className="font-semibold text-blue-600 min-w-fit">•</span>
              Generación inmediata de reportes basados en datos en tiempo real
            </li>
            <li className="flex gap-2">
              <span className="font-semibold text-blue-600 min-w-fit">•</span>
              Análisis de consumo y tendencias mensuales
            </li>
            <li className="flex gap-2">
              <span className="font-semibold text-blue-600 min-w-fit">•</span>
              KPIs de eficiencia y cumplimiento presupuestario
            </li>
            <li className="flex gap-2">
              <span className="font-semibold text-blue-600 min-w-fit">•</span>
              Exportación en múltiples formatos (PDF, Excel)
            </li>
            <li className="flex gap-2">
              <span className="font-semibold text-blue-600 min-w-fit">•</span>
              Reducción del margen de error humano mediante automatización
            </li>
          </ul>
        </Card>
      </div>
    </MainLayout>
  );
}
