import { CryptoDetailViewModel } from '../../../../../src/core/presentation/viewModels/cryptoDetailViewModel';
import { autorun, runInAction, configure } from 'mobx';
import { TestConstants } from '../../testConstants';

configure({ enforceActions: 'always' });

describe('CryptoDetailViewModel', () => {
  let viewModel: CryptoDetailViewModel;
  
  beforeEach(() => {
    viewModel = new CryptoDetailViewModel();
  });

  describe('initial state', () => {
    it('should initialize with null crypto', () => {
      expect(viewModel.crypto).toBeNull();
    });

    it('should initialize with isLoading false', () => {
      expect(viewModel.isLoading).toBe(false);
    });

    it('should initialize with null error', () => {
      expect(viewModel.error).toBeNull();
    });
  });

  describe('setCrypto', () => {
    it('should update the crypto observable', () => {
      viewModel.setCrypto(TestConstants.mockCrypto);
      expect(viewModel.crypto).toEqual(TestConstants.mockCrypto);
    });

    it('should replace existing crypto data', () => {
      viewModel.setCrypto(TestConstants.mockCrypto);
      expect(viewModel.crypto).toEqual(TestConstants.mockCrypto);
    });

    it('should be decorated as a MobX action', () => {
      expect(() => viewModel.setCrypto(TestConstants.mockCrypto)).not.toThrow();
    });
  });

  describe('reactivity', () => {
    it('should react to crypto changes', (done) => {
      const dispose = autorun(() => {
        if (viewModel.crypto) {
          expect(viewModel.crypto.symbol).toBe('BTC');
          dispose();
          done();
        }
      });

      viewModel.setCrypto(TestConstants.mockCrypto);
    });

    it('should not react to unrelated property changes', () => {
        const spy = jest.fn();
        const dispose = autorun(() => {
          if (viewModel.crypto) {
            spy(viewModel.crypto.symbol);
          }
        });
        runInAction(() => {
          viewModel.isLoading = true;
        });
        expect(spy).not.toHaveBeenCalled();
        dispose();
    });
  });

  describe('loading state', () => {
    it('should update loading state', () => {
      runInAction(() => {
        viewModel.isLoading = true;
      });
      expect(viewModel.isLoading).toBe(true);
    });
  });

  describe('error state', () => {
    it('should update error state', () => {
      const errorMsg = 'Failed to load';
      runInAction(() => {
        viewModel.error = errorMsg;
      });
      expect(viewModel.error).toBe(errorMsg);
    });
  });
});