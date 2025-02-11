import React, { useState } from 'react';
import { Plus, Trash2, Lock } from 'lucide-react';
import { StakingPool } from '../../types/trading';

interface StakingConfigProps {
  pools: StakingPool[];
  onUpdatePool: (pool: StakingPool) => void;
}

const StakingConfig: React.FC<StakingConfigProps> = ({ pools, onUpdatePool }) => {
  const [newPool, setNewPool] = useState({
    token: '',
    apy: 0,
    lockPeriod: 30,
    minStake: 0,
    maxStake: 0,
    totalStaked: 0,
  });

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-6">Staking Pools</h3>

        {/* Add New Pool */}
        <div className="mb-8">
          <h4 className="text-sm font-medium text-gray-900 mb-4">Add New Staking Pool</h4>
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">Token</label>
              <input
                type="text"
                value={newPool.token}
                onChange={(e) => setNewPool({ ...newPool, token: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">APY (%)</label>
              <input
                type="number"
                value={newPool.apy}
                onChange={(e) => setNewPool({ ...newPool, apy: parseFloat(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Lock Period (days)</label>
              <input
                type="number"
                value={newPool.lockPeriod}
                onChange={(e) => setNewPool({ ...newPool, lockPeriod: parseInt(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Min Stake</label>
              <input
                type="number"
                value={newPool.minStake}
                onChange={(e) => setNewPool({ ...newPool, minStake: parseFloat(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Max Stake</label>
              <input
                type="number"
                value={newPool.maxStake}
                onChange={(e) => setNewPool({ ...newPool, maxStake: parseFloat(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={() => {
                  onUpdatePool({
                    ...newPool,
                    id: `pool-${Date.now()}`,
                    status: 'active',
                    participants: 0,
                  });
                  setNewPool({
                    token: '',
                    apy: 0,
                    lockPeriod: 30,
                    minStake: 0,
                    maxStake: 0,
                    totalStaked: 0,
                  });
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Pool
              </button>
            </div>
          </div>
        </div>

        {/* Active Pools */}
        <div className="space-y-4">
          {pools.map((pool) => (
            <div
              key={pool.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Lock className="h-5 w-5 text-indigo-500" />
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">{pool.token} Staking</h4>
                    <p className="text-sm text-gray-500">
                      {pool.lockPeriod} days lock • {pool.apy}% APY
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-8">
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Total Staked</p>
                    <p className="text-lg font-medium text-gray-900">
                      {pool.totalStaked.toLocaleString()} {pool.token}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Participants</p>
                    <p className="text-lg font-medium text-gray-900">
                      {pool.participants}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      // Handle pool removal
                    }}
                    className="p-2 text-red-400 hover:text-red-500"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-4 gap-4 text-sm text-gray-500">
                <div>
                  <span className="block font-medium text-gray-700">Min Stake</span>
                  {pool.minStake} {pool.token}
                </div>
                <div>
                  <span className="block font-medium text-gray-700">Max Stake</span>
                  {pool.maxStake} {pool.token}
                </div>
                <div>
                  <span className="block font-medium text-gray-700">Lock Period</span>
                  {pool.lockPeriod} days
                </div>
                <div>
                  <span className="block font-medium text-gray-700">Status</span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    pool.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {pool.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StakingConfig;