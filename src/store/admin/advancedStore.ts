import { create } from 'zustand';
import { AdvancedSettings, ABTest, TaskWorkflow } from '../../types/admin/advanced';

interface AdvancedState {
  settings: AdvancedSettings;
  loading: boolean;
  error: string | null;
  
  // Integration Management
  updateRetryConfig: (config: Partial<AdvancedSettings['integration']['retryConfig']>) => Promise<void>;
  checkRateLimit: (key: string) => boolean;
  updateCircuitBreaker: (key: string, failure: boolean) => void;
  runHealthChecks: () => Promise<void>;

  // Marketing Features
  createABTest: (test: Omit<ABTest, 'id'>) => Promise<void>;
  updateABTestMetrics: (testId: string, variantId: string, metrics: Partial<ABTest['variants'][0]['metrics']>) => Promise<void>;
  calculateLeadScore: (userData: Record<string, any>) => number;
  getPersonalizedContent: (userId: string, contentType: string) => Record<string, any>;

  // Task Management
  createWorkflow: (workflow: Omit<TaskWorkflow, 'id'>) => Promise<void>;
  updateWorkflowStep: (workflowId: string, stepId: string, status: TaskWorkflow['steps'][0]['status']) => Promise<void>;
  getTaskMetrics: (timeRange: 'day' | 'week' | 'month') => Record<string, number>;
}

export const useAdvancedStore = create<AdvancedState>((set, get) => ({
  settings: {
    integration: {
      retryConfig: {
        maxAttempts: 5,
        initialDelay: 1000,
        maxDelay: 30000,
        backoffFactor: 2,
      },
      rateLimits: {},
      circuitBreakers: {},
      healthChecks: [],
    },
    marketing: {
      abTests: [],
      leadScoring: {
        rules: [],
        thresholds: {
          cold: 30,
          warm: 60,
          hot: 90,
        },
      },
      segmentation: [],
      personalization: [],
    },
    taskManagement: {
      workflows: [],
      templates: [],
      metrics: {
        averageCompletionTime: 0,
        taskDistribution: {},
        teamPerformance: {},
      },
    },
  },
  loading: false,
  error: null,

  updateRetryConfig: async (config) => {
    set(state => ({
      settings: {
        ...state.settings,
        integration: {
          ...state.settings.integration,
          retryConfig: {
            ...state.settings.integration.retryConfig,
            ...config,
          },
        },
      },
    }));
  },

  checkRateLimit: (key) => {
    const { settings } = get();
    const limit = settings.integration.rateLimits[key];
    if (!limit) return true;

    const now = Date.now();
    if (now - limit.windowStart > limit.windowMs) {
      // Reset window
      set(state => ({
        settings: {
          ...state.settings,
          integration: {
            ...state.settings.integration,
            rateLimits: {
              ...state.settings.integration.rateLimits,
              [key]: {
                ...limit,
                currentRequests: 1,
                windowStart: now,
              },
            },
          },
        },
      }));
      return true;
    }

    if (limit.currentRequests >= limit.maxRequests) {
      return false;
    }

    // Increment request count
    set(state => ({
      settings: {
        ...state.settings,
        integration: {
          ...state.settings.integration,
          rateLimits: {
            ...state.settings.integration.rateLimits,
            [key]: {
              ...limit,
              currentRequests: limit.currentRequests + 1,
            },
          },
        },
      },
    }));
    return true;
  },

  updateCircuitBreaker: (key, failure) => {
    const { settings } = get();
    const breaker = settings.integration.circuitBreakers[key];
    if (!breaker) return;

    const now = new Date().toISOString();
    if (failure) {
      const newFailureCount = breaker.failureCount + 1;
      const newStatus = newFailureCount >= breaker.failureThreshold ? 'open' : breaker.status;

      set(state => ({
        settings: {
          ...state.settings,
          integration: {
            ...state.settings.integration,
            circuitBreakers: {
              ...state.settings.integration.circuitBreakers,
              [key]: {
                ...breaker,
                failureCount: newFailureCount,
                lastFailure: now,
                status: newStatus,
              },
            },
          },
        },
      }));
    } else {
      set(state => ({
        settings: {
          ...state.settings,
          integration: {
            ...state.settings.integration,
            circuitBreakers: {
              ...state.settings.integration.circuitBreakers,
              [key]: {
                ...breaker,
                failureCount: 0,
                status: 'closed',
              },
            },
          },
        },
      }));
    }
  },

  runHealthChecks: async () => {
    const { settings } = get();
    set({ loading: true });

    try {
      const results = await Promise.all(
        settings.integration.healthChecks.map(async (check) => {
          try {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), check.timeout);

            const response = await fetch(check.endpoint, {
              signal: controller.signal,
            });
            clearTimeout(timeout);

            return {
              ...check,
              lastCheck: new Date().toISOString(),
              status: response.ok ? 'healthy' : 'unhealthy',
            };
          } catch {
            return {
              ...check,
              lastCheck: new Date().toISOString(),
              status: 'unhealthy',
            };
          }
        })
      );

      set(state => ({
        settings: {
          ...state.settings,
          integration: {
            ...state.settings.integration,
            healthChecks: results,
          },
        },
        loading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  createABTest: async (test) => {
    set(state => ({
      settings: {
        ...state.settings,
        marketing: {
          ...state.settings.marketing,
          abTests: [
            ...state.settings.marketing.abTests,
            {
              id: `test-${Date.now()}`,
              ...test,
            },
          ],
        },
      },
    }));
  },

  updateABTestMetrics: async (testId, variantId, metrics) => {
    set(state => ({
      settings: {
        ...state.settings,
        marketing: {
          ...state.settings.marketing,
          abTests: state.settings.marketing.abTests.map(test =>
            test.id === testId
              ? {
                  ...test,
                  variants: test.variants.map(variant =>
                    variant.id === variantId
                      ? {
                          ...variant,
                          metrics: { ...variant.metrics, ...metrics },
                        }
                      : variant
                  ),
                }
              : test
          ),
        },
      },
    }));
  },

  calculateLeadScore: (userData) => {
    const { settings } = get();
    let score = 0;

    for (const rule of settings.marketing.leadScoring.rules) {
      // Evaluate rule condition against userData
      // This is a simplified example
      if (eval(rule.condition)) {
        score += rule.points;
      }
    }

    return score;
  },

  getPersonalizedContent: (userId, contentType) => {
    const { settings } = get();
    const relevantRules = settings.marketing.personalization.filter(
      p => p.type === contentType
    );

    // Find the first matching rule and return its content
    for (const rule of relevantRules) {
      // Evaluate rules against user data
      // This is a simplified example
      return rule.content;
    }

    return {};
  },

  createWorkflow: async (workflow) => {
    set(state => ({
      settings: {
        ...state.settings,
        taskManagement: {
          ...state.settings.taskManagement,
          workflows: [
            ...state.settings.taskManagement.workflows,
            {
              id: `workflow-${Date.now()}`,
              ...workflow,
            },
          ],
        },
      },
    }));
  },

  updateWorkflowStep: async (workflowId, stepId, status) => {
    set(state => ({
      settings: {
        ...state.settings,
        taskManagement: {
          ...state.settings.taskManagement,
          workflows: state.settings.taskManagement.workflows.map(workflow =>
            workflow.id === workflowId
              ? {
                  ...workflow,
                  steps: workflow.steps.map(step =>
                    step.id === stepId
                      ? { ...step, status }
                      : step
                  ),
                }
              : workflow
          ),
        },
      },
    }));
  },

  getTaskMetrics: (timeRange) => {
    const { settings } = get();
    // Calculate and return metrics based on timeRange
    return settings.taskManagement.metrics.taskDistribution;
  },
}));