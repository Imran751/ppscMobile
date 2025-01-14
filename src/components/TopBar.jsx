import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Modal, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import * as ImagePicker from 'expo-image-picker';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';

const TopBar = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [avatarModalVisible, setAvatarModalVisible] = useState(false);
  const [hamburgerModalVisible, setHamburgerModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserName(userData.name || 'User');
            await AsyncStorage.setItem('userName', userData.name || 'User');
          } else {
            console.log('No such user document!');
            const cachedName = await AsyncStorage.getItem('userName');
            setUserName(cachedName || 'User');
          }

          const avatar = await AsyncStorage.getItem('userAvatar') || 'default-avatar';
          setUserAvatar(avatar);
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setUserName('Guest');
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const toggleAvatarModal = () => {
    setAvatarModalVisible(!avatarModalVisible);
  };

  const toggleHamburgerModal = () => {
    setHamburgerModalVisible(!hamburgerModalVisible);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      await AsyncStorage.clear();
      navigation.replace('Login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const handleChangeAvatar = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Permission to access media library is required!');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (result.canceled) {
        console.log('User cancelled the picker');
        return;
      }

      const selectedImageUri = result.assets[0].uri;

      if (selectedImageUri) {
        await AsyncStorage.setItem('userAvatar', selectedImageUri);
        setUserAvatar(selectedImageUri);
        Alert.alert('Success', 'Avatar updated successfully!');
        toggleAvatarModal();
      } else {
        Alert.alert('Error', 'No image selected.');
      }

    } catch (error) {
      console.error('Error while picking image:', error);
      Alert.alert('Error', 'Something went wrong while updating avatar.');
    }
  };

  return (
    <SafeAreaView style={styles.topBarContainer}>
      <TouchableOpacity onPress={toggleHamburgerModal} style={styles.hamburgerButton}>
        <MaterialCommunityIcons name="menu" size={30} color="#000" />
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="small" color="#000" />
      ) : (
        <Text style={styles.welcomeText}>Welcome, {userName}</Text>
      )}

      <TouchableOpacity onPress={toggleAvatarModal}>
        <Image
          source={userAvatar && userAvatar !== 'default-avatar' ? { uri: userAvatar } : require('../../assets/imge.png')}
          style={styles.userAvatar}
        />
      </TouchableOpacity>

      {/* Avatar Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={avatarModalVisible}
        onRequestClose={toggleAvatarModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>User Options</Text>
            <Image
              source={userAvatar && userAvatar !== 'default-avatar' ? { uri: userAvatar } : require('../../assets/imge.png')}
              style={styles.modalAvatar}
            />
            <Text style={styles.modalText}>Name: {userName}</Text>

            <TouchableOpacity onPress={handleChangeAvatar} style={styles.modalOptionButton}>
              <Text style={styles.modalOptionText}>Change Avatar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout} style={styles.modalOptionButton}>
              <Text style={styles.modalOptionText}>Logout</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={toggleAvatarModal} style={styles.closeButton}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Hamburger Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={hamburgerModalVisible}
        onRequestClose={toggleHamburgerModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Menu Options</Text>

            <TouchableOpacity onPress={() => navigation.navigate('Settings')} style={styles.modalOptionButton}>
              <Text style={styles.modalOptionText}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Message')} style={styles.modalOptionButton}>
              <Text style={styles.modalOptionText}>Message</Text>
            </TouchableOpacity>
           

            <TouchableOpacity onPress={toggleHamburgerModal} style={styles.closeButton}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#81C784',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
  },
  hamburgerButton: {
    padding: 8,
  },
  welcomeText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    flex: 1,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 15,
    alignItems: 'center',
    width: 320,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 20,
  },
  modalAvatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 20,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalOptionButton: {
    paddingVertical: 12,
    backgroundColor: '#4CAF50',
    marginVertical: 8,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  modalOptionText: {
    color: '#fff',
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  closeText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default TopBar;
