import { CryptoCurrency } from '../../domain/entities/crypto';

export interface CryptoDTO {
  id: string;
  symbol: string;
  name: string;
  nameid: string;
  rank: number;
  price_usd: string;
  percent_change_24h: string;
  percent_change_1h: string;
  percent_change_7d: string;
  price_btc: string;
  market_cap_usd: string;
  volume24: number;
  volume24a: number;
  csupply: string;
  tsupply: string;
  msupply: string;
}

export const mapToDomain = (dto: CryptoDTO): CryptoCurrency => {
  return {
    id: dto.id,
    symbol: dto.symbol,
    name: dto.name,
    nameid: dto.nameid,
    rank: dto.rank,
    price_usd: dto.price_usd,
    percent_change_24h: dto.percent_change_24h,
    percent_change_1h: dto.percent_change_1h,
    percent_change_7d: dto.percent_change_7d,
    price_btc: dto.price_btc,
    market_cap_usd: dto.market_cap_usd,
    volume24: dto.volume24,
    volume24a: dto.volume24a,
    csupply: dto.csupply,
    tsupply: dto.tsupply,
    msupply: dto.msupply,
  };
};