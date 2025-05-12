import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CryptoCurrency } from '../../domain/entities/crypto';
import { Colors } from '../../../assets/Colors';

interface Props {
  crypto: CryptoCurrency;
  onPress: () => void;
}

export const ConstantsCryptoCard = {
  usdPrice: "USD $",
}

export const CryptoCard: React.FC<Props> = ({ crypto, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.symbolContainer}>
        <Text style={styles.symbol}>{crypto.symbol}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{crypto.name}</Text>
        <Text style={styles.price}>{ConstantsCryptoCard.usdPrice} {parseFloat(crypto.price_usd).toFixed(2)}</Text>
      </View>
      <View style={styles.changeContainer}>
        <Text
          style={[
            styles.change,
            parseFloat(crypto.percent_change_24h) >= 0
              ? styles.positive
              : styles.negative,
          ]}>
          {crypto.percent_change_24h}%
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grayLight,
    alignItems: 'center',
  },
  symbolContainer: {
    backgroundColor: Colors.grayLight,
    borderRadius: 20,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  symbol: {
    fontWeight: 'bold',
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  price: {
    color: Colors.grayDark,
  },
  changeContainer: {
    alignItems: 'flex-end',
  },
  change: {
    fontWeight: 'bold',
  },
  positive: {
    color: Colors.positiveGreen,
  },
  negative: {
    color: Colors.negativeRed,
  },
});