import { CryptoCurrency } from '../entities/crypto';

export interface CryptoRepository {
  getCryptos(): Promise<CryptoCurrency[]>;
}