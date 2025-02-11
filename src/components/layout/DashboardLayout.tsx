import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuthStore } from '../../store/shared/authStore';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import FeatureIndicator from '../FeatureIndicator';

const DashboardLayout: React.FC = () => {
  const { user } = useAuthStore();

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <Outlet />
          <FeatureIndicator feature="leaderboards" />
          <FeatureIndicator feature="aiAdvisor" />
          <FeatureIndicator feature="biometricAuth" />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;