// src/SearchBar.js

import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <TextInput
      style={styles.searchInput}
      placeholder="Search questions..."
      value={searchTerm}
      onChangeText={(text) => setSearchTerm(text)}
    />
  );
};

const styles = StyleSheet.create({
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 8,
    marginBottom: 16,
    marginHorizontal: 8,
  },
});

export default SearchBar;
