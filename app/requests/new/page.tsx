import { MainLayout } from '@/components/layout/MainLayout';
import { RequestForm } from '@/components/requests/RequestForm';

export const metadata = {
  title: 'New Request - Municipal Services',
  description: 'Submit a new service request',
};

export default function NewRequestPage() {
  return (
    <MainLayout>
      <RequestForm />
    </MainLayout>
  );
}
