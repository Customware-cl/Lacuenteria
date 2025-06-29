export interface DateRange {
  from?: Date;
  to?: Date;
}

export interface GeneralUsageMetrics {
  activeUsers: number;
  storiesGenerated: number;
  charactersCreated: number;
}

export interface PromptPerformanceMetric {
  promptId: string | null;
  promptType: string | null;
  totalExecutions: number;
  successCount: number;
  totalInputTokens: number;
  totalOutputTokens: number;
  averageInputTokens: number;
  averageOutputTokens: number;
  averageResponseMs: number;
  totalCachedInputTokens: number;
  totalCachedOutputTokens: number;
  averageCachedInputTokens: number;
  averageCachedOutputTokens: number;
}

export interface TokenUsage {
  totalInputTokens: number;
  totalOutputTokens: number;
  averageInputTokens: number;
  averageOutputTokens: number;
}

export interface ModelUsageMetric {
  model: string;
  executions: number;
  successCount: number;
  averageResponseMs: number;
  totalInputTokens: number;
  totalOutputTokens: number;
  averageInputTokens: number;
  averageOutputTokens: number;
  totalCachedInputTokens: number;
  totalCachedOutputTokens: number;
  averageCachedInputTokens: number;
  averageCachedOutputTokens: number;
}

export interface ErrorBreakdownMetric {
  status: string;

  errorType?: string | null;

  count: number;
}

export interface UserUsageMetric {
  userId: string | null;
  userEmail?: string | null;
  executions: number;
  successCount: number;
  totalInputTokens: number;
  totalOutputTokens: number;
  averageInputTokens: number;
  averageOutputTokens: number;
  totalCachedInputTokens: number;
  totalCachedOutputTokens: number;
  averageCachedInputTokens: number;
  averageCachedOutputTokens: number;
}
