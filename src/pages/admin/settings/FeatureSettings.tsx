import React, { useState } from 'react';
import { Save, AlertCircle, Calendar, Users, Info } from 'lucide-react';
import { useAdminSettingsStore } from '../../../store/admin/settingsStore';

interface Feature {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: React.ReactNode;
}

const features: Feature[] = [
  {
    id: 'faucet',
    name: 'Crypto Faucet',
    description: 'Allow users to claim free crypto tokens periodically',
    category: 'Rewards',
    icon: <Users className="h-5 w-5 text-indigo-500" />,
  },
  {
    id: 'airdrop',
    name: 'Airdrops',
    description: 'Enable cryptocurrency airdrop campaigns',
    category: 'Rewards',
    icon: <Users className="h-5 w-5 text-indigo-500" />,
  },
  {
    id: 'rewards',
    name: 'Reward System',
    description: 'Enable the platform reward system for user activities',
    category: 'Rewards',
    icon: <Users className="h-5 w-5 text-indigo-500" />,
  },
  {
    id: 'ranking',
    name: 'User Rankings',
    description: 'Enable user ranking system based on performance',
    category: 'Gamification',
    icon: <Users className="h-5 w-5 text-indigo-500" />,
  },
  {
    id: 'tasks',
    name: 'Daily Tasks',
    description: 'Enable daily tasks and missions for users',
    category: 'Gamification',
    icon: <Users className="h-5 w-5 text-indigo-500" />,
  },
  {
    id: 'badges',
    name: 'Achievement Badges',
    description: 'Enable achievement badges for user milestones',
    category: 'Gamification',
    icon: <Users className="h-5 w-5 text-indigo-500" />,
  },
  {
    id: 'referral',
    name: 'Referral Program',
    description: 'Enable the multi-level referral program',
    category: 'MLM',
    icon: <Users className="h-5 w-5 text-indigo-500" />,
  },
  {
    id: 'binary',
    name: 'Binary Tree',
    description: 'Enable binary tree structure for the MLM network',
    category: 'MLM',
    icon: <Users className="h-5 w-5 text-indigo-500" />,
  },
  {
    id: 'commission',
    name: 'Commission System',
    description: 'Enable multi-level commission calculations',
    category: 'MLM',
    icon: <Users className="h-5 w-5 text-indigo-500" />,
  },
];

const FeatureSettings: React.FC = () => {
  const { settings, updateSettings, loading, error } = useAdminSettingsStore();
  const [editingFeature, setEditingFeature] = useState<string | null>(null);

  const handleToggleFeature = async (featureId: string) => {
    const currentFeature = settings.features.features[featureId];
    await updateSettings('features', {
      features: {
        ...settings.features.features,
        [featureId]: {
          ...currentFeature,
          enabled: !currentFeature.enabled,
        },
      },
    });
  };

  const handleUpdateReleaseDate = async (featureId: string, date: string) => {
    const currentFeature = settings.features.features[featureId];
    await updateSettings('features', {
      features: {
        ...settings.features.features,
        [featureId]: {
          ...currentFeature,
          releaseDate: date || undefined,
        },
      },
    });
    setEditingFeature(null);
  };

  const handleUpdateRestrictions = async (featureId: string, roles: string[]) => {
    const currentFeature = settings.features.features[featureId];
    await updateSettings('features', {
      features: {
        ...settings.features.features,
        [featureId]: {
          ...currentFeature,
          restrictedTo: roles.length > 0 ? roles : undefined,
        },
      },
    });
  };

  const categories = Array.from(new Set(features.map(f => f.category)));

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-sm rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Feature Management
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

          <div className="mt-6 space-y-8">
            {categories.map(category => (
              <div key={category}>
                <h4 className="text-base font-medium text-gray-900 mb-4">{category}</h4>
                <div className="bg-gray-50 rounded-lg divide-y divide-gray-200">
                  {features
                    .filter(f => f.category === category)
                    .map(feature => {
                      const featureSettings = settings.features.features[feature.id] || {
                        enabled: false,
                      };

                      return (
                        <div key={feature.id} className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              {feature.icon}
                              <div>
                                <h5 className="text-sm font-medium text-gray-900">
                                  {feature.name}
                                </h5>
                                <p className="text-sm text-gray-500">
                                  {feature.description}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4">
                              {editingFeature === feature.id ? (
                                <div className="flex items-center space-x-2">
                                  <input
                                    type="datetime-local"
                                    className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    defaultValue={featureSettings.releaseDate}
                                    onChange={(e) => handleUpdateReleaseDate(feature.id, e.target.value)}
                                  />
                                  <button
                                    onClick={() => setEditingFeature(null)}
                                    className="text-sm text-gray-500 hover:text-gray-700"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => setEditingFeature(feature.id)}
                                  className="flex items-center text-sm text-gray-500 hover:text-gray-700"
                                >
                                  <Calendar className="h-4 w-4 mr-1" />
                                  {featureSettings.releaseDate ? 
                                    new Date(featureSettings.releaseDate).toLocaleDateString() :
                                    'Set Release Date'
                                  }
                                </button>
                              )}
                              <select
                                value={featureSettings.restrictedTo?.join(',') || ''}
                                onChange={(e) => handleUpdateRestrictions(
                                  feature.id,
                                  e.target.value ? e.target.value.split(',') : []
                                )}
                                className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              >
                                <option value="">All Users</option>
                                <option value="admin">Admins Only</option>
                                <option value="admin,leader">Admins & Leaders</option>
                                <option value="premium">Premium Users</option>
                              </select>
                              <div className="flex items-center">
                                <button
                                  type="button"
                                  onClick={() => handleToggleFeature(feature.id)}
                                  className={`
                                    relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer 
                                    transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                                    ${featureSettings.enabled ? 'bg-indigo-600' : 'bg-gray-200'}
                                  `}
                                >
                                  <span className="sr-only">Toggle feature</span>
                                  <span
                                    className={`
                                      pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 
                                      transition ease-in-out duration-200
                                      ${featureSettings.enabled ? 'translate-x-5' : 'translate-x-0'}
                                    `}
                                  />
                                </button>
                              </div>
                            </div>
                          </div>
                          {featureSettings.releaseDate && new Date(featureSettings.releaseDate) > new Date() && (
                            <div className="mt-2 flex items-center text-sm text-yellow-600">
                              <Info className="h-4 w-4 mr-1" />
                              Scheduled for release on {new Date(featureSettings.releaseDate).toLocaleString()}
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureSettings;