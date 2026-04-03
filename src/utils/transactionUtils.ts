import type { Transaction } from '../types';

export const calculateTotals = (transactions: Transaction[]) => {
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
  const totalBalance = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0 ? ((totalBalance / totalIncome) * 100).toFixed(1) : '0';
  
  return { totalIncome, totalExpenses, totalBalance, savingsRate };
};

export const groupTransactionsByMonth = (transactions: Transaction[]) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const dataMap = new Map();
  transactions.forEach(t => {
    const date = new Date(t.date);
    const monthStr = months[date.getMonth()];
    if (!dataMap.has(monthStr)) {
        dataMap.set(monthStr, { name: monthStr, income: 0, expense: 0, sortIndex: date.getFullYear() * 100 + date.getMonth() });
    }
    const entry = dataMap.get(monthStr);
    if (t.type === 'income') entry.income += t.amount;
    if (t.type === 'expense') entry.expense += t.amount;
  });
  return Array.from(dataMap.values()).sort((a, b) => a.sortIndex - b.sortIndex);
};

export const calculateCategoryBreakdown = (transactions: Transaction[]) => {
  const dataMap = new Map();
  transactions.forEach(t => {
      if (t.type === 'expense') {
          if (!dataMap.has(t.category)) {
              dataMap.set(t.category, 0);
          }
          dataMap.set(t.category, dataMap.get(t.category) + t.amount);
      }
  });

  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444', '#ec4899', '#06b6d4', '#14b8a6', '#f43f5e'];
  return Array.from(dataMap.entries())
    .map(([name, value], index) => ({
        name,
        value,
        color: colors[index % colors.length]
    }))
    .sort((a,b) => b.value - a.value);
};

export const filterAndSortTransactions = (
  transactions: Transaction[], 
  searchTerm: string, 
  statusFilter: string, 
  typeFilter: string, 
  categoryFilter: string, 
  sortBy: 'date' | 'amount', 
  sortOrder: 'asc' | 'desc'
) => {
  return [...transactions].filter(item => {
    const matchesSearch = item.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesType && matchesCategory;
  }).sort((a, b) => {
    if (sortBy === 'date') {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    } else {
      return sortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount;
    }
  });
};
