export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface HttpClientConfig {
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
}

export interface HttpRequestConfig {
  url: string;
  method?: HttpMethod;
  data?: any;
  params?: any;
  headers?: Record<string, string>;
}

export interface HttpResponse<T = any> {
  status: number;
  data: T;
  headers: any;
}

export interface HttpError {
  message: string;
  status?: number;
  code?: string;
  isNetworkError: boolean;
  isTimeout: boolean;
}