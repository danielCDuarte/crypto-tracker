// test/unit/core/network/httpClient/httpClient.test.ts
import { HttpClient } from '../../../../src/utils/network/httpClient';
import axios, { AxiosInstance } from 'axios';

jest.mock('axios');

const mockInterceptor = {
  use: jest.fn(),
  eject: jest.fn(),
  clear: jest.fn()
};

const mockHeadersDefaults = {
  common: {},
  delete: {},
  get: {},
  head: {},
  post: {},
  put: {},
  patch: {}
};

const mockAxiosInstance: Partial<AxiosInstance> & { 
  defaults: { headers: typeof mockHeadersDefaults } 
} = {
  interceptors: {
    request: {
      use: jest.fn(),
      eject: jest.fn(),
      clear: jest.fn()
    },
    response: {
      use: jest.fn(),
      eject: jest.fn(),
      clear: jest.fn()
    }
  },
  defaults: {
    baseURL: '',
    headers: mockHeadersDefaults,
    adapter: jest.fn(),
    transformRequest: [],
    transformResponse: [],
    timeout: 0,
    xsrfCookieName: '',
    xsrfHeaderName: ''
  },
  request: jest.fn(),
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
  head: jest.fn(),
  patch: jest.fn()
} as unknown as AxiosInstance;

describe('HttpClient', () => {
  let httpClient: HttpClient;
  const baseURL = 'https://api.example.com';

  beforeEach(() => {
    (axios.create as jest.Mock).mockReturnValue(mockAxiosInstance);
    httpClient = new HttpClient(baseURL);
    jest.clearAllMocks();
  });

  describe('request', () => {
    it('should make a successful GET request', async () => {
      const mockData = { data: 'test' };
      (mockAxiosInstance.request as jest.Mock).mockResolvedValue({ data: mockData });

      const result = await httpClient.request({ method: 'GET', url: '/test' });
      expect(result).toEqual(mockData);
    });

    it('should handle network errors', async () => {
      const networkError = new Error('Network Error');
      (mockAxiosInstance.request as jest.Mock).mockRejectedValue(networkError);

      await expect(httpClient.request({ method: 'GET', url: '/test' }))
        .rejects.toThrow('Network Error');
    });

    it('should handle timeout errors', async () => {
      const timeoutError = {
        code: 'ECONNABORTED',
        message: 'timeout',
        isAxiosError: true,
        config: {}
      };
      (mockAxiosInstance.request as jest.Mock).mockRejectedValue(timeoutError);

      await expect(httpClient.request({ method: 'GET', url: '/test' }))
      .rejects.toMatchObject({
        message: 'timeout',
        isTimeout: true
      });
    });
  });

  describe('configuration', () => {
    it('should update base URL', () => {
      const newURL = 'https://new-api.example.com';
      httpClient.setBaseURL(newURL);
      expect(mockAxiosInstance.defaults?.baseURL).toBe(newURL);
    });

    it('should add and remove headers', () => {
      const key = 'Authorization';
      const value = 'Bearer token';
      
      httpClient.setHeader(key, value);
      expect(mockAxiosInstance.defaults?.headers?.common[key]).toBe(value);
      
      httpClient.removeHeader(key);
      expect(mockAxiosInstance.defaults?.headers?.common[key]).toBeUndefined();
    });
  });
});