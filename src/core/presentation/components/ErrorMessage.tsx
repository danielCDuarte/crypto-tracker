import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<Props> = ({ message, onRetry }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
      {onRetry && (
        <Text style={styles.retry} onPress={onRetry}>
          Try Again
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  message: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  retry: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});