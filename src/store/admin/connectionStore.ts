import { create } from 'zustand';

export interface Connection {
  id: string;
  name: string;
  platform: string;
  url: string;
  status: 'pending' | 'active' | 'error';
  ssoEnabled: boolean;
  ssoStatus?: 'active' | 'inactive' | 'error';
  config: {
    clientId: string;
    clientSecret: string;
    callbackUrl: string;
  };
  lastSync?: string;
  createdAt: string;
}

interface ConnectionState {
  connections: Connection[];
  loading: boolean;
  error: string | null;
  addConnection: (connection: Connection) => Promise<void>;
  removeConnection: (id: string) => Promise<void>;
  updateConnection: (id: string, updates: Partial<Connection>) => Promise<void>;
  testConnection: (id: string) => Promise<void>;
}

export const useConnectionStore = create<ConnectionState>((set, get) => ({
  connections: [],
  loading: false,
  error: null,

  addConnection: async (connection) => {
    set({ loading: true, error: null });
    try {
      // In production, this would make an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set(state => ({
        connections: [...state.connections, connection],
        loading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  removeConnection: async (id) => {
    set({ loading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set(state => ({
        connections: state.connections.filter(conn => conn.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  updateConnection: async (id, updates) => {
    set({ loading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set(state => ({
        connections: state.connections.map(conn =>
          conn.id === id ? { ...conn, ...updates } : conn
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  testConnection: async (id) => {
    set({ loading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate testing connection and SSO
      const success = Math.random() > 0.2; // 80% success rate
      
      set(state => ({
        connections: state.connections.map(conn =>
          conn.id === id
            ? {
                ...conn,
                status: success ? 'active' : 'error',
                ssoStatus: conn.ssoEnabled ? (success ? 'active' : 'error') : undefined,
                lastSync: new Date().toISOString(),
              }
            : conn
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
}));