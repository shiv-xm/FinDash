import type React from 'react';
import { TransactionsTable } from './TransactionsTable';

export const Transactions: React.FC = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out pb-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Transactions</h1>
        <p className="text-slate-500 mt-1">Manage and view all your financial transactions.</p>
      </div>
      <TransactionsTable />
    </div>
  );
};
