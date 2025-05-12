import { CryptoListViewModel } from '../../../../../src/core/presentation/viewModels/cryptoListViewModel';
import { getCryptoUseCase } from '../../../../../src/core/di';
import { TestConstants } from '../../testConstants';
import { autorun, runInAction, configure } from 'mobx';

jest.mock('../../../../../src/core/di', () => ({
  getCryptoUseCase: {
    execute: jest.fn()
  }
}));

configure({ enforceActions: 'observed' });

describe('CryptoListViewModel', () => {
  let viewModel: CryptoListViewModel;

  beforeEach(() => {
    jest.clearAllMocks();
    viewModel = new CryptoListViewModel();
  });

  describe('initial state', () => {
    it('should initialize with empty cryptos array', () => {
      expect(viewModel.cryptos).toEqual([]);
    });

    it('should initialize with empty filteredCryptos array', () => {
      expect(viewModel.filteredCryptos).toEqual([]);
    });

    it('should initialize with isLoading false', () => {
      expect(viewModel.isLoading).toBe(false);
    });

    it('should initialize with null error', () => {
      expect(viewModel.error).toBeNull();
    });

    it('should initialize with empty searchQuery', () => {
      expect(viewModel.searchQuery).toBe('');
    });
  });

  describe('setSearchQuery', () => {
    it('should update searchQuery and trigger filtering', () => {
      runInAction(() => {
        viewModel.cryptos = [...TestConstants.mockCryptoData];
      });
      
      viewModel.setSearchQuery('bitcoin');
      
      expect(viewModel.searchQuery).toBe('bitcoin');
      expect(viewModel.filteredCryptos.length).toBe(1);
      expect(viewModel.filteredCryptos[0].name).toBe('Bitcoin');
    });
  });

  describe('filterCryptos', () => {
    beforeEach(() => {
      runInAction(() => {
        viewModel.cryptos = [...TestConstants.mockCryptoData];
      });
    });

    it('should return all cryptos when search is empty', () => {
      viewModel.setSearchQuery('');
      expect(viewModel.filteredCryptos.length).toBe(2);
    });

    it('should filter by name (case insensitive)', () => {
      viewModel.setSearchQuery('ethereum');
      expect(viewModel.filteredCryptos.length).toBe(1);
      expect(viewModel.filteredCryptos[0].name).toBe('Ethereum');
    });

    it('should filter by symbol (case insensitive)', () => {
      viewModel.setSearchQuery('btc');
      expect(viewModel.filteredCryptos.length).toBe(1);
      expect(viewModel.filteredCryptos[0].symbol).toBe('BTC');
    });

    it('should return empty array when no matches', () => {
      viewModel.setSearchQuery('xyz');
      expect(viewModel.filteredCryptos).toEqual([]);
    });
  });

  describe('loadCryptos', () => {
    it('should load cryptos successfully', async () => {
      (getCryptoUseCase.execute as jest.Mock).mockResolvedValue(TestConstants.mockCryptoData);
      
      await viewModel.loadCryptos();
      
      expect(viewModel.isLoading).toBe(false);
      expect(viewModel.error).toBeNull();
      expect(viewModel.cryptos).toEqual(TestConstants.mockCryptoData);
      expect(viewModel.filteredCryptos).toEqual(TestConstants.mockCryptoData);
    });

    it('should handle loading state correctly', async () => {
      (getCryptoUseCase.execute as jest.Mock).mockImplementation(
        () => new Promise(resolve => setTimeout(() => resolve(TestConstants.mockCryptoData), 100))
      );
      
      const loadPromise = viewModel.loadCryptos();
      
      expect(viewModel.isLoading).toBe(true);
      
      await loadPromise;
      
      expect(viewModel.isLoading).toBe(false);
    });

    it('should handle errors', async () => {
      (getCryptoUseCase.execute as jest.Mock).mockRejectedValue(new Error('API error'));
      
      await viewModel.loadCryptos();
      
      expect(viewModel.isLoading).toBe(false);
      expect(viewModel.error).toBe('Failed to load cryptocurrencies');
      expect(viewModel.cryptos).toEqual([]);
    });

    it('should filter cryptos after loading', async () => {
      (getCryptoUseCase.execute as jest.Mock).mockResolvedValue(TestConstants.mockCryptoData);
      viewModel.setSearchQuery('BTC');
      
      await viewModel.loadCryptos();
      
      expect(viewModel.filteredCryptos.length).toBe(1);
      expect(viewModel.filteredCryptos[0].symbol).toBe('BTC');
    });
  });

  describe('reactivity', () => {
    it('should react to cryptos changes', (done) => {
      const dispose = autorun(() => {
        if (viewModel.cryptos.length > 0) {
          expect(viewModel.cryptos[0].symbol).toBe('BTC');
          dispose();
          done();
        }
      });
      
      runInAction(() => {
        viewModel.cryptos = [TestConstants.mockCryptoData[0]];
      });
    });

    it('should react to filteredCryptos changes', (done) => {
      runInAction(() => {
        viewModel.cryptos = [...TestConstants.mockCryptoData];
      });
      
      const dispose = autorun(() => {
        if (viewModel.filteredCryptos.length === 1) {
          expect(viewModel.filteredCryptos[0].name).toBe('Bitcoin');
          dispose();
          done();
        }
      });
      
      viewModel.setSearchQuery('bitcoin');
    });
  });
});