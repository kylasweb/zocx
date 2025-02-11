```typescript
// Privacy preferences management
export interface PrivacyPreferences {
  analytics: boolean;
  marketing: boolean;
  thirdParty: boolean;
}

export const defaultPrivacyPreferences: PrivacyPreferences = {
  analytics: false,
  marketing: false,
  thirdParty: false,
};

// Consent management
export const getConsent = (userId: string): PrivacyPreferences => {
  const stored = localStorage.getItem(`consent_${userId}`);
  return stored ? JSON.parse(stored) : defaultPrivacyPreferences;
};

export const updateConsent = (userId: string, preferences: Partial<PrivacyPreferences>) => {
  const current = getConsent(userId);
  const updated = { ...current, ...preferences };
  localStorage.setItem(`consent_${userId}`, JSON.stringify(updated));
  return updated;
};

// Data retention
export const applyRetentionPolicy = (data: any[], retentionDays: number) => {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - retentionDays);
  
  return data.filter(item => new Date(item.createdAt) > cutoff);
};

// Data export
export const exportUserData = async (userId: string) => {
  // This would fetch all user data from various sources
  const userData = {
    profile: {}, // User profile data
    activity: [], // User activity logs
    preferences: {}, // User preferences
    // Add other relevant data
  };

  return JSON.stringify(userData, null, 2);
};
```