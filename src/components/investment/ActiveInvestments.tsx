import React from 'react';
import { Clock, TrendingUp, DollarSign } from 'lucide-react';
import { useInvestmentStore } from '../../store/investmentStore';

const ActiveInvestments: React.FC = () => {
  const { activeInvestments } = useInvestmentStore();

  return (
    <div className="space-y-6">
      {activeInvestments.map((investment) => (
        <div
          key={investment.id}
          className="bg-white border rounded-lg p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900">{investment.planName}</h3>
              <p className="mt-1 text-sm text-gray-500">
                Invested on {new Date(investment.startDate).toLocaleDateString()}
              </p>
            </div>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              investment.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {investment.status}
            </span>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex items-center text-sm text-gray-500">
              <DollarSign className="h-5 w-5 text-gray-400 mr-2" />
              <span>Principal: ${investment.amount}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <TrendingUp className="h-5 w-5 text-gray-400 mr-2" />
              <span>ROI: {investment.roi}%</span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="h-5 w-5 text-gray-400 mr-2" />
              <span>
                {Math.max(0, Math.floor((new Date(investment.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))} days remaining
              </span>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Progress</span>
              <span>{investment.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${investment.progress}%` }}
              />
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Returns</p>
              <p className="text-lg font-semibold text-gray-900">
                ${(investment.amount * (1 + investment.roi / 100)).toFixed(2)}
              </p>
            </div>
            <button
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200"
            >
              View Details
            </button>
          </div>
        </div>
      ))}

      {activeInvestments.length === 0 && (
        <div className="text-center py-12">
          <TrendingUp className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No active investments</h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by choosing an investment plan
          </p>
          <div className="mt-6">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <DollarSign className="h-4 w-4 mr-2" />
              Invest Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActiveInvestments;