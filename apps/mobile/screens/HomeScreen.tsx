import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import "../global.css";

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }: Props) {
  return (
    <View className="flex-1 bg-gray-900">
      <View className="flex-1 p-6 items-center justify-center">
        <Text className="text-5xl font-bold text-white mb-2 text-center">
          Mini DEX
        </Text>
        <Text className="text-lg text-gray-300 mb-8 text-center">
          Decentralized Token Exchange
        </Text>
        
        <View className="flex-row justify-around w-full mb-10">
          <View className="bg-gray-800/50 p-4 rounded-xl w-[45%]">
            <Text className="text-2xl font-bold text-white mb-1 text-center">
              $2.5B+
            </Text>
            <Text className="text-gray-400 text-center">
              Total Volume
            </Text>
          </View>
          <View className="bg-gray-800/50 p-4 rounded-xl w-[45%]">
            <Text className="text-2xl font-bold text-white mb-1 text-center">
              100K+
            </Text>
            <Text className="text-gray-400 text-center">
              Users
            </Text>
          </View>
        </View>

        <TouchableOpacity
          className="bg-blue-500 px-8 py-4 rounded-2xl mb-8 shadow-lg"
          style={{
            shadowColor: '#60A5FA',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 4.65,
            elevation: 8,
          }}
          onPress={() => navigation.navigate('Swap')}
        >
          <Text className="text-lg font-bold text-white">
            Start Trading
          </Text>
        </TouchableOpacity>

        <View className="w-full px-4">
          <Text className="text-gray-300 text-base mb-3">
            • Instant Token Swaps
          </Text>
          <Text className="text-gray-300 text-base mb-3">
            • Low Transaction Fees
          </Text>
          <Text className="text-gray-300 text-base mb-3">
            • Secure Trading
          </Text>
        </View>
      </View>
    </View>
  );
}