import { CryptoRepository } from '../repositories/cryptoRepository';
import { CryptoCurrency } from '../entities/crypto';

export class GetCryptoUseCase {
  constructor(private readonly cryptoRepository: CryptoRepository) {}

  async execute(): Promise<CryptoCurrency[]> {
    return await this.cryptoRepository.getCryptos();
  }
}