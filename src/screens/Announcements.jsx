import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Clipboard } from 'react-native';

const DeveloperIntroScreen = () => {
  const jazzCashNumber = '03006509123'; // Replace with your JazzCash number

  const handleCopy = () => {
    Clipboard.setString(jazzCashNumber);
    alert('JazzCash number copied to clipboard!'); // Alert the user that the number is copied
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Show Some Love!</Text>
      <Text style={styles.message}>Enjoying the app? Help fuel my creativity with a JazzCash boost!</Text>

      <Text style={styles.jazzCashNumber}>{jazzCashNumber}</Text>

      <TouchableOpacity style={styles.copyButton} onPress={handleCopy}>
        <Text style={styles.copyButtonText}>Copy My JazzCash Number</Text>
      </TouchableOpacity>

      <Text style={styles.instructions}>
        Open your JazzCash app and send me a little something to keep the magic going. 🪄✨
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7FA',
    paddingTop: 20,
    paddingHorizontal: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: '#7F8C8D',
    textAlign: 'center',
    marginBottom: 20,
  },
  jazzCashNumber: {
    fontSize: 24,
    color: '#2C3E50',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  copyButton: {
    backgroundColor: '#1E90FF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginBottom: 20,
  },
  copyButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  instructions: {
    fontSize: 16,
    color: '#7F8C8D',
    textAlign: 'center',
  },
});

export default DeveloperIntroScreen;
