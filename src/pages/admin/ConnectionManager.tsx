import React, { useState } from 'react';
import { Link2, Globe, Key, RefreshCw, Trash2, Plus, CheckCircle, XCircle, Book } from 'lucide-react';
import { useConnectionStore } from '../../store/admin/connectionStore';
import ConnectionGuide from '../../components/admin/connection/ConnectionGuide';

const ConnectionManager: React.FC = () => {
  const {
    connections,
    addConnection,
    removeConnection,
    updateConnection,
    testConnection,
    loading,
    error,
  } = useConnectionStore();

  const [showGuide, setShowGuide] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState('');

  const [newConnection, setNewConnection] = useState({
    name: '',
    platform: 'wordpress',
    url: '',
    ssoEnabled: true,
    config: {
      clientId: '',
      clientSecret: '',
      callbackUrl: '',
    },
  });

  const handleAddConnection = async () => {
    await addConnection({
      ...newConnection,
      id: `conn-${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
    });
    setNewConnection({
      name: '',
      platform: 'wordpress',
      url: '',
      ssoEnabled: true,
      config: {
        clientId: '',
        clientSecret: '',
        callbackUrl: '',
      },
    });
  };

  const handleTestConnection = async (connectionId: string) => {
    await testConnection(connectionId);
  };

  const handleShowGuide = (platform: string) => {
    setSelectedPlatform(platform);
    setShowGuide(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Connection Manager</h1>
        <button
          onClick={() => setShowGuide(true)}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          <Book className="h-4 w-4 mr-2" />
          View Integration Guide
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Add New Connection</h2>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Connection Name</label>
              <input
                type="text"
                value={newConnection.name}
                onChange={(e) => setNewConnection({ ...newConnection, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="My WordPress Site"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Platform</label>
              <select
                value={newConnection.platform}
                onChange={(e) => setNewConnection({ ...newConnection, platform: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="wordpress">WordPress</option>
                <option value="laravel">Laravel</option>
                <option value="drupal">Drupal</option>
                <option value="custom">Custom Platform</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Website URL</label>
              <input
                type="url"
                value={newConnection.url}
                onChange={(e) => setNewConnection({ ...newConnection, url: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="https://example.com"
              />
            </div>

            <div className="sm:col-span-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={newConnection.ssoEnabled}
                    onChange={(e) => setNewConnection({ ...newConnection, ssoEnabled: e.target.checked })}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Enable Single Sign-On (SSO)
                  </label>
                </div>
                <button
                  type="button"
                  onClick={() => handleShowGuide(newConnection.platform)}
                  className="text-sm text-indigo-600 hover:text-indigo-500"
                >
                  View SSO Setup Guide
                </button>
              </div>
            </div>

            {newConnection.ssoEnabled && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Client ID</label>
                  <input
                    type="text"
                    value={newConnection.config.clientId}
                    onChange={(e) => setNewConnection({
                      ...newConnection,
                      config: { ...newConnection.config, clientId: e.target.value },
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Client Secret</label>
                  <input
                    type="password"
                    value={newConnection.config.clientSecret}
                    onChange={(e) => setNewConnection({
                      ...newConnection,
                      config: { ...newConnection.config, clientSecret: e.target.value },
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Callback URL</label>
                  <input
                    type="url"
                    value={newConnection.config.callbackUrl}
                    onChange={(e) => setNewConnection({
                      ...newConnection,
                      config: { ...newConnection.config, callbackUrl: e.target.value },
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="https://example.com/auth/callback"
                  />
                </div>
              </>
            )}
          </div>

          <div className="mt-6">
            <button
              onClick={handleAddConnection}
              disabled={loading}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Connection
            </button>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Active Connections</h3>
          
          <div className="space-y-4">
            {connections.map((connection) => (
              <div
                key={connection.id}
                className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Globe className="h-5 w-5 text-gray-400" />
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">{connection.name}</h4>
                      <p className="text-sm text-gray-500">{connection.url}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      connection.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : connection.status === 'error'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {connection.status}
                    </span>
                    <button
                      onClick={() => handleTestConnection(connection.id)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => removeConnection(connection.id)}
                      className="text-red-400 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {connection.ssoEnabled && (
                  <div className="mt-4 pt-4 border-t grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">SSO Status:</span>
                      <span className="ml-2 inline-flex items-center">
                        {connection.ssoStatus === 'active' ? (
                          <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-500 mr-1" />
                        )}
                        {connection.ssoStatus}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Last Sync:</span>
                      <span className="ml-2">
                        {new Date(connection.lastSync || Date.now()).toLocaleString()}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {showGuide && (
        <ConnectionGuide
          platform={selectedPlatform}
          onClose={() => setShowGuide(false)}
        />
      )}
    </div>
  );
};

export default ConnectionManager;