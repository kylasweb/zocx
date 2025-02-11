// Add to existing GenealogySettings interface
export interface SmartPlacement {
  algorithm: 'volume_balanced' | 'depth_first' | 'width_first';
  criteria: {
    volumeWeight: number;
    depthWeight: number;
    activityWeight: number;
  };
  constraints: {
    maxDepthDifference: number;
    minVolumeThreshold: number;
    preferredLeg?: 'left' | 'right';
  };
}

export interface PowerTeam {
  id: string;
  name: string;
  requirements: {
    minMembers: number;
    minTotalVolume: number;
    minActivePercentage: number;
  };
  benefits: {
    commissionMultiplier: number;
    rankAdvancementBonus: number;
    specialRewards: string[];
  };
  members: Array<{
    userId: string;
    role: 'leader' | 'core' | 'member';
    contribution: number;
  }>;
}

// Add to GenealogySettings
export interface GenealogySettings {
  // ... existing properties
  smartPlacement: SmartPlacement;
  powerTeams: PowerTeam[];
  analytics: {
    predictionModels: {
      volumeGrowth: boolean;
      teamRetention: boolean;
      rankAdvancement: boolean;
    };
    territoryMapping: {
      enabled: boolean;
      clusteringMethod: 'country' | 'region' | 'custom';
      metrics: string[];
    };
  };
}