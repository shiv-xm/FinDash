import type React from 'react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import type { Transaction } from '../types';
import { TransactionFilters } from './TransactionFilters';
import { EmptyState } from './EmptyState';
import { TransactionModal } from './TransactionModal';
import { useTransactions } from '../context/TransactionContext';
import { filterAndSortTransactions } from '../utils/transactionUtils';
import { 
  ArrowDown, 
  ArrowUp,
  CheckCircle2,
  XCircle,
  Clock,
  Pencil,
  Trash2,
  SearchX
} from 'lucide-react';
import { cn } from './Sidebar'; 

export const TransactionsTable: React.FC = () => {
  const { currentUser } = useAuth();
  
  const { transactions, addTransaction, updateTransaction, deleteTransaction } = useTransactions();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTx, setEditingTx] = useState<Transaction | undefined>(undefined);

  const categories = Array.from(new Set(transactions.map(t => t.category)));

  const filteredData = filterAndSortTransactions(
    transactions, searchTerm, statusFilter, typeFilter, categoryFilter, sortBy, sortOrder
  );

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 size={14} className="text-emerald-500" />;
      case 'pending': return <Clock size={14} className="text-amber-500" />;
      case 'failed': return <XCircle size={14} className="text-red-500" />;
      default: return <Clock size={14} className="text-slate-400" />;
    }
  };

  const getStatusClass = (status?: string) => {
    switch (status) {
      case 'completed': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'pending': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'failed': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const handleDelete = (id: string) => {
    deleteTransaction(id);
  };

  const handleSaveTransaction = (tx: Partial<Transaction>) => {
    if (editingTx) {

      updateTransaction(editingTx.id, tx);
    } else {

      const newTx: Transaction = {
        ...(tx as Transaction),
        id: `tx-${Date.now()}`,
        status: 'completed',
      };
      addTransaction(newTx);
    }
    setEditingTx(undefined);
  };

  const openAddModal = () => {
    setEditingTx(undefined);
    setIsModalOpen(true);
  };

  const openEditModal = (tx: Transaction) => {
    setEditingTx(tx);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm mt-6 overflow-hidden">
      
      <div className="p-6 border-b border-slate-100 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-800">Recent Transactions</h3>
            <p className="text-sm text-slate-500">Monitor your cash flow and financial activities.</p>
          </div>
          
          {currentUser.role === 'admin' && (
            <button 
              onClick={openAddModal}
              className="w-full sm:w-auto shrink-0 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition shadow-sm lg:ml-auto"
            >
              Add Transaction
            </button>
          )}
        </div>
        
        <TransactionFilters 
          searchTerm={searchTerm} setSearchTerm={setSearchTerm}
          statusFilter={statusFilter} setStatusFilter={setStatusFilter}
          typeFilter={typeFilter} setTypeFilter={setTypeFilter}
          categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter}
          sortBy={sortBy} setSortBy={setSortBy}
          sortOrder={sortOrder} setSortOrder={setSortOrder}
          categories={categories}
        />
      </div>

      <div className="overflow-x-auto">
        {filteredData.length > 0 ? (
          <>
            
            <table className="hidden md:table w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                  <th className="px-6 py-4">Transaction</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Amount</th>
                  {currentUser.role === 'admin' && <th className="px-6 py-4 text-right">Actions</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredData.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-10 h-10 shrink-0 rounded-full flex items-center justify-center",
                          tx.type === 'income' ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-600"
                        )}>
                          {tx.type === 'income' ? <ArrowDown size={18} /> : <ArrowUp size={18} />}
                        </div>
                        <div>
                          <p className="font-medium text-slate-800">{tx.description}</p>
                          <p className="text-xs text-slate-500">{tx.category} • {tx.paymentMethod || 'Cash'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600 text-sm whitespace-nowrap">{tx.date}</td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium border",
                        getStatusClass(tx.status)
                      )}>
                        {getStatusIcon(tx.status)}
                        <span className="capitalize">{tx.status || 'unknown'}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={cn(
                        "font-semibold whitespace-nowrap",
                        tx.type === 'income' ? "text-emerald-600" : "text-slate-800"
                      )}>
                        {tx.type === 'income' ? '+' : '-'}${Math.abs(tx.amount).toFixed(2)}
                      </span>
                    </td>
                    {currentUser.role === 'admin' && (
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => openEditModal(tx)}
                            className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Pencil size={16} />
                          </button>
                          <button 
                            onClick={() => handleDelete(tx.id)}
                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="md:hidden divide-y divide-slate-100">
              {filteredData.map((tx) => (
                <div key={tx.id} className="p-4 flex flex-col gap-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-10 h-10 shrink-0 rounded-full flex items-center justify-center",
                        tx.type === 'income' ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-600"
                      )}>
                        {tx.type === 'income' ? <ArrowDown size={18} /> : <ArrowUp size={18} />}
                      </div>
                      <div>
                        <p className="font-medium text-slate-800 whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px] sm:max-w-[200px]">{tx.description}</p>
                        <p className="text-xs text-slate-500">{tx.category} • {tx.paymentMethod || 'Cash'}</p>
                      </div>
                    </div>
                    <span className={cn(
                      "font-semibold whitespace-nowrap flex-shrink-0 ml-2",
                      tx.type === 'income' ? "text-emerald-600" : "text-slate-800"
                    )}>
                      {tx.type === 'income' ? '+' : '-'}${Math.abs(tx.amount).toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between pl-[3.25rem]">
                    <div className="flex flex-wrap items-center gap-2">
                       <span className={cn(
                          "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium border",
                          getStatusClass(tx.status)
                        )}>
                          {getStatusIcon(tx.status)}
                          <span className="capitalize">{tx.status || 'unknown'}</span>
                        </span>
                        <span className="text-xs text-slate-500">{tx.date}</span>
                    </div>
                    
                    {currentUser.role === 'admin' && (
                      <div className="flex gap-2">
                        <button 
                          onClick={() => openEditModal(tx)}
                          className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Pencil size={14} />
                        </button>
                        <button 
                          onClick={() => handleDelete(tx.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="p-8">
            <EmptyState 
              title="No transactions found" 
              description="There are no transactions matching your current filters."
              icon={<SearchX size={24} />}
            />
          </div>
        )}
      </div>

      <TransactionModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        transaction={editingTx}
        onSave={handleSaveTransaction}
      />
    </div>
  );
};
