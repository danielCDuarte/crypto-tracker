import { CryptoAPIDataSource } from './data/datasources/cryptoAPIDataSource';
import { CryptoRepositoryImpl } from './data/repositories/cryptoRepositoryImpl';
import { GetCryptos } from './domain/useCases/getCryptos';


// Datasources
const cryptoAPIDataSource = new CryptoAPIDataSource();

// Repositories
const cryptoRepository = new CryptoRepositoryImpl(cryptoAPIDataSource);

// UseCases
export const getCryptos = new GetCryptos(cryptoRepository);