import { create } from 'zustand';
import { Rank, RankProgress } from '../types/ranks';
import { NetworkMember } from '../types/mlm';

interface RankState {
  ranks: Rank[];
  rankProgress: RankProgress[];
  loading: boolean;
  error: string | null;
  getRankByName: (name: string) => Rank | undefined;
  getNextRank: (currentRank: string) => Rank | undefined;
  calculateRankProgress: (member: NetworkMember) => RankProgress;
  checkRankAdvancement: (member: NetworkMember) => boolean;
  checkRankMaintenance: (member: NetworkMember) => boolean;
  getRankBenefits: (rankName: string) => Rank['benefits'] | undefined;
}

export const useRankStore = create<RankState>((set, get) => ({
  ranks: [
    {
      id: 'starter',
      name: 'Starter',
      level: 0,
      requirements: {
        personalVolume: 0,
        groupVolume: 0,
        directReferrals: 0,
        activeLegs: 0,
        minimumLegVolume: 0,
      },
      benefits: {
        directCommissionRate: 10,
        binaryMatchingRate: 5,
        leadershipBonus: 0,
        maxWeeklyEarnings: 1000,
        matchingBonusLevels: 0,
      },
      icon: 'star',
      color: 'gray',
    },
    {
      id: 'bronze',
      name: 'Bronze',
      level: 1,
      requirements: {
        personalVolume: 100,
        groupVolume: 1000,
        directReferrals: 2,
        activeLegs: 2,
        minimumLegVolume: 300,
      },
      benefits: {
        directCommissionRate: 15,
        binaryMatchingRate: 8,
        leadershipBonus: 100,
        maxWeeklyEarnings: 2500,
        matchingBonusLevels: 1,
      },
      icon: 'award',
      color: 'bronze',
    },
    {
      id: 'silver',
      name: 'Silver',
      level: 2,
      requirements: {
        personalVolume: 200,
        groupVolume: 5000,
        directReferrals: 5,
        activeLegs: 2,
        minimumLegVolume: 1500,
      },
      benefits: {
        directCommissionRate: 20,
        binaryMatchingRate: 10,
        leadershipBonus: 500,
        maxWeeklyEarnings: 5000,
        matchingBonusLevels: 2,
      },
      icon: 'award',
      color: 'silver',
    },
    {
      id: 'gold',
      name: 'Gold',
      level: 3,
      requirements: {
        personalVolume: 300,
        groupVolume: 10000,
        directReferrals: 10,
        activeLegs: 2,
        minimumLegVolume: 3000,
      },
      benefits: {
        directCommissionRate: 25,
        binaryMatchingRate: 12,
        leadershipBonus: 1000,
        maxWeeklyEarnings: 10000,
        matchingBonusLevels: 3,
      },
      icon: 'award',
      color: 'gold',
    },
    {
      id: 'diamond',
      name: 'Diamond',
      level: 4,
      requirements: {
        personalVolume: 500,
        groupVolume: 25000,
        directReferrals: 15,
        activeLegs: 2,
        minimumLegVolume: 7500,
      },
      benefits: {
        directCommissionRate: 30,
        binaryMatchingRate: 15,
        leadershipBonus: 2500,
        maxWeeklyEarnings: 25000,
        matchingBonusLevels: 4,
      },
      icon: 'diamond',
      color: 'blue',
    },
  ],
  rankProgress: [],
  loading: false,
  error: null,

  getRankByName: (name: string) => {
    const { ranks } = get();
    return ranks.find(rank => rank.name.toLowerCase() === name.toLowerCase());
  },

  getNextRank: (currentRank: string) => {
    const { ranks } = get();
    const currentLevel = ranks.find(
      rank => rank.name.toLowerCase() === currentRank.toLowerCase()
    )?.level;
    
    if (currentLevel === undefined) return undefined;
    return ranks.find(rank => rank.level === currentLevel + 1);
  },

  calculateRankProgress: (member: NetworkMember) => {
    const { ranks, getRankByName, getNextRank } = get();
    const currentRank = getRankByName(member.rank) || ranks[0];
    const nextRank = getNextRank(currentRank.name);

    if (!nextRank) {
      return {
        userId: member.id,
        currentRank: currentRank.name,
        nextRank: currentRank.name,
        personalVolume: member.personalVolume,
        groupVolume: member.groupVolume,
        directReferrals: member.directReferrals,
        activeLegs: 2, // Assuming binary structure
        weakestLegVolume: Math.min(member.leftLegVolume, member.rightLegVolume),
        requirementProgress: {
          personalVolume: 100,
          groupVolume: 100,
          directReferrals: 100,
          activeLegs: 100,
          minimumLegVolume: 100,
        },
        lastAdvancementDate: new Date().toISOString(),
        maintenanceStreak: 12,
      };
    }

    return {
      userId: member.id,
      currentRank: currentRank.name,
      nextRank: nextRank.name,
      personalVolume: member.personalVolume,
      groupVolume: member.groupVolume,
      directReferrals: member.directReferrals,
      activeLegs: 2, // Assuming binary structure
      weakestLegVolume: Math.min(member.leftLegVolume, member.rightLegVolume),
      requirementProgress: {
        personalVolume: (member.personalVolume / nextRank.requirements.personalVolume) * 100,
        groupVolume: (member.groupVolume / nextRank.requirements.groupVolume) * 100,
        directReferrals: (member.directReferrals / nextRank.requirements.directReferrals) * 100,
        activeLegs: ((member.leftLegVolume > 0 ? 1 : 0) + (member.rightLegVolume > 0 ? 1 : 0)) / nextRank.requirements.activeLegs * 100,
        minimumLegVolume: (Math.min(member.leftLegVolume, member.rightLegVolume) / nextRank.requirements.minimumLegVolume) * 100,
      },
      lastAdvancementDate: new Date().toISOString(),
      maintenanceStreak: 1,
    };
  },

  checkRankAdvancement: (member: NetworkMember) => {
    const { ranks, getRankByName, getNextRank } = get();
    const currentRank = getRankByName(member.rank) || ranks[0];
    const nextRank = getNextRank(currentRank.name);

    if (!nextRank) return false;

    return (
      member.personalVolume >= nextRank.requirements.personalVolume &&
      member.groupVolume >= nextRank.requirements.groupVolume &&
      member.directReferrals >= nextRank.requirements.directReferrals &&
      Math.min(member.leftLegVolume, member.rightLegVolume) >= nextRank.requirements.minimumLegVolume
    );
  },

  checkRankMaintenance: (member: NetworkMember) => {
    const { getRankByName } = get();
    const currentRank = getRankByName(member.rank);
    
    if (!currentRank) return true;

    return (
      member.personalVolume >= currentRank.requirements.personalVolume &&
      member.groupVolume >= currentRank.requirements.groupVolume &&
      member.directReferrals >= currentRank.requirements.directReferrals &&
      Math.min(member.leftLegVolume, member.rightLegVolume) >= currentRank.requirements.minimumLegVolume
    );
  },

  getRankBenefits: (rankName: string) => {
    const { getRankByName } = get();
    return getRankByName(rankName)?.benefits;
  },
}));