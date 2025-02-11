export interface InvestmentPlan {
  id: string;
  name: string;
  description: string;
  minAmount: number;
  maxAmount: number;
  roi: {
    value: number;
    type: 'fixed' | 'dynamic' | 'compound';
    period: 'daily' | 'weekly' | 'monthly';
  };
  duration: number; // in days
  features: string[];
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface Investment {
  id: string;
  userId: string;
  planId: string;
  amount: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'cancelled';
  earnings: number;
  nextPayout: string;
  transactions: Array<{
    id: string;
    type: 'deposit' | 'payout' | 'withdrawal';
    amount: number;
    timestamp: string;
  }>;
}

export interface AITradingStats {
  totalInvestors: number;
  totalInvested: number;
  totalPayout: number;
  averageROI: number;
  activeInvestments: number;
  dailyProfit: number;
  weeklyProfit: number;
  monthlyProfit: number;
}

export interface InvestmentWallet {
  id: string;
  userId: string;
  balance: number;
  pendingBalance: number;
  totalEarnings: number;
  totalWithdrawn: number;
  lastWithdrawal?: {
    amount: number;
    timestamp: string;
    status: 'pending' | 'completed' | 'failed';
  };
}