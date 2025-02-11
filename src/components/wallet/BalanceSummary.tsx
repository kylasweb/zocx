import React from 'react';
import { Wallet, Clock, TrendingUp } from 'lucide-react';
import { formatCurrency } from '../../utils/format';

interface BalanceSummaryProps {
  availableBalance: number;
  pendingBalance: number;
  totalEarned: number;
}

const BalanceSummary: React.FC<BalanceSummaryProps> = ({
  availableBalance,
  pendingBalance,
  totalEarned,
}) => {
  const stats = [
    {
      label: 'Available Balance',
      value: formatCurrency(availableBalance),
      icon: Wallet,
      color: 'bg-green-500',
    },
    {
      label: 'Pending Balance',
      value: formatCurrency(pendingBalance),
      icon: Clock,
      color: 'bg-yellow-500',
    },
    {
      label: 'Total Earned',
      value: formatCurrency(totalEarned),
      icon: TrendingUp,
      color: 'bg-blue-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
        </div>
      ))}
    </div>
  );
};

export default BalanceSummary;