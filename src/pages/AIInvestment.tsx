import React from 'react';
import { TrendingUp, DollarSign, Clock, Calculator, Wallet, BarChart as ChartBar } from 'lucide-react';
import ROICalculator from '../components/investment/ROICalculator';
import InvestmentPlans from '../components/investment/InvestmentPlans';
import InvestmentStats from '../components/investment/InvestmentStats';
import ActiveInvestments from '../components/investment/ActiveInvestments';

const AIInvestment: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">AI Investment Platform</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ROI Calculator Widget */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Investment Calculator</h2>
          <ROICalculator />
        </div>

        {/* Investment Stats */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Your Investment Stats</h2>
          <InvestmentStats />
        </div>
      </div>

      {/* Investment Plans */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Investment Plans</h2>
        <InvestmentPlans />
      </div>

      {/* Active Investments */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Your Active Investments</h2>
        <ActiveInvestments />
      </div>
    </div>
  );
};

export default AIInvestment;