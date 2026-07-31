'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getInventory } from '@/lib/services/inventory';
import { getRequests } from '@/lib/services/requests';
import type { InventoryItem, MaterialRequest } from '@/lib/types';
import { Package, AlertCircle, ClipboardList, TrendingDown } from 'lucide-react';

export function QuickStats() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [requests, setRequests] = useState<MaterialRequest[]>([]);

  useEffect(() => {
    async function loadDashboardData() {
      const [inventoryData, requestsData] = await Promise.all([
        getInventory(),
        getRequests(),
      ]);
      setInventory(inventoryData);
      setRequests(requestsData);
    }

    loadDashboardData().catch(console.error);
  }, []);


  console.log('Inventory:', inventory);
  console.log('Requests:', requests);

  const totalItems = requests.length;
  const lowStockItems = inventory.filter(item => item.quantity <= item.min_stock).length;
  const pendingRequests = requests.filter(r => r.status === 'pending').length;
  const totalQuantity = inventory.reduce((sum, item) => sum + item.quantity, 0);

  const stats = [
    {
      title: 'Solicitudes Totales',
      value: totalItems,
      icon: Package,
      color: 'bg-secondary',
      textColor: 'text-secondary-foreground',
      bgColor: 'bg-secondary/20',
    },
    {
      title: 'Aprobadas',
      value: requests.filter(r => r.status === 'approved').length,
      icon: AlertCircle,
      color: 'bg-success',
      textColor: 'text-success-foreground',
      bgColor: 'bg-success/20',
    },
    {
      title: 'En Almacén',
      value: lowStockItems,
      icon: ClipboardList,
      color: 'bg-warning',
      textColor: 'text-warning-foreground',
      bgColor: 'bg-warning/20',
    },
    {
      title: 'Distribuidas',
      value: pendingRequests,
      icon: TrendingDown,
      color: 'bg-primary',
      textColor: 'text-primary-foreground',
      bgColor: 'bg-primary/20',
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
                  <p className="text-xs font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-3xl font-bold text-foreground mt-2">{stat.value}</p>
                  
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
