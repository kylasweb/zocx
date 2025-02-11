import React from 'react';
import { Users, UserPlus, UserCheck, UserX } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useNetworkStore } from '../store/networkStore';

const Team: React.FC = () => {
  const { user } = useAuthStore();
  const { networkStats } = useNetworkStore();

  if (!user) return null;

  const stats = [
    {
      label: 'Total Team Members',
      value: networkStats.totalMembers,
      icon: Users,
      trend: `+${networkStats.monthlyGrowth}%`,
      color: 'bg-blue-500',
    },
    {
      label: 'Active Members',
      value: networkStats.activeMembers,
      icon: UserCheck,
      trend: `${(networkStats.activeMembers / networkStats.totalMembers * 100).toFixed(1)}%`,
      color: 'bg-green-500',
    },
    {
      label: 'Inactive Members',
      value: networkStats.totalMembers - networkStats.activeMembers,
      icon: UserX,
      trend: 'Needs Attention',
      color: 'bg-red-500',
    },
    {
      label: 'Direct Referrals',
      value: user.directReferrals || 0,
      icon: UserPlus,
      trend: 'Personal Team',
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Team Management</h1>
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

      {/* Team Members List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Team Members</h3>
        </div>
        <ul className="divide-y divide-gray-200">
          {/* Placeholder for team members list */}
          <li className="px-4 py-4 sm:px-6">
            <div className="flex items-center justify-center text-gray-500 py-8">
              Loading team members...
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Team;