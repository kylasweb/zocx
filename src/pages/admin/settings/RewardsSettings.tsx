import React, { useState } from 'react';
import { Plus, Trash2, Save, AlertCircle } from 'lucide-react';
import { useAdminSettingsStore } from '../../../store/admin/settingsStore';

const RewardsSettings: React.FC = () => {
  const { settings, updateSettings, loading, error } = useAdminSettingsStore();
  const { rewards } = settings;

  const [newLevel, setNewLevel] = useState({
    name: '',
    requirements: {
      directReferrals: 0,
      teamSize: 0,
      volume: 0,
    },
    rewards: {
      commission: 0,
      bonus: 0,
    },
  });

  const handleAddLevel = () => {
    const updatedLevels = [...rewards.rankingSystem.levels, newLevel];
    updateSettings('rewards', {
      rankingSystem: {
        ...rewards.rankingSystem,
        levels: updatedLevels,
      },
    });
    setNewLevel({
      name: '',
      requirements: {
        directReferrals: 0,
        teamSize: 0,
        volume: 0,
      },
      rewards: {
        commission: 0,
        bonus: 0,
      },
    });
  };

  const handleRemoveLevel = (index: number) => {
    const updatedLevels = rewards.rankingSystem.levels.filter((_, i) => i !== index);
    updateSettings('rewards', {
      rankingSystem: {
        ...rewards.rankingSystem,
        levels: updatedLevels,
      },
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const enabled = formData.get('enabled') === 'true';
    
    await updateSettings('rewards', {
      rankingSystem: {
        ...rewards.rankingSystem,
        enabled,
      },
    });
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-sm rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Rewards & Rankings Settings
          </h3>

          {error && (
            <div className="mt-4 bg-red-50 p-4 rounded-md">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-red-400" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">{error}</h3>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            <div>
              <label className="text-base font-medium text-gray-900">Ranking System</label>
              <div className="mt-4">
                <select
                  name="enabled"
                  defaultValue={rewards.rankingSystem.enabled.toString()}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="true">Enabled</option>
                  <option value="false">Disabled</option>
                </select>
              </div>
            </div>

            <div>
              <h4 className="text-base font-medium text-gray-900">Rank Levels</h4>
              <div className="mt-4 space-y-4">
                {rewards.rankingSystem.levels.map((level, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <h5 className="text-sm font-medium text-gray-900">{level.name}</h5>
                      <button
                        type="button"
                        onClick={() => handleRemoveLevel(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <h6 className="text-xs font-medium text-gray-700">Requirements</h6>
                        <dl className="mt-2 text-sm text-gray-600">
                          <div className="flex justify-between">
                            <dt>Direct Referrals:</dt>
                            <dd>{level.requirements.directReferrals}</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt>Team Size:</dt>
                            <dd>{level.requirements.teamSize}</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt>Volume:</dt>
                            <dd>{level.requirements.volume}</dd>
                          </div>
                        </dl>
                      </div>
                      <div>
                        <h6 className="text-xs font-medium text-gray-700">Rewards</h6>
                        <dl className="mt-2 text-sm text-gray-600">
                          <div className="flex justify-between">
                            <dt>Commission Rate:</dt>
                            <dd>{level.rewards.commission}%</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt>Bonus:</dt>
                            <dd>${level.rewards.bonus}</dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-900">Add New Level</h4>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Level Name</label>
                  <input
                    type="text"
                    value={newLevel.name}
                    onChange={(e) => setNewLevel({ ...newLevel, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Direct Referrals</label>
                  <input
                    type="number"
                    value={newLevel.requirements.directReferrals}
                    onChange={(e) => setNewLevel({
                      ...newLevel,
                      requirements: {
                        ...newLevel.requirements,
                        directReferrals: parseInt(e.target.value),
                      },
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Team Size</label>
                  <input
                    type="number"
                    value={newLevel.requirements.teamSize}
                    onChange={(e) => setNewLevel({
                      ...newLevel,
                      requirements: {
                        ...newLevel.requirements,
                        teamSize: parseInt(e.target.value),
                      },
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Volume</label>
                  <input
                    type="number"
                    value={newLevel.requirements.volume}
                    onChange={(e) => setNewLevel({
                      ...newLevel,
                      requirements: {
                        ...newLevel.requirements,
                        volume: parseInt(e.target.value),
                      },
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Commission Rate (%)</label>
                  <input
                    type="number"
                    value={newLevel.rewards.commission}
                    onChange={(e) => setNewLevel({
                      ...newLevel,
                      rewards: {
                        ...newLevel.rewards,
                        commission: parseInt(e.target.value),
                      },
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Bonus Amount ($)</label>
                  <input
                    type="number"
                    value={newLevel.rewards.bonus}
                    onChange={(e) => setNewLevel({
                      ...newLevel,
                      rewards: {
                        ...newLevel.rewards,
                        bonus: parseInt(e.target.value),
                      },
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="mt-4">
                <button
                  type="button"
                  onClick={handleAddLevel}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Level
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                <Save className="h-4 w-4 mr-2" />
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RewardsSettings;