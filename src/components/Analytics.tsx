import type React from 'react';
import { BalanceTrendChart, SpendingBreakdownChart } from './Charts';
import { InsightsCard } from './InsightsCard';

export const Analytics: React.FC = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out pb-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Analytics</h1>
        <p className="text-slate-500 mt-1">Deep dive into your financial data and trends.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <BalanceTrendChart />
        <SpendingBreakdownChart />
      </div>
      <div className="grid grid-cols-1 gap-6">
        <InsightsCard />
      </div>
    </div>
  );
};
