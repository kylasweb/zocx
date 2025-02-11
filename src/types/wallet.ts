```typescript
export interface PaymentMethod {
  id: string;
  type: 'card' | 'bank' | 'crypto';
  name: string;
  description: string;
  fee: number;
  minAmount: number;
  maxAmount: number;
  processingTime: string;
  config?: {
    apiKey?: string;
    merchantId?: string;
    publicKey?: string;
    webhookUrl?: string;
  };
  status: 'active' | 'inactive' | 'maintenance';
}

export interface Transaction {
  id: string;
  userId: string;
  type: 'credit' | 'debit';
  amount: number;
  fee?: number;
  description: string;
  status: 'pending' | 'completed' | 'failed';
  methodId?: string;
  reference?: string;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt?: string;
}

export interface WithdrawalRequest {
  userId: string;
  amount: number;
  methodId: string;
  accountDetails?: Record<string, any>;
}

export interface WalletBalance {
  available: number;
  pending: number;
  total: number;
  lastUpdated: string;
}

export interface PaymentGatewayConfig {
  providers: Array<{
    id: string;
    name: string;
    type: 'card' | 'bank' | 'crypto';
    enabled: boolean;
    config: Record<string, any>;
  }>;
  fees: {
    withdrawal: {
      percentage: number;
      fixed: number;
      min: number;
      max: number;
    };
    deposit: {
      percentage: number;
      fixed: number;
      min: number;
      max: number;
    };
  };
  limits: {
    withdrawal: {
      min: number;
      max: number;
      daily: number;
      monthly: number;
    };
    deposit: {
      min: number;
      max: number;
      daily: number;
      monthly: number;
    };
  };
}
```