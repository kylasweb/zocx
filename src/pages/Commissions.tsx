import React from 'react';
import { DollarSign, TrendingUp, Clock, Wallet } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useCommissionStore } from '../store/commissionStore';

const Commissions: React.FC = () => {
  const { user } = useAuthStore();
  const {
    getWeeklyEarnings,
    getMonthlyEarnings,
    getPendingCommissions,
    getTotalEarnings,
  } = useCommissionStore();

  if (!user) return null;

  const weeklyEarnings = getWeeklyEarnings(user.id);
  const monthlyEarnings = getMonthlyEarnings(user.id);
  const pendingCommissions = getPendingCommissions(user.id);
  const totalEarnings = getTotalEarnings(user.id);

  const stats = [
    {
      label: 'Weekly Earnings',
      value: `$${weeklyEarnings.toLocaleString()}`,
      icon: TrendingUp,
      trend: '+12.5%',
      color: 'bg-blue-500',
    },
    {
      label: 'Monthly Earnings',
      value: `$${monthlyEarnings.toLocaleString()}`,
      icon: DollarSign,
      trend: '+8.2%',
      color: 'bg-green-500',
    },
    {
      label: 'Pending Commissions',
      value: `$${pendingCommissions.reduce((sum, c) => sum + c.amount, 0).toLocaleString()}`,
      icon: Clock,
      trend: `${pendingCommissions.length} pending`,
      color: 'bg-yellow-500',
    },
    {
      label: 'Total Earnings',
      value: `$${totalEarnings.toLocaleString()}`,
      icon: Wallet,
      trend: 'Lifetime',
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Commission Dashboard</h1>
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
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Commissions</h2>
          <div className="space-y-4">
            {pendingCommissions.slice(0, 5).map((commission) => (
              <div key={commission.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">
                    {commission.type.charAt(0).toUpperCase() + commission.type.slice(1)} Commission
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(commission.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">${commission.amount.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">{commission.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Commission Breakdown</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <span className="text-blue-700">Direct Referral</span>
              <span className="font-medium">20%</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <span className="text-green-700">Binary</span>
              <span className="font-medium">10%</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
              <span className="text-yellow-700">Matching Bonus</span>
              <span className="font-medium">5-10%</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
              <span className="text-purple-700">Leadership Bonus</span>
              <span className="font-medium">$500-$2,500</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Commissions;