```typescript
import React, { useState } from 'react';
import { Plus, Save, Trash2, AlertTriangle } from 'lucide-react';
import { InvestmentPlan } from '../../types/investment';

interface InvestmentPlanCreatorProps {
  onSave: (plan: Omit<InvestmentPlan, 'id' | 'status' | 'createdAt'>) => void;
  loading: boolean;
}

const InvestmentPlanCreator: React.FC<InvestmentPlanCreatorProps> = ({
  onSave,
  loading,
}) => {
  const [plan, setPlan] = useState({
    name: '',
    description: '',
    minAmount: 100,
    maxAmount: 10000,
    roi: {
      value: 5,
      type: 'fixed' as const,
      period: 'daily' as const,
    },
    duration: 30,
    features: ['Principal returned', 'Daily ROI', '24/7 Support'],
  });

  const [showWarning, setShowWarning] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Show warning for high ROI values
    if (plan.roi.value > 10 && plan.roi.period === 'daily') {
      setShowWarning(true);
      return;
    }

    onSave(plan);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-6">Create Investment Plan</h2>

      {showWarning && (
        <div className="mb-6 bg-yellow-50 p-4 rounded-md">
          <div className="flex">
            <AlertTriangle className="h-5 w-5 text-yellow-400" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">High ROI Warning</h3>
              <p className="mt-2 text-sm text-yellow-700">
                The ROI value you've set is unusually high. This might raise red flags with users and regulators.
                Are you sure you want to proceed?
              </p>
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => onSave(plan)}
                  className="mr-3 text-sm font-medium text-yellow-800 hover:text-yellow-700"
                >
                  Yes, proceed anyway
                </button>
                <button
                  type="button"
                  onClick={() => setShowWarning(false)}
                  className="text-sm font-medium text-yellow-800 hover:text-yellow-700"
                >
                  No, I'll adjust the ROI
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Plan Name</label>
            <input
              type="text"
              value={plan.name}
              onChange={(e) => setPlan({ ...plan, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Duration (days)</label>
            <input
              type="number"
              value={plan.duration}
              onChange={(e) => setPlan({ ...plan, duration: parseInt(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              min="1"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Minimum Investment</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                value={plan.minAmount}
                onChange={(e) => setPlan({ ...plan, minAmount: parseInt(e.target.value) })}
                className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                min="0"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Maximum Investment</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                value={plan.maxAmount}
                onChange={(e) => setPlan({ ...plan, maxAmount: parseInt(e.target.value) })}
                className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                min="0"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">ROI Value</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="number"
                value={plan.roi.value}
                onChange={(e) => setPlan({
                  ...plan,
                  roi: { ...plan.roi, value: parseFloat(e.target.value) },
                })}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                step="0.1"
                required
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">%</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">ROI Type</label>
            <select
              value={plan.roi.type}
              onChange={(e) => setPlan({
                ...plan,
                roi: { ...plan.roi, type: e.target.value as 'fixed' | 'dynamic' | 'compound' },
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="fixed">Fixed</option>
              <option value="dynamic">Dynamic</option>
              <option value="compound">Compound</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">ROI Period</label>
            <select
              value={plan.roi.period}
              onChange={(e) => setPlan({
                ...plan,
                roi: { ...plan.roi, period: e.target.value as 'daily' | 'weekly' | 'monthly' },
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={plan.description}
              onChange={(e) => setPlan({ ...plan, description: e.target.value })}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Features</label>
            <div className="mt-2 space-y-2">
              {plan.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => {
                      const newFeatures = [...plan.features];
                      newFeatures[index] = e.target.value;
                      setPlan({ ...plan, features: newFeatures });
                    }}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setPlan({
                      ...plan,
                      features: plan.features.filter((_, i) => i !== index),
                    })}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setPlan({
                  ...plan,
                  features: [...plan.features, ''],
                })}
                className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Feature
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            <Save className="h-4 w-4 mr-2" />
            {loading ? 'Creating...' : 'Create Plan'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InvestmentPlanCreator;
```