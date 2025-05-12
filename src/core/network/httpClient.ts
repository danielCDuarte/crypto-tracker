import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import {
  HttpMethod,
  HttpClientConfig,
  HttpRequestConfig,
  HttpResponse,
  HttpError
} from './httpClient.types';

export class HttpClient {
  private instance;
  private defaultConfig: HttpClientConfig;

  constructor(config: HttpClientConfig) {
    this.defaultConfig = {
      timeout: 10000,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      ...config
    };

    this.instance = axios.create(this.defaultConfig);
    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.instance.interceptors.request.use(
      (config) => {
        console.log(`[HTTP] ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => this.handleError(error)
    );

    this.instance.interceptors.response.use(
      (response) => response,
      (error) => this.handleError(error)
    );
  }

  private handleError(error: AxiosError): Promise<HttpError> {
    const httpError: HttpError = {
      message: error.message,
      status: error.response?.status,
      code: error.code,
      isNetworkError: !error.response,
      isTimeout: error.code === 'ECONNABORTED'
    };

    console.error('[HTTP] Error:', httpError);
    return Promise.reject(httpError);
  }

  public async request<T = any>(config: HttpRequestConfig): Promise<HttpResponse<T>> {
    const axiosConfig: AxiosRequestConfig = {
      url: config.url,
      method: config.method || 'GET',
      data: config.data,
      params: config.params,
      headers: {
        ...this.defaultConfig.headers,
        ...config.headers
      },
      timeout: this.defaultConfig.timeout
    };

    try {
      const response = await this.instance.request(axiosConfig);
      return {
        status: response.status,
        data: response.data,
        headers: response.headers
      };
    } catch (error) {
      throw this.normalizeError(error as AxiosError);
    }
  }

  private normalizeError(error: AxiosError): HttpError {
    return {
      message: error.message,
      status: error.response?.status,
      code: error.code,
      isNetworkError: !error.response,
      isTimeout: error.code === 'ECONNABORTED'
    };
  }

  public async get<T = any>(url: string, params?: any, headers?: any) {
    return this.request<T>({ url, method: 'GET', params, headers });
  }

  public async post<T = any>(url: string, data?: any, headers?: any) {
    return this.request<T>({ url, method: 'POST', data, headers });
  }

  public async put<T = any>(url: string, data?: any, headers?: any) {
    return this.request<T>({ url, method: 'PUT', data, headers });
  }

  public async delete<T = any>(url: string, headers?: any) {
    return this.request<T>({ url, method: 'DELETE', headers });
  }

  public setBaseURL(baseURL: string) {
    this.defaultConfig.baseURL = baseURL;
    this.instance.defaults.baseURL = baseURL;
  }

  public setHeader(key: string, value: string) {
    this.defaultConfig.headers = {
      ...this.defaultConfig.headers,
      [key]: value
    };
    this.instance.defaults.headers.common[key] = value;
  }

  public removeHeader(key: string) {
    delete this.defaultConfig.headers?.[key];
    delete this.instance.defaults.headers.common[key];
  }
}