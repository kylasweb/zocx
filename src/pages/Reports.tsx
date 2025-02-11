import React from 'react';
import { BarChart2, TrendingUp, Users, DollarSign } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useNetworkStore } from '../store/networkStore';

const Reports: React.FC = () => {
  const { user } = useAuthStore();
  const { networkStats } = useNetworkStore();

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

      {/* Reports Content */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Performance Reports</h2>
        <div className="text-center text-gray-500 py-8">
          Reports dashboard is under development. Check back soon for detailed analytics!
        </div>
      </div>
    </div>
  );
};

export default Reports;