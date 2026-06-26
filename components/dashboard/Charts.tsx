'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useInventory } from '@/hooks/useStorage';

export function StockLevelsChart() {
  const { inventory } = useInventory();

  const data = inventory
    .filter(item => item.quantity <= item.minStock * 1.5)
    .slice(0, 8)
    .map(item => ({
      name: item.name.substring(0, 15),
      quantity: item.quantity,
      minStock: item.minStock,
    }));

  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Stock Levels</CardTitle>
          <CardDescription>Items near minimum stock level</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center text-muted-foreground/70">
            All items above minimum stock level
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Stock Levels</CardTitle>
        <CardDescription>Items near minimum stock level</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="quantity" fill="#3b82f6" name="Current" />
            <Bar dataKey="minStock" fill="#ef4444" name="Minimum" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function CategoryBreakdown() {
  const { inventory } = useInventory();

  const categoryData = inventory.reduce<Array<{ name: string; value: number }>>(
    (acc, item) => {
      const existing = acc.find((c: { name: string; value: number }) => c.name === item.category);
      if (existing) {
        existing.value += item.quantity;
      } else {
        acc.push({ name: item.category, value: item.quantity });
      }
      return acc;
    },
    []
  );

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Inventory by Category</CardTitle>
        <CardDescription>Distribution of items across categories</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {categoryData.map((entry: { name: string; value: number }, index: number) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
