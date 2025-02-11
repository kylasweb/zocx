import { create } from 'zustand';

interface TokenConfig {
  name: string;
  symbol: string;
  totalSupply: number;
  decimals: number;
  contractAddress?: string;
}

interface FaucetConfig {
  enabled: boolean;
  claimAmount: number;
  cooldownPeriod: number; // in hours
  maxClaimsPerUser: number;
}

interface AirdropCampaign {
  id: string;
  name: string;
  description: string;
  status: 'draft' | 'active' | 'completed';
  totalAmount: number;
  claimedAmount: number;
  startDate: string;
  endDate: string;
  requirements: string[];
  participants: Array<{
    userId: string;
    claimed: boolean;
    claimDate?: string;
  }>;
}

interface CryptoState {
  tokenConfig: TokenConfig;
  faucetConfig: FaucetConfig;
  airdropConfig: {
    campaigns: AirdropCampaign[];
  };
  loading: boolean;
  error: string | null;
  
  // Token Management
  updateTokenConfig: (updates: Partial<TokenConfig>) => void;
  deployToken: () => Promise<void>;
  
  // Faucet Management
  updateFaucetConfig: (updates: Partial<FaucetConfig>) => void;
  processClaim: (userId: string) => Promise<void>;
  
  // Airdrop Management
  createAirdrop: (campaign: Omit<AirdropCampaign, 'id' | 'claimedAmount' | 'participants'>) => Promise<void>;
  updateAirdrop: (campaignId: string, updates: Partial<AirdropCampaign>) => Promise<void>;
  deleteAirdrop: (campaignId: string) => Promise<void>;
  processAirdropClaim: (campaignId: string, userId: string) => Promise<void>;
}

export const useCryptoStore = create<CryptoState>((set, get) => ({
  tokenConfig: {
    name: 'MLM Token',
    symbol: 'MLM',
    totalSupply: 1000000000,
    decimals: 18,
  },
  faucetConfig: {
    enabled: true,
    claimAmount: 100,
    cooldownPeriod: 24,
    maxClaimsPerUser: 3,
  },
  airdropConfig: {
    campaigns: [
      {
        id: 'airdrop-1',
        name: 'Launch Airdrop',
        description: 'Participate in our platform launch airdrop',
        status: 'active',
        totalAmount: 1000000,
        claimedAmount: 250000,
        startDate: '2024-03-01T00:00:00Z',
        endDate: '2024-04-01T00:00:00Z',
        requirements: [
          'Complete KYC verification',
          'Reach Silver rank or higher',
          'Have at least 5 direct referrals',
        ],
        participants: [],
      },
    ],
  },
  loading: false,
  error: null,

  updateTokenConfig: (updates) => {
    set((state) => ({
      tokenConfig: { ...state.tokenConfig, ...updates },
    }));
  },

  deployToken: async () => {
    set({ loading: true, error: null });
    try {
      // Implementation would go here
      await new Promise((resolve) => setTimeout(resolve, 2000));
      set((state) => ({
        tokenConfig: {
          ...state.tokenConfig,
          contractAddress: '0x...',
        },
        loading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  updateFaucetConfig: (updates) => {
    set((state) => ({
      faucetConfig: { ...state.faucetConfig, ...updates },
    }));
  },

  processClaim: async (userId: string) => {
    set({ loading: true, error: null });
    try {
      // Implementation would go here
      await new Promise((resolve) => setTimeout(resolve, 1000));
      set({ loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  createAirdrop: async (campaign) => {
    set({ loading: true, error: null });
    try {
      const newCampaign: AirdropCampaign = {
        ...campaign,
        id: `airdrop-${Date.now()}`,
        claimedAmount: 0,
        participants: [],
      };

      set((state) => ({
        airdropConfig: {
          campaigns: [...state.airdropConfig.campaigns, newCampaign],
        },
        loading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  updateAirdrop: async (campaignId, updates) => {
    set({ loading: true, error: null });
    try {
      set((state) => ({
        airdropConfig: {
          campaigns: state.airdropConfig.campaigns.map((campaign) =>
            campaign.id === campaignId
              ? { ...campaign, ...updates }
              : campaign
          ),
        },
        loading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  deleteAirdrop: async (campaignId) => {
    set({ loading: true, error: null });
    try {
      set((state) => ({
        airdropConfig: {
          campaigns: state.airdropConfig.campaigns.filter(
            (campaign) => campaign.id !== campaignId
          ),
        },
        loading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  processAirdropClaim: async (campaignId, userId) => {
    set({ loading: true, error: null });
    try {
      set((state) => ({
        airdropConfig: {
          campaigns: state.airdropConfig.campaigns.map((campaign) =>
            campaign.id === campaignId
              ? {
                  ...campaign,
                  claimedAmount: campaign.claimedAmount + campaign.totalAmount / 100,
                  participants: [
                    ...campaign.participants,
                    {
                      userId,
                      claimed: true,
                      claimDate: new Date().toISOString(),
                    },
                  ],
                }
              : campaign
          ),
        },
        loading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
}));