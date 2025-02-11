```typescript
import React from 'react';
import { TrendingUp, Users, DollarSign, Clock } from 'lucide-react';
import { AITradingStats } from '../../types/investment';

interface InvestmentMetricsProps {
  stats: AITradingStats;
}

const InvestmentMetrics: React.FC<InvestmentMetricsProps> = ({ stats }) => {
  const metrics = [
    {
      label: 'Total Invested',
      value: `$${stats.totalInvested.toLocaleString()}`,
      icon: DollarSign,
      trend: `${stats.activeInvestments} active investments`,
      color: 'bg-blue-500',
    },
    {
      label: 'Total Investors',
      value: stats.totalInvestors,
      icon: Users,
      trend: 'Active participants',
      color: 'bg-green-500',
    },
    {
      label: 'Average ROI',
      value: `${stats.averageROI}%`,
      icon: TrendingUp,
      trend: 'Monthly return',
      color: 'bg-purple-500',
    },
    {
      label: 'Total Payout',
      value: `$${stats.totalPayout.toLocaleString()}`,
      icon: Clock,
      trend: 'Processed returns',
      color: 'bg-yellow-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center">
            <div className={`p-3 rounded-lg ${metric.color}`}>
              <metric.icon className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{metric.label}</p>
              <p className="text-2xl font-semibold text-gray-900">{metric.value}</p>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm font-medium text-green-600">{metric.trend}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InvestmentMetrics;
```