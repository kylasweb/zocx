export interface TradingPair {
  id: string;
  baseToken: string;
  quoteToken: string;
  status: 'active' | 'inactive' | 'maintenance';
  lastPrice: number;
  volume24h: number;
  change24h: number;
  minTradeAmount: number;
  maxTradeAmount: number;
  tradingFee: number;
  orderBook?: {
    asks: Order[];
    bids: Order[];
  };
}

export interface Order {
  id: string;
  userId: string;
  pairId: string;
  type: 'limit' | 'market';
  side: 'buy' | 'sell';
  price: number;
  amount: number;
  filled: number;
  status: 'open' | 'filled' | 'cancelled';
  createdAt: string;
}

export interface StakingPool {
  id: string;
  token: string;
  apy: number;
  lockPeriod: number; // in days
  minStake: number;
  maxStake: number;
  totalStaked: number;
  participants: number;
  status: 'active' | 'inactive' | 'full';
}

export interface MarketData {
  price: number;
  volume: number;
  change24h: number;
  high24h: number;
  low24h: number;
  timestamp: string;
}

export interface StakingPosition {
  id: string;
  userId: string;
  poolId: string;
  amount: number;
  startDate: string;
  endDate: string;
  rewards: number;
  status: 'active' | 'completed' | 'withdrawn';
}