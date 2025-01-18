import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import SearchBar from './SearchBar';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SubjectCategories from './SubjectCategories';
import TopBar from './TopBar';

const QuestionsCard = () => {
  const [questions, setQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAnswerIndex, setShowAnswerIndex] = useState(null);
  const [showOptionsIndex, setShowOptionsIndex] = useState(null);
  const [doneStatus, setDoneStatus] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigation = useNavigation();

  const categories = ['All', 'General Knowledge', 'Pakistan Affairs', 'Islamic Studies', 'Current Affairs', 'Geography', 'Mathematics', 'English Grammar', 'Urdu', 'Everyday Science', 'Computer Skills', 'Extra'];

  const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // Retrieve done status from AsyncStorage
        const savedDoneStatus = await AsyncStorage.getItem('doneStatus');
        if (savedDoneStatus) {
          setDoneStatus(JSON.parse(savedDoneStatus));
        }

        // Check for cached data in AsyncStorage
        const cachedData = await AsyncStorage.getItem('cachedQuestions');
        if (cachedData) {
          const { data, timestamp } = JSON.parse(cachedData);
  
          // Check if cached data is still valid
          const now = new Date().getTime();
          if (now - timestamp < CACHE_DURATION) {
            // Use cached data if not expired
            const filteredData = selectedCategory === 'All'
              ? data
              : data.filter((item) => item.category === selectedCategory);
  
            setQuestions(filteredData);
            return; // Exit early if using cache
          }
        }
  
        // If no valid cache, fetch from remote URL
        const url = 'https://raw.githubusercontent.com/Imran751/courseWebsite/8b85b9b62e935ba9634851c593491f77c58ef39e/data.json';
        const response = await fetch(url);
        const data = await response.json();
  
        // Filter and set data
        const filteredData = selectedCategory === 'All'
          ? data
          : data.filter((item) => item.category === selectedCategory);
  
        setQuestions(filteredData);
  
        // Save fetched data with timestamp to AsyncStorage
        const cachedObject = {
          data,
          timestamp: new Date().getTime(),
        };
        await AsyncStorage.setItem('cachedQuestions', JSON.stringify(cachedObject));
  
        // Optionally clear old data
        await AsyncStorage.removeItem('doneStatus');
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    };
  
    fetchQuestions();
  }, [selectedCategory]);

  const filteredQuestions = questions.filter((question) => {
    return question.question.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleOptionClick = (option, answer) => {
    Alert.alert(option === answer ? 'Congratulations!' : "It's wrong");
  };

  const toggleDoneStatus = async (id) => {
    const newStatus = !doneStatus[id];
    const updatedStatus = { ...doneStatus, [id]: newStatus };
    setDoneStatus(updatedStatus);
    await AsyncStorage.setItem('doneStatus', JSON.stringify(updatedStatus));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TopBar />
      <SubjectCategories
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <View style={styles.questionsContainer}>
        {filteredQuestions.map((question, index) => (
          <View key={question.id} style={styles.questionCard}>
            <TouchableOpacity
              onPress={() => toggleDoneStatus(question.id)}
              style={[
                styles.doneButton,
                doneStatus[question.id] ? styles.doneActive : styles.doneInactive,
              ]}
            >
              <MaterialCommunityIcons
                name={doneStatus[question.id] ? 'check-circle' : 'circle'}
                size={20}
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
                style={[styles.optionButton, styles.showAnswerButton]}
                onPress={() => setShowAnswerIndex(showAnswerIndex === index ? null : index)}
              >
                <Text style={styles.optionButtonText}>
                  {showAnswerIndex === index ? 'Hide Answer' : 'Show Answer'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.optionButton, styles.showOptionsButton]}
                onPress={() => setShowOptionsIndex(showOptionsIndex === index ? null : index)}
              >
                <Text style={styles.optionButtonText}>
                  {showOptionsIndex === index ? 'Hide Options' : 'Show Options'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.optionButton, styles.detailsButton]}
                onPress={() => navigation.navigate('QuestionDetail', { question })}
              >
                <Text style={styles.optionButtonText}>Details</Text>
              </TouchableOpacity>
            </View>

            {showAnswerIndex === index && <Text style={styles.answerText}>Answer: {question.answer}</Text>}
            {showOptionsIndex === index && (
              <View style={styles.optionsContainer}>
                {question.options.map((option, i) => {
                  const optionLabel = String.fromCharCode(97 + i); // Generates a, b, c, d...
                  return (
                    <TouchableOpacity
                      key={i}
                      style={styles.optionItem}
                      onPress={() => handleOptionClick(option, question.answer)}
                    >
                      <Text style={styles.optionItemText}>
                        {optionLabel}) {option}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
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
    // padding: 16,
    // top: 20,
    backgroundColor: '#f4f4f4',
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
    shadowOpacity: 0.1, // Lighter shadow
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3, // Slightly reduced elevation for less emphasis
    marginHorizontal: 8,
  },
  doneButton: {
    position: 'absolute',
    top: -2,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
  },
  doneActive: {
    backgroundColor: '#E0E0E0', // Lighter color for active status
    borderRadius: 20,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  doneInactive: {
    backgroundColor: '#F4F4F4', // Very subtle inactive color
    borderRadius: 20,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  doneButtonText: {
    marginLeft: 6,
    color: '#888', // Softer text color
    fontWeight: '600',
    fontSize: 12,
  },
  questionText: {
    fontSize: 20, // Increased font size to emphasize question
    fontWeight: '700',
    marginBottom: 12,
    color: '#333', // Darker color to emphasize the question
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 16,
    marginTop: 20,
  },
  optionButton: {
    borderRadius: 8,
    paddingVertical: 10, // Smaller padding for less emphasis
    paddingHorizontal: 12,
    marginBottom: 8,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
    backgroundColor: '#F0F0F0', // Subtle button background
  },
  optionButtonText: {
    color: '#555', // Softer text color for the buttons
    fontWeight: '500', // Lighter weight
    fontSize: 12, // Slightly smaller size
  },
  
  // Unique styles for each button (softened)
  showAnswerButton: {
    backgroundColor: '#A7C6FF', // Lighter blue for Show Answer
  },
  showOptionsButton: {
    backgroundColor: '#A8DAB5', // Lighter green for Show Options
  },
  detailsButton: {
    backgroundColor: '#FFE082', // Lighter yellow for Details
  },
  answerText: {
    fontSize: 16,
    color: '#4CAF50',
    marginTop: 12,
    fontWeight: '600', // Keep it slightly more noticeable
  },
  optionsContainer: {
    marginTop: 12,
  },
  optionItem: {
    backgroundColor: '#D1D8E1', // Softer grey for options
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 8,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  optionItemText: {
    color: '#555', // Softer text color for options
    fontWeight: '500',
    fontSize: 12,
    marginLeft: 8,
  },
});

export default QuestionsCard;
