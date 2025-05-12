import { CryptoAPIDataSource } from '../../../../../src/core/data/datasources/cryptoAPIDataSource';
import { CryptoCurrency } from '../../../../../src/core/domain/entities/crypto';
import { TestDataConstants } from '../testDataConstants';

jest.mock('../../../../../src/utils/network/httpClient', () => {
  return {
    HttpClient: jest.fn().mockImplementation(() => ({
      request: jest.fn()
    }))
  };
});

describe('CryptoAPIDataSource', () => {
  let cryptoDataSource: CryptoAPIDataSource;
  let mockRequest: jest.Mock;

  beforeEach(() => {
    cryptoDataSource = new CryptoAPIDataSource();
    mockRequest = (cryptoDataSource as any).httpClient.request;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getCryptos', () => {
    it('should return cryptocurrency data when API call is successful', async () => {
      mockRequest.mockResolvedValue({ data: TestDataConstants.mockCryptoData });
      const result = await cryptoDataSource.getCryptos();
      
      expect(mockRequest).toHaveBeenCalledWith({
        method: 'GET',
        url: 'https://api.coinlore.net/api/tickers/'
      });
      expect(result[0].id).toBe('1');
    });

    it('should throw error when response data is invalid', async () => {
      mockRequest.mockResolvedValue({ data: TestDataConstants.nullCryptoData });
      await expect(cryptoDataSource.getCryptos()).rejects.toThrow(
        'Invalid response format from API'
      );
    });
  });
});