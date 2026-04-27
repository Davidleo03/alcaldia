import { MainLayout } from '@/components/layout/MainLayout';
import { FormularioSolicitud } from '@/components/solicitudes/FormularioSolicitud';

export const metadata = {
  title: 'Nueva Solicitud - Gobernanza Digital',
  description: 'Crear una nueva solicitud de compra',
};

export default function NuevaSolicitudPage() {
  return (
    <MainLayout>
      <FormularioSolicitud />
    </MainLayout>
  );
}
