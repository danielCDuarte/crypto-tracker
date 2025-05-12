import { CryptoRepositoryImpl } from '../../../../../src/core/data/repositories/cryptoRepositoryImpl';
import { CryptoAPIDataSource } from '../../../../../src/core/data/datasources/cryptoAPIDataSource';
import { CryptoCurrency } from '../../../../../src/core/domain/entities/crypto';

describe('CryptoRepositoryImpl', () => {
  let repository: CryptoRepositoryImpl;
  let realDataSource: CryptoAPIDataSource;
  
  const mockCryptoData: CryptoCurrency[] = [
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
    realDataSource = new CryptoAPIDataSource();
    repository = new CryptoRepositoryImpl(realDataSource);
    jest.clearAllMocks();
  });

  describe('getCryptos', () => {
    it('should return cryptocurrency data from data source', async () => {
      jest.spyOn(realDataSource, 'getCryptos').mockResolvedValue(mockCryptoData);
      const result = await repository.getCryptos();
      expect(result).toEqual(mockCryptoData);
    });

    it('should propagate errors from data source', async () => {
      const error = new Error('Network error');
      jest.spyOn(realDataSource, 'getCryptos').mockRejectedValue(error);
      await expect(repository.getCryptos()).rejects.toThrow(error);
    });
  });
});