import { MainLayout } from '@/components/layout/MainLayout';
import { InventoryView } from '@/components/views/InventoryView';

export const metadata = {
  title: 'Inventory - Municipal Services',
  description: 'Manage municipal inventory and supplies',
};

export default function InventoryPage() {
  return (
    <MainLayout>
      <InventoryView />
    </MainLayout>
  );
}
