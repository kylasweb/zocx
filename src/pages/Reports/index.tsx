import React, { useState } from 'react';
import { BarChart2, TrendingUp, Users, DollarSign, Calendar, Download, Filter } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useNetworkStore } from '../../store/networkStore';

const Reports: React.FC = () => {
  const { user } = useAuthStore();
  const { networkStats } = useNetworkStore();
  const [dateRange, setDateRange] = useState('week');

  if (!user) return null;

  const stats = [
    {
      label: 'Total Sales',
      value: `$${(networkStats.leftLegVolume + networkStats.rightLegVolume).toLocaleString()}`,
      icon: BarChart2,
      trend: '+12.5%',
      color: 'bg-blue-500',
    },
    {
      label: 'Team Growth',
      value: networkStats.monthlyGrowth + '%',
      icon: TrendingUp,
      trend: 'This Month',
      color: 'bg-green-500',
    },
    {
      label: 'Active Members',
      value: networkStats.activeMembers,
      icon: Users,
      trend: `${(networkStats.activeMembers / networkStats.totalMembers * 100).toFixed(1)}%`,
      color: 'bg-purple-500',
    },
    {
      label: 'Average Commission',
      value: '$750',
      icon: DollarSign,
      trend: 'Per Member',
      color: 'bg-yellow-500',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Reports & Analytics</h1>
        <div className="flex items-center space-x-4">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
            <option value="quarter">Last 90 Days</option>
            <option value="year">Last 365 Days</option>
          </select>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Calendar className="h-4 w-4 mr-2" />
            Custom Range
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
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

      {/* Reports Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Performance */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Sales Performance</h2>
            <button className="text-gray-400 hover:text-gray-500">
              <Filter className="h-5 w-5" />
            </button>
          </div>
          <div className="h-80 flex items-center justify-center text-gray-500">
            Sales chart will be displayed here
          </div>
        </div>

        {/* Team Growth */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Team Growth</h2>
            <button className="text-gray-400 hover:text-gray-500">
              <Filter className="h-5 w-5" />
            </button>
          </div>
          <div className="h-80 flex items-center justify-center text-gray-500">
            Growth chart will be displayed here
          </div>
        </div>

        {/* Commission Distribution */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Commission Distribution</h2>
            <button className="text-gray-400 hover:text-gray-500">
              <Filter className="h-5 w-5" />
            </button>
          </div>
          <div className="h-80 flex items-center justify-center text-gray-500">
            Commission chart will be displayed here
          </div>
        </div>

        {/* Rank Analytics */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Rank Analytics</h2>
            <button className="text-gray-400 hover:text-gray-500">
              <Filter className="h-5 w-5" />
            </button>
          </div>
          <div className="h-80 flex items-center justify-center text-gray-500">
            Rank distribution chart will be displayed here
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;