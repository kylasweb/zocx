import React, { useState } from 'react';
import { Users, Activity, TrendingUp, GitBranch } from 'lucide-react';
import { useNetworkStore } from '../store/networkStore';
import NetworkVisualization from '../components/network/NetworkVisualization';
import CommissionCalculator from '../components/network/CommissionCalculator';
import UserPreview from '../components/network/UserPreview';
import { NetworkGraph3D } from '../components/network/NetworkGraph3D';

const Network: React.FC = () => {
  const {
    networkStats,
    treeData,
    selectedNode,
    setSelectedNode,
    calculateLegVolumes,
    networkMembers,
  } = useNetworkStore();

  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showCommissionCalculator, setShowCommissionCalculator] = useState(false);

  const stats = [
    {
      label: 'Total Members',
      value: networkStats.totalMembers,
      icon: Users,
      trend: `${networkStats.monthlyGrowth}%`,
      color: 'bg-blue-500',
    },
    {
      label: 'Active Members',
      value: networkStats.activeMembers,
      icon: Activity,
      trend: `${(networkStats.activeMembers / networkStats.totalMembers * 100).toFixed(1)}%`,
      color: 'bg-green-500',
    },
    {
      label: 'Network Growth',
      value: networkStats.weeklyGrowth + '%',
      icon: TrendingUp,
      trend: 'This Week',
      color: 'bg-purple-500',
    },
    {
      label: 'Binary Balance',
      value: `${((networkStats.leftLegCount / (networkStats.totalMembers || 1)) * 100).toFixed(1)}%`,
      icon: GitBranch,
      trend: 'Left/Right Ratio',
      color: 'bg-yellow-500',
    },
  ];

  const handleNodeClick = (nodeId: string) => {
    setSelectedNode(nodeId);
  };

  const handleNodeHover = (nodeId: string | null, e?: React.MouseEvent) => {
    setHoveredNode(nodeId);
    if (e) {
      setMousePos({ x: e.clientX, y: e.clientY });
    }
  };

  const handleViewAsUser = (userId: string) => {
    // Implement view as user functionality
    console.log('View as user:', userId);
  };

  const handleViewDownline = (userId: string) => {
    // Implement view downline functionality
    console.log('View downline:', userId);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Network Overview</h1>
        <button
          onClick={() => setShowCommissionCalculator(!showCommissionCalculator)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          {showCommissionCalculator ? 'Hide Calculator' : 'Commission Calculator'}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-sm font-medium text-green-600">{stat.trend}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Binary Tree View</h2>
            <NetworkVisualization
              data={treeData}
              onNodeClick={handleNodeClick}
              onNodeHover={handleNodeHover}
            />
          </div>
        </div>

        <div className="lg:col-span-1">
          {showCommissionCalculator ? (
            <CommissionCalculator />
          ) : (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Network Details</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Left Leg Volume</span>
                  <span className="font-medium">{networkStats.leftLegVolume}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Right Leg Volume</span>
                  <span className="font-medium">{networkStats.rightLegVolume}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Left Leg Members</span>
                  <span className="font-medium">{networkStats.leftLegCount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Right Leg Members</span>
                  <span className="font-medium">{networkStats.rightLegCount}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <NetworkGraph3D members={networkMembers} />

      {hoveredNode && (
        <UserPreview
          user={treeData.find(n => n.id === hoveredNode)!}
          position={mousePos}
          onViewAsUser={() => handleViewAsUser(hoveredNode)}
          onViewDownline={() => handleViewDownline(hoveredNode)}
        />
      )}
    </div>
  );
};

export default Network;