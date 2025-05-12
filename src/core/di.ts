import { CryptoAPIDataSource } from './data/datasources/cryptoAPIDataSource';
import { CryptoRepositoryImpl } from './data/repositories/cryptoRepositoryImpl';
import { GetCryptoUseCase } from './domain/useCases/getCryptoUseCase';


// Datasources
const cryptoAPIDataSource = new CryptoAPIDataSource();

// Repositories
const cryptoRepository = new CryptoRepositoryImpl(cryptoAPIDataSource);

// UseCases
export const getCryptoUseCase = new GetCryptoUseCase(cryptoRepository);