'use client';

import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex flex-col w-screen h-screen bg-white">
      {/* Header sticky en la parte superior */}
      <div className="flex-shrink-0">
        <Header />
      </div>
      
      {/* Contenedor principal con sidebar y contenido */}
      <div className="flex flex-1 w-full overflow-hidden">
        {/* Sidebar - visible en desktop, oculto en móvil */}
        <div className="hidden md:block flex-shrink-0 w-64 overflow-y-auto bg-gray-900">
          <Sidebar />
        </div>
        
        {/* Sidebar móvil - overlay fijo */}
        <div className="block md:hidden">
          <Sidebar />
        </div>
        
        {/* Contenido principal con footer */}
        <main className="flex-1 flex flex-col w-full overflow-hidden">
          {/* Área scrollable del contenido */}
          <div className="flex-1 w-full overflow-y-auto px-4 md:px-6 py-6 md:py-8">
            <div className="w-full max-w-full">
              {children}
            </div>
          </div>
          
          {/* Footer fijo al final */}
          <div className="flex-shrink-0 w-full">
            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
}
