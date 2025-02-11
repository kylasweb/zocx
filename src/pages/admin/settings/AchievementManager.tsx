import React, { useState } from 'react';
import { useAdminSettingsStore } from '../../../store/admin/settingsStore';
import { Achievement, BadgeType } from '../../../types/admin/gamification';

const AchievementManager: React.FC = () => {
  const { settings, updateSettings } = useAdminSettingsStore();
  const [achievements, setAchievements] = useState<Achievement[]>(settings.gamification.achievements);
  const [editingAchievement, setEditingAchievement] = useState<Achievement | null>(null);
  const [newBadge, setNewBadge] = useState<BadgeType>('bronze');

  const handleCreateAchievement = () => {
    const newAchievement: Achievement = {
      id: `ach_${Date.now()}`,
      name: 'New Achievement',
      description: '',
      criteria: {},
      badge: newBadge,
      rewards: [],
      unlockedCount: 0
    };
    setAchievements([...achievements, newAchievement]);
    setEditingAchievement(newAchievement);
  };

  const handleSave = async () => {
    await updateSettings('gamification', { achievements });
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Achievement System</h2>
        <div className="flex space-x-4">
          <select
            value={newBadge}
            onChange={(e) => setNewBadge(e.target.value as BadgeType)}
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="bronze">Bronze</option>
            <option value="silver">Silver</option>
            <option value="gold">Gold</option>
            <option value="platinum">Platinum</option>
          </select>
          <button
            onClick={handleCreateAchievement}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Create Achievement
          </button>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Badge</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unlocked</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {achievements.map((achievement) => (
              <tr key={achievement.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`badge-${achievement.badge} px-2 py-1 rounded-full text-xs capitalize`}>
                    {achievement.badge}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{achievement.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {achievement.unlockedCount} users
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => setEditingAchievement(achievement)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setAchievements(achievements.filter(a => a.id !== achievement.id))}
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

      {editingAchievement && (
        <div className="bg-white shadow sm:rounded-lg p-6">
          <h3 className="text-lg font-medium mb-4">Edit Achievement</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Achievement Name</label>
              <input
                type="text"
                value={editingAchievement.name}
                onChange={(e) => setEditingAchievement({ ...editingAchievement, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={editingAchievement.description}
                onChange={(e) => setEditingAchievement({ ...editingAchievement, description: e.target.value })}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setEditingAchievement(null)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setAchievements(achievements.map(a => 
                    a.id === editingAchievement.id ? editingAchievement : a
                  ));
                  setEditingAchievement(null);
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
          Save Achievement Settings
        </button>
      </div>
    </div>
  );
};

export default AchievementManager; 