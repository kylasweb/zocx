import { create } from 'zustand';
import { InvestmentPlan, Investment, AITradingStats, InvestmentWallet } from '../types/investment';

interface InvestmentState {
  plans: InvestmentPlan[];
  investments: Investment[];
  stats: AITradingStats;
  wallet: InvestmentWallet | null;
  loading: boolean;
  error: string | null;

  // Plan Management
  createPlan: (plan: Omit<InvestmentPlan, 'id' | 'status' | 'createdAt'>) => Promise<void>;
  updatePlan: (planId: string, updates: Partial<InvestmentPlan>) => Promise<void>;
  togglePlanStatus: (planId: string) => Promise<void>;

  // Investment Management
  createInvestment: (investment: Omit<Investment, 'id' | 'status' | 'earnings' | 'transactions'>) => Promise<void>;
  calculateReturns: (investmentId: string) => number;
  processPayouts: () => Promise<void>;
  withdrawEarnings: (amount: number) => Promise<void>;

  // Stats & Analytics
  getROIStats: () => { daily: number; weekly: number; monthly: number };
  getInvestmentHistory: () => Investment[];
  getActiveInvestments: () => Investment[];
}

export const useInvestmentStore = create<InvestmentState>((set, get) => ({
  plans: [],
  investments: [],
  stats: {
    totalInvestors: 0,
    totalInvested: 0,
    totalPayout: 0,
    averageROI: 0,
    activeInvestments: 0,
    dailyProfit: 0,
    weeklyProfit: 0,
    monthlyProfit: 0,
  },
  wallet: null,
  loading: false,
  error: null,

  createPlan: async (plan) => {
    set({ loading: true, error: null });
    try {
      const newPlan: InvestmentPlan = {
        ...plan,
        id: `plan-${Date.now()}`,
        status: 'active',
        createdAt: new Date().toISOString(),
      };

      set(state => ({
        plans: [...state.plans, newPlan],
        loading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  updatePlan: async (planId, updates) => {
    set({ loading: true, error: null });
    try {
      set(state => ({
        plans: state.plans.map(plan =>
          plan.id === planId ? { ...plan, ...updates } : plan
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  togglePlanStatus: async (planId) => {
    set({ loading: true, error: null });
    try {
      set(state => ({
        plans: state.plans.map(plan =>
          plan.id === planId
            ? { ...plan, status: plan.status === 'active' ? 'inactive' : 'active' }
            : plan
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  createInvestment: async (investment) => {
    set({ loading: true, error: null });
    try {
      const plan = get().plans.find(p => p.id === investment.planId);
      if (!plan) throw new Error('Investment plan not found');

      const newInvestment: Investment = {
        ...investment,
        id: `inv-${Date.now()}`,
        status: 'active',
        earnings: 0,
        transactions: [{
          id: `txn-${Date.now()}`,
          type: 'deposit',
          amount: investment.amount,
          timestamp: new Date().toISOString(),
        }],
      };

      set(state => ({
        investments: [...state.investments, newInvestment],
        stats: {
          ...state.stats,
          totalInvestors: state.stats.totalInvestors + 1,
          totalInvested: state.stats.totalInvested + investment.amount,
          activeInvestments: state.stats.activeInvestments + 1,
        },
        loading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  calculateReturns: (investmentId) => {
    const investment = get().investments.find(i => i.id === investmentId);
    if (!investment) return 0;

    const plan = get().plans.find(p => p.id === investment.planId);
    if (!plan) return 0;

    const startDate = new Date(investment.startDate).getTime();
    const endDate = new Date(investment.endDate).getTime();
    const now = Date.now();
    const progress = Math.min((now - startDate) / (endDate - startDate), 1);
    
    let returns = 0;
    switch (plan.roi.type) {
      case 'fixed':
        returns = investment.amount * (plan.roi.value / 100) * progress;
        break;
      case 'compound':
        returns = investment.amount * Math.pow(1 + plan.roi.value / 100, progress * plan.duration) - investment.amount;
        break;
      case 'dynamic':
        // Dynamic ROI based on investment amount and market conditions
        const marketMultiplier = 1 + (Math.random() * 0.2 - 0.1); // -10% to +10%
        returns = investment.amount * (plan.roi.value / 100) * progress * marketMultiplier;
        break;
    }

    return returns;
  },

  processPayouts: async () => {
    set({ loading: true, error: null });
    try {
      const now = new Date();
      const activeInvestments = get().investments.filter(i => i.status === 'active');

      for (const investment of activeInvestments) {
        const returns = get().calculateReturns(investment.id);
        if (returns > 0) {
          set(state => ({
            investments: state.investments.map(i =>
              i.id === investment.id
                ? {
                    ...i,
                    earnings: i.earnings + returns,
                    transactions: [
                      ...i.transactions,
                      {
                        id: `txn-${Date.now()}`,
                        type: 'payout',
                        amount: returns,
                        timestamp: now.toISOString(),
                      },
                    ],
                  }
                : i
            ),
            stats: {
              ...state.stats,
              totalPayout: state.stats.totalPayout + returns,
            },
          }));
        }
      }

      set({ loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  withdrawEarnings: async (amount) => {
    set({ loading: true, error: null });
    try {
      if (!get().wallet || amount > get().wallet.balance) {
        throw new Error('Insufficient balance');
      }

      set(state => ({
        wallet: state.wallet ? {
          ...state.wallet,
          balance: state.wallet.balance - amount,
          totalWithdrawn: state.wallet.totalWithdrawn + amount,
          lastWithdrawal: {
            amount,
            timestamp: new Date().toISOString(),
            status: 'pending',
          },
        } : null,
        loading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  getROIStats: () => {
    const investments = get().investments;
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    return {
      daily: investments.reduce((sum, inv) => {
        const dailyTxns = inv.transactions.filter(t =>
          t.type === 'payout' && new Date(t.timestamp) >= oneDayAgo
        );
        return sum + dailyTxns.reduce((s, t) => s + t.amount, 0);
      }, 0),
      weekly: investments.reduce((sum, inv) => {
        const weeklyTxns = inv.transactions.filter(t =>
          t.type === 'payout' && new Date(t.timestamp) >= oneWeekAgo
        );
        return sum + weeklyTxns.reduce((s, t) => s + t.amount, 0);
      }, 0),
      monthly: investments.reduce((sum, inv) => {
        const monthlyTxns = inv.transactions.filter(t =>
          t.type === 'payout' && new Date(t.timestamp) >= oneMonthAgo
        );
        return sum + monthlyTxns.reduce((s, t) => s + t.amount, 0);
      }, 0),
    };
  },

  getInvestmentHistory: () => {
    return get().investments.sort((a, b) =>
      new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    );
  },

  getActiveInvestments: () => {
    return get().investments.filter(i => i.status === 'active');
  },
}));