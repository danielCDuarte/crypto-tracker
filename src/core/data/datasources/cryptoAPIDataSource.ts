import axios from 'axios';
import { CryptoDTO, mapToDomain } from '../dtos/cryptoDTO';
import { CryptoCurrency } from '../../domain/entities/crypto';

const BASE_URL = 'https://api.coinlore.net/api';

export class CryptoAPIDataSource {
  async getCryptos(): Promise<CryptoCurrency[]> {
    let url = `${BASE_URL}/tickers/`
    const response = await axios.get(url);
    return response.data.data.map((crypto: CryptoDTO) => mapToDomain(crypto));
  }

  async getCryptoDetail(id: string): Promise<CryptoCurrency> {
    let url = `${BASE_URL}/ticker/?id=${id}`
    const response = await axios.get(url);
    return mapToDomain(response.data);
  }
}