'use client';

import { RequestStatus } from '@/lib/types';

interface RequestStatusBadgeProps {
  status: RequestStatus;
}

export function RequestStatusBadge({ status }: RequestStatusBadgeProps) {
  const statusConfig = {
    pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pending' },
    in_review: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'In Review' },
    approved: { bg: 'bg-purple-100', text: 'text-purple-800', label: 'Approved' },
    rejected: { bg: 'bg-red-100', text: 'text-red-800', label: 'Rejected' },
    completed: { bg: 'bg-green-100', text: 'text-green-800', label: 'Completed' },
  };

  const config = statusConfig[status];

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  );
}
