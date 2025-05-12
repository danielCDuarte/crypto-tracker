import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

export class HttpError extends Error {
  constructor(
    public message: string,
    public status?: number,
    public isNetworkError?: boolean,
    public isTimeout?: boolean
  ) {
    super(message);
  }
}

export class HttpClient {
  public instance: AxiosInstance;
  private defaultConfig: AxiosRequestConfig;

  constructor(baseURL: string, instance?: AxiosInstance) {
    this.defaultConfig = { baseURL };
    this.instance = instance || axios.create(this.defaultConfig);
    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.instance.interceptors.request.use(
      (config) => {
        console.log(`[HTTP] ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  public async request<T>(config: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.instance.request<T>(config);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      const httpError = new HttpError(
        axiosError.message,
        axiosError.response?.status
      );
    
      if (axiosError.code === 'ECONNABORTED') {
        httpError.isTimeout = true;
      }  
      throw httpError;
    }
  }

  public setBaseURL(baseURL: string) {
    this.defaultConfig.baseURL = baseURL;
    this.instance.defaults.baseURL = baseURL;
  }

  public setHeader(key: string, value: string) {
    this.instance.defaults.headers.common[key] = value;
  }

  public removeHeader(key: string) {
    delete this.instance.defaults.headers.common[key];
  }
}
