import React from 'react';
import { Bell, User } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const Navbar: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-indigo-600">MLM Platform</h1>
            </div>
          </div>
          <div className="flex items-center">
            <button className="p-2 rounded-full text-gray-400 hover:text-gray-500">
              <Bell className="h-6 w-6" />
            </button>
            <div className="ml-3 relative flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700">{user?.fullName}</span>
              <User className="h-8 w-8 rounded-full bg-gray-100 p-1" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;