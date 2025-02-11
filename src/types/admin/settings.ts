// Add to SecuritySettings interface
export interface SecuritySettings {
  twoFactorAuth: {
    required: boolean;
    methods: string[];
  };
  passwordPolicy: {
    minLength: number;
    requireSpecialChars: boolean;
    requireNumbers: boolean;
    requireUppercase: boolean;
    expiryDays: number;
  };
  ipWhitelist: string[];
  sessions: {
    timeout: number;
    maxConcurrent: number;
    enforceDeviceLimit: boolean;
  };
  biometricAuth?: {
    enabled: boolean;
    requiredLevel: 'optional' | 'required' | 'strict';
    allowedMethods: string[];
  };
  deviceFingerprinting?: {
    enabled: boolean;
    trustedDevices: Array<{
      id: string;
      name: string;
      fingerprint: string;
      lastUsed: string;
      trusted: boolean;
    }>;
  };
  auditLog?: Array<{
    id: string;
    event: string;
    userId: string;
    ipAddress: string;
    timestamp: string;
    details?: Record<string, any>;
  }>;
}