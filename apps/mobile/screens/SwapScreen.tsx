import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

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
      <View style={styles.card}>
        <Text style={styles.title}>Swap Tokens</Text>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>From</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter token address"
            placeholderTextColor="#666"
            value={fromToken}
            onChangeText={setFromToken}
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>To</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter token address"
            placeholderTextColor="#666"
            value={toToken}
            onChangeText={setToToken}
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Amount</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter amount"
            placeholderTextColor="#666"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
          />
        </View>
        
        <TouchableOpacity 
          style={styles.button}
          onPress={handleSwap}
        >
          <Text style={styles.buttonText}>Swap Tokens</Text>
        </TouchableOpacity>

        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>• Instant token swaps on Uniswap</Text>
          <Text style={styles.infoText}>• Best rates guaranteed</Text>
          <Text style={styles.infoText}>• Secure transactions</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 20,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: width - 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    color: '#ffffff',
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    color: '#ffffff',
    fontSize: 16,
    width: '100%',
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#2196F3',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoContainer: {
    marginTop: 24,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 12,
  },
  infoText: {
    color: '#e0e0e0',
    fontSize: 14,
    marginBottom: 8,
    opacity: 0.9,
  },
});