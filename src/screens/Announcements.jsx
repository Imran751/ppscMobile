import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Clipboard, FlatList, Alert } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // Assuming you have firebase config set up

const DeveloperAndAnnouncementsScreen = () => {
  const [announcements, setAnnouncements] = useState([]);
  const jazzCashNumber = '03006509123'; // Replace with your JazzCash number

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

  const handleCopy = () => {
    Clipboard.setString(jazzCashNumber);
    alert('JazzCash number copied to clipboard!');
  };

  const renderItem = ({ item, index }) => {
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
    <FlatList
      data={announcements}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={(
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Show Some Love!</Text>
          <Text style={styles.message}>
            Loving the app? Your support fuels my passion and creativity!{'\n\n'}
            Developing this app takes countless hours of hard work and dedication, and every little bit of support helps me keep improving it for you. If you’d like to show your appreciation, a small JazzCash boost would mean the world to me! 🌟 Your contribution motivates me to continue building and enhancing this app with new features and updates. 🙌{'\n\n'}
            Thank you for being a part of this journey! 💙
          </Text>

          <Text style={styles.jazzCashNumber}>{jazzCashNumber}</Text>

          <TouchableOpacity style={styles.copyButton} onPress={handleCopy}>
            <Text style={styles.copyButtonText}>Copy My JazzCash Number</Text>
          </TouchableOpacity>

          <Text style={styles.instructions}>
            Open your JazzCash app and send me a little something to keep the magic going. 🪄✨
          </Text>

          <Text style={[styles.header, styles.announcementsHeader]}>Latest Announcements</Text>
        </View>
      )}
      ListFooterComponent={
        announcements.length === 0 && (
          <Text style={styles.noAnnouncementsText}>No announcements available.</Text>
        )
      }
    />
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: 50,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  header: {
    fontSize: 32,
    fontWeight: '700',
    color: '#333',
    marginBottom: 15,
  },
  announcementsHeader: {
    marginTop: 30,
    marginBottom: 20,
  },
  message: {
    fontSize: 18,
    color: '#7F8C8D',
    textAlign: 'center',
    marginBottom: 20,
  },
  jazzCashNumber: {
    fontSize: 28,
    color: '#2C3E50',
    fontWeight: '600',
    marginBottom: 20,
    letterSpacing: 1,
  },
  copyButton: {
    backgroundColor: '#3498DB',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginBottom: 20,
    shadowColor: '#2980B9',
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 2 },
    elevation: 5,
  },
  copyButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  instructions: {
    fontSize: 16,
    color: '#7F8C8D',
    textAlign: 'center',
    marginBottom: 30,
  },
  announcementContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
    borderLeftWidth: 5,
    borderLeftColor: '#3498DB',
   },
   announcementTitle:{
     fontSize :20 ,
     fontWeight :'600' ,
     color :'#2C3E50' ,
     marginBottom :8 ,
   },
   announcementDate:{
     fontSize :14 ,
     color :'#95A5A6' ,
     marginBottom :12 ,
   },
   readMoreButton:{
     alignSelf :'flex-start' ,
     backgroundColor :'#3498DB' ,
     paddingVertical :8 ,
     paddingHorizontal :15 ,
     borderRadius :5 ,
   },
   readMoreText:{
     fontSize :16 ,
     color :'#FFFFFF' ,
   },
   noAnnouncementsText:{
     fontSize :18 ,
     color :'#7F8C8D' ,
     textAlign :'center' ,
   }
});

export default DeveloperAndAnnouncementsScreen;
