import { create } from 'zustand';
import { Transaction, WithdrawalMethod, WithdrawalRequest } from '../types/wallet';

interface WalletState {
  balance: number;
  pendingBalance: number;
  transactions: Transaction[];
  withdrawalMethods: WithdrawalMethod[];
  loading: boolean;
  error: string | null;
  requestWithdrawal: (request: WithdrawalRequest) => Promise<void>;
  getTransactionHistory: (userId: string) => Transaction[];
  getPendingWithdrawals: (userId: string) => Transaction[];
  updateBalance: (userId: string, amount: number) => void;
}

export const useWalletStore = create<WalletState>((set, get) => ({
  balance: 1250.75,
  pendingBalance: 450.25,
  transactions: [
    {
      id: 'txn-1',
      userId: 'admin-1',
      type: 'credit',
      amount: 500,
      description: 'Direct Commission',
      status: 'completed',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: 'txn-2',
      userId: 'admin-1',
      type: 'credit',
      amount: 750.75,
      description: 'Binary Commission',
      status: 'completed',
      createdAt: new Date(Date.now() - 172800000).toISOString(),
    },
    {
      id: 'txn-3',
      userId: 'admin-1',
      type: 'debit',
      amount: 1000,
      description: 'Withdrawal to Bank Account',
      status: 'completed',
      createdAt: new Date(Date.now() - 259200000).toISOString(),
    },
    {
      id: 'txn-4',
      userId: 'admin-1',
      type: 'credit',
      amount: 450.25,
      description: 'Leadership Bonus',
      status: 'pending',
      createdAt: new Date().toISOString(),
    },
  ],
  withdrawalMethods: [
    {
      id: 'bank-transfer',
      name: 'Bank Transfer',
      description: 'Direct transfer to your bank account',
      fee: 1.5,
      minAmount: 100,
      maxAmount: 10000,
      processingTime: '2-3 business days',
    },
    {
      id: 'paypal',
      name: 'PayPal',
      description: 'Instant transfer to your PayPal account',
      fee: 2.9,
      minAmount: 50,
      maxAmount: 5000,
      processingTime: 'Instant',
    },
    {
      id: 'crypto',
      name: 'Cryptocurrency',
      description: 'Transfer to your crypto wallet',
      fee: 1.0,
      minAmount: 100,
      maxAmount: 25000,
      processingTime: '1-2 hours',
    },
  ],
  loading: false,
  error: null,

  requestWithdrawal: async (request: WithdrawalRequest) => {
    set({ loading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const method = get().withdrawalMethods.find(m => m.id === request.methodId);
      if (!method) throw new Error('Invalid withdrawal method');

      if (request.amount < method.minAmount || request.amount > method.maxAmount) {
        throw new Error(`Amount must be between ${method.minAmount} and ${method.maxAmount}`);
      }

      const fee = (request.amount * method.fee) / 100;
      const netAmount = request.amount - fee;

      const transaction: Transaction = {
        id: `txn-${Date.now()}`,
        userId: request.userId,
        type: 'debit',
        amount: request.amount,
        description: `Withdrawal via ${method.name}`,
        status: 'pending',
        createdAt: new Date().toISOString(),
        fee,
        netAmount,
        methodId: method.id,
      };

      set(state => ({
        transactions: [transaction, ...state.transactions],
        balance: state.balance - request.amount,
        loading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  getTransactionHistory: (userId: string) => {
    return get().transactions.filter(t => t.userId === userId);
  },

  getPendingWithdrawals: (userId: string) => {
    return get().transactions.filter(
      t => t.userId === userId && t.type === 'debit' && t.status === 'pending'
    );
  },

  updateBalance: (userId: string, amount: number) => {
    set(state => ({ balance: state.balance + amount }));
  },
}));