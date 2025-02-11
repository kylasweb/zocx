import React, { useState } from 'react';
import { Save, AlertCircle, Plus, Trash2, BookOpen, FileText, Video, Award } from 'lucide-react';
import { useAdminSettingsStore } from '../../../store/admin/settingsStore';

const TrainingSettings: React.FC = () => {
  const { settings, updateSettings, loading, error } = useAdminSettingsStore();
  const { training } = settings;

  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    forRoles: [] as string[],
  });

  const handleAddCategory = () => {
    const updatedCategories = [
      ...training.categories,
      {
        ...newCategory,
        id: `category-${Date.now()}`,
      },
    ];
    updateSettings('training', { categories: updatedCategories });
    setNewCategory({ name: '', description: '', forRoles: [] });
  };

  const handleRemoveCategory = (categoryId: string) => {
    const updatedCategories = training.categories.filter(c => c.id !== categoryId);
    updateSettings('training', { categories: updatedCategories });
  };

  const handleUpdateMandatoryTrainings = (trainingId: string, mandatory: boolean) => {
    const updatedTrainings = mandatory
      ? [...training.mandatoryTrainings, trainingId]
      : training.mandatoryTrainings.filter(id => id !== trainingId);
    updateSettings('training', { mandatoryTrainings: updatedTrainings });
  };

  const handleEditCategory = (categoryId: string) => {
    const category = training.categories.find(c => c.id === categoryId);
    setNewCategory(category ? { ...category } : { name: '', description: '', forRoles: [] });
  };

  const handleUpdateCategory = () => {
    const updatedCategories = training.categories.map(c => 
      c.id === newCategory.id ? newCategory : c
    );
    updateSettings('training', { categories: updatedCategories });
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-sm rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Training Management Settings
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

          <div className="mt-6 space-y-6">
            {/* External Wiki Settings */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-base font-medium text-gray-900 mb-4">
                External Knowledge Base
              </h4>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  External Wiki URL
                </label>
                <div className="mt-1">
                  <input
                    type="url"
                    value={training.externalWikiUrl || ''}
                    onChange={(e) => updateSettings('training', {
                      externalWikiUrl: e.target.value,
                    })}
                    placeholder="https://wiki.example.com"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>

            {/* Training Categories */}
            <div>
              <h4 className="text-base font-medium text-gray-900 mb-4">
                Training Categories
              </h4>
              <div className="space-y-4">
                {training.categories.map((category) => (
                  <div key={category.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <BookOpen className="h-5 w-5 text-indigo-500" />
                        <div>
                          <h5 className="text-sm font-medium text-gray-900">
                            {category.name}
                          </h5>
                          <p className="text-sm text-gray-500">
                            {category.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <select
                          multiple
                          value={category.forRoles}
                          onChange={(e) => {
                            const selectedRoles = Array.from(e.target.selectedOptions).map(opt => opt.value);
                            const updatedCategories = training.categories.map(c =>
                              c.id === category.id ? { ...c, forRoles: selectedRoles } : c
                            );
                            updateSettings('training', { categories: updatedCategories });
                          }}
                          className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        >
                          <option value="user">Users</option>
                          <option value="leader">Leaders</option>
                          <option value="admin">Admins</option>
                        </select>
                        <button
                          onClick={() => handleRemoveCategory(category.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Add New Category */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-900 mb-4">
                Add New Category
              </h4>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Category Name
                  </label>
                  <input
                    type="text"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({
                      ...newCategory,
                      name: e.target.value,
                    })}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <input
                    type="text"
                    value={newCategory.description}
                    onChange={(e) => setNewCategory({
                      ...newCategory,
                      description: e.target.value,
                    })}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Available For
                  </label>
                  <select
                    multiple
                    value={newCategory.forRoles}
                    onChange={(e) => setNewCategory({
                      ...newCategory,
                      forRoles: Array.from(e.target.selectedOptions).map(opt => opt.value),
                    })}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="user">Users</option>
                    <option value="leader">Leaders</option>
                    <option value="admin">Admins</option>
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <button
                  type="button"
                  onClick={handleAddCategory}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Category
                </button>
              </div>
            </div>

            {/* Training Content Types */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-base font-medium text-gray-900 mb-4">
                Content Types
              </h4>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="border rounded-lg p-4 bg-white">
                  <div className="flex items-center space-x-3">
                    <Video className="h-5 w-5 text-indigo-500" />
                    <div>
                      <h5 className="text-sm font-medium text-gray-900">Video Lessons</h5>
                      <p className="text-xs text-gray-500">Interactive video training content</p>
                    </div>
                  </div>
                </div>
                <div className="border rounded-lg p-4 bg-white">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-green-500" />
                    <div>
                      <h5 className="text-sm font-medium text-gray-900">Documents</h5>
                      <p className="text-xs text-gray-500">PDF and text-based materials</p>
                    </div>
                  </div>
                </div>
                <div className="border rounded-lg p-4 bg-white">
                  <div className="flex items-center space-x-3">
                    <Award className="h-5 w-5 text-yellow-500" />
                    <div>
                      <h5 className="text-sm font-medium text-gray-900">Quizzes</h5>
                      <p className="text-xs text-gray-500">Assessment and certification tests</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              <Save className="h-4 w-4 mr-2" />
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingSettings;