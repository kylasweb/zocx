export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  points: number;
  createdAt: string;
}

export interface Training {
  id: string;
  title: string;
  description: string;
  content: string;
  type: 'video' | 'document' | 'quiz';
  status: 'not_started' | 'in_progress' | 'completed';
  progress: number;
  createdAt: string;
}

export interface Commission {
  id: string;
  userId: string;
  amount: number;
  type: 'direct' | 'binary' | 'matching' | 'leadership' | 'rank_advancement' | 'retail_bonus';
  status: 'pending' | 'approved' | 'paid';
  sourceUserId: string;
  sourceVolume: number;
  percentage: number;
  level?: number;
  rankBonus?: number;
  createdAt: string;
  paidAt?: string;
}

export interface NetworkMember {
  id: string;
  fullName: string;
  email: string;
  rank: string;
  joinDate: string;
  status: 'active' | 'inactive';
  personalVolume: number;
  groupVolume: number;
  directReferrals: number;
  leftLegVolume: number;
  rightLegVolume: number;
  weeklyBinaryQualified: boolean;
  monthlyRankQualified: boolean;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'achievement' | 'commission' | 'rank' | 'system';
  read: boolean;
  createdAt: string;
}

export interface CommissionRules {
  directReferral: {
    percentage: number;
    minimumPV: number;
  };
  binary: {
    percentage: number;
    capPercentage: number;
    weeklyMaximum: number;
    minimumWeeklyPV: number;
    minimumActiveLegCount: number;
  };
  matching: {
    levels: Array<{
      level: number;
      percentage: number;
      requiredRank: string;
    }>;
  };
  leadership: {
    ranks: Array<{
      rank: string;
      bonus: number;
      requiredGroupVolume: number;
      requiredDirectReferrals: number;
    }>;
  };
  retail: {
    percentage: number;
  };
}