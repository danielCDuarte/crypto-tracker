import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';
import { CryptoListViewModel } from '../viewModels/cryptoListViewModel';
import { CryptoCurrency } from '../../domain/entities/crypto';
import { CryptoCard } from '../components/CryptoCard';
import { SearchBar } from '../components/SearchBar';
import { LoadingIndicator } from '../components/LoadingIndicator';
import { ErrorMessage } from '../components/ErrorMessage';
import { Colors } from '../../../assets/Colors';

interface Props {
  viewModel: CryptoListViewModel;
  onSelectCrypto: (id: CryptoCurrency) => void;
}

export const ConstantsCryptoListScreen = {
  placeholderSearch: 'Search crypto ...'
}

export const CryptoListScreen: React.FC<Props> = observer(({ viewModel, onSelectCrypto }) => {
  useEffect(() => {
    viewModel.loadCryptos();
  }, []);

  if (viewModel.isLoading && viewModel.cryptos.length === 0) {
    return <LoadingIndicator />;
  }

  if (viewModel.error) {
    return <ErrorMessage message={viewModel.error} onRetry={() => viewModel.loadCryptos()} />;
  }

  return (
    <View style={styles.container}>
      <SearchBar
        value={viewModel.searchQuery}
        onChangeText={(text) => viewModel.setSearchQuery(text)}
        placeholder = {ConstantsCryptoListScreen.placeholderSearch}
      />
      <FlatList
        data={viewModel.filteredCryptos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CryptoCard crypto={item} onPress ={() => onSelectCrypto(item)} />
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  listContent: {
    paddingBottom: 16,
  },
});