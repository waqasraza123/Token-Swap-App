import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
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
    <ScrollView className="flex-1 bg-gray-900">
      <View className="p-6">
        <View className="bg-gray-800/50 rounded-3xl p-6">
          <Text className="text-2xl font-bold text-white mb-6 text-center">
            Swap Tokens
          </Text>
          
          <View className="mb-4">
            <Text className="text-gray-300 text-base mb-2 font-medium">
              From
            </Text>
            <TextInput
              className="bg-gray-700/50 rounded-xl p-4 text-white text-base"
              placeholder="Enter token address"
              placeholderTextColor="#9CA3AF"
              value={fromToken}
              onChangeText={setFromToken}
            />
          </View>
          
          <View className="mb-4">
            <Text className="text-gray-300 text-base mb-2 font-medium">
              To
            </Text>
            <TextInput
              className="bg-gray-700/50 rounded-xl p-4 text-white text-base"
              placeholder="Enter token address"
              placeholderTextColor="#9CA3AF"
              value={toToken}
              onChangeText={setToToken}
            />
          </View>
          
          <View className="mb-6">
            <Text className="text-gray-300 text-base mb-2 font-medium">
              Amount
            </Text>
            <TextInput
              className="bg-gray-700/50 rounded-xl p-4 text-white text-base"
              placeholder="Enter amount"
              placeholderTextColor="#9CA3AF"
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
            />
          </View>
          
          <TouchableOpacity 
            className="bg-blue-500 p-4 rounded-xl mb-6"
            style={{
              shadowColor: '#60A5FA',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 4.65,
              elevation: 8,
            }}
            onPress={handleSwap}
          >
            <Text className="text-white text-lg font-bold text-center">
              Swap Tokens
            </Text>
          </TouchableOpacity>

          <View className="bg-gray-700/30 rounded-xl p-4">
            <Text className="text-gray-400 text-sm mb-2">
              • Instant token swaps on Uniswap
            </Text>
            <Text className="text-gray-400 text-sm mb-2">
              • Best rates guaranteed
            </Text>
            <Text className="text-gray-400 text-sm">
              • Secure transactions
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}