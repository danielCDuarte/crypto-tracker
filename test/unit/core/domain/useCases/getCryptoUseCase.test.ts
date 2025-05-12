import { GetCryptoUseCase } from '../../../../../src/core/domain/useCases/getCryptoUseCase';
import { CryptoRepository } from '../../../../../src/core/domain/repositories/cryptoRepository';
import { CryptoCurrency } from '../../../../../src/core/domain/entities/crypto';
import { TestConstants } from '../../testConstants';
const mockRepository: jest.Mocked<CryptoRepository> = {
  getCryptos: jest.fn()
};

describe('GetCryptoUseCase', () => {
  let getCryptosUseCase: GetCryptoUseCase;
  beforeEach(() => {
    getCryptosUseCase = new GetCryptoUseCase(mockRepository);
    jest.clearAllMocks();
  });

  describe('execute', () => {
    it('should return cryptocurrency data from repository', async () => {
        mockRepository.getCryptos.mockResolvedValue(TestConstants.mockCryptoData);
        const result = await getCryptosUseCase.execute();
        expect(mockRepository.getCryptos).toHaveBeenCalledTimes(1);
        expect(result).toEqual(TestConstants.mockCryptoData);
    });

    it('should return empty array when repository returns empty array', async () => {
        mockRepository.getCryptos.mockResolvedValue(TestConstants.emptyCryptoData);
        const result = await getCryptosUseCase.execute();
        expect(result).toEqual(TestConstants.emptyCryptoData);
        expect(mockRepository.getCryptos).toHaveBeenCalledTimes(1);
    });

    it('should propagate errors from repository', async () => {
        mockRepository.getCryptos.mockRejectedValue(TestConstants.errorCryptoData);
        await expect(getCryptosUseCase.execute()).rejects.toThrow(TestConstants.errorCryptoData);
        expect(mockRepository.getCryptos).toHaveBeenCalledTimes(1);
    });

    it('should call repository exactly once', async () => {
        mockRepository.getCryptos.mockResolvedValue(TestConstants.mockCryptoData);
        await getCryptosUseCase.execute();
        expect(mockRepository.getCryptos).toHaveBeenCalledTimes(1);
    });
  });
});