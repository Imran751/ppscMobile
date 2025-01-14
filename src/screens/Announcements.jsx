import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // Assuming you have firebase config set up

const AnnouncementsScreen = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        // Fetching announcements from Firestore
        const querySnapshot = await getDocs(collection(db, 'announcements'));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAnnouncements(data);
      } catch (error) {
        console.error("Error fetching announcements: ", error);
        Alert.alert('Error', 'Failed to fetch announcements');
      }
    };

    fetchAnnouncements();
  }, []);

  const renderItem = ({ item, index }) => {
    console.log('Rendering item:', item); // Log each item being rendered
    return (
      <View style={styles.announcementContainer}>
        <Text style={styles.announcementTitle}>
          {index + 1}. {item.title}
        </Text>
        <Text style={styles.announcementDate}>{item.date}</Text>
        <TouchableOpacity
          style={styles.readMoreButton}
          onPress={() => Alert.alert('Announcement Details', item.content)}>
          <Text style={styles.readMoreText}>Read More</Text>
        </TouchableOpacity>
      </View>
    );
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Announcements</Text>
      {announcements.length > 0 ? (
        <FlatList
          data={announcements}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Text style={styles.noAnnouncementsText}>No announcements available.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7FA',
    paddingTop: 20,
    paddingHorizontal: 15,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  announcementContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  announcementTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#2C3E50',
  },
  readMoreButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#3498DB',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  readMoreText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  noAnnouncementsText: {
    fontSize: 18,
    color: '#7F8C8D',
    textAlign: 'center',
  },
});

export default AnnouncementsScreen;
