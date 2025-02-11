export type UserRole = 'user' | 'investor' | 'leader' | 'admin';
export type LeaderRank = 'novice' | 'interim' | 'pro' | 'elite' | 'crown' | 'zocial';

export interface User {
  id: string;
  role: UserRole;
  leaderRank?: LeaderRank;
  leftLegCount: number;
  rightLegCount: number;
  totalDeposits: number;
  // ... other user fields
} 