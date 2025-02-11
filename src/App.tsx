import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from './app/layout/DashboardLayout';
import Landing from './pages/Landing';
import Register from './pages/auth/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Network from './pages/Network';
import Commissions from './pages/Commissions';
import Training from './pages/Training';
import Settings from './pages/Settings';
import Ranks from './pages/Ranks';
import Team from './pages/Team';
import Reports from './pages/Reports';
import PrivacyPolicy from './components/shared/legal/PrivacyPolicy.tsx';
import TermsConditions from './components/shared/legal/TermsConditions.tsx';
import CookiePolicy from './components/shared/legal/CookiePolicy.tsx';
import { useAuthStore } from './store/shared/authStore';
import CookieConsent from './components/shared/legal/CookieConsent.tsx';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { useVoiceNavigation } from './hooks/useVoiceNavigation';
import { useBiometricAuth } from './hooks/useBiometricAuth';
import { FeatureFlagsProvider } from './app/providers/FeatureFlags';

// Settings pages
import GeneralSettings from './pages/admin/settings/GeneralSettings';
import SecuritySettings from './pages/admin/settings/SecuritySettings';
import PaymentSettings from './pages/admin/settings/PaymentSettings';
import CommunicationSettings from './pages/admin/settings/CommunicationSettings';
import FeatureManager from './pages/admin/settings/FeatureManager';
import AchievementManager from './pages/admin/settings/AchievementManager/AchievementManager';
import RiskManagement from './pages/admin/settings/RiskManagement/RiskManagement';
import UserManagement from './pages/admin/settings/UserManagement/UserManagement';
import ContentManager from './pages/admin/settings/ContentManager/ContentManager';
import NetworkConfig from './pages/admin/settings/NetworkConfig/NetworkConfig';
import AIPortfolio from './pages/user/AIPortfolio/AIPortfolio';
import WalletSystem from './pages/user/wallet/WalletSystem';
import TaskManager from './pages/admin/TaskManager/TaskManager';
import RewardSettings from './pages/admin/RewardSettings/RewardSettings';
import PaymentGateway from './components/payment/PaymentGateway';
import UserRoles from './pages/admin/UserRoles';
import { AdminMetrics } from './pages/admin/Metrics';
import { ReferralTracker } from './components/ReferralTracker';
import ForgotPassword from './pages/auth/ForgotPassword';

function App() {
  const { user, loading } = useAuthStore();
  useVoiceNavigation();
  useBiometricAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <FeatureFlagsProvider>
      <BrowserRouter>
        <CookieConsent />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsConditions />} />
          <Route path="/cookies" element={<CookiePolicy />} />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={user ? <DashboardLayout /> : <Navigate to="/login" />}
          >
            <Route index element={<Dashboard />} />
            <Route path="network" element={<Network />} />
            <Route path="team" element={
              <ErrorBoundary>
                <Team />
              </ErrorBoundary>
            } />
            <Route path="commissions" element={
              <ErrorBoundary>
                <Commissions />
              </ErrorBoundary>
            } />
            <Route path="training" element={<Training />} />
            <Route path="wallet" element={<WalletSystem />} />
            <Route path="ranks" element={<Ranks />} />
            <Route path="reports" element={
              <ErrorBoundary>
                <Reports />
              </ErrorBoundary>
            } />
            
            {/* Nested Settings Routes */}
            <Route path="settings" element={
              <ErrorBoundary>
                <Settings />
              </ErrorBoundary>
            }>
              <Route index element={<Navigate to="general" replace />} />
              <Route path="general" element={<GeneralSettings />} />
              <Route path="security" element={<SecuritySettings />} />
              <Route path="payment" element={<PaymentSettings />} />
              <Route path="communication" element={<CommunicationSettings />} />
              <Route path="user-management" element={<UserManagement />} />
              <Route path="content-management" element={<ContentManager />} />
              <Route path="network-config" element={<NetworkConfig />} />
              <Route path="features" element={
                <ErrorBoundary>
                  <FeatureManager />
                </ErrorBoundary>
              } />
              <Route path="achievements" element={
                <ErrorBoundary>
                  <AchievementManager />
                </ErrorBoundary>
              } />
              <Route path="risk-management" element={
                <ErrorBoundary>
                  <RiskManagement />
                </ErrorBoundary>
              } />
            </Route>
            <Route path="ai-investment" element={<AIPortfolio />} />
          </Route>
          <Route path="admin/tasks" element={<TaskManager />} />
          <Route path="admin/reward-settings" element={<RewardSettings />} />
          <Route path="admin/roles" element={<UserRoles />} />
          <Route path="payments" element={<PaymentGateway />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="admin/metrics" element={<AdminMetrics />} />
          <Route path="referrals" element={<ReferralTracker code="REF123" count={15} />} />
        </Routes>
      </BrowserRouter>
    </FeatureFlagsProvider>
  );
}

export default App;