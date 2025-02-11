import React, { useState } from 'react';
import { 
  Save, 
  AlertCircle, 
  Clock, 
  Link, 
  Webhook, 
  Database,
  RefreshCw,
  Plus,
  Trash2,
  Settings,
  Calendar,
  MessageSquare
} from 'lucide-react';
import { useAdminSettingsStore } from '../../../store/admin/settingsStore';

const IntegrationSettings: React.FC = () => {
  const { settings, updateSettings, loading, error } = useAdminSettingsStore();
  const [newWebhook, setNewWebhook] = useState({
    name: '',
    url: '',
    events: [] as string[],
  });

  const handleAddWebhook = () => {
    if (newWebhook.name && newWebhook.url) {
      updateSettings('integrations', {
        webhooks: [...settings.integrations.webhooks, {
          id: `webhook-${Date.now()}`,
          ...newWebhook,
          active: true,
        }],
      });
      setNewWebhook({ name: '', url: '', events: [] });
    }
  };

  const handleToggleWebhook = (webhookId: string, active: boolean) => {
    updateSettings('integrations', {
      webhooks: settings.integrations.webhooks.map(webhook =>
        webhook.id === webhookId ? { ...webhook, active } : webhook
      ),
    });
  };

  const handleUpdateCronJob = (jobId: string, schedule: string) => {
    updateSettings('integrations', {
      cronJobs: settings.integrations.cronJobs.map(job =>
        job.id === jobId ? { ...job, schedule } : job
      ),
    });
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-sm rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Integration Settings
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
            {/* Webhook Management */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Webhook className="h-5 w-5 text-indigo-500" />
                  <div>
                    <h4 className="text-base font-medium text-gray-900">
                      Webhook Management
                    </h4>
                    <p className="text-sm text-gray-500">
                      Configure webhooks for real-time event notifications
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-4">
                {/* Add New Webhook */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Webhook Name
                    </label>
                    <input
                      type="text"
                      value={newWebhook.name}
                      onChange={(e) => setNewWebhook({ ...newWebhook, name: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Webhook URL
                    </label>
                    <input
                      type="url"
                      value={newWebhook.url}
                      onChange={(e) => setNewWebhook({ ...newWebhook, url: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Events
                    </label>
                    <select
                      multiple
                      value={newWebhook.events}
                      onChange={(e) => setNewWebhook({
                        ...newWebhook,
                        events: Array.from(e.target.selectedOptions, option => option.value)
                      })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value="user.created">User Created</option>
                      <option value="user.updated">User Updated</option>
                      <option value="commission.paid">Commission Paid</option>
                      <option value="rank.advanced">Rank Advanced</option>
                      <option value="withdrawal.requested">Withdrawal Requested</option>
                    </select>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleAddWebhook}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Webhook
                </button>

                {/* Existing Webhooks */}
                <div className="mt-4 space-y-2">
                  {settings.integrations.webhooks.map((webhook) => (
                    <div key={webhook.id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
                      <div>
                        <h5 className="text-sm font-medium text-gray-900">{webhook.name}</h5>
                        <p className="text-sm text-gray-500">{webhook.url}</p>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {webhook.events.map((event) => (
                            <span
                              key={event}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                            >
                              {event}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <button
                          type="button"
                          onClick={() => handleToggleWebhook(webhook.id, !webhook.active)}
                          className={`
                            relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer 
                            transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                            ${webhook.active ? 'bg-indigo-600' : 'bg-gray-200'}
                          `}
                        >
                          <span className="sr-only">Toggle webhook</span>
                          <span
                            className={`
                              pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 
                              transition ease-in-out duration-200
                              ${webhook.active ? 'translate-x-5' : 'translate-x-0'}
                            `}
                          />
                        </button>
                        <button
                          onClick={() => {
                            updateSettings('integrations', {
                              webhooks: settings.integrations.webhooks.filter(w => w.id !== webhook.id)
                            });
                          }}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Cron Jobs */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-indigo-500" />
                <h4 className="text-base font-medium text-gray-900">
                  Scheduled Tasks
                </h4>
              </div>

              <div className="mt-4 space-y-4">
                {settings.integrations.cronJobs.map((job) => (
                  <div key={job.id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
                    <div>
                      <h5 className="text-sm font-medium text-gray-900">{job.name}</h5>
                      <p className="text-sm text-gray-500">{job.description}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <input
                        type="text"
                        value={job.schedule}
                        onChange={(e) => handleUpdateCronJob(job.id, e.target.value)}
                        placeholder="Cron Schedule"
                        className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          // Trigger job manually
                        }}
                        className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        <RefreshCw className="h-4 w-4 mr-1" />
                        Run Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* External Integrations */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <Link className="h-5 w-5 text-indigo-500" />
                <div>
                  <h4 className="text-base font-medium text-gray-900">
                    External Integrations
                  </h4>
                  <p className="text-sm text-gray-500">
                    Connect with external services and tools
                  </p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {/* CRM Integration */}
                <div className="border rounded-lg p-4 bg-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Database className="h-5 w-5 text-blue-500" />
                      <div>
                        <h5 className="text-sm font-medium text-gray-900">CRM Systems</h5>
                        <p className="text-xs text-gray-500">Connect your CRM</p>
                      </div>
                    </div>
                    <button className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">
                      Configure
                    </button>
                  </div>
                </div>

                {/* Calendar Integration */}
                <div className="border rounded-lg p-4 bg-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-yellow-500" />
                      <div>
                        <h5 className="text-sm font-medium text-gray-900">Calendar</h5>
                        <p className="text-xs text-gray-500">Sync calendars</p>
                      </div>
                    </div>
                    <button className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">
                      Configure
                    </button>
                  </div>
                </div>

                {/* Communication Integration */}
                <div className="border rounded-lg p-4 bg-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <MessageSquare className="h-5 w-5 text-purple-500" />
                      <div>
                        <h5 className="text-sm font-medium text-gray-900">Communication</h5>
                        <p className="text-xs text-gray-500">Chat & messaging</p>
                      </div>
                    </div>
                    <button className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">
                      Configure
                    </button>
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

export default IntegrationSettings;