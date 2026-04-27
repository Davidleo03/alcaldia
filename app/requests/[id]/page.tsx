import { MainLayout } from '@/components/layout/MainLayout';
import { RequestDetail } from '@/components/requests/RequestDetail';
import { mockServiceRequests } from '@/lib/mockData';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Request Details - Municipal Services',
  description: 'View service request details',
};

interface RequestDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function RequestDetailPage({
  params,
}: RequestDetailPageProps) {
  const { id } = await params;
  const request = mockServiceRequests.find((r) => r.id === id);

  if (!request) {
    notFound();
  }

  return (
    <MainLayout>
      <RequestDetail request={request} />
    </MainLayout>
  );
}
