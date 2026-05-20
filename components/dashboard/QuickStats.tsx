'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useInventory, useRequests } from '@/hooks/useStorage';
import { Package, AlertCircle, ClipboardList, TrendingDown } from 'lucide-react';

export function QuickStats() {
  const { inventory } = useInventory();
  const { requests } = useRequests();

  const totalItems = inventory.length;
  const lowStockItems = inventory.filter(item => item.quantity <= item.minStock).length;
  const pendingRequests = requests.filter(r => r.status === 'pending').length;
  const totalQuantity = inventory.reduce((sum, item) => sum + item.quantity, 0);

  const stats = [
    {
      title: 'Solicitudes Totales',
      value: totalItems,
      icon: Package,
      color: 'bg-red-100',
      textColor: 'text-red-600',
      bgColor: 'bg-red-50',
    },
    {
      title: 'Aprobadas',
      value: requests.filter(r => r.status === 'approved').length,
      icon: AlertCircle,
      color: 'bg-green-100',
      textColor: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'En Almacén',
      value: lowStockItems,
      icon: ClipboardList,
      color: 'bg-yellow-100',
      textColor: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      title: 'Distribuidas',
      value: pendingRequests,
      icon: TrendingDown,
      color: 'bg-purple-100',
      textColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title} className={stat.bgColor + ' border-0'}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <p className="text-xs text-green-600 mt-1">↑ 12% from last month</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className={`h-6 w-6 ${stat.textColor}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
