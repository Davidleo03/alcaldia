import { MainLayout } from '@/components/layout/MainLayout';
import { DashboardView } from '@/components/dashboard/DashboardView';

export const metadata = {
  title: 'Panel de Control - Gobernanza Digital',
  description: 'Sistema de Automatización Logística y Control de Inventario - Departamento de Compras',
};

export default function Home() {
  return (
    <MainLayout>
      <DashboardView />
    </MainLayout>
  );
}
