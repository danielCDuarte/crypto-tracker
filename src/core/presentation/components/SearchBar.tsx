import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Colors } from '../../../assets/Colors';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<Props> = ({ value, onChangeText, placeholder = 'Search...' }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.grayDark}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: Colors.backgroundColor,
  },
  input: {
    height: 40,
    borderColor: Colors.grayLight,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: Colors.backgroundColor,
  },
});