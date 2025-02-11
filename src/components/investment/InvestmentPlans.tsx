import React from 'react';
import { Shield, TrendingUp, Clock, DollarSign } from 'lucide-react';

const plans = [
  {
    id: 'starter',
    name: 'Starter Plan',
    roi: '5%',
    duration: '30 days',
    minInvestment: 100,
    maxInvestment: 1000,
    features: [
      'Fixed ROI',
      'Daily withdrawals',
      'Principal returned',
      'Referral bonus',
    ],
  },
  {
    id: 'growth',
    name: 'Growth Plan',
    roi: '8%',
    duration: '60 days',
    minInvestment: 1000,
    maxInvestment: 10000,
    features: [
      'Compound interest',
      'Priority support',
      'Weekly bonuses',
      'Team rewards',
    ],
  },
  {
    id: 'premium',
    name: 'Premium Plan',
    roi: '12%',
    duration: '90 days',
    minInvestment: 10000,
    maxInvestment: 100000,
    features: [
      'Dynamic ROI',
      'VIP support',
      'Monthly bonuses',
      'Leadership rewards',
    ],
  },
];

const InvestmentPlans: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {plans.map((plan) => (
        <div
          key={plan.id}
          className="bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
            <p className="mt-4 text-4xl font-bold text-indigo-600">{plan.roi}</p>
            <p className="text-sm text-gray-500">Monthly ROI</p>

            <div className="mt-6 space-y-4">
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-5 w-5 text-gray-400 mr-2" />
                Duration: {plan.duration}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <DollarSign className="h-5 w-5 text-gray-400 mr-2" />
                Min: ${plan.minInvestment}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <DollarSign className="h-5 w-5 text-gray-400 mr-2" />
                Max: ${plan.maxInvestment}
              </div>
            </div>

            <ul className="mt-6 space-y-4">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center text-sm text-gray-600">
                  <Shield className="h-5 w-5 text-green-500 mr-2" />
                  {feature}
                </li>
              ))}
            </ul>

            <button
              className="mt-8 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Invest Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InvestmentPlans;