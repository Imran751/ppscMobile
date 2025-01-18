import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Clipboard, FlatList, Alert } from 'react-native';

const DeveloperAndAnnouncementsScreen = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [expandedAnnouncement, setExpandedAnnouncement] = useState(null); // Track expanded announcement
  const jazzCashNumber = '03006509123'; // Replace with your JazzCash number

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/Imran751/courseWebsite/624d49c77a2c529915fc25f080b017b1de62cc00/announcements.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
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

  const toggleExpand = (id) => {
    setExpandedAnnouncement(expandedAnnouncement === id ? null : id); // Toggle expanded announcement
  };

  const renderItem = ({ item, index }) => {
    const isExpanded = expandedAnnouncement === item.id; // Check if this announcement is expanded

    return (
      <View style={styles.announcementContainer}>
        <Text style={styles.announcementTitle}>
          {index + 1}. {item.title}
        </Text>
        <Text style={styles.announcementDate}>{item.date}</Text>
        <Text style={styles.announcementContent}>
          {isExpanded ? item.content : item.content.slice(0, 50) + '...'} {/* Show full content or truncated version */}
        </Text>
        <TouchableOpacity
          style={styles.readMoreButton}
          onPress={() => toggleExpand(item.id)}>
          <Text style={styles.readMoreText}>{isExpanded ? 'Show Less' : 'Read More'}</Text>
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
    letterSpacing: 0.5,
  },
  announcementsHeader: {
    marginTop: 30,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
  },
  message: {
    fontSize: 18,
    color: '#7F8C8D',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
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
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    borderLeftWidth: 5,
    borderLeftColor: '#3498DB',
    marginHorizontal: 10,
  },
  announcementTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 10,
  },
  announcementDate: {
    fontSize: 14,
    color: '#95A5A6',
    marginBottom: 10,
  },
  announcementContent: {
    fontSize: 16,
    color: '#7F8C8D',
    lineHeight: 22,
    marginBottom: 10,
  },
  readMoreButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#3498DB',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  readMoreText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  noAnnouncementsText: {
    fontSize: 18,
    color: '#7F8C8D',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default DeveloperAndAnnouncementsScreen;
