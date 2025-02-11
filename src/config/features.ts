const getDefaultFeatures = () => {
  const baseFeatures = {
    leaderboards: process.env.NODE_ENV === 'production',
    aiAdvisor: true,
    biometricAuth: process.env.NODE_ENV !== 'test',
  };

  return {
    ...baseFeatures,
    // Add environment-specific overrides
  };
}; 