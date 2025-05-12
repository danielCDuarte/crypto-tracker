import { makeAutoObservable, action, runInAction } from 'mobx';
import { getCryptoUseCase } from '../../di';
import { CryptoCurrency } from '../../domain/entities/crypto';

export class CryptoListViewModel {
  cryptos: CryptoCurrency[] = [];
  filteredCryptos: CryptoCurrency[] = [];
  isLoading = false;
  error: string | null = null;
  searchQuery = '';

  constructor() {
    makeAutoObservable(this, {
      setSearchQuery: action,
      filterCryptos: action,
      loadCryptos: action,
    });
  }

  setSearchQuery = action((query: string) => {
    this.searchQuery = query;
    this.filterCryptos();
  });

  filterCryptos = action(() => {
    if (this.searchQuery.trim() === '') {
      this.filteredCryptos = this.cryptos;
    } else {
      const query = this.searchQuery.toLowerCase();
      this.filteredCryptos = this.cryptos.filter(
        (crypto) =>
          crypto.name.toLowerCase().includes(query) ||
          crypto.symbol.toLowerCase().includes(query)
      );
    }
  });

  loadCryptos = action(async () => {
    this.isLoading = true;
    this.error = null;
    try {
      const data = await getCryptoUseCase.execute();
      runInAction(() => {
        this.cryptos = data;
        this.filterCryptos();
      });
      
    } catch (err) {
      runInAction(() => {
        this.error = 'Failed to load cryptocurrencies';
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  });
}