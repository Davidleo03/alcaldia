'use client';

import { mockRequests } from '@/lib/mockData';
import { RequestList } from '@/components/requests/RequestList';

export function CompletedView() {
  // Filter to show only completed requests
  const completed = mockRequests.filter((r) => r.status === 'completed');

  return (
    <div>
      <RequestList requests={completed} showNewButton={false} />
    </div>
  );
}
