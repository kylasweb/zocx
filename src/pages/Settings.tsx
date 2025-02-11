import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { Settings as SettingsIcon, Shield, CreditCard, MessageSquare } from 'lucide-react';

const Settings: React.FC = () => {
  const location = useLocation();

  const settingsLinks = [
    {
      path: 'general',
      label: 'General Settings',
      icon: SettingsIcon,
    },
    {
      path: 'security',
      label: 'Security',
      icon: Shield,
    },
    {
      path: 'payment',
      label: 'Payment Methods',
      icon: CreditCard,
    },
    {
      path: 'communication',
      label: 'Communication',
      icon: MessageSquare,
    },
  ];

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Settings Navigation */}
        <div className="w-full lg:w-64 bg-white rounded-lg shadow p-4">
          <nav className="space-y-1">
            {settingsLinks.map((link) => {
              const isActive = location.pathname.includes(link.path);
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <link.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                  {link.label}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;