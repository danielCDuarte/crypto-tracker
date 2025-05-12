import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Colors } from '../../../assets/Colors';

export const LoadingIndicator: React.FC = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.blueDark} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});