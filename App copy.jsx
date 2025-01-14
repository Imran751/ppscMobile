import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ScrollView, View } from 'react-native';
import QuestionsCard from './src/components/QuestionsCard';
import QuestionDetail from './src/components/QuestionDetail';
import TopBar from './src/components/TopBar';

const Stack = createStackNavigator();

export default function App() {
  const userName = 'John Doe'; // Replace with dynamic user data

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="QuestionsCard">
        <Stack.Screen
          name="QuestionsCard"
          component={QuestionsCard}
          options={{
            headerShown: false, // Hide default header
          }}
        />
        <Stack.Screen
          name="QuestionDetail"
          component={QuestionDetail}
          options={{
            title: 'Question Details',
            headerShown: false, // Hide default header
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
