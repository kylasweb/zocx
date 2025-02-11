import React, { useState } from 'react';
import { Save, AlertCircle, Plus, Trash2, Mail, MessageSquare } from 'lucide-react';
import { useAdminSettingsStore } from '../../../store/admin/settingsStore';

const CommunicationSettings: React.FC = () => {
  const { settings, updateSettings, loading, error } = useAdminSettingsStore();
  const { communication } = settings;

  const [newProvider, setNewProvider] = useState({
    name: '',
    type: 'email' as 'email' | 'sms',
    config: {},
  });

  const handleAddProvider = () => {
    const providers = newProvider.type === 'email' ? 'emailProviders' : 'smsProviders';
    const updatedProviders = [
      ...communication[providers],
      {
        ...newProvider,
        id: `${newProvider.type}-${Date.now()}`,
        enabled: true,
      },
    ];
    updateSettings('communication', { [providers]: updatedProviders });
    setNewProvider({ name: '', type: 'email', config: {} });
  };

  const handleRemoveProvider = (type: 'email' | 'sms', providerId: string) => {
    const providers = type === 'email' ? 'emailProviders' : 'smsProviders';
    const updatedProviders = communication[providers].filter(p => p.id !== providerId);
    updateSettings('communication', { [providers]: updatedProviders });
  };

  const handleToggleProvider = (type: 'email' | 'sms', providerId: string) => {
    const providers = type === 'email' ? 'emailProviders' : 'smsProviders';
    const updatedProviders = communication[providers].map(p =>
      p.id === providerId ? { ...p, enabled: !p.enabled } : p
    );
    updateSettings('communication', { [providers]: updatedProviders });
  };

  const handleUpdateConfig = (type: 'email' | 'sms', providerId: string, config: Record<string, any>) => {
    const providers = type === 'email' ? 'emailProviders' : 'smsProviders';
    const updatedProviders = communication[providers].map(p =>
      p.id === providerId ? { ...p, config: { ...p.config, ...config } } : p
    );
    updateSettings('communication', { [providers]: updatedProviders });
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-sm rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Communication Settings
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
            {/* Email Providers */}
            <div>
              <h4 className="text-base font-medium text-gray-900 mb-4">
                Email Service Providers
              </h4>
              <div className="space-y-4">
                {communication.emailProviders.map((provider) => (
                  <div key={provider.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Mail className="h-5 w-5 text-indigo-500" />
                        <div>
                          <h5 className="text-sm font-medium text-gray-900">
                            {provider.name}
                          </h5>
                          <p className="text-sm text-gray-500">
                            Email Service Provider
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <button
                          type="button"
                          onClick={() => handleToggleProvider('email', provider.id)}
                          className={`
                            relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer 
                            transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                            ${provider.enabled ? 'bg-indigo-600' : 'bg-gray-200'}
                          `}
                        >
                          <span className="sr-only">Toggle provider</span>
                          <span
                            className={`
                              pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 
                              transition ease-in-out duration-200
                              ${provider.enabled ? 'translate-x-5' : 'translate-x-0'}
                            `}
                          />
                        </button>
                        <button
                          onClick={() => handleRemoveProvider('email', provider.id)}
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

            {/* Add New Provider */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-900 mb-4">
                Add New Provider
              </h4>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Provider Name
                  </label>
                  <input
                    type="text"
                    value={newProvider.name}
                    onChange={(e) => setNewProvider({
                      ...newProvider,
                      name: e.target.value,
                    })}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Provider Type
                  </label>
                  <select
                    value={newProvider.type}
                    onChange={(e) => setNewProvider({
                      ...newProvider,
                      type: e.target.value as 'email' | 'sms',
                    })}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="email">Email Provider</option>
                    <option value="sms">SMS Provider</option>
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <button
                  type="button"
                  onClick={handleAddProvider}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Provider
                </button>
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

export default CommunicationSettings;