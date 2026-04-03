import type React from 'react';

interface SummaryCardProps {
  title: string;
  amount: string;
  trend: string;
  isPositive: boolean;
  icon: React.ElementType;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ title, amount, trend, isPositive, icon: Icon }) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
          <Icon size={20} />
        </div>
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
          {trend}
        </span>
      </div>
      <div>
        <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
        <h4 className="text-2xl font-bold text-slate-800">{amount}</h4>
      </div>
    </div>
  );
};
