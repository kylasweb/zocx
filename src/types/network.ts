export interface TreeNode {
  id: string;
  userId: string;
  fullName: string;
  position: 'left' | 'right' | null;
  level: number;
  personalVolume: number;
  groupVolume: number;
  leftLeg: string | null;
  rightLeg: string | null;
  sponsorId: string | null;
  rank: string;
  joinDate: string;
  status: 'active' | 'inactive';
}

export interface NetworkStats {
  totalMembers: number;
  activeMembers: number;
  leftLegCount: number;
  rightLegCount: number;
  leftLegVolume: number;
  rightLegVolume: number;
  weeklyGrowth: number;
  monthlyGrowth: number;
}

export interface PlacementRules {
  maxWidth: number;
  maxDepth: number;
  autoPlacement: boolean;
  spillover: 'left' | 'right' | 'alternate' | 'weak-leg';
}