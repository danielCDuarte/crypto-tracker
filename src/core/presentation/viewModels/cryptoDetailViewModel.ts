import { makeAutoObservable, action, runInAction } from 'mobx';
import { CryptoCurrency } from '../../domain/entities/crypto';

export class CryptoDetailViewModel {
  crypto: CryptoCurrency | null = null;
  isLoading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this, {
      setCrypto: action
    });
  }

  setCrypto = action((crypto: CryptoCurrency) => {
    this.crypto = crypto;
  });
}