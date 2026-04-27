import { MainLayout } from '@/components/layout/MainLayout';
import { PendingApprovalsView } from '@/components/views/PendingApprovalsView';

export const metadata = {
  title: 'Pending Approvals - Municipal Services',
  description: 'View requests pending approval',
};

export default function PendingPage() {
  return (
    <MainLayout>
      <PendingApprovalsView />
    </MainLayout>
  );
}
