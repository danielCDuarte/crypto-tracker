import axios from 'axios';
import { CryptoDTO, mapToDomain } from '../dtos/cryptoDTO';
import { CryptoCurrency } from '../../domain/entities/crypto';
import { HttpClient } from '../../../utils/network/httpClient';

const BASE_URL = 'https://api.coinlore.net/api';

export class CryptoAPIDataSource {

  private httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient(BASE_URL);
  }

  async getCryptos(): Promise<CryptoCurrency[]> {
    const url = `${BASE_URL}/tickers/`;
    const response = await this.httpClient.request<{ data: CryptoDTO[] }>({ 
      method: 'GET', 
      url: url 
    });
    if (!Array.isArray(response?.data)) {
      throw new Error('Invalid response format from API');
    }
    return response.data.map(mapToDomain);
  }
}