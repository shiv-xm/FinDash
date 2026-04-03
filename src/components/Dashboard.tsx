import type React from 'react';
import { useAuth } from '../context/AuthContext';
import { BalanceTrendChart, SpendingBreakdownChart } from './Charts';
import { TransactionsTable } from './TransactionsTable';
import { SummaryCard } from './SummaryCard';
import { InsightsCard } from './InsightsCard';
import { RecentActivityWidget } from './RecentActivityWidget';
import { 
  DollarSign, 
  CreditCard, 
  TrendingUp,
  Activity,
  PiggyBank
} from 'lucide-react';
import { useTransactions } from '../context/TransactionContext';
import { calculateTotals } from '../utils/transactionUtils';

export const Dashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const { transactions } = useTransactions();
  const { totalIncome, totalExpenses, totalBalance, savingsRate } = calculateTotals(transactions);

  const formatCurrency = (amount: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

  const statCards = [
    { title: 'Total Balance', amount: formatCurrency(totalBalance), trend: '+12.5%', isPositive: true, icon: DollarSign },
    { title: 'Total Income', amount: formatCurrency(totalIncome), trend: '+8.2%', isPositive: true, icon: TrendingUp },
    { title: 'Total Expenses', amount: formatCurrency(totalExpenses), trend: '-2.4%', isPositive: false, icon: CreditCard },
    { title: 'Savings Rate', amount: `${savingsRate}%`, trend: '+1.1%', isPositive: true, icon: PiggyBank },
    { title: 'Transactions', amount: transactions.length.toString(), trend: 'This month', isPositive: true, icon: Activity },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Welcome back, {currentUser.name.split(' ')[0]}</h1>
          <p className="text-slate-500 mt-1">Here's your financial summary overview.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
        {statCards.map((stat, idx) => (
          <SummaryCard key={idx} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 space-y-6">
          <BalanceTrendChart />
        </div>
        <div className="grid grid-cols-1 gap-6">
          <SpendingBreakdownChart />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <InsightsCard />
        </div>
        <div>
          <RecentActivityWidget />
        </div>
      </div>

      <TransactionsTable />
    </div>
  );
};
