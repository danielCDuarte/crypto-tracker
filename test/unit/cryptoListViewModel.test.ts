import { CryptoListViewModel } from '../../src/core/presentation/viewModels/cryptoListViewModel';
import { CryptoCurrency } from '../../src/core/domain/entities/crypto';

describe('CryptoListViewModel', () => {
  let viewModel: CryptoListViewModel;

  beforeEach(() => {
    viewModel = new CryptoListViewModel();
  });

  it('should initialize with default values', () => {
    expect(viewModel.cryptos).toEqual([]);
    expect(viewModel.filteredCryptos).toEqual([]);
    expect(viewModel.isLoading).toBe(false);
    expect(viewModel.error).toBeNull();
    expect(viewModel.searchQuery).toBe('');
  });

  it('should filter cryptos based on search query', () => {
    const mockCryptos: CryptoCurrency[] = [
      {
        id: '1',
        symbol: 'BTC',
        name: 'Bitcoin',
        nameid: 'bitcoin',
        rank: 1,
        price_usd: '50000',
        percent_change_24h: '5',
        percent_change_1h: '1',
        percent_change_7d: '10',
        price_btc: '1',
        market_cap_usd: '1000000000',
        volume24: 500000000,
        volume24a: 500000000,
        csupply: '18000000',
        tsupply: '18000000',
        msupply: '21000000',
      },
      {
        id: '2',
        symbol: 'ETH',
        name: 'Ethereum',
        nameid: 'ethereum',
        rank: 2,
        price_usd: '3000',
        percent_change_24h: '3',
        percent_change_1h: '0.5',
        percent_change_7d: '7',
        price_btc: '0.06',
        market_cap_usd: '350000000',
        volume24: 200000000,
        volume24a: 200000000,
        csupply: '120000000',
        tsupply: '120000000',
        msupply: '',
      },
    ];

    viewModel.cryptos = mockCryptos;
    viewModel.setSearchQuery('bit');
    expect(viewModel.filteredCryptos.length).toBe(1);
    expect(viewModel.filteredCryptos[0].name).toBe('Bitcoin');

    viewModel.setSearchQuery('eth');
    expect(viewModel.filteredCryptos.length).toBe(1);
    expect(viewModel.filteredCryptos[0].name).toBe('Ethereum');

    viewModel.setSearchQuery('');
    expect(viewModel.filteredCryptos.length).toBe(2);
  });
});