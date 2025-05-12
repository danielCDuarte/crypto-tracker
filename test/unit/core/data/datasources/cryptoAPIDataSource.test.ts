import { CryptoAPIDataSource } from '../../../../../src/core/data/datasources/cryptoAPIDataSource';
import { CryptoCurrency } from '../../../../../src/core/domain/entities/crypto';

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

  const mockCryptoData = [
    {
      id: '1',
      symbol: 'BTC',
      name: 'Bitcoin',
      nameid: 'bitcoin',
      rank: 1,
      price_usd: '50000.00',
      percent_change_24h: '5.00',
      percent_change_1h: '0.50',
      percent_change_7d: '10.00',
      price_btc: '1.00000000',
      market_cap_usd: '1000000000000',
      volume24: 50000000000,
      volume24a: 45000000000,
      csupply: '18000000.00',
      tsupply: '21000000',
      msupply: '21000000'
    }
  ];

  beforeEach(() => {
    cryptoDataSource = new CryptoAPIDataSource();
    mockRequest = (cryptoDataSource as any).httpClient.request;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getCryptos', () => {
    it('should return cryptocurrency data when API call is successful', async () => {
      mockRequest.mockResolvedValue({ data: mockCryptoData });
      const result = await cryptoDataSource.getCryptos();
      
      expect(mockRequest).toHaveBeenCalledWith({
        method: 'GET',
        url: 'https://api.coinlore.net/api/tickers/'
      });
      expect(result[0].id).toBe('1');
    });

    it('should throw error when response data is invalid', async () => {
      mockRequest.mockResolvedValue({ data: null });
      await expect(cryptoDataSource.getCryptos()).rejects.toThrow(
        'Invalid response format from API'
      );
    });
  });
});