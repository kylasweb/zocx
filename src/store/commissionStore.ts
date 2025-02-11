import { create } from 'zustand';
import { Commission, CommissionRules, NetworkMember } from '../types/mlm';

interface CommissionState {
  commissions: Commission[];
  rules: CommissionRules;
  loading: boolean;
  error: string | null;
  calculateDirectCommission: (volume: number, sponsorId: string) => number;
  calculateBinaryCommission: (member: NetworkMember) => number;
  calculateMatchingBonus: (commission: Commission, sponsorRank: string) => number;
  calculateLeadershipBonus: (member: NetworkMember) => number;
  getWeeklyEarnings: (userId: string) => number;
  getMonthlyEarnings: (userId: string) => number;
  getPendingCommissions: (userId: string) => Commission[];
  getTotalEarnings: (userId: string) => number;
}

export const useCommissionStore = create<CommissionState>((set, get) => ({
  commissions: [],
  rules: {
    directReferral: {
      percentage: 20,
      minimumPV: 100,
    },
    binary: {
      percentage: 10,
      capPercentage: 20,
      weeklyMaximum: 50000,
      minimumWeeklyPV: 50,
      minimumActiveLegCount: 2,
    },
    matching: {
      levels: [
        { level: 1, percentage: 10, requiredRank: 'Silver' },
        { level: 2, percentage: 7, requiredRank: 'Gold' },
        { level: 3, percentage: 5, requiredRank: 'Diamond' },
      ],
    },
    leadership: {
      ranks: [
        {
          rank: 'Silver',
          bonus: 500,
          requiredGroupVolume: 5000,
          requiredDirectReferrals: 5,
        },
        {
          rank: 'Gold',
          bonus: 1000,
          requiredGroupVolume: 10000,
          requiredDirectReferrals: 10,
        },
        {
          rank: 'Diamond',
          bonus: 2500,
          requiredGroupVolume: 25000,
          requiredDirectReferrals: 15,
        },
      ],
    },
    retail: {
      percentage: 25,
    },
  },
  loading: false,
  error: null,

  calculateDirectCommission: (volume: number, sponsorId: string) => {
    const { rules } = get();
    if (volume < rules.directReferral.minimumPV) return 0;
    return volume * (rules.directReferral.percentage / 100);
  },

  calculateBinaryCommission: (member: NetworkMember) => {
    const { rules } = get();
    if (!member.weeklyBinaryQualified) return 0;
    
    const weakerLeg = Math.min(member.leftLegVolume, member.rightLegVolume);
    const maxCommission = rules.binary.weeklyMaximum;
    const commission = weakerLeg * (rules.binary.percentage / 100);
    
    return Math.min(commission, maxCommission);
  },

  calculateMatchingBonus: (commission: Commission, sponsorRank: string) => {
    const { rules } = get();
    const eligibleLevel = rules.matching.levels.find(
      level => level.requiredRank === sponsorRank
    );
    
    if (!eligibleLevel) return 0;
    return commission.amount * (eligibleLevel.percentage / 100);
  },

  calculateLeadershipBonus: (member: NetworkMember) => {
    const { rules } = get();
    const rankBonus = rules.leadership.ranks.find(
      rank => rank.rank === member.rank
    );
    
    if (!rankBonus || 
        member.groupVolume < rankBonus.requiredGroupVolume || 
        member.directReferrals < rankBonus.requiredDirectReferrals) {
      return 0;
    }
    
    return rankBonus.bonus;
  },

  getWeeklyEarnings: (userId: string) => {
    const { commissions } = get();
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - 7);
    
    return commissions
      .filter(c => 
        c.userId === userId && 
        new Date(c.createdAt) >= weekStart &&
        c.status !== 'pending'
      )
      .reduce((sum, c) => sum + c.amount, 0);
  },

  getMonthlyEarnings: (userId: string) => {
    const { commissions } = get();
    const monthStart = new Date();
    monthStart.setMonth(monthStart.getMonth() - 1);
    
    return commissions
      .filter(c => 
        c.userId === userId && 
        new Date(c.createdAt) >= monthStart &&
        c.status !== 'pending'
      )
      .reduce((sum, c) => sum + c.amount, 0);
  },

  getPendingCommissions: (userId: string) => {
    const { commissions } = get();
    return commissions.filter(c => 
      c.userId === userId && 
      c.status === 'pending'
    );
  },

  getTotalEarnings: (userId: string) => {
    const { commissions } = get();
    return commissions
      .filter(c => 
        c.userId === userId && 
        c.status === 'paid'
      )
      .reduce((sum, c) => sum + c.amount, 0);
  },
}));