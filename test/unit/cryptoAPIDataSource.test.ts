import axios from 'axios';
import { CryptoAPIDataSource } from '../../src/core/data/datasources/cryptoAPIDataSource';
import { CryptoCurrency } from '../../src/core/domain/entities/crypto';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('CryptoAPIDataSource', () => {
  let dataSource: CryptoAPIDataSource;

  beforeEach(() => {
    dataSource = new CryptoAPIDataSource();
    jest.clearAllMocks();
  });

  describe('getCryptos', () => {
    it('should return mapped cryptocurrencies', async () => {
      const mockResponse = {
        data: {
          data: [
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
          ],
        },
      };

      mockedAxios.get.mockResolvedValue(mockResponse);

      const result = await dataSource.getCryptos();

      expect(result).toEqual([
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
      ]);
      expect(mockedAxios.get).toHaveBeenCalledWith('https://api.coinlore.net/api/tickers/');
    });
  });

  describe('getCryptoDetail', () => {
    it('should return mapped cryptocurrency detail', async () => {
      const mockResponse = {
        data: [
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
        ],
      };

      mockedAxios.get.mockResolvedValue(mockResponse);

      const result = await dataSource.getCryptoDetail('1');

      expect(result).toEqual({
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
      });
      expect(mockedAxios.get).toHaveBeenCalledWith('https://api.coinlore.net/api/ticker/?id=1');
    });
  });
});