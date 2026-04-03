import type React from 'react';
import { useTransactions } from '../context/TransactionContext';
import { ArrowDown, ArrowUp, Clock } from 'lucide-react';
import { cn } from './Sidebar';

export const RecentActivityWidget: React.FC = () => {
  const { transactions } = useTransactions();

  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 overflow-hidden flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-800">Recent Activity</h3>
      </div>
      
      {recentTransactions.length > 0 ? (
        <div className="flex flex-col gap-4 flex-1">
          {recentTransactions.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-10 h-10 shrink-0 rounded-full flex items-center justify-center",
                  tx.type === 'income' ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-600"
                )}>
                  {tx.type === 'income' ? <ArrowDown size={18} /> : <ArrowUp size={18} />}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-800 line-clamp-1">{tx.description}</p>
                  <p className="text-xs text-slate-500">{tx.date} • {tx.category}</p>
                </div>
              </div>
              <div className="text-right ml-2">
                <span className={cn(
                  "text-sm font-semibold whitespace-nowrap",
                  tx.type === 'income' ? "text-emerald-600" : "text-slate-800"
                )}>
                  {tx.type === 'income' ? '+' : '-'}${Math.abs(tx.amount).toFixed(2)}
                </span>
                <p className="text-[10px] text-slate-400 capitalize">{tx.status}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-6 text-center text-slate-500 flex-1">
          <Clock size={24} className="mb-2 text-slate-300" />
          <p className="text-sm">No recent activity.</p>
        </div>
      )}
    </div>
  );
};
