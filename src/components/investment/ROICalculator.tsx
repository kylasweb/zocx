import React, { useState } from 'react';
import { Calculator, DollarSign, Clock, TrendingUp } from 'lucide-react';

const ROICalculator: React.FC = () => {
  const [amount, setAmount] = useState('');
  const [duration, setDuration] = useState('30');
  const [planType, setPlanType] = useState('fixed');

  const calculateROI = () => {
    const investment = parseFloat(amount);
    if (isNaN(investment)) return 0;

    const days = parseInt(duration);
    let roi = 0;

    switch (planType) {
      case 'fixed':
        roi = investment * (0.05 * (days / 30)); // 5% monthly
        break;
      case 'compound':
        roi = investment * Math.pow(1.002, days) - investment; // 0.2% daily compound
        break;
      case 'dynamic':
        roi = investment * (0.1 * (days / 30)) * (investment > 10000 ? 1.2 : 1); // 10% monthly with bonus
        break;
    }

    return roi.toFixed(2);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Investment Amount
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <DollarSign className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md"
              placeholder="0.00"
              min="0"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Duration (Days)
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Clock className="h-5 w-5 text-gray-400" />
            </div>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md"
            >
              <option value="30">30 Days</option>
              <option value="60">60 Days</option>
              <option value="90">90 Days</option>
              <option value="180">180 Days</option>
              <option value="365">365 Days</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Plan Type
          </label>
          <select
            value={planType}
            onChange={(e) => setPlanType(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="fixed">Fixed ROI</option>
            <option value="compound">Compound Interest</option>
            <option value="dynamic">Dynamic ROI</option>
          </select>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-sm font-medium text-gray-500">Expected Return</p>
            <p className="mt-1 text-3xl font-semibold text-indigo-600">
              ${calculateROI()}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Value</p>
            <p className="mt-1 text-3xl font-semibold text-gray-900">
              ${(parseFloat(amount || '0') + parseFloat(calculateROI())).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ROICalculator;