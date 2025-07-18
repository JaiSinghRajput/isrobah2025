/**
 * API Service for Aditya-L1 CME Detection System
 * 
 * Provides functions to interact with the FastAPI backend
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export interface AnalysisRequest {
  start_date: string;
  end_date: string;
  analysis_type?: 'full' | 'quick' | 'threshold_only';
  config_overrides?: Record<string, any>;
}

export interface ThresholdConfig {
  velocity_enhancement: number;
  density_enhancement: number;
  temperature_anomaly: number;
  combined_score_threshold: number;
}

export interface CMEEvent {
  datetime: string;
  speed: number;
  angular_width: number;
  source_location: string;
  estimated_arrival: string;
  confidence: number;
}

export interface AnalysisResult {
  cme_events: CMEEvent[];
  thresholds: Record<string, number>;
  performance_metrics: Record<string, number>;
  data_summary: Record<string, any>;
  charts_data: Record<string, any>;
}

export interface ParticleData {
  timestamps: string[];
  velocity: number[];
  density: number[];
  temperature: number[];
  flux: number[];
  units: {
    velocity: string;
    density: string;
    temperature: string;
    flux: string;
  };
}

export interface DataSummary {
  mission_status: string;
  data_coverage: string;
  last_update: string;
  total_cme_events: number;
  active_alerts: number;
  system_health: string;
}

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new ApiError(response.status, errorText);
  }

  return response.json();
}

export const api = {
  // Health check
  async healthCheck() {
    return apiRequest<{ status: string; timestamp: string; components: Record<string, boolean> }>('/health');
  },

  // Data summary
  async getDataSummary() {
    return apiRequest<DataSummary>('/api/data/summary');
  },

  // CME Analysis
  async analyzeCMEEvents(request: AnalysisRequest) {
    return apiRequest<AnalysisResult>('/api/analyze', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  },

  // Threshold optimization
  async optimizeThresholds(config: ThresholdConfig) {
    return apiRequest<{
      optimized_thresholds: Record<string, number>;
      optimization_method: string;
      confidence_score: number;
    }>('/api/thresholds/optimize', {
      method: 'POST',
      body: JSON.stringify(config),
    });
  },

  // Particle data for charts
  async getParticleData() {
    return apiRequest<ParticleData>('/api/charts/particle-data');
  },

  // File upload
  async uploadSWISData(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/api/data/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new ApiError(response.status, errorText);
    }

    return response.json();
  },
};

// React Query hooks for data fetching
export const useApi = () => {
  const { useQuery, useMutation, useQueryClient } = require('@tanstack/react-query');

  return {
    // Queries
    useHealthCheck: () => useQuery({
      queryKey: ['health'],
      queryFn: api.healthCheck,
      refetchInterval: 30000, // Check every 30 seconds
    }),

    useDataSummary: () => useQuery({
      queryKey: ['data-summary'],
      queryFn: api.getDataSummary,
      refetchInterval: 60000, // Update every minute
    }),

    useParticleData: () => useQuery({
      queryKey: ['particle-data'],
      queryFn: api.getParticleData,
      refetchInterval: 300000, // Update every 5 minutes
    }),

    // Mutations
    useAnalyzeCME: () => {
      const queryClient = useQueryClient();
      return useMutation({
        mutationFn: api.analyzeCMEEvents,
        onSuccess: (data) => {
          // Invalidate and refetch related queries
          queryClient.invalidateQueries({ queryKey: ['data-summary'] });
          queryClient.setQueryData(['analysis-result'], data);
        },
      });
    },

    useOptimizeThresholds: () => {
      const queryClient = useQueryClient();
      return useMutation({
        mutationFn: api.optimizeThresholds,
        onSuccess: (data) => {
          queryClient.setQueryData(['thresholds'], data.optimized_thresholds);
        },
      });
    },

    useUploadSWISData: () => {
      const queryClient = useQueryClient();
      return useMutation({
        mutationFn: api.uploadSWISData,
        onSuccess: () => {
          // Invalidate data-related queries
          queryClient.invalidateQueries({ queryKey: ['particle-data'] });
          queryClient.invalidateQueries({ queryKey: ['data-summary'] });
        },
      });
    },
  };
};

export { ApiError }; 