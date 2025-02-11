import React, { useState } from 'react';
import { 
  Shield, 
  Fingerprint, 
  Globe, 
  Clock, 
  FileText,
  Lock,
  Smartphone,
  AlertTriangle,
  Plus,
  Trash2
} from 'lucide-react';
import { useAdminSettingsStore } from '../../../store/admin/settingsStore';

const SecuritySettings: React.FC = () => {
  const { settings, updateSettings, loading, error } = useAdminSettingsStore();
  const { security } = settings;

  const [newIpAddress, setNewIpAddress] = useState('');
  const [showBiometricSetup, setShowBiometricSetup] = useState(false);

  const handleToggleBiometric = async (enabled: boolean) => {
    await updateSettings('security', {
      biometricAuth: {
        ...security.biometricAuth,
        enabled,
      },
    });
  };

  const handleAddIpAddress = () => {
    if (newIpAddress && !security.ipWhitelist.includes(newIpAddress)) {
      updateSettings('security', {
        ipWhitelist: [...security.ipWhitelist, newIpAddress],
      });
      setNewIpAddress('');
    }
  };

  const handleRemoveIpAddress = (ip: string) => {
    updateSettings('security', {
      ipWhitelist: security.ipWhitelist.filter(address => address !== ip),
    });
  };

  const handleUpdateSessionSettings = (updates: Partial<typeof security.sessions>) => {
    updateSettings('security', {
      sessions: {
        ...security.sessions,
        ...updates,
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* Biometric Authentication */}
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Fingerprint className="h-5 w-5 text-indigo-500 mr-3" />
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Biometric Authentication
                </h3>
                <p className="text-sm text-gray-500">
                  Enable fingerprint or face recognition for enhanced security
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleToggleBiometric(!security.biometricAuth?.enabled)}
              className={`
                relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer 
                transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                ${security.biometricAuth?.enabled ? 'bg-indigo-600' : 'bg-gray-200'}
              `}
            >
              <span className="sr-only">Toggle biometric authentication</span>
              <span
                className={`
                  pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 
                  transition ease-in-out duration-200
                  ${security.biometricAuth?.enabled ? 'translate-x-5' : 'translate-x-0'}
                `}
              />
            </button>
          </div>

          {security.biometricAuth?.enabled && showBiometricSetup && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-900 mb-4">Setup Instructions</h4>
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
                <li>Enable biometric authentication on your device</li>
                <li>Scan your fingerprint or face when prompted</li>
                <li>Verify your identity to complete setup</li>
              </ol>
            </div>
          )}
        </div>
      </div>

      {/* IP Access Control */}
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Globe className="h-5 w-5 text-indigo-500" />
            <h3 className="text-lg font-medium text-gray-900">
              IP Access Control
            </h3>
          </div>

          <div className="space-y-4">
            <div className="flex space-x-4">
              <input
                type="text"
                value={newIpAddress}
                onChange={(e) => setNewIpAddress(e.target.value)}
                placeholder="Enter IP address"
                className="flex-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
              <button
                type="button"
                onClick={handleAddIpAddress}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add IP
              </button>
            </div>

            <div className="space-y-2">
              {security.ipWhitelist.map((ip) => (
                <div key={ip} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                  <span className="text-sm text-gray-900">{ip}</span>
                  <button
                    onClick={() => handleRemoveIpAddress(ip)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Session Management */}
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Clock className="h-5 w-5 text-indigo-500" />
            <h3 className="text-lg font-medium text-gray-900">
              Session Management
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Session Timeout (minutes)
              </label>
              <input
                type="number"
                value={security.sessions?.timeout || 30}
                onChange={(e) => handleUpdateSessionSettings({ timeout: parseInt(e.target.value) })}
                className="mt-1 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Maximum Concurrent Sessions
              </label>
              <input
                type="number"
                value={security.sessions?.maxConcurrent || 3}
                onChange={(e) => handleUpdateSessionSettings({ maxConcurrent: parseInt(e.target.value) })}
                className="mt-1 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="mt-6">
            <div className="relative flex items-start">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  checked={security.sessions?.enforceDeviceLimit || false}
                  onChange={(e) => handleUpdateSessionSettings({ enforceDeviceLimit: e.target.checked })}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label className="font-medium text-gray-700">
                  Enforce Device Limit
                </label>
                <p className="text-gray-500">
                  Automatically log out oldest session when maximum is reached
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Security Audit Log */}
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center space-x-3 mb-4">
            <FileText className="h-5 w-5 text-indigo-500" />
            <h3 className="text-lg font-medium text-gray-900">
              Security Audit Log
            </h3>
          </div>

          <div className="mt-4 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                        Event
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        User
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        IP Address
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Timestamp
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {security.auditLog?.map((log) => (
                      <tr key={log.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900">
                          {log.event}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {log.userId}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {log.ipAddress}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {new Date(log.timestamp).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Device Fingerprinting */}
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Smartphone className="h-5 w-5 text-indigo-500 mr-3" />
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Device Fingerprinting
                </h3>
                <p className="text-sm text-gray-500">
                  Track and verify trusted devices
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => updateSettings('security', {
                deviceFingerprinting: {
                  ...security.deviceFingerprinting,
                  enabled: !security.deviceFingerprinting?.enabled,
                },
              })}
              className={`
                relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer 
                transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                ${security.deviceFingerprinting?.enabled ? 'bg-indigo-600' : 'bg-gray-200'}
              `}
            >
              <span className="sr-only">Toggle device fingerprinting</span>
              <span
                className={`
                  pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 
                  transition ease-in-out duration-200
                  ${security.deviceFingerprinting?.enabled ? 'translate-x-5' : 'translate-x-0'}
                `}
              />
            </button>
          </div>

          {security.deviceFingerprinting?.enabled && (
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-900 mb-4">Trusted Devices</h4>
              <div className="space-y-2">
                {security.deviceFingerprinting.trustedDevices?.map((device) => (
                  <div key={device.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{device.name}</p>
                      <p className="text-sm text-gray-500">Last used: {new Date(device.lastUsed).toLocaleDateString()}</p>
                    </div>
                    <button
                      onClick={() => {
                        const updatedDevices = security.deviceFingerprinting.trustedDevices?.filter(
                          d => d.id !== device.id
                        );
                        updateSettings('security', {
                          deviceFingerprinting: {
                            ...security.deviceFingerprinting,
                            trustedDevices: updatedDevices,
                          },
                        });
                      }}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;