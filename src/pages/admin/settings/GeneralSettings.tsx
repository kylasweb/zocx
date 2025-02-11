import React from 'react';
import { Save, AlertCircle } from 'lucide-react';
import { useAdminSettingsStore } from '../../../store/admin/settingsStore';

const GeneralSettings: React.FC = () => {
  const { settings, updateSettings, loading, error } = useAdminSettingsStore();
  const { general } = settings;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      siteName: formData.get('siteName') as string,
      siteDescription: formData.get('siteDescription') as string,
      adminEmail: formData.get('adminEmail') as string,
      supportEmail: formData.get('supportEmail') as string,
      timeZone: formData.get('timeZone') as string,
      dateFormat: formData.get('dateFormat') as string,
      maintenanceMode: formData.get('maintenanceMode') === 'true',
    };
    await updateSettings('general', data);
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-sm rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            General Settings
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
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <div>
                <label htmlFor="siteName" className="block text-sm font-medium text-gray-700">
                  Site Name
                </label>
                <input
                  type="text"
                  name="siteName"
                  id="siteName"
                  defaultValue={general.siteName}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="adminEmail" className="block text-sm font-medium text-gray-700">
                  Admin Email
                </label>
                <input
                  type="email"
                  name="adminEmail"
                  id="adminEmail"
                  defaultValue={general.adminEmail}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="siteDescription" className="block text-sm font-medium text-gray-700">
                  Site Description
                </label>
                <textarea
                  name="siteDescription"
                  id="siteDescription"
                  rows={3}
                  defaultValue={general.siteDescription}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="supportEmail" className="block text-sm font-medium text-gray-700">
                  Support Email
                </label>
                <input
                  type="email"
                  name="supportEmail"
                  id="supportEmail"
                  defaultValue={general.supportEmail}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="timeZone" className="block text-sm font-medium text-gray-700">
                  Time Zone
                </label>
                <select
                  name="timeZone"
                  id="timeZone"
                  defaultValue={general.timeZone}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="UTC">UTC</option>
                  <option value="America/New_York">Eastern Time</option>
                  <option value="America/Chicago">Central Time</option>
                  <option value="America/Denver">Mountain Time</option>
                  <option value="America/Los_Angeles">Pacific Time</option>
                </select>
              </div>

              <div>
                <label htmlFor="dateFormat" className="block text-sm font-medium text-gray-700">
                  Date Format
                </label>
                <select
                  name="dateFormat"
                  id="dateFormat"
                  defaultValue={general.dateFormat}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="DD-MM-YYYY">DD-MM-YYYY</option>
                </select>
              </div>

              <div>
                <label htmlFor="maintenanceMode" className="block text-sm font-medium text-gray-700">
                  Maintenance Mode
                </label>
                <select
                  name="maintenanceMode"
                  id="maintenanceMode"
                  defaultValue={general.maintenanceMode.toString()}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="false">Disabled</option>
                  <option value="true">Enabled</option>
                </select>
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

export default GeneralSettings;