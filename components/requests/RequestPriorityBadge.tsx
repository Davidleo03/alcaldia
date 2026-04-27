'use client';

import { RequestPriority } from '@/lib/types';

interface RequestPriorityBadgeProps {
  priority: RequestPriority;
}

export function RequestPriorityBadge({ priority }: RequestPriorityBadgeProps) {
  const priorityConfig = {
    low: { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Low' },
    medium: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Medium' },
    high: { bg: 'bg-red-100', text: 'text-red-700', label: 'High' },
  };

  const config = priorityConfig[priority];

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  );
}
