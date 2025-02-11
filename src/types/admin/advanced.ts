export interface RetryConfig {
  maxAttempts: number;
  initialDelay: number;
  maxDelay: number;
  backoffFactor: number;
}

export interface RateLimit {
  windowMs: number;
  maxRequests: number;
  currentRequests: number;
  windowStart: number;
}

export interface CircuitBreaker {
  failureThreshold: number;
  resetTimeout: number;
  failureCount: number;
  lastFailure?: string;
  status: 'closed' | 'open' | 'half-open';
}

export interface ABTest {
  id: string;
  name: string;
  variants: {
    id: string;
    name: string;
    content: string;
    weight: number;
    metrics: {
      impressions: number;
      clicks: number;
      conversions: number;
    };
  }[];
  startDate: string;
  endDate: string;
  status: 'draft' | 'active' | 'completed';
  winner?: string;
}

export interface LeadScore {
  rules: Array<{
    condition: string;
    points: number;
    category: string;
  }>;
  thresholds: {
    cold: number;
    warm: number;
    hot: number;
  };
}

export interface TaskWorkflow {
  id: string;
  name: string;
  steps: Array<{
    id: string;
    name: string;
    type: 'manual' | 'automated';
    dependsOn: string[];
    assignee?: string;
    duration: number;
    status: 'pending' | 'in_progress' | 'completed';
  }>;
  triggers: Array<{
    event: string;
    action: string;
    conditions: Record<string, any>;
  }>;
}

export interface AdvancedSettings {
  integration: {
    retryConfig: RetryConfig;
    rateLimits: Record<string, RateLimit>;
    circuitBreakers: Record<string, CircuitBreaker>;
    healthChecks: Array<{
      id: string;
      endpoint: string;
      interval: number;
      timeout: number;
      lastCheck?: string;
      status: 'healthy' | 'unhealthy';
    }>;
  };
  marketing: {
    abTests: ABTest[];
    leadScoring: LeadScore;
    segmentation: Array<{
      id: string;
      name: string;
      conditions: Record<string, any>;
      priority: number;
    }>;
    personalization: Array<{
      id: string;
      type: 'email' | 'sms' | 'web';
      rules: Record<string, any>;
      content: Record<string, any>;
    }>;
  };
  taskManagement: {
    workflows: TaskWorkflow[];
    templates: Array<{
      id: string;
      name: string;
      tasks: Array<{
        title: string;
        description: string;
        duration: number;
        priority: number;
      }>;
    }>;
    metrics: {
      averageCompletionTime: number;
      taskDistribution: Record<string, number>;
      teamPerformance: Record<string, {
        completed: number;
        overdue: number;
        inProgress: number;
      }>;
    };
  };
}