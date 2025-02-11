export interface Webhook {
  id: string;
  name: string;
  url: string;
  events: string[];
  active: boolean;
  createdAt: string;
  lastTriggered?: string;
  failureCount: number;
}

export interface CronJob {
  id: string;
  name: string;
  description: string;
  schedule: string;
  lastRun?: string;
  nextRun?: string;
  status: 'active' | 'paused' | 'failed';
  failureCount: number;
}

export interface ExternalIntegration {
  id: string;
  type: 'crm' | 'financial' | 'marketing' | 'calendar' | 'automation';
  provider: string;
  config: Record<string, any>;
  status: 'connected' | 'disconnected' | 'error';
  lastSync?: string;
}

export interface IntegrationSettings {
  webhooks: Webhook[];
  cronJobs: CronJob[];
  externalIntegrations: ExternalIntegration[];
  apiKeys: {
    id: string;
    name: string;
    key: string;
    permissions: string[];
    createdAt: string;
    lastUsed?: string;
  }[];
}