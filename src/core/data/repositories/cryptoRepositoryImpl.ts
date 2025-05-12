import { CryptoAPIDataSource } from '../datasources/cryptoAPIDataSource';
import { CryptoRepository } from '../../domain/repositories/cryptoRepository';
import { CryptoCurrency } from '../../domain/entities/crypto';

export class CryptoRepositoryImpl implements CryptoRepository {
  constructor(private readonly dataSource: CryptoAPIDataSource) {}
  async getCryptos(): Promise<CryptoCurrency[]> {
    return await this.dataSource.getCryptos();
  }
}