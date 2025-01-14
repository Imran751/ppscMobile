import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, ActivityIndicator } from 'react-native';
import { useAuthState } from 'react-firebase-hooks/auth'; // Firebase hook
import { auth } from './src/firebase'; // Firebase auth instance
import TopBar from './src/components/TopBar';
import SubjectCategories from './src/components/SubjectCategories';
import QuestionsCard from './src/components/QuestionsCard';
import Quiz from './src/screens/Quiz'
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';

// Create a Stack Navigator
const Stack = createStackNavigator();

const App = () => {
  const [user, loading] = useAuthState(auth); // Get the current user and loading state

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Login Page */}
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />

        {/* Sign Up Page */}
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{ headerShown: false }}
        />

        {/* Main Page - Requires Authentication */}
        <Stack.Screen
          name="Home"
          component={user ? HomeScreen : Login}
          options={{ headerShown: false }}
        />

        {/* Quiz Page - Requires Authentication */}
        <Stack.Screen
          name="Quiz"
          component={user ? Quiz : Login}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// HomeScreen is the main content screen
const HomeScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#f0f0f0' }}>
      <TopBar />
      <View style={{ padding: 20 }}>
        <SubjectCategories />
        <QuestionsCard />
      </View>
    </View>
  );
};

export default App;
