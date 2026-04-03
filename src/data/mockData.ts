import type { Transaction, ChartData, User, ExpenseByCategory } from '../types';

export const mockUsers: User[] = [
  { id: '1', name: 'Alice Admin', role: 'admin', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice' },
  { id: '2', name: 'Bob Viewer', role: 'viewer', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob' },
];

export const mockTransactions: Transaction[] = [
  { id: 'tx-1', date: '2026-01-15', description: 'Monthly Salary', amount: 5000, category: 'Salary', type: 'income', paymentMethod: 'Direct Deposit', account: 'Checking', status: 'completed' },
  { id: 'tx-2', date: '2026-01-16', description: 'Whole Foods Market', amount: 150, category: 'Groceries', type: 'expense', paymentMethod: 'Credit Card', account: 'Rewards Visa', status: 'completed' },
  { id: 'tx-3', date: '2026-01-20', description: 'Electric Bill', amount: 80, category: 'Utilities', type: 'expense', paymentMethod: 'Bank Transfer', account: 'Checking', status: 'completed' },
  
  { id: 'tx-4', date: '2026-02-01', description: 'Apartment Rent', amount: 1800, category: 'Rent', type: 'expense', paymentMethod: 'Bank Transfer', account: 'Checking', status: 'completed' },
  { id: 'tx-5', date: '2026-02-10', description: 'Freelance Web Design', amount: 1200, category: 'Freelance', type: 'income', paymentMethod: 'PayPal', account: 'Business Checking', status: 'completed' },
  { id: 'tx-6', date: '2026-02-14', description: 'Valentine Dinner', amount: 200, category: 'Dining', type: 'expense', paymentMethod: 'Credit Card', account: 'Rewards Visa', status: 'completed' },

  { id: 'tx-7', date: '2026-03-05', description: 'Uber Rides', amount: 45, category: 'Transport', type: 'expense', paymentMethod: 'Credit Card', account: 'Rewards Visa', status: 'completed' },
  { id: 'tx-8', date: '2026-03-15', description: 'Monthly Salary', amount: 5000, category: 'Salary', type: 'income', paymentMethod: 'Direct Deposit', account: 'Checking', status: 'completed' },
  { id: 'tx-9', date: '2026-03-22', description: 'Amazon Shopping', amount: 120, category: 'Shopping', type: 'expense', paymentMethod: 'Credit Card', account: 'Rewards Visa', status: 'completed' },

  { id: 'tx-10', date: '2026-04-01', description: 'Apartment Rent', amount: 1800, category: 'Rent', type: 'expense', paymentMethod: 'Bank Transfer', account: 'Checking', status: 'completed' },
  { id: 'tx-11', date: '2026-04-02', description: 'Vanguard Index Fund', amount: 500, category: 'Investment', type: 'expense', paymentMethod: 'Bank Transfer', account: 'Savings', status: 'completed' },
  { id: 'tx-12', date: '2026-04-02', description: 'Pharmacy', amount: 35, category: 'Health', type: 'expense', paymentMethod: 'Debit Card', account: 'Checking', status: 'pending' },
];

export const mockChartData: ChartData[] = [
  { name: 'Jan', income: 5200, expense: 2400 },
  { name: 'Feb', income: 6200, expense: 2800 },
  { name: 'Mar', income: 5000, expense: 1900 },
  { name: 'Apr', income: 4500, expense: 2335 },
];

export const mockExpenseByCategory: ExpenseByCategory[] = [
  { name: 'Rent', value: 3600, color: '#3b82f6' },
  { name: 'Groceries', value: 850, color: '#10b981' },
  { name: 'Dining', value: 640, color: '#f59e0b' },
  { name: 'Shopping', value: 450, color: '#8b5cf6' },
  { name: 'Utilities', value: 240, color: '#ef4444' },
];
