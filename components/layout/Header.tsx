'use client';

export function Header() {
  return (
    <header className="w-full bg-red-700 text-white shadow-md border-b-4 border-yellow-400 sticky top-0 z-50">
      <div className="w-full px-4 py-4 md:px-6">
        <div className="flex items-center justify-between gap-4 md:gap-6">
          {/* Escudo y Branding */}
          <div className="flex items-center gap-2 md:gap-4 flex-1">
            {/* Escudo Municipal */}
            <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
              <div className="w-10 h-10 md:w-14 md:h-14 bg-red-800 rounded-full flex items-center justify-center text-white text-lg md:text-2xl font-bold">
                DC
              </div>
            </div>

            {/* Título y Lema */}
            <div className="min-w-0">
              <h1 className="text-lg md:text-2xl font-bold leading-tight truncate">Departamento de Compras</h1>
              <p className="text-xs md:text-sm text-red-100 italic line-clamp-1">Gobernanza Digital - Automatización Logística</p>
            </div>
          </div>

          {/* Lado derecho - Estado del Sistema - Solo en pantallas grandes */}
          <div className="text-right hidden sm:block flex-shrink-0">
            <p className="text-xs md:text-sm font-semibold text-yellow-300">Sistema Activo</p>
            <p className="text-xs text-red-100">Todos los módulos operativos</p>
          </div>
        </div>
      </div>
    </header>
  );
}
