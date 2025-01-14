import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';  // To fetch user data from AsyncStorage or API
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const TopBar = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [avatarModalVisible, setAvatarModalVisible] = useState(false);
  const [hamburgerModalVisible, setHamburgerModalVisible] = useState(false);

  // Fetch user details from AsyncStorage (or any API if necessary)
  useEffect(() => {
    const fetchUserData = async () => {
      const name = await AsyncStorage.getItem('userName') || 'User';  // Default to 'User' if no name is found
      const avatar = await AsyncStorage.getItem('userAvatar') || 'default-avatar';  // Default to a placeholder avatar
      setUserName(name);
      setUserAvatar(avatar);
    };

    fetchUserData();
  }, []);

  // Toggle the modal visibility for Avatar options
  const toggleAvatarModal = () => {
    setAvatarModalVisible(!avatarModalVisible);
  };

  // Toggle the modal visibility for Hamburger menu options
  const toggleHamburgerModal = () => {
    setHamburgerModalVisible(!hamburgerModalVisible);
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);  // Sign out from Firebase
      await AsyncStorage.clear();  // Clear AsyncStorage data
      navigation.replace('Login');  // Redirect to Login screen
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  // Handle avatar change (Placeholder action)
  const handleChangeAvatar = () => {
    alert('Avatar change functionality not implemented yet.');
    toggleAvatarModal();  // Close avatar modal after action
  };

  return (
    <SafeAreaView style={styles.topBarContainer}>
      {/* Hamburger Menu Button */}
      <TouchableOpacity onPress={toggleHamburgerModal} style={styles.hamburgerButton}>
        <MaterialCommunityIcons name="menu" size={30} color="#000" />
      </TouchableOpacity>

      {/* Welcome Text */}
      <Text style={styles.welcomeText}>Welcome, {userName}</Text>

      {/* Avatar - Click to open Avatar Modal */}
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

            {/* Avatar Options */}
            <TouchableOpacity onPress={handleChangeAvatar} style={styles.modalOptionButton}>
              <Text style={styles.modalOptionText}>Change Avatar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout} style={styles.modalOptionButton}>
              <Text style={styles.modalOptionText}>Logout</Text>
            </TouchableOpacity>

            {/* Close Avatar Modal */}
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
            
            {/* Hamburger Menu Options */}
            <TouchableOpacity onPress={() => navigation.navigate('Settings')} style={styles.modalOptionButton}>
              <Text style={styles.modalOptionText}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Messages')} style={styles.modalOptionButton}>
              <Text style={styles.modalOptionText}>Messages</Text>
            </TouchableOpacity>
            
            {/* Close Hamburger Modal */}
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
    backgroundColor: '#81C784',  // Lighter green background to create a diffused effect
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderBottomLeftRadius: 20,  // Round bottom left corner
    borderBottomRightRadius: 20,  // Round bottom right corner
    overflow: 'hidden',  // Ensures rounded corners work correctly
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

  // Modal Styling
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Dark transparent background
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 15,
    alignItems: 'center',
    width: 320,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
    letterSpacing: 0.5,
  },
  modalAvatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 20,
  },
  modalText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  modalOptionButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
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
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  closeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default TopBar;
