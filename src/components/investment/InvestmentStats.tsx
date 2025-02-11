import React from 'react';
import { DollarSign, TrendingUp, Clock, Wallet } from 'lucide-react';
import { useInvestmentStore } from '../../store/investmentStore';

const InvestmentStats: React.FC = () => {
  const { totalInvested, activeInvestments, totalEarnings, pendingReturns } = useInvestmentStore();

  const stats = [
    {
      label: 'Total Invested',
      value: totalInvested,
      icon: DollarSign,
      trend: '+12.5%',
      color: 'bg-blue-500',
    },
    {
      label: 'Active Investments',
      value: activeInvestments.length,
      icon: TrendingUp,
      trend: 'Current',
      color: 'bg-green-500',
    },
    {
      label: 'Total Earnings',
      value: totalEarnings,
      icon: Wallet,
      trend: 'Lifetime',
      color: 'bg-purple-500',
    },
    {
      label: 'Pending Returns',
      value: pendingReturns,
      icon: Clock,
      trend: 'Next payout',
      color: 'bg-yellow-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white rounded-lg p-6 border hover:shadow-md transition-shadow"
        >
          <div className="flex items-center">
            <div className={`p-3 rounded-lg ${stat.color}`}>
              <stat.icon className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{stat.label}</p>
              <p className="text-2xl font-semibold text-gray-900">
                {typeof stat.value === 'number' && stat.value >= 0 ? '$' : ''}
                {stat.value}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm font-medium text-green-600">{stat.trend}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InvestmentStats;