import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { db } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';  // Import query and where for category filtering
import SearchBar from './SearchBar';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';  // Import AsyncStorage
import { MaterialCommunityIcons } from '@expo/vector-icons';  // Optional: for custom icons

const QuestionsCard = () => {
  const [questions, setQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAnswerIndex, setShowAnswerIndex] = useState(null);
  const [showOptionsIndex, setShowOptionsIndex] = useState(null);
  const [doneStatus, setDoneStatus] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('All');  // State to manage selected category
  const navigation = useNavigation();

  const categories = ['All', 'General Knowledge', 'Pakistan Affairs', 'English Grammar', 'Islamic Studies', 'Extra'];

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        let quizQuery = collection(db, 'quizzes');

        if (selectedCategory !== 'All') {
          quizQuery = query(quizQuery, where('category', '==', selectedCategory));  // Filter by category
        }

        const quizSnapshot = await getDocs(quizQuery);
        const quizData = quizSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setQuestions(quizData);

        // Retrieve saved done status from AsyncStorage
        const savedStatus = JSON.parse(await AsyncStorage.getItem('doneStatus')) || {};
        setDoneStatus(savedStatus);
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    };

    fetchQuestions();
  }, [selectedCategory]);  // Re-fetch questions when the selected category changes

  const filteredQuestions = questions.filter((question) => {
    return question.question.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleOptionClick = (option, answer) => {
    Alert.alert(option === answer ? 'Congratulations!' : "It's wrong");
  };

  const toggleDoneStatus = async (id) => {
    const newStatus = !doneStatus[id];
    const updatedStatus = {
      ...doneStatus,
      [id]: newStatus,
    };
    setDoneStatus(updatedStatus);

    // Save the updated done status to AsyncStorage
    await AsyncStorage.setItem('doneStatus', JSON.stringify(updatedStatus));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Scrollable Category Filter */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>

        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.categoryButtonActive,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryButtonText,
                selectedCategory === category && styles.categoryButtonTextActive,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Search Bar */}
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Questions List */}
      <View style={styles.questionsContainer}>
        {filteredQuestions.map((question, index) => (
          <View
            key={question.id}
            style={styles.questionCard}
          >
            {/* Done Button with sleek toggle design */}
            <TouchableOpacity
              onPress={() => toggleDoneStatus(question.id)}
              style={[
                styles.doneButton,
                doneStatus[question.id] ? styles.doneActive : styles.doneInactive,
              ]}
            >
              <MaterialCommunityIcons
                name={doneStatus[question.id] ? 'check-circle' : 'circle'}
                size={20} // Reduced icon size
                color={doneStatus[question.id] ? '#4CAF50' : '#888'}
              />
              <Text style={styles.doneButtonText}>
                {doneStatus[question.id] ? 'Done' : 'Not Done'}
              </Text>
            </TouchableOpacity>

            <Text style={styles.questionText}>
              {index + 1}. {question.question}
            </Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.optionButton, { backgroundColor: '#007BFF' }]}
                onPress={() =>
                  setShowAnswerIndex(showAnswerIndex === index ? null : index)
                }
              >
                <Text style={styles.optionButtonText}>Answer</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.optionButton, { backgroundColor: '#28A745' }]}
                onPress={() =>
                  setShowOptionsIndex(showOptionsIndex === index ? null : index)
                }
              >
                <Text style={styles.optionButtonText}>Options</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.optionButton, { backgroundColor: '#FFC107' }]}
                onPress={() => navigation.navigate('QuestionDetail', { question })}
              >
                <Text style={styles.optionButtonText}>Details</Text>
              </TouchableOpacity>
            </View>

            {showAnswerIndex === index && (
              <Text style={styles.answerText}>Answer: {question.answer}</Text>
            )}

            {showOptionsIndex === index && (
              <View style={styles.optionsContainer}>
                {question.options.map((option, i) => (
                  <TouchableOpacity
                    key={i}
                    style={[styles.optionButton, { backgroundColor: '#6C757D' }]}
                    onPress={() => handleOptionClick(option, question.answer)}
                  >
                    <Text style={styles.optionButtonText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f4f4f4',
  },
  categoryContainer: {
    marginBottom: 16,
    marginTop: 8,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    marginRight: 8,
  },
  categoryButtonActive: {
    backgroundColor: '#007BFF',
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  categoryButtonTextActive: {
    color: '#ffffff',
  },
  questionsContainer: {
    marginBottom: 16,
  },
  questionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    paddingTop: 30,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  doneButton: {
    position: 'absolute',
    top: -2, // Adjusted positioning to prevent overlapping
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
  },
  doneActive: {
    backgroundColor: 'pink',
    borderRadius: 20,
    padding: 4, // Reduced padding for smaller button size
    justifyContent: 'center',
    alignItems: 'center',
  },
  doneInactive: {
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    padding: 4, // Reduced padding for smaller button size
    justifyContent: 'center',
    alignItems: 'center',
  },
  doneButtonText: {
    marginLeft: 6, // Adjusted margin for smaller button text
    color: 'black',
    fontWeight: '600',
    fontSize: 12, // Reduced font size
  },
  questionText: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 16,
    marginTop: 20,
  },
  optionButton: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 8,
    width: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 12,
  },
  answerText: {
    fontSize: 16,
    color: '#4CAF50',
    marginTop: 12,
  },
  optionsContainer: {
    marginTop: 12,
  },
});

export default QuestionsCard;
