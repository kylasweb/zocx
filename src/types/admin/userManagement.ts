// Add to existing UserManagementSettings interface
export interface RiskAssessment {
  id: string;
  userId: string;
  score: number;
  factors: Array<{
    type: string;
    weight: number;
    value: number;
    impact: 'high' | 'medium' | 'low';
  }>;
  lastUpdated: string;
  alerts: Array<{
    type: string;
    severity: 'critical' | 'warning' | 'info';
    message: string;
    timestamp: string;
  }>;
}

export interface KYCVerification {
  userId: string;
  status: 'pending' | 'approved' | 'rejected';
  documents: Array<{
    type: string;
    status: string;
    verificationId: string;
    timestamp: string;
  }>;
  verificationLevel: number;
  expiryDate?: string;
}

export interface Dispute {
  id: string;
  userId: string;
  type: 'commission' | 'rank' | 'compliance';
  status: 'open' | 'under_review' | 'resolved' | 'escalated';
  priority: 'high' | 'medium' | 'low';
  description: string;
  evidence: Array<{
    type: string;
    url: string;
    timestamp: string;
  }>;
  resolution?: {
    decision: string;
    reason: string;
    actionTaken: string;
    resolvedBy: string;
    timestamp: string;
  };
}

// Add to UserManagementSettings
export interface UserManagementSettings {
  // ... existing properties
  riskAssessment: {
    enabled: boolean;
    automaticScoring: boolean;
    thresholds: {
      high: number;
      medium: number;
    };
    assessments: RiskAssessment[];
  };
  kyc: {
    required: boolean;
    levels: Array<{
      level: number;
      requirements: string[];
      benefits: string[];
    }>;
    verifications: KYCVerification[];
  };
  disputes: {
    enabled: boolean;
    autoEscalation: boolean;
    resolutionTimeLimit: number;
    cases: Dispute[];
  };
}