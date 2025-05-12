import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { observer } from 'mobx-react-lite';
import { CryptoDetailViewModel } from '../viewModels/cryptoDetailViewModel';
import { LoadingIndicator } from '../components/LoadingIndicator';
import { ErrorMessage } from '../components/ErrorMessage';

interface Props {
  viewModel: CryptoDetailViewModel;
}

export const CryptoDetailScreen: React.FC<Props> = observer(({ viewModel }) => {

  if (viewModel.isLoading && !viewModel.crypto) {
    return <LoadingIndicator />;
  }

  if (viewModel.error) {
    return <ErrorMessage message={viewModel.error} />;
  }

  if (!viewModel.crypto) {
    return <ErrorMessage message="No cryptocurrency data available" />;
  }

  const crypto = viewModel.crypto;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.name}>{crypto.name}</Text>
        <Text style={styles.symbol}>{crypto.symbol}</Text>
      </View>

      <View style={styles.priceContainer}>
        <Text style={styles.price}>USD ${parseFloat(crypto.price_usd).toFixed(2)}</Text>
        <Text
          style={[
            styles.change,
            parseFloat(crypto.percent_change_24h) >= 0 ? styles.positive : styles.negative,
          ]}>
          {crypto.percent_change_24h}% (24h)
        </Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Rank:</Text>
        <Text style={styles.detailValue}>{crypto.rank}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Market Cap:</Text>
        <Text style={styles.detailValue}>${crypto.market_cap_usd}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>24h Volume:</Text>
        <Text style={styles.detailValue}>${crypto.volume24.toFixed(2)}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Price in BTC:</Text>
        <Text style={styles.detailValue}>{crypto.price_btc}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Circulating Supply:</Text>
        <Text style={styles.detailValue}>{crypto.csupply}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Total Supply:</Text>
        <Text style={styles.detailValue}>{crypto.tsupply || 'N/A'}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Max Supply:</Text>
        <Text style={styles.detailValue}>{crypto.msupply || 'N/A'}</Text>
      </View>
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  symbol: {
    fontSize: 18,
    color: '#666',
  },
  priceContainer: {
    marginBottom: 24,
    alignItems: 'center',
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  change: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  positive: {
    color: 'green',
  },
  negative: {
    color: 'red',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  detailLabel: {
    fontSize: 16,
    color: '#666',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});