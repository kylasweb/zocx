import React, { useState } from 'react';
import { Calculator, Save } from 'lucide-react';

interface CommissionRule {
  id: string;
  name: string;
  type: 'percentage' | 'fixed' | 'multiplier';
  value: number;
  conditions: {
    personalVolume?: number;
    groupVolume?: number;
    directReferrals?: number;
    depth?: number;
    leg?: 'left' | 'right' | 'both';
  };
}

const CommissionCalculator: React.FC = () => {
  const [rules, setRules] = useState<CommissionRule[]>([]);
  const [newRule, setNewRule] = useState<Partial<CommissionRule>>({
    type: 'percentage',
    value: 0,
    conditions: {},
  });

  const handleAddRule = () => {
    if (!newRule.name || !newRule.value) return;

    setRules([
      ...rules,
      {
        id: `rule-${Date.now()}`,
        name: newRule.name,
        type: newRule.type || 'percentage',
        value: newRule.value,
        conditions: newRule.conditions || {},
      },
    ]);

    setNewRule({
      type: 'percentage',
      value: 0,
      conditions: {},
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Commission Rules</h2>
        <button
          onClick={() => {/* Save rules */}}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Save className="h-4 w-4 mr-2" />
          Save Rules
        </button>
      </div>

      <div className="space-y-6">
        {/* Add New Rule */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-4">Add New Rule</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Rule Name</label>
              <input
                type="text"
                value={newRule.name || ''}
                onChange={(e) => setNewRule({ ...newRule, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Rule Type</label>
              <select
                value={newRule.type}
                onChange={(e) => setNewRule({ ...newRule, type: e.target.value as any })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed Amount</option>
                <option value="multiplier">Multiplier</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Value</label>
              <input
                type="number"
                value={newRule.value || 0}
                onChange={(e) => setNewRule({ ...newRule, value: parseFloat(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Conditions</h4>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">Min Personal Volume</label>
                <input
                  type="number"
                  value={newRule.conditions?.personalVolume || 0}
                  onChange={(e) => setNewRule({
                    ...newRule,
                    conditions: {
                      ...newRule.conditions,
                      personalVolume: parseInt(e.target.value),
                    },
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Min Group Volume</label>
                <input
                  type="number"
                  value={newRule.conditions?.groupVolume || 0}
                  onChange={(e) => setNewRule({
                    ...newRule,
                    conditions: {
                      ...newRule.conditions,
                      groupVolume: parseInt(e.target.value),
                    },
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Min Direct Referrals</label>
                <input
                  type="number"
                  value={newRule.conditions?.directReferrals || 0}
                  onChange={(e) => setNewRule({
                    ...newRule,
                    conditions: {
                      ...newRule.conditions,
                      directReferrals: parseInt(e.target.value),
                    },
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>

          <div className="mt-4">
            <button
              onClick={handleAddRule}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <Calculator className="h-4 w-4 mr-2" />
              Add Rule
            </button>
          </div>
        </div>

        {/* Existing Rules */}
        <div className="space-y-4">
          {rules.map((rule) => (
            <div key={rule.id} className="bg-white border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">{rule.name}</h4>
                  <p className="text-sm text-gray-500">
                    {rule.type === 'percentage' && `${rule.value}%`}
                    {rule.type === 'fixed' && `$${rule.value}`}
                    {rule.type === 'multiplier' && `${rule.value}x`}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setRules(rules.filter(r => r.id !== rule.id));
                  }}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-gray-500">
                {rule.conditions.personalVolume && (
                  <div>Min PV: {rule.conditions.personalVolume}</div>
                )}
                {rule.conditions.groupVolume && (
                  <div>Min GV: {rule.conditions.groupVolume}</div>
                )}
                {rule.conditions.directReferrals && (
                  <div>Min Referrals: {rule.conditions.directReferrals}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommissionCalculator;