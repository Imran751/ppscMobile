import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const QuestionDetail = ({ route }) => {
  const { question } = route.params;  // Correctly receive the passed data

  if (!question) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No question data available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Details</Text>
      <Text style={styles.questionText}>{question.question}</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsText}>{question.details}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  questionText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  detailsContainer: {
    backgroundColor: '#eef1f5',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  detailsText: {
    fontSize: 14,
    color: '#4a5568',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
});

export default QuestionDetail;
