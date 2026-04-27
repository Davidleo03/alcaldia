'use client';

import { Phone, Mail, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-gray-300 border-t border-red-600">
      <div className="w-full px-4 md:px-6 py-3">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 text-xs md:text-sm">
          {/* Información izquierda */}
          <div className="flex flex-col gap-1">
            <p className="text-gray-400">&copy; 2024 Departamento de Compras</p>
            <div className="flex gap-2 text-gray-500">
              <Phone className="w-3 h-3 text-red-500 flex-shrink-0 mt-0.5" />
              <span>+57 (601) 555-0100</span>
            </div>
          </div>

          {/* Enlaces centrales */}
          <div className="flex gap-3 text-gray-400 flex-wrap justify-center">
            <a href="/solicitudes" className="hover:text-white transition text-xs">
              Solicitudes
            </a>
            <span className="text-gray-600">|</span>
            <a href="/inventario" className="hover:text-white transition text-xs">
              Inventario
            </a>
            <span className="text-gray-600">|</span>
            <a href="/auditoria" className="hover:text-white transition text-xs">
              Auditoría
            </a>
            <span className="text-gray-600">|</span>
            <a href="/reportes" className="hover:text-white transition text-xs">
              Reportes
            </a>
          </div>

          {/* Información derecha */}
          <div className="flex gap-2 text-gray-500 text-xs">
            <Mail className="w-3 h-3 text-red-500 flex-shrink-0 mt-0.5" />
            <span>compras@municipio.gov</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
