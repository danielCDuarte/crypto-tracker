import { CryptoRepositoryImpl } from '../../../../../src/core/data/repositories/cryptoRepositoryImpl';
import { CryptoAPIDataSource } from '../../../../../src/core/data/datasources/cryptoAPIDataSource';
import { CryptoCurrency } from '../../../../../src/core/domain/entities/crypto';
import { TestConstants } from '../../testConstants';

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
      jest.spyOn(realDataSource, 'getCryptos').mockResolvedValue(TestConstants.mockCryptoData);
      const result = await repository.getCryptos();
      expect(result).toEqual(TestConstants.mockCryptoData);
    });

    it('should propagate errors from data source', async () => {
      const error = new Error('Network error');
      jest.spyOn(realDataSource, 'getCryptos').mockRejectedValue(TestConstants.errorCryptoData);
      await expect(repository.getCryptos()).rejects.toThrow(TestConstants.errorCryptoData);
    });
  });
});