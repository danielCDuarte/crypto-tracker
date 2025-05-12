import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { observer } from 'mobx-react-lite';
import { CryptoDetailViewModel } from '../viewModels/cryptoDetailViewModel';
import { LoadingIndicator } from '../components/LoadingIndicator';
import { ErrorMessage } from '../components/ErrorMessage';
import { Colors } from '../../../assets/Colors';

interface Props {
  viewModel: CryptoDetailViewModel;
}

export const ConstantsCryptoDetailScreen = {
  errorMessage: 'No cryptocurrency data available',
  usdPrice: "USD $",
  nOrA: "'N/A'",
  rank: "Rank:",
  marketCap: "Market Cap:",
  volume24h: "24h Volume:",
  priceBtc: "Price in BTC:",
  circulatingSupply: "Circulating Supply:",
  totalSupply: "Total Supply:",
  maxSupply: "Max Supply:"
}

export const CryptoDetailScreen: React.FC<Props> = observer(({ viewModel }) => {

  if (viewModel.isLoading && !viewModel.crypto) {
    return <LoadingIndicator />;
  }

  if (viewModel.error) {
    return <ErrorMessage message={viewModel.error} />;
  }

  if (!viewModel.crypto) {
    return <ErrorMessage message={ConstantsCryptoDetailScreen.errorMessage} />;
  }

  const crypto = viewModel.crypto;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.name}>{crypto.name}</Text>
        <Text style={styles.symbol}>{crypto.symbol}</Text>
      </View>

      <View style={styles.priceContainer}>
        <Text style={styles.price}>{ConstantsCryptoDetailScreen.usdPrice} {parseFloat(crypto.price_usd).toFixed(2)}</Text>
        <Text
          style={[
            styles.change,
            parseFloat(crypto.percent_change_24h) >= 0 ? styles.positive : styles.negative,
          ]}>
          {crypto.percent_change_24h}% (24h)
        </Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>{ConstantsCryptoDetailScreen.rank}</Text>
        <Text style={styles.detailValue}>{crypto.rank}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>{ConstantsCryptoDetailScreen.marketCap}</Text>
        <Text style={styles.detailValue}>${crypto.market_cap_usd}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>{ConstantsCryptoDetailScreen.volume24h}</Text>
        <Text style={styles.detailValue}>${crypto.volume24.toFixed(2)}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>{ConstantsCryptoDetailScreen.priceBtc}</Text>
        <Text style={styles.detailValue}>{crypto.price_btc}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>{ConstantsCryptoDetailScreen.circulatingSupply}</Text>
        <Text style={styles.detailValue}>{crypto.csupply}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>{ConstantsCryptoDetailScreen.totalSupply}</Text>
        <Text style={styles.detailValue}>{crypto.tsupply || ConstantsCryptoDetailScreen.nOrA}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>{ConstantsCryptoDetailScreen.maxSupply}</Text>
        <Text style={styles.detailValue}>{crypto.msupply || ConstantsCryptoDetailScreen.nOrA}</Text>
      </View>
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
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
    color: Colors.grayDark,
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
    color: Colors.positiveGreen,
  },
  negative: {
    color: Colors.negativeRed,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grayLight,
  },
  detailLabel: {
    fontSize: 16,
    color: Colors.grayDark,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});