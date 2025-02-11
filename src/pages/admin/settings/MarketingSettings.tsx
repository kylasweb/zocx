import React, { useState } from 'react';
import { 
  Save, 
  AlertCircle, 
  Calendar,
  CheckSquare,
  Users,
  Mail,
  MessageSquare,
  Plus,
  Trash2,
  Edit,
  Phone,
  BarChart2,
  Target,
  RefreshCw
} from 'lucide-react';
import { useAdminSettingsStore } from '../../../store/admin/settingsStore';

interface Campaign {
  id: string;
  name: string;
  description: string;
  type: 'email' | 'sms' | 'social';
  status: 'draft' | 'active' | 'completed';
  variants: {
    id: string;
    name: string;
    content: string;
    metrics: {
      sent: number;
      opened: number;
      clicked: number;
      converted: number;
    };
  }[];
  audience: {
    type: 'all' | 'segment' | 'custom';
    filters?: Record<string, any>;
  };
  schedule: {
    startDate: string;
    endDate?: string;
    frequency?: 'once' | 'daily' | 'weekly' | 'monthly';
  };
  createdAt: string;
}

const MarketingSettings: React.FC = () => {
  const { settings, updateSettings, loading, error } = useAdminSettingsStore();
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    assignedTo: [] as string[],
  });
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

  const handleAddTask = () => {
    if (newTask.title && newTask.dueDate) {
      updateSettings('marketing', {
        tasks: [...settings.marketing.tasks, {
          id: `task-${Date.now()}`,
          ...newTask,
          status: 'pending',
          createdAt: new Date().toISOString(),
        }],
      });
      setNewTask({ title: '', description: '', dueDate: '', assignedTo: [] });
    }
  };

  const handleUpdateTaskStatus = (taskId: string, status: 'pending' | 'completed' | 'declined') => {
    updateSettings('marketing', {
      tasks: settings.marketing.tasks.map(task =>
        task.id === taskId ? { ...task, status } : task
      ),
    });
  };

  const handleAddContact = (contact: any) => {
    updateSettings('marketing', {
      contacts: [...settings.marketing.contacts, {
        id: `contact-${Date.now()}`,
        ...contact,
        createdAt: new Date().toISOString(),
      }],
    });
  };

  const handleAddCampaign = (campaign: Omit<Campaign, 'id' | 'createdAt'>) => {
    const newCampaign: Campaign = {
      ...campaign,
      id: `campaign-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setCampaigns([...campaigns, newCampaign]);
  };

  const handleUpdateCampaign = (campaignId: string, updates: Partial<Campaign>) => {
    setCampaigns(campaigns.map(campaign =>
      campaign.id === campaignId ? { ...campaign, ...updates } : campaign
    ));
  };

  const handleDeleteCampaign = (campaignId: string) => {
    setCampaigns(campaigns.filter(campaign => campaign.id !== campaignId));
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-red-400" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">{error}</h3>
            </div>
          </div>
        </div>
      )}

      {/* Task Management */}
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Task Management
          </h3>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Task Title
              </label>
              <input
                type="text"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Due Date
              </label>
              <input
                type="date"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Assign To
              </label>
              <select
                multiple
                value={newTask.assignedTo}
                onChange={(e) => setNewTask({
                  ...newTask,
                  assignedTo: Array.from(e.target.selectedOptions, option => option.value)
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="all-leaders">All Leaders</option>
                <option value="all-users">All Users</option>
                <option value="specific-group">Specific Group</option>
              </select>
            </div>
          </div>
          <div className="mt-6">
            <button
              type="button"
              onClick={handleAddTask}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Task
            </button>
          </div>

          {/* Task List */}
          <div className="mt-6 space-y-4">
            {settings.marketing.tasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
                <div className="flex-1">
                  <div className="flex items-center">
                    <h5 className="text-sm font-medium text-gray-900">{task.title}</h5>
                    <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      task.status === 'completed' ? 'bg-green-100 text-green-800' :
                      task.status === 'declined' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {task.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{task.description}</p>
                  <div className="mt-1 text-xs text-gray-500">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleUpdateTaskStatus(task.id, 'completed')}
                    className="text-green-600 hover:text-green-800"
                  >
                    <CheckSquare className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleUpdateTaskStatus(task.id, 'declined')}
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

      {/* Contact Management */}
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Contact Management
          </h3>
          <div className="mt-6 space-y-4">
            {settings.marketing.contacts.map((contact) => (
              <div key={contact.id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
                <div>
                  <h5 className="text-sm font-medium text-gray-900">{contact.name}</h5>
                  <div className="mt-1 space-y-1">
                    <div className="flex items-center text-sm text-gray-500">
                      <Mail className="h-4 w-4 mr-2" />
                      {contact.email}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Phone className="h-4 w-4 mr-2" />
                      {contact.phone}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="text-indigo-600 hover:text-indigo-800">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Calendar Integration */}
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Marketing Calendar
          </h3>
          <div className="mt-6">
            {/* Calendar implementation will go here */}
            <div className="text-center text-gray-500 py-8">
              Calendar component will be integrated here
            </div>
          </div>
        </div>
      </div>

      {/* Communication Templates */}
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Communication Templates
          </h3>
          <div className="mt-6 space-y-4">
            {settings.marketing.templates.map((template) => (
              <div key={template.id} className="p-4 bg-white rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <h5 className="text-sm font-medium text-gray-900">{template.name}</h5>
                  <div className="flex items-center space-x-2">
                    <button className="text-indigo-600 hover:text-indigo-800">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <p className="mt-1 text-sm text-gray-500">{template.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Campaigns Section */}
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Marketing Campaigns
            </h3>
            <button
              onClick={() => setShowCampaignModal(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Campaign
            </button>
          </div>

          <div className="space-y-4">
            {campaigns.map((campaign) => (
              <div key={campaign.id} className="bg-white border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">{campaign.name}</h4>
                    <p className="text-sm text-gray-500">{campaign.description}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      campaign.status === 'active' ? 'bg-green-100 text-green-800' :
                      campaign.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {campaign.status}
                    </span>
                    <button
                      onClick={() => setSelectedCampaign(campaign)}
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      <BarChart2 className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteCampaign(campaign.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* A/B Testing Variants */}
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {campaign.variants.map((variant) => (
                    <div key={variant.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-gray-900">{variant.name}</h5>
                        <button className="text-indigo-600 hover:text-indigo-800">
                          <Edit className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-gray-500">Sent:</span>
                          <span className="ml-2 font-medium">{variant.metrics.sent}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Opened:</span>
                          <span className="ml-2 font-medium">
                            {((variant.metrics.opened / variant.metrics.sent) * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Clicked:</span>
                          <span className="ml-2 font-medium">
                            {((variant.metrics.clicked / variant.metrics.opened) * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Converted:</span>
                          <span className="ml-2 font-medium">
                            {((variant.metrics.converted / variant.metrics.clicked) * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Campaign Schedule */}
                <div className="mt-4 flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>
                    Starts: {new Date(campaign.schedule.startDate).toLocaleDateString()}
                    {campaign.schedule.endDate && ` • Ends: ${new Date(campaign.schedule.endDate).toLocaleDateString()}`}
                  </span>
                </div>
              </div>
            ))}
          </div>
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
    </div>
  );
};

export default MarketingSettings;