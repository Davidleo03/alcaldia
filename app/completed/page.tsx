import { MainLayout } from '@/components/layout/MainLayout';
import { CompletedView } from '@/components/views/CompletedView';

export const metadata = {
  title: 'Completed Requests - Municipal Services',
  description: 'View completed service requests',
};

export default function CompletedPage() {
  return (
    <MainLayout>
      <CompletedView />
    </MainLayout>
  );
}
