export interface Profile {
  phone: string;
  country: string;
  timezone: string;
  language: string;
  bio: string;
  socialLinks: {
    facebook: string;
    twitter: string;
    linkedin: string;
  };
}

export interface LoginHistory {
  id: string;
  timestamp: string;
  device: string;
  location: string;
  ip: string;
}

export interface SecurityQuestion {
  question: string;
  answered: boolean;
}

export interface SecuritySettings {
  twoFactorEnabled: boolean;
  lastPasswordChange: string;
  loginHistory: LoginHistory[];
  securityQuestions: SecurityQuestion[];
}

export interface NotificationPreferences {
  email: {
    commission_earned: boolean;
    rank_advancement: boolean;
    team_update: boolean;
    withdrawal_status: boolean;
    security_alerts: boolean;
    newsletter: boolean;
  };
  sms: {
    commission_earned: boolean;
    rank_advancement: boolean;
    team_update: boolean;
    withdrawal_status: boolean;
    security_alerts: boolean;
  };
  pushNotifications: {
    enabled: boolean;
    browser: boolean;
    mobile: boolean;
  };
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'bank';
  lastFour?: string;
  expiryMonth?: string;
  expiryYear?: string;
  brand?: string;
  bankName?: string;
  accountNumber?: string;
  routingNumber?: string;
  isDefault: boolean;
}

export interface Settings {
  profile: Profile;
  security: SecuritySettings;
  notifications: NotificationPreferences;
  paymentMethods: PaymentMethod[];
  defaultPaymentMethod: string;
}