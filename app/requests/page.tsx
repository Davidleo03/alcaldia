import { MainLayout } from '@/components/layout/MainLayout';
import { RequestList } from '@/components/requests/RequestList';
import { mockRequests } from '@/lib/mockData';

export const metadata = {
  title: 'Service Requests - Municipal Services',
  description: 'View and manage all service requests',
};

export default function RequestsPage() {
  return (
    <MainLayout>
      <RequestList requests={mockRequests} />
    </MainLayout>
  );
}
