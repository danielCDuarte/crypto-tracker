import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CryptoListScreen } from '../screens/CryptoListScreen';
import { CryptoDetailScreen } from '../screens/CryptoDetailScreen';
import { CryptoListViewModel } from '../viewModels/cryptoListViewModel';
import { CryptoDetailViewModel } from '../viewModels/cryptoDetailViewModel';

export type RootStackParamList = {
  CryptoList: undefined;
  CryptoDetail: { cryptoId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

interface AppNavigatorProps {
  cryptoListViewModel: CryptoListViewModel;
  cryptoDetailViewModel: CryptoDetailViewModel;
}

export const AppNavigator: React.FC<AppNavigatorProps> = ({
  cryptoListViewModel,
  cryptoDetailViewModel,
}) => {
  return (
    <Stack.Navigator initialRouteName="CryptoList">
      <Stack.Screen name="CryptoList" options={{ title: 'Cryptocurrencies' }}>
        {(props) => (
          <CryptoListScreen
            {...props}
            viewModel={cryptoListViewModel}
            onSelectCrypto={(crypto) => {
              cryptoDetailViewModel.crypto = crypto;
              props.navigation.navigate('CryptoDetail');
            }}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="CryptoDetail" options={{ title: 'Details' }}>
        {(props) => (
          <CryptoDetailScreen
            {...props}
            viewModel={cryptoDetailViewModel}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};