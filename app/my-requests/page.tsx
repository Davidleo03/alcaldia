import { MainLayout } from '@/components/layout/MainLayout';
import { MyRequestsView } from '@/components/views/MyRequestsView';

export const metadata = {
  title: 'My Requests - Municipal Services',
  description: 'View your submitted service requests',
};

export default function MyRequestsPage() {
  return (
    <MainLayout>
      <MyRequestsView />
    </MainLayout>
  );
}
