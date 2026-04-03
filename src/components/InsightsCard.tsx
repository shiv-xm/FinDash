import type React from 'react';
import { useMemo } from 'react';
import { Lightbulb, TrendingUp, TrendingDown } from 'lucide-react';
import { useTransactions } from '../context/TransactionContext';

export const InsightsCard: React.FC = () => {
  const { transactions } = useTransactions();

  const insights = useMemo(() => {
    const categoryTotals: Record<string, number> = {};
    let totalExpenses = 0;
    let totalIncome = 0;

    transactions.forEach(t => {
      if (t.type === 'expense') {
        categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
        totalExpenses += t.amount;
      } else {
        totalIncome += t.amount;
      }
    });

    const sortedCategories = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]);
    const highestCategory = sortedCategories.length > 0 ? sortedCategories[0][0] : 'None';

    const foodAndShopAmount = 
      (categoryTotals['Food'] || 0) + 
      (categoryTotals['Dining'] || 0) + 
      (categoryTotals['Groceries'] || 0) + 
      (categoryTotals['Shopping'] || 0);
      
    const foodShopPercent = totalExpenses > 0 ? ((foodAndShopAmount / totalExpenses) * 100).toFixed(0) : '0';
    const netAmount = totalIncome - totalExpenses;

    const list = [];
    if (highestCategory !== 'None') {
       list.push({
         id: 1,
         title: "Highest spending category",
         description: `Your highest spending category this month is ${highestCategory}.`,
         type: "warning",
         icon: TrendingUp
       });
    }

    if (totalIncome > totalExpenses) {
       list.push({
         id: 2,
         title: "Positive Cash Flow",
         description: `Great job! Your income exceeded expenses by $${netAmount.toFixed(2)}.`,
         type: "success",
         icon: TrendingDown
       });
    }

    if (foodAndShopAmount > 0) {
       list.push({
         id: 3,
         title: "Food & Shopping",
         description: `Food, Dining and Shopping together account for ${foodShopPercent}% of spending.`,
         type: "warning",
         icon: Lightbulb
       });
    }

    if (list.length === 0) {
       list.push({ id: 4, title: "No insights yet", description: "Add transactions to see insights.", type: "success", icon: Lightbulb});
    }

    return list.slice(0, 3);
  }, [transactions]);

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm w-full h-full">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center">
          <Lightbulb size={20} />
        </div>
        <h3 className="text-lg font-semibold text-slate-800">Smart Insights</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {insights.map((insight) => (
          <div key={insight.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50 flex gap-4">
            <div className={`mt-1 h-6 w-6 shrink-0 rounded-full flex items-center justify-center ${insight.type === 'warning' ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'}`}>
              <insight.icon size={14} />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-800 mb-1">{insight.title}</h4>
              <p className="text-sm text-slate-500 leading-relaxed">{insight.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
