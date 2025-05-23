import { CryptoCurrency } from '../../../src/core/domain/entities/crypto';

export class TestConstants {
  static get mockCryptoData(): CryptoCurrency[] {
    return [
      {
        id: '1',
        symbol: 'BTC',
        name: 'Bitcoin',
        nameid: 'bitcoin',
        rank: 1,
        price_usd: '50000.00',
        percent_change_24h: '5.00',
        percent_change_1h: '0.50',
        percent_change_7d: '10.00',
        price_btc: '1.00000000',
        market_cap_usd: '1000000000000',
        volume24: 50000000000,
        volume24a: 45000000000,
        csupply: '18000000.00',
        tsupply: '21000000',
        msupply: '21000000'
      }, 
      {
        id: '2',
        symbol: 'ETH',
        name: 'Ethereum',
        nameid: 'ethereum',
        rank: 2,
        price_usd: '3000.00',
        percent_change_24h: '3.00',
        percent_change_1h: '0.30',
        percent_change_7d: '7.00',
        price_btc: '0.06000000',
        market_cap_usd: '300000000000',
        volume24: 30000000000,
        volume24a: 28000000000,
        csupply: '120000000.00',
        tsupply: '',
        msupply: ''
      }
    ];
  }

  static get mockCrypto(): CryptoCurrency {
    return {
        id: '1',
        symbol: 'BTC',
        name: 'Bitcoin',
        nameid: 'bitcoin',
        rank: 1,
        price_usd: '50000.00',
        percent_change_24h: '5.00',
        percent_change_1h: '0.50',
        percent_change_7d: '10.00',
        price_btc: '1.00000000',
        market_cap_usd: '1000000000000',
        volume24: 50000000000,
        volume24a: 45000000000,
        csupply: '18000000.00',
        tsupply: '21000000',
        msupply: '21000000'
      };
  }

  static get emptyCryptoData(): CryptoCurrency[] {
    return [];
  }

  static get nullCryptoData(): null {
    return null;
  }

  static get errorCryptoData(): Error {
    return new Error('Network error');
  }
}