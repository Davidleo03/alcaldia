'use client';

import { mockRequests } from '@/lib/mockData';
import { RequestList } from '@/components/requests/RequestList';

export function PendingApprovalsView() {
  // Filter to show requests awaiting approval
  const pendingApprovals = mockRequests.filter(
    (r) => r.status === 'in_review' || r.status === 'pending'
  );

  return (
    <div>
      <RequestList requests={pendingApprovals} showNewButton={false} />
    </div>
  );
}
