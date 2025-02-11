import { create } from 'zustand';

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

interface TradingState {
  tradingPairs: TradingPair[];
  stakingPools: StakingPool[];
  loading: boolean;
  error: string | null;

  // Trading Pair Management
  addTradingPair: (pair: Omit<TradingPair, 'orderBook'>) => Promise<void>;
  updateTradingPair: (id: string, updates: Partial<TradingPair>) => Promise<void>;
  removeTradingPair: (id: string) => Promise<void>;
  getTradingPair: (id: string) => TradingPair | undefined;

  // Order Management
  placeOrder: (order: Omit<Order, 'id' | 'status' | 'filled' | 'createdAt'>) => Promise<void>;
  cancelOrder: (orderId: string) => Promise<void>;
  getOrders: (userId: string) => Order[];
  getOrderBook: (pairId: string) => { asks: Order[]; bids: Order[] };

  // Staking Pool Management
  addStakingPool: (pool: Omit<StakingPool, 'id' | 'status'>) => Promise<void>;
  updateStakingPool: (id: string, updates: Partial<StakingPool>) => Promise<void>;
  removeStakingPool: (id: string) => Promise<void>;
  getStakingPool: (id: string) => StakingPool | undefined;

  // Market Data
  updateMarketData: (pairId: string, data: { price: number; volume: number }) => void;
  get24hChange: (pairId: string) => number;
}

export const useTradingStore = create<TradingState>((set, get) => ({
  tradingPairs: [],
  stakingPools: [],
  loading: false,
  error: null,

  addTradingPair: async (pair) => {
    set({ loading: true, error: null });
    try {
      // In production, this would make an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set(state => ({
        tradingPairs: [...state.tradingPairs, {
          ...pair,
          orderBook: {
            asks: [],
            bids: [],
          },
        }],
        loading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  updateTradingPair: async (id, updates) => {
    set({ loading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set(state => ({
        tradingPairs: state.tradingPairs.map(pair =>
          pair.id === id ? { ...pair, ...updates } : pair
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  removeTradingPair: async (id) => {
    set({ loading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set(state => ({
        tradingPairs: state.tradingPairs.filter(pair => pair.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  getTradingPair: (id) => {
    return get().tradingPairs.find(pair => pair.id === id);
  },

  placeOrder: async (order) => {
    set({ loading: true, error: null });
    try {
      const newOrder: Order = {
        ...order,
        id: `order-${Date.now()}`,
        status: 'open',
        filled: 0,
        createdAt: new Date().toISOString(),
      };

      set(state => {
        const pair = state.tradingPairs.find(p => p.id === order.pairId);
        if (!pair || !pair.orderBook) return state;

        const updatedOrderBook = {
          asks: [...pair.orderBook.asks],
          bids: [...pair.orderBook.bids],
        };

        if (order.side === 'sell') {
          updatedOrderBook.asks.push(newOrder);
          updatedOrderBook.asks.sort((a, b) => a.price - b.price);
        } else {
          updatedOrderBook.bids.push(newOrder);
          updatedOrderBook.bids.sort((a, b) => b.price - a.price);
        }

        return {
          ...state,
          tradingPairs: state.tradingPairs.map(p =>
            p.id === order.pairId
              ? { ...p, orderBook: updatedOrderBook }
              : p
          ),
          loading: false,
        };
      });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  cancelOrder: async (orderId) => {
    set({ loading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set(state => {
        const updatedPairs = state.tradingPairs.map(pair => {
          if (!pair.orderBook) return pair;

          const updatedOrderBook = {
            asks: pair.orderBook.asks.map(order =>
              order.id === orderId ? { ...order, status: 'cancelled' } : order
            ),
            bids: pair.orderBook.bids.map(order =>
              order.id === orderId ? { ...order, status: 'cancelled' } : order
            ),
          };

          return {
            ...pair,
            orderBook: updatedOrderBook,
          };
        });

        return {
          ...state,
          tradingPairs: updatedPairs,
          loading: false,
        };
      });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  getOrders: (userId) => {
    const pairs = get().tradingPairs;
    const orders: Order[] = [];

    pairs.forEach(pair => {
      if (!pair.orderBook) return;
      
      pair.orderBook.asks.forEach(order => {
        if (order.userId === userId) orders.push(order);
      });
      
      pair.orderBook.bids.forEach(order => {
        if (order.userId === userId) orders.push(order);
      });
    });

    return orders;
  },

  getOrderBook: (pairId) => {
    const pair = get().tradingPairs.find(p => p.id === pairId);
    return pair?.orderBook || { asks: [], bids: [] };
  },

  addStakingPool: async (pool) => {
    set({ loading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set(state => ({
        stakingPools: [...state.stakingPools, {
          ...pool,
          id: `pool-${Date.now()}`,
          status: 'active',
        }],
        loading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  updateStakingPool: async (id, updates) => {
    set({ loading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set(state => ({
        stakingPools: state.stakingPools.map(pool =>
          pool.id === id ? { ...pool, ...updates } : pool
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  removeStakingPool: async (id) => {
    set({ loading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set(state => ({
        stakingPools: state.stakingPools.filter(pool => pool.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  getStakingPool: (id) => {
    return get().stakingPools.find(pool => pool.id === id);
  },

  updateMarketData: (pairId, data) => {
    set(state => ({
      tradingPairs: state.tradingPairs.map(pair =>
        pair.id === pairId
          ? {
              ...pair,
              lastPrice: data.price,
              volume24h: data.volume,
            }
          : pair
      ),
    }));
  },

  get24hChange: (pairId) => {
    const pair = get().tradingPairs.find(p => p.id === pairId);
    return pair?.change24h || 0;
  },
}));