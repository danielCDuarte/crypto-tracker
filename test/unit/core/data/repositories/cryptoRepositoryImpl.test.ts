import { CryptoRepositoryImpl } from '../../../../../src/core/data/repositories/cryptoRepositoryImpl';
import { CryptoAPIDataSource } from '../../../../../src/core/data/datasources/cryptoAPIDataSource';
import { CryptoCurrency } from '../../../../../src/core/domain/entities/crypto';
import { TestDataConstants } from '../testDataConstants';

describe('CryptoRepositoryImpl', () => {
  let repository: CryptoRepositoryImpl;
  let realDataSource: CryptoAPIDataSource;
  

  beforeEach(() => {
    realDataSource = new CryptoAPIDataSource();
    repository = new CryptoRepositoryImpl(realDataSource);
    jest.clearAllMocks();
  });

  describe('getCryptos', () => {
    it('should return cryptocurrency data from data source', async () => {
      jest.spyOn(realDataSource, 'getCryptos').mockResolvedValue(TestDataConstants.mockCryptoData);
      const result = await repository.getCryptos();
      expect(result).toEqual(TestDataConstants.mockCryptoData);
    });

    it('should propagate errors from data source', async () => {
      const error = new Error('Network error');
      jest.spyOn(realDataSource, 'getCryptos').mockRejectedValue(TestDataConstants.errorCryptoData);
      await expect(repository.getCryptos()).rejects.toThrow(TestDataConstants.errorCryptoData);
    });
  });
});