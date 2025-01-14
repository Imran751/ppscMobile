import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import auth from '@react-native-firebase/auth'; // Use React Native Firebase Auth
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import QuestionsCard from './src/components/QuestionsCard';
import QuestionDetail from './src/components/QuestionDetail';
import QuizScreen from './src/screens/Quiz';
import NotesScreen from './src/screens/Notes';
import AnnouncementsScreen from './src/screens/Announcements';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="QuestionsCard" component={QuestionsCard} options={{ headerShown: false }} />
      <Stack.Screen name="QuestionDetail" component={QuestionDetail} options={{ title: 'Question Details', headerShown: false }} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(setUser);
    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  return (
    <NavigationContainer>
      {user ? (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;
              if (route.name === 'Home') {
                iconName = 'home';
              } else if (route.name === 'Quiz') {
                iconName = 'format-list-bulleted';
              } else if (route.name === 'Notes') {
                iconName = 'notebook';
              } else if (route.name === 'Announcements') {
                iconName = 'bell';
              }
              return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: '#4CAF50',
            inactiveTintColor: 'gray',
          }}
        >
          <Tab.Screen name="Home" component={HomeStack} options={{ headerShown: false }} />
          <Tab.Screen name="Quiz" component={QuizScreen} options={{ headerShown: false }} />
          <Tab.Screen name="Notes" component={NotesScreen} options={{ headerShown: false }} />
          <Tab.Screen name="Announcements" component={AnnouncementsScreen} options={{ headerShown: false }} />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
