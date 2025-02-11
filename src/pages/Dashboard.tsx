import React from 'react';
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Award,
  BookOpen,
  Bell,
  Trophy,
  BarChart2
} from 'lucide-react';
import { useAuthStore } from '../store/shared/authStore';
import { useMLMStore } from '../store/shared/mlmStore';
import { AIWealthAdvisor } from '../components/shared/ai/AIWealthAdvisor';
import { useNetworkStore } from '../store/shared/networkStore';
import { Leaderboard } from '../components/shared/Leaderboard';
import { useFeatureFlags } from '../contexts/FeatureFlags';

const Dashboard: React.FC = () => {
  const { user } = useAuthStore();
  const { achievements, commissions, networkMembers, notifications } = useMLMStore();
  const { networkStats } = useNetworkStore();
  const { features } = useFeatureFlags();

  const stats = [
    {
      label: 'Total Team',
      value: '245',
      icon: Users,
      trend: '+12.5%',
      color: 'bg-blue-500',
    },
    {
      label: 'Monthly Earnings',
      value: '$12,450',
      icon: TrendingUp,
      trend: '+8.2%',
      color: 'bg-green-500',
    },
    {
      label: 'Total Commission',
      value: '$145,250',
      icon: DollarSign,
      trend: '+15.3%',
      color: 'bg-purple-500',
    },
    {
      label: 'Current Rank',
      value: 'Diamond',
      icon: Award,
      trend: 'Level 5',
      color: 'bg-yellow-500',
    },
  ];

  const roleBadges = {
    user: { label: 'Member', color: 'bg-gray-500' },
    investor: { label: 'Investor', color: 'bg-blue-500' },
    leader: { label: `Leader - ${user?.leaderRank}`, color: 'bg-purple-500' },
    admin: { label: 'Administrator', color: 'bg-red-500' }
  };

  return (
    <div className="space-y-6">
      <AIWealthAdvisor />
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">
          Welcome back, {user?.fullName}
        </h1>
        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-400 hover:text-gray-500">
            <Bell className="h-6 w-6" />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
          </button>
          <div className={`${roleBadges[user.role].color} text-white px-3 py-1 rounded-full text-sm`}>
            {roleBadges[user.role].label}
          </div>
          {user.role === 'leader' && (
            <div className="text-sm text-gray-600">
              Next Rank: {getNextLeaderRank(user.leaderRank!)}
            </div>
          )}
        </div>
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
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            <button className="text-sm text-indigo-600 hover:text-indigo-500">View all</button>
          </div>
          <div className="space-y-4">
            {notifications.slice(0, 5).map((notification) => (
              <div key={notification.id} className="flex items-start">
                <div className={`p-2 rounded-lg ${
                  notification.type === 'achievement' ? 'bg-yellow-100' :
                  notification.type === 'commission' ? 'bg-green-100' :
                  notification.type === 'rank' ? 'bg-purple-100' : 'bg-blue-100'
                }`}>
                  {notification.type === 'achievement' && <Trophy className="h-5 w-5 text-yellow-600" />}
                  {notification.type === 'commission' && <DollarSign className="h-5 w-5 text-green-600" />}
                  {notification.type === 'rank' && <Award className="h-5 w-5 text-purple-600" />}
                  {notification.type === 'system' && <Bell className="h-5 w-5 text-blue-600" />}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                  <p className="text-sm text-gray-500">{notification.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Team Performance</h2>
            <button className="text-sm text-indigo-600 hover:text-indigo-500">View details</button>
          </div>
          <div className="space-y-4">
            {networkMembers.slice(0, 5).map((member) => (
              <div key={member.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-600">
                      {member.fullName.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{member.fullName}</p>
                    <p className="text-sm text-gray-500">{member.rank}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">${member.personalVolume}</p>
                  <p className="text-sm text-gray-500">Personal Volume</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Latest Achievements</h2>
            <Trophy className="h-5 w-5 text-yellow-500" />
          </div>
          <div className="space-y-4">
            {achievements.slice(0, 3).map((achievement) => (
              <div key={achievement.id} className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-lg bg-yellow-100 flex items-center justify-center">
                    <Trophy className="h-5 w-5 text-yellow-600" />
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{achievement.name}</p>
                  <p className="text-xs text-gray-500">{achievement.points} points</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Training Progress</h2>
            <BookOpen className="h-5 w-5 text-indigo-500" />
          </div>
          {/* Training progress content */}
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Commission Overview</h2>
            <BarChart2 className="h-5 w-5 text-green-500" />
          </div>
          {/* Commission overview content */}
        </div>
      </div>

      {features.leaderboards && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Leaderboard type="investment" />
          <Leaderboard type="network" />
          <Leaderboard type="commission" />
        </div>
      )}
    </div>
  );
};

export default Dashboard;