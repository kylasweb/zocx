import React from 'react';
import { Award, TrendingUp, Users, Target, Star } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useRankStore } from '../store/rankStore';
import { useNetworkStore } from '../store/networkStore';

const Ranks: React.FC = () => {
  const { user } = useAuthStore();
  const { calculateRankProgress, getRankByName, getNextRank } = useRankStore();
  const { networkStats } = useNetworkStore();

  if (!user) return null;

  const member = {
    id: user.id,
    fullName: user.fullName,
    rank: user.rank,
    personalVolume: 150,
    groupVolume: networkStats.leftLegVolume + networkStats.rightLegVolume,
    directReferrals: 3,
    leftLegVolume: networkStats.leftLegVolume,
    rightLegVolume: networkStats.rightLegVolume,
  };

  const progress = calculateRankProgress(member);
  const currentRank = getRankByName(user.rank);
  const nextRank = getNextRank(user.rank);

  const stats = [
    {
      label: 'Current Rank',
      value: currentRank?.name || 'Starter',
      icon: Award,
      trend: `${progress.maintenanceStreak} months`,
      color: 'bg-blue-500',
    },
    {
      label: 'Personal Volume',
      value: member.personalVolume,
      icon: TrendingUp,
      trend: `${progress.requirementProgress.personalVolume.toFixed(1)}%`,
      color: 'bg-green-500',
    },
    {
      label: 'Direct Referrals',
      value: member.directReferrals,
      icon: Users,
      trend: `${progress.requirementProgress.directReferrals.toFixed(1)}%`,
      color: 'bg-yellow-500',
    },
    {
      label: 'Next Rank',
      value: nextRank?.name || 'Maximum',
      icon: Target,
      trend: 'Target',
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Rank Dashboard</h1>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Rank Progress</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Personal Volume</span>
                <span>{progress.requirementProgress.personalVolume.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${Math.min(progress.requirementProgress.personalVolume, 100)}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Group Volume</span>
                <span>{progress.requirementProgress.groupVolume.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full"
                  style={{ width: `${Math.min(progress.requirementProgress.groupVolume, 100)}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Direct Referrals</span>
                <span>{progress.requirementProgress.directReferrals.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-yellow-600 h-2 rounded-full"
                  style={{ width: `${Math.min(progress.requirementProgress.directReferrals, 100)}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Minimum Leg Volume</span>
                <span>{progress.requirementProgress.minimumLegVolume.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full"
                  style={{ width: `${Math.min(progress.requirementProgress.minimumLegVolume, 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Rank Benefits</h2>
          <div className="space-y-4">
            {currentRank && (
              <>
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <span className="text-blue-700">Direct Commission Rate</span>
                  <span className="font-medium">{currentRank.benefits.directCommissionRate}%</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <span className="text-green-700">Binary Matching Rate</span>
                  <span className="font-medium">{currentRank.benefits.binaryMatchingRate}%</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                  <span className="text-yellow-700">Leadership Bonus</span>
                  <span className="font-medium">${currentRank.benefits.leadershipBonus}</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                  <span className="text-purple-700">Max Weekly Earnings</span>
                  <span className="font-medium">${currentRank.benefits.maxWeeklyEarnings}</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-indigo-50 rounded-lg">
                  <span className="text-indigo-700">Matching Bonus Levels</span>
                  <span className="font-medium">{currentRank.benefits.matchingBonusLevels}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ranks;