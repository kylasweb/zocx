// Add to existing GamificationSettings interface
export interface TeamChallenge {
  id: string;
  name: string;
  description: string;
  teamSize: number;
  startDate: string;
  endDate: string;
  objectives: Array<{
    type: 'sales' | 'recruitment' | 'training';
    target: number;
    progress: number;
  }>;
  rewards: {
    type: 'bonus' | 'multiplier' | 'badge';
    value: number | string;
  };
  teams: Array<{
    id: string;
    name: string;
    members: string[];
    progress: number;
    rank: number;
  }>;
}

export interface SkillTree {
  id: string;
  name: string;
  category: 'sales' | 'leadership' | 'technical';
  nodes: Array<{
    id: string;
    name: string;
    description: string;
    level: number;
    requirements: Record<string, number>;
    benefits: Record<string, number>;
    children: string[];
    unlocked: boolean;
  }>;
}

export interface SeasonalEvent {
  id: string;
  name: string;
  theme: string;
  startDate: string;
  endDate: string;
  tiers: Array<{
    level: number;
    requirements: Record<string, number>;
    rewards: Array<{
      type: string;
      value: number | string;
    }>;
  }>;
  participants: Array<{
    userId: string;
    progress: number;
    currentTier: number;
    rewards: string[];
  }>;
}

// Add to GamificationSettings
export interface GamificationSettings {
  // ... existing properties
  teamChallenges: TeamChallenge[];
  skillTrees: SkillTree[];
  seasonalEvents: SeasonalEvent[];
  nftBadges: Array<{
    id: string;
    tokenId: string;
    metadata: Record<string, any>;
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
  }>;
}