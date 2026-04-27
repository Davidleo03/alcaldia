'use client';

import { MainLayout } from '@/components/layout/MainLayout';
import { Card } from '@/components/ui/card';
import { Settings, Lock, Bell, BarChart3, Shield } from 'lucide-react';

export default function ConfiguracionPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Configuración del Sistema</h1>
          <p className="text-gray-600 mt-2">Administración y preferencias de Gobernanza Digital</p>
        </div>

        {/* Secciones de Configuración */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Seguridad y Auditoría */}
          <Card className="p-6 border-l-4 border-l-purple-600">
            <div className="flex items-start gap-3 mb-4">
              <Shield className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Seguridad y Auditoría</h3>
                <p className="text-sm text-gray-600">Configurar políticas de seguridad criptográfica</p>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <span>Verificación de integridad SHA-256</span>
                <span className="text-green-600 font-semibold">Activo</span>
              </li>
              <li className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <span>Cadena de integridad criptográfica</span>
                <span className="text-green-600 font-semibold">Activo</span>
              </li>
              <li className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <span>Registro inmutable de cambios</span>
                <span className="text-green-600 font-semibold">Activo</span>
              </li>
            </ul>
          </Card>

          {/* Alertas y Notificaciones */}
          <Card className="p-6 border-l-4 border-l-orange-600">
            <div className="flex items-start gap-3 mb-4">
              <Bell className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Alertas y Notificaciones</h3>
                <p className="text-sm text-gray-600">Gestionar notificaciones del motor de alertas</p>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              <label className="flex items-center p-3 bg-gray-50 rounded cursor-pointer">
                <input type="checkbox" defaultChecked className="mr-3" />
                <span>Alertas críticas de inventario</span>
              </label>
              <label className="flex items-center p-3 bg-gray-50 rounded cursor-pointer">
                <input type="checkbox" defaultChecked className="mr-3" />
                <span>Notificaciones de aprobación</span>
              </label>
              <label className="flex items-center p-3 bg-gray-50 rounded cursor-pointer">
                <input type="checkbox" defaultChecked className="mr-3" />
                <span>Alertas de presupuesto</span>
              </label>
            </div>
          </Card>

          {/* Reportería */}
          <Card className="p-6 border-l-4 border-l-blue-600">
            <div className="flex items-start gap-3 mb-4">
              <BarChart3 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Reportería e Inteligencia</h3>
                <p className="text-sm text-gray-600">Configurar generación automática de reportes</p>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <span>Reportes automáticos mensuales</span>
                <span className="text-green-600 font-semibold">Activo</span>
              </li>
              <li className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <span>Análisis de tendencias</span>
                <span className="text-green-600 font-semibold">Activo</span>
              </li>
              <li className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <span>Exportación a PDF</span>
                <span className="text-green-600 font-semibold">Disponible</span>
              </li>
            </ul>
          </Card>

          {/* Permisos y Acceso */}
          <Card className="p-6 border-l-4 border-l-red-600">
            <div className="flex items-start gap-3 mb-4">
              <Lock className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Control de Acceso</h3>
                <p className="text-sm text-gray-600">Gestionar permisos y roles de usuarios</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="p-3 bg-gray-50 rounded">
                <p className="font-semibold text-gray-900">Tu Rol Actual</p>
                <p className="text-gray-700 mt-1">Administrador - Acceso completo</p>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <p className="font-semibold text-gray-900 mb-2">Roles disponibles</p>
                <ul className="text-gray-700 space-y-1">
                  <li>• Comprador</li>
                  <li>• Almacenista</li>
                  <li>• Aprobador</li>
                  <li>• Auditor</li>
                  <li>• Administrador</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>

        {/* Información del Sistema */}
        <Card className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-300">
          <h3 className="font-bold text-gray-900 mb-4">Información del Sistema</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <p className="text-gray-600 mb-1">Versión del Sistema</p>
              <p className="text-lg font-bold text-gray-900">3.0 - Gobernanza Digital</p>
            </div>
            <div>
              <p className="text-gray-600 mb-1">Última Actualización</p>
              <p className="text-lg font-bold text-gray-900">{new Date().toLocaleDateString('es-CO')}</p>
            </div>
            <div>
              <p className="text-gray-600 mb-1">Estado de Servicios</p>
              <p className="text-lg font-bold text-green-600">Todos operativos</p>
            </div>
            <div>
              <p className="text-gray-600 mb-1">Modo de Seguridad</p>
              <p className="text-lg font-bold text-purple-600">SHA-256 Activo</p>
            </div>
          </div>
        </Card>

        {/* Resumen de Funcionalidades */}
        <Card className="p-6 bg-blue-50 border border-blue-200">
          <h3 className="font-bold text-blue-900 mb-3">Resumen de los 4 Pilares Operativos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
            <div>
              <p className="font-semibold text-blue-900">Pilar 1: Automatización Logística</p>
              <p className="mt-1">Gestión centralizada del ciclo completo de suministros sin registros manuales.</p>
            </div>
            <div>
              <p className="font-semibold text-blue-900">Pilar 2: Control de Inventario</p>
              <p className="mt-1">Motor de alertas automáticas que notifica cuando stock alcanza puntos críticos.</p>
            </div>
            <div>
              <p className="font-semibold text-blue-900">Pilar 3: Auditoría Inmutable</p>
              <p className="mt-1">Registro criptográfico SHA-256 protegiendo precios y proveedores cumpliendo Contraloría.</p>
            </div>
            <div>
              <p className="font-semibold text-blue-900">Pilar 4: Inteligencia Administrativa</p>
              <p className="mt-1">Reportes PDF automáticos y análisis de consumo optimizando presupuesto público.</p>
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}
