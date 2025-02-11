import React, { useState } from 'react';
import { useAdminSettingsStore } from '../../../store/admin/settingsStore';
import { BinaryTreeConfig, NetworkRules } from '../../../types/admin/network';

const NetworkConfig: React.FC = () => {
  const { settings, updateSettings } = useAdminSettingsStore();
  const [config, setConfig] = useState<BinaryTreeConfig>(settings.network.binaryTree);
  const [rules, setRules] = useState<NetworkRules>(settings.network.rules);

  const handleSave = async () => {
    await updateSettings('network', {
      binaryTree: config,
      rules: rules
    });
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="bg-white shadow sm:rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Network Structure Configuration</h2>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tree Type
            </label>
            <select
              value={config.treeType}
              onChange={(e) => setConfig({ ...config, treeType: e.target.value as any })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="binary">Binary</option>
              <option value="unilevel">Unilevel</option>
              <option value="matrix">Matrix</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max Depth
            </label>
            <input
              type="number"
              value={config.maxDepth}
              onChange={(e) => setConfig({ ...config, maxDepth: Number(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
      </div>

      <div className="bg-white shadow sm:rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Compression Rules</h2>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <input
              type="checkbox"
              checked={rules.autoCompression}
              onChange={(e) => setRules({ ...rules, autoCompression: e.target.checked })}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label className="text-sm font-medium text-gray-700">
              Enable Automatic Tree Compression
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Compression Threshold
            </label>
            <input
              type="number"
              value={rules.compressionThreshold}
              onChange={(e) => setRules({ ...rules, compressionThreshold: Number(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save Network Configuration
        </button>
      </div>
    </div>
  );
};

export default NetworkConfig; 