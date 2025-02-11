import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Users, 
  DollarSign, 
  Award, 
  Wallet, 
  Settings,
  BarChart3,
  Network
} from 'lucide-react';
import { useAuthStore } from '../../store/shared/authStore';

const Sidebar: React.FC = () => {
  const { user } = useAuthStore();

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: Network, label: 'Network', path: '/dashboard/network' },
    { icon: Users, label: 'Team', path: '/dashboard/team' },
    { icon: DollarSign, label: 'Commissions', path: '/dashboard/commissions' },
    { icon: Award, label: 'Ranks', path: '/dashboard/ranks' },
    { icon: Wallet, label: 'Wallet', path: '/dashboard/wallet' },
    { icon: BarChart3, label: 'Reports', path: '/dashboard/reports' },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="h-full px-3 py-4">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-4 py-2 text-sm font-medium rounded-lg ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`
              }
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;