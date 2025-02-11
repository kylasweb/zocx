import React from 'react';
import { 
  Settings, 
  Upload, 
  Bell, 
  Globe, 
  Shield, 
  Award,
  BookOpen,
  Cog,
  Wallet,
  MessageSquare,
  Layout,
  FileText,
  Database,
  Lock
} from 'lucide-react';
import { Link } from 'react-router-dom';

const SettingCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  to: string;
}> = ({ icon, title, description, to }) => (
  <Link 
    to={to}
    className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
  >
    <div className="flex items-start space-x-4">
      <div className="p-3 bg-indigo-100 rounded-lg">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      </div>
    </div>
  </Link>
);

const SystemSettings: React.FC = () => {
  const settingsGroups = [
    {
      title: 'App Configuration',
      settings: [
        {
          icon: <Cog className="h-6 w-6 text-indigo-600" />,
          title: 'General Settings',
          description: 'Configure website name, branding, and basic settings',
          to: '/admin/settings/general'
        },
        {
          icon: <Upload className="h-6 w-6 text-indigo-600" />,
          title: 'Logo & Branding',
          description: 'Manage logos, favicons, and brand assets',
          to: '/admin/settings/branding'
        },
        {
          icon: <Globe className="h-6 w-6 text-indigo-600" />,
          title: 'Localization',
          description: 'Set currencies, languages, and regional settings',
          to: '/admin/settings/localization'
        }
      ]
    },
    {
      title: 'User & Features',
      settings: [
        {
          icon: <Shield className="h-6 w-6 text-indigo-600" />,
          title: 'Feature Management',
          description: 'Enable/disable platform features and modules',
          to: '/admin/settings/features'
        },
        {
          icon: <Award className="h-6 w-6 text-indigo-600" />,
          title: 'Rewards & Rankings',
          description: 'Configure reward systems and user rankings',
          to: '/admin/settings/rewards'
        },
        {
          icon: <BookOpen className="h-6 w-6 text-indigo-600" />,
          title: 'Training Management',
          description: 'Manage training programs and knowledge base',
          to: '/admin/settings/training'
        }
      ]
    },
    {
      title: 'Integrations & APIs',
      settings: [
        {
          icon: <MessageSquare className="h-6 w-6 text-indigo-600" />,
          title: 'Communication',
          description: 'Configure SMS and email service providers',
          to: '/admin/settings/communication'
        },
        {
          icon: <Wallet className="h-6 w-6 text-indigo-600" />,
          title: 'Payment Gateways',
          description: 'Manage payment and cryptocurrency integrations',
          to: '/admin/settings/payments'
        },
        {
          icon: <Database className="h-6 w-6 text-indigo-600" />,
          title: 'External APIs',
          description: 'Configure third-party API integrations',
          to: '/admin/settings/apis'
        }
      ]
    },
    {
      title: 'System & Security',
      settings: [
        {
          icon: <Lock className="h-6 w-6 text-indigo-600" />,
          title: 'Security Settings',
          description: 'Configure security and authentication options',
          to: '/admin/settings/security'
        },
        {
          icon: <Layout className="h-6 w-6 text-indigo-600" />,
          title: 'Frontend Management',
          description: 'Customize website appearance and content',
          to: '/admin/settings/frontend'
        },
        {
          icon: <FileText className="h-6 w-6 text-indigo-600" />,
          title: 'System Policies',
          description: 'Manage terms, policies, and legal documents',
          to: '/admin/settings/policies'
        }
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        {settingsGroups.map((group, index) => (
          <div key={index} className="space-y-4">
            <h2 className="text-lg font-medium text-gray-900 border-b pb-2">
              {group.title}
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {group.settings.map((setting, settingIndex) => (
                <SettingCard key={settingIndex} {...setting} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SystemSettings;