'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { QuickStats } from '@/components/dashboard/QuickStats';
import { StockLevelsChart, CategoryBreakdown } from '@/components/dashboard/Charts';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Panel de control</h1>
          <p className="text-slate-600 mt-2">Bienvenido al Sistema de Gestión de Inventarios</p>
        </div>

        <QuickStats />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <StockLevelsChart />
          <CategoryBreakdown />
        </div>
      </div>
    </DashboardLayout>
  );
}
