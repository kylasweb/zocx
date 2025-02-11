export interface Rank {
  id: string;
  name: string;
  level: number;
  requirements: {
    personalVolume: number;
    groupVolume: number;
    directReferrals: number;
    activeLegs: number;
    minimumLegVolume: number;
  };
  benefits: {
    directCommissionRate: number;
    binaryMatchingRate: number;
    leadershipBonus: number;
    maxWeeklyEarnings: number;
    matchingBonusLevels: number;
  };
  icon: string;
  color: string;
}

export interface RankProgress {
  userId: string;
  currentRank: string;
  nextRank: string;
  personalVolume: number;
  groupVolume: number;
  directReferrals: number;
  activeLegs: number;
  weakestLegVolume: number;
  requirementProgress: {
    personalVolume: number;
    groupVolume: number;
    directReferrals: number;
    activeLegs: number;
    minimumLegVolume: number;
  };
  lastAdvancementDate: string;
  maintenanceStreak: number;
}