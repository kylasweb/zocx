import React, { createContext, useContext, useState, useCallback } from 'react';
import { useAuthStore } from '../store/authStore';

interface FeatureFlagConfig {
  enabled: boolean;
  description: string;
  lastModified?: Date;
  modifiedBy?: string;
}

type FeatureFlags = Record<string, FeatureFlagConfig>;

const getDefaultFeatures = (): FeatureFlags => ({
  leaderboards: {
    enabled: process.env.NODE_ENV === 'production',
    description: 'Investment ranking system',
  },
  aiAdvisor: {
    enabled: true,
    description: 'AI-driven investment recommendations',
  },
  biometricAuth: {
    enabled: process.env.NODE_ENV !== 'test',
    description: 'Behavioral authentication system',
  },
  // Add more features here
});

const FeatureFlagsContext = createContext<{
  features: FeatureFlags;
  toggleFeature: (feature: string) => void;
  getFeatureState: (feature: string) => boolean;
}>({
  features: getDefaultFeatures(),
  toggleFeature: () => {},
  getFeatureState: () => false,
});

export const FeatureFlagsProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const { user } = useAuthStore();
  const [features, setFeatures] = useState<FeatureFlags>(() => {
    const savedFlags = localStorage.getItem('featureFlags');
    return savedFlags ? JSON.parse(savedFlags) : getDefaultFeatures();
  });

  const toggleFeature = useCallback((feature: string) => {
    setFeatures(prev => {
      const newState = !prev[feature]?.enabled;
      const updatedFeature = {
        ...prev[feature],
        enabled: newState,
        lastModified: new Date(),
        modifiedBy: user?.email || 'system',
      };
      
      const newFlags = { 
        ...prev, 
        [feature]: updatedFeature 
      };
      
      localStorage.setItem('featureFlags', JSON.stringify(newFlags));
      return newFlags;
    });
  }, [user]);

  const getFeatureState = useCallback((feature: string) => {
    return features[feature]?.enabled ?? false;
  }, [features]);

  return (
    <FeatureFlagsContext.Provider value={{ features, toggleFeature, getFeatureState }}>
      {children}
    </FeatureFlagsContext.Provider>
  );
};

export const useFeatureFlags = () => useContext(FeatureFlagsContext); 