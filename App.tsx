import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CryptoListViewModel } from './src/core/presentation/viewModels/cryptoListViewModel';
import { CryptoDetailViewModel } from './src/core/presentation/viewModels/cryptoDetailViewModel';
import { AppNavigator } from './src/core/presentation/navigation/AppNavigator';

const cryptoListViewModel = new CryptoListViewModel();
const cryptoDetailViewModel = new CryptoDetailViewModel();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppNavigator
          cryptoListViewModel={cryptoListViewModel}
          cryptoDetailViewModel={cryptoDetailViewModel}
        />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}