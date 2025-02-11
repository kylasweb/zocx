export type UserRole = 'admin' | 'investor' | 'referral' | 'leader';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  fullName: string;
  walletBalance: number;
  referralCode: string;
  uplineId: string | null;
  rank: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

// Admin credentials - In production, these should be stored securely
export const ADMIN_CREDENTIALS = {
  email: 'admin@mlmplatform.com',
  password: 'admin123!@#'
};