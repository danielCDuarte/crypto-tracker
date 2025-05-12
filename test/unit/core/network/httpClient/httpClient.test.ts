// test/unit/core/network/httpClient/httpClient.test.ts
import { HttpClient } from '../../../../../src/utils/network/httpClient';
import axios, { AxiosInstance } from 'axios';

jest.mock('axios');

const mockAxiosInstance: Partial<AxiosInstance> = {
  interceptors: {
    request: { use: jest.fn() },
    response: { use: jest.fn() }
  },
  defaults: {
    baseURL: '',
    headers: { common: {} }
  },
  request: jest.fn(),
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
};

describe('HttpClient', () => {
  let httpClient: HttpClient;
  const baseURL = 'https://api.example.com';

  beforeEach(() => {
    // Create mock instance first
    (axios.create as jest.Mock).mockReturnValue(mockAxiosInstance);
    
    // Then create HttpClient with the mock instance
    httpClient = new HttpClient(baseURL);
    
    // Clear all mocks
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