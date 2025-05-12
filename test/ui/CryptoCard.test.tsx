import React from 'react';
import { render } from '@testing-library/react-native';
import { CryptoCard } from '../../src/core/presentation/components/CryptoCard';
import { CryptoCurrency } from '../../src/core/domain/entities/crypto';

describe('CryptoCard', () => {
  const mockCrypto: CryptoCurrency = {
    id: '1',
    symbol: 'BTC',
    name: 'Bitcoin',
    nameid: 'bitcoin',
    rank: 1,
    price_usd: '50000.1234',
    percent_change_24h: '5.12',
    percent_change_1h: '1.23',
    percent_change_7d: '10.45',
    price_btc: '1',
    market_cap_usd: '1000000000',
    volume24: 500000000,
    volume24a: 500000000,
    csupply: '18000000',
    tsupply: '18000000',
    msupply: '21000000',
  };

  it('renders correctly with positive change', () => {
    const { getByText } = render(<CryptoCard crypto={mockCrypto} />);

    expect(getByText('BTC')).toBeTruthy();
    expect(getByText('Bitcoin')).toBeTruthy();
    expect(getByText('$50000.12')).toBeTruthy();
    expect(getByText('5.12%')).toBeTruthy();
  });

  it('renders correctly with negative change', () => {
    const negativeCrypto = { ...mockCrypto, percent_change_24h: '-5.12' };
    const { getByText } = render(<CryptoCard crypto={negativeCrypto} />);

    expect(getByText('-5.12%')).toBeTruthy();
  });
});