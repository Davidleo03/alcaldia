'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogOut, User } from 'lucide-react';

export function Header() {
  const { session, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  if (!session) return null;

  return (
    <header className="bg-sidebar border-b-4 border-accent">
      <div className="flex items-center justify-between h-20 px-4 md:px-8">
        <div className="flex items-center gap-4">
          
          <div>
            <h1 className="text-2xl font-bold text-sidebar-foreground">Departamento de Compras</h1>
            <p className="text-sm text-sidebar-foreground/80">Gobernanza Digital - Automatización Logística</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:block text-right">
            <p className="text-secondary font-semibold">Sistema Activo</p>
            <p className="text-secondary-foreground text-xs">Todos los módulos operativos</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full bg-primary hover:bg-primary/90">
                <div className="flex items-center justify-center w-10 h-10 text-primary-foreground font-bold">
                  {session.name.charAt(0).toUpperCase()}
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="flex flex-col space-y-1">
                <div className="text-sm font-semibold">{session.name}</div>
                <div className="text-xs text-muted-foreground/80">{session.email}</div>
                <div className="text-xs text-muted-foreground/70 capitalize">
                  {session.role === 'admin' ? 'Administrador' : 'Usuario de Departamento'}
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-destructive cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                Cerrar Sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
