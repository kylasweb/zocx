import { create } from 'zustand';
import { TreeNode, NetworkStats, PlacementRules } from '../types/network';

interface NetworkState {
  treeData: TreeNode[];
  networkStats: NetworkStats;
  placementRules: PlacementRules;
  selectedNode: string | null;
  loading: boolean;
  error: string | null;
  setSelectedNode: (nodeId: string | null) => void;
  getNodeChildren: (nodeId: string) => TreeNode[];
  getNodePath: (nodeId: string) => string[];
  calculateLegVolumes: () => { leftVolume: number; rightVolume: number };
}

export const useNetworkStore = create<NetworkState>((set, get) => ({
  treeData: [],
  networkStats: {
    totalMembers: 0,
    activeMembers: 0,
    leftLegCount: 0,
    rightLegCount: 0,
    leftLegVolume: 0,
    rightLegVolume: 0,
    weeklyGrowth: 0,
    monthlyGrowth: 0,
  },
  placementRules: {
    maxWidth: 2,
    maxDepth: 20,
    autoPlacement: true,
    spillover: 'weak-leg',
  },
  selectedNode: null,
  loading: false,
  error: null,

  setSelectedNode: (nodeId) => set({ selectedNode: nodeId }),

  getNodeChildren: (nodeId) => {
    const { treeData } = get();
    const node = treeData.find(n => n.id === nodeId);
    if (!node) return [];
    return treeData.filter(n => n.id === node.leftLeg || n.id === node.rightLeg);
  },

  getNodePath: (nodeId) => {
    const { treeData } = get();
    const path: string[] = [];
    let currentNode = treeData.find(n => n.id === nodeId);
    
    while (currentNode && currentNode.sponsorId) {
      path.unshift(currentNode.id);
      currentNode = treeData.find(n => n.id === currentNode?.sponsorId);
    }
    
    if (currentNode) {
      path.unshift(currentNode.id);
    }
    
    return path;
  },

  calculateLegVolumes: () => {
    const { treeData } = get();
    const root = treeData.find(n => !n.sponsorId);
    if (!root) return { leftVolume: 0, rightVolume: 0 };

    const calculateVolume = (nodeId: string | null): number => {
      if (!nodeId) return 0;
      const node = treeData.find(n => n.id === nodeId);
      if (!node) return 0;
      return node.personalVolume +
        calculateVolume(node.leftLeg) +
        calculateVolume(node.rightLeg);
    };

    return {
      leftVolume: calculateVolume(root.leftLeg),
      rightVolume: calculateVolume(root.rightLeg),
    };
  },
}));