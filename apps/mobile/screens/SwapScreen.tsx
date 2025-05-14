import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

export default function SwapScreen() {
  const [fromToken, setFromToken] = useState('');
  const [toToken, setToToken] = useState('');
  const [amount, setAmount] = useState('');

  const handleSwap = async () => {
    try {
      const response = await fetch(`http://localhost:9001/swap/tokens?fromToken=${fromToken}&toToken=${toToken}&amount=${amount}&user=${fromToken}`);
      const data = await response.json();
      
      if (data.status === 'success') {
        Alert.alert('Success', 'Swap executed successfully!');
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to execute swap');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Swap Tokens</Text>
      
      <TextInput
        style={styles.input}
        placeholder="From Token Address"
        value={fromToken}
        onChangeText={setFromToken}
      />
      
      <TextInput
        style={styles.input}
        placeholder="To Token Address"
        value={toToken}
        onChangeText={setToToken}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      
      <TouchableOpacity style={styles.button} onPress={handleSwap}>
        <Text style={styles.buttonText}>Swap</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});