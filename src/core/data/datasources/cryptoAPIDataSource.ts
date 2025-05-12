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
    let url = `${BASE_URL}/tickers/`
    const result = await this.httpClient.request({ method: 'GET', url: url });
    return result.data.map((crypto: CryptoDTO) => mapToDomain(crypto));
  }
}