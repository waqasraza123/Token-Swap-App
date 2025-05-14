import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://images.pexels.com/photos/7788009/pexels-photo-7788009.jpeg' }}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <View style={styles.content}>
            <Text style={styles.title}>Mini DEX</Text>
            <Text style={styles.subtitle}>Decentralized Token Exchange</Text>
            
            <View style={styles.statsContainer}>
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>$2.5B+</Text>
                <Text style={styles.statLabel}>Total Volume</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>100K+</Text>
                <Text style={styles.statLabel}>Users</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Swap')}
            >
              <Text style={styles.buttonText}>Start Trading</Text>
            </TouchableOpacity>

            <View style={styles.features}>
              <Text style={styles.featureText}>• Instant Token Swaps</Text>
              <Text style={styles.featureText}>• Low Transaction Fees</Text>
              <Text style={styles.featureText}>• Secure Trading</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#e0e0e0',
    marginBottom: 30,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 40,
  },
  statBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 15,
    borderRadius: 10,
    width: width * 0.4,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#e0e0e0',
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  features: {
    alignItems: 'flex-start',
    width: '100%',
    paddingHorizontal: 20,
  },
  featureText: {
    color: '#ffffff',
    fontSize: 16,
    marginBottom: 10,
    opacity: 0.9,
  },
});