import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';

const SubjectCategories = ({ categories, selectedCategory, setSelectedCategory }) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>
      {categories.map((category) => (
        <TouchableOpacity
          key={category}
          style={[
            styles.categoryButton,
            selectedCategory === category && styles.categoryButtonActive,
          ]}
          onPress={() => setSelectedCategory(category)}
        >
          <Text
            style={[
              styles.categoryButtonText,
              selectedCategory === category && styles.categoryButtonTextActive,
            ]}
          >
            {category}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    marginBottom: 16,
    marginTop: 8,
    marginHorizontal:4,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#F0F0F0', // Lighter grey for inactive button
    borderRadius: 20,
    marginRight: 8,
  },
  categoryButtonActive: {
    backgroundColor: '#7A9CFF', // Soft blue for active category
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555', // Softer grey for inactive text
  },
  categoryButtonTextActive: {
    color: '#ffffff', // White text for active category
  },
});

export default SubjectCategories;
