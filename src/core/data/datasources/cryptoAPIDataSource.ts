import axios from 'axios';
import { CryptoDTO, mapToDomain } from '../dtos/cryptoDTO';
import { CryptoCurrency } from '../../domain/entities/crypto';
import { HttpClient } from '../../network/httpClient';

const BASE_URL = 'https://api.coinlore.net/api';

export class CryptoAPIDataSource {

  private httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient({
      baseURL: BASE_URL
    });
  }

  async getCryptos(): Promise<CryptoCurrency[]> {
    let url = `${BASE_URL}/tickers/`
    const response = await this.httpClient.get(url);
    return response.data.data.map((crypto: CryptoDTO) => mapToDomain(crypto));
  }
}