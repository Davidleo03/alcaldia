'use client';

import { Package, AlertTriangle } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  reorderLevel: number;
  status: 'in_stock' | 'low' | 'out_of_stock';
}

const inventoryItems: InventoryItem[] = [
  {
    id: '1',
    name: 'Asphalt Mix',
    category: 'Road Materials',
    quantity: 450,
    unit: 'tons',
    reorderLevel: 200,
    status: 'in_stock',
  },
  {
    id: '2',
    name: 'Concrete',
    category: 'Sidewalk Materials',
    quantity: 85,
    unit: 'cubic yards',
    reorderLevel: 150,
    status: 'low',
  },
  {
    id: '3',
    name: 'Streetlights (LED)',
    category: 'Lighting',
    quantity: 0,
    unit: 'units',
    reorderLevel: 10,
    status: 'out_of_stock',
  },
  {
    id: '4',
    name: 'Traffic Paint',
    category: 'Markings',
    quantity: 320,
    unit: 'gallons',
    reorderLevel: 100,
    status: 'in_stock',
  },
  {
    id: '5',
    name: 'Gravel',
    category: 'Road Materials',
    quantity: 1200,
    unit: 'tons',
    reorderLevel: 500,
    status: 'in_stock',
  },
  {
    id: '6',
    name: 'Drainage Pipe',
    category: 'Drainage',
    quantity: 45,
    unit: 'sections',
    reorderLevel: 100,
    status: 'low',
  },
];

const statusConfig = {
  in_stock: {
    bg: 'bg-green-100',
    text: 'text-green-800',
    label: 'In Stock',
  },
  low: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-800',
    label: 'Low Stock',
  },
  out_of_stock: {
    bg: 'bg-red-100',
    text: 'text-red-800',
    label: 'Out of Stock',
  },
};

export function InventoryView() {
  const lowStockItems = inventoryItems.filter((item) => item.status !== 'in_stock');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
        <p className="text-gray-600 mt-1">
          Track and manage municipal supplies and equipment
        </p>
      </div>

      {/* Alerts */}
      {lowStockItems.length > 0 && (
        <Card className="p-4 bg-yellow-50 border-yellow-200">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-yellow-900">
                {lowStockItems.length} item{lowStockItems.length !== 1 ? 's' : ''} require attention
              </h3>
              <p className="text-sm text-yellow-700 mt-1">
                {lowStockItems.filter((i) => i.status === 'out_of_stock').length} out of stock,{' '}
                {lowStockItems.filter((i) => i.status === 'low').length} low on stock
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Inventory Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-200">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Item Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Reorder Level
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {inventoryItems.map((item) => {
                const config = statusConfig[item.status];
                return (
                  <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-gray-600" />
                        <span className="font-medium text-gray-900">{item.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.category}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      {item.quantity} {item.unit}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {item.reorderLevel} {item.unit}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
                        {config.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
