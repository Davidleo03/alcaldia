'use client';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color: 'red' | 'purple' | 'yellow' | 'gray';
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
}

export function StatCard({
  title,
  value,
  icon,
  color,
  trend,
}: StatCardProps) {
  const colorClasses = {
    red: 'bg-red-50 text-red-600 border-red-200',
    purple: 'bg-purple-50 text-purple-600 border-purple-200',
    yellow: 'bg-yellow-50 text-yellow-600 border-yellow-200',
    gray: 'bg-gray-50 text-gray-600 border-gray-200',
  };

  const iconBgClasses = {
    red: 'bg-red-100 text-red-600',
    purple: 'bg-purple-100 text-purple-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    gray: 'bg-gray-100 text-gray-600',
  };

  return (
    <div
      className={`rounded-lg border p-4 md:p-6 ${colorClasses[color]} transition-all hover:shadow-md hover:scale-105 duration-200`}
    >
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-xs md:text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl md:text-3xl font-bold mt-2">{value}</p>
          {trend && (
            <p
              className={`text-xs mt-2 font-semibold ${
                trend.direction === 'up' ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {trend.direction === 'up' ? '↑' : '↓'} {trend.value}% from last month
            </p>
          )}
        </div>
        <div className={`p-2 md:p-3 rounded-lg flex-shrink-0 ${iconBgClasses[color]}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
