import { create } from 'zustand';
import { AuthState, ADMIN_CREDENTIALS } from '../types/auth';

export const useAuthStore = create<AuthState & {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}>((set) => ({
  user: null,
  loading: false,
  error: null,
  login: async (email: string, password: string) => {
    set({ loading: true, error: null });
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
        set({
          user: {
            id: 'admin-1',
            email: ADMIN_CREDENTIALS.email,
            role: 'admin',
            fullName: 'System Administrator',
            walletBalance: 0,
            referralCode: 'ADMIN',
            uplineId: null,
            rank: 'Administrator',
            createdAt: new Date().toISOString()
          },
          loading: false
        });
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
  logout: () => {
    set({ user: null, error: null });
  }
}));