// Common types used across the application

export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface ApiError {
  message: string;
  statusCode: number;
  error?: string;
}

// Re-export domain types
export * from './auth';
export * from './admin';
