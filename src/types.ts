export type Role = 'admin' | 'viewer';

export interface User {
  id: string;
  name: string;
  role: Role;
  avatar: string;
}

export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  type: TransactionType;
  paymentMethod?: string;
  account?: string;
  status?: 'completed' | 'pending' | 'failed';
}

export interface ChartData {
  name: string;
  income: number;
  expense: number;
}

export interface ExpenseByCategory {
  name: string;
  value: number;
  color: string;
}
