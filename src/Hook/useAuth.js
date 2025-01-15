import { useEffect } from 'react';
import { useNavigation, NavigationContainerRefContext } from '@react-navigation/native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAuth = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!NavigationContainerRefContext?.current) {
        console.warn('Navigator not ready yet.');
        return;
      }

      if (user) {
        await AsyncStorage.setItem('user', JSON.stringify(user));
        navigation.replace('Home'); // Ensure "Home" is correctly registered.
      } else {
        await AsyncStorage.removeItem('user');
        navigation.replace('Login');
      }
    });

    return () => unsubscribe();
  }, [navigation]);
};
