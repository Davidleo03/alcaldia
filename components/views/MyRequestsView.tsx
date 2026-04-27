'use client';

import { mockRequests } from '@/lib/mockData';
import { RequestList } from '@/components/requests/RequestList';

export function MyRequestsView() {
  // Filter to show only pending and in review requests (simulating "my" requests)
  const myRequests = mockRequests.filter(
    (r) => r.status === 'pending' || r.status === 'in_review'
  );

  return (
    <div>
      <RequestList requests={myRequests} showNewButton={true} />
    </div>
  );
}
