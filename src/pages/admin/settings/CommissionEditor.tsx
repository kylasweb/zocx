import React, { useState } from 'react';
import { useAdminSettingsStore } from '../../../store/admin/settingsStore';
import { CommissionRule, CommissionType } from '../../../types/admin/commissions';

const CommissionEditor: React.FC = () => {
  const { settings, updateSettings } = useAdminSettingsStore();
  const [rules, setRules] = useState<CommissionRule[]>(settings.commissions.rules);
  const [editingRule, setEditingRule] = useState<CommissionRule | null>(null);

  const handleAddRule = () => {
    const newRule: CommissionRule = {
      id: `rule_${Date.now()}`,
      name: 'New Commission Rule',
      type: 'percentage',
      value: 0,
      conditions: {},
      appliesTo: ['direct'],
    };
    setRules([...rules, newRule]);
    setEditingRule(newRule);
  };

  const handleSave = async () => {
    await updateSettings('commissions', { rules });
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Commission Rules</h2>
        <button
          onClick={handleAddRule}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Add New Rule
        </button>
      </div>

      <div className="bg-white shadow overflow-hidden rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Value</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rules.map((rule) => (
              <tr key={rule.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{rule.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{rule.type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {rule.type === 'percentage' ? `${rule.value}%` : `$${rule.value}`}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => setEditingRule(rule)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setRules(rules.filter(r => r.id !== rule.id))}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingRule && (
        <div className="bg-white shadow sm:rounded-lg p-6">
          <h3 className="text-lg font-medium mb-4">Edit Commission Rule</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Rule Name</label>
              <input
                type="text"
                value={editingRule.name}
                onChange={(e) => setEditingRule({ ...editingRule, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select
                  value={editingRule.type}
                  onChange={(e) => setEditingRule({ ...editingRule, type: e.target.value as CommissionType })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="percentage">Percentage</option>
                  <option value="fixed">Fixed Amount</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {editingRule.type === 'percentage' ? 'Percentage' : 'Amount'}
                </label>
                <input
                  type="number"
                  value={editingRule.value}
                  onChange={(e) => setEditingRule({ ...editingRule, value: Number(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setEditingRule(null)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setRules(rules.map(r => r.id === editingRule.id ? editingRule : r));
                  setEditingRule(null);
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save Commission Settings
        </button>
      </div>
    </div>
  );
};

export default CommissionEditor; 