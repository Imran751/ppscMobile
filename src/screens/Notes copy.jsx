import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NotesScreen = () => {
  const [note, setNote] = useState('');
  const [notesList, setNotesList] = useState([]);

  // Load notes from AsyncStorage on mount
  useEffect(() => {
    const loadNotes = async () => {
      try {
        const storedNotes = await AsyncStorage.getItem('notes');
        if (storedNotes) {
          setNotesList(JSON.parse(storedNotes));
        }
      } catch (error) {
        console.error('Error loading notes:', error);
      }
    };
    loadNotes();
  }, []);

  // Save notes to AsyncStorage whenever notesList changes
  useEffect(() => {
    const saveNotes = async () => {
      try {
        await AsyncStorage.setItem('notes', JSON.stringify(notesList));
      } catch (error) {
        console.error('Error saving notes:', error);
      }
    };
    saveNotes();
  }, [notesList]);

  const handleAddNote = () => {
    if (note.trim() === '') {
      Alert.alert('Error', 'Please enter a note');
      return;
    }
    const newNote = {
      id: Math.random().toString(),
      content: note,
    };
    const updatedNotes = [...notesList, newNote];
    setNotesList(updatedNotes);
    setNote('');
  };

  const handleDeleteNote = (id) => {
    const updatedNotes = notesList.filter(note => note.id !== id);
    setNotesList(updatedNotes);
  };

  const renderItem = ({ item }) => (
    <View style={styles.noteContainer}>
      <Text style={styles.noteContent}>{item.content}</Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteNote(item.id)}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notes</Text>

      <TextInput
        style={styles.input}
        placeholder="Write your note here"
        value={note}
        onChangeText={setNote}
      />

      <TouchableOpacity style={styles.addButton} onPress={handleAddNote}>
        <Text style={styles.addButtonText}>Add Note</Text>
      </TouchableOpacity>

      {notesList.length > 0 ? (
        <FlatList
          data={notesList}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          style={styles.notesList}
        />
      ) : (
        <Text style={styles.noNotesText}>No notes added yet.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FB',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#BDC3C7',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 15,
    fontSize: 18,
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
  },
  notesList: {
    marginTop: 20,
  },
  noteContainer: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.5,
    elevation: 5,
  },
  noteContent: {
    fontSize: 16,
    color: '#34495E',
  },
  deleteButton: {
    marginTop: 10,
    backgroundColor: '#E74C3C',
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  noNotesText: {
    fontSize: 18,
    color: '#95A5A6',
    textAlign: 'center',
  },
});

export default NotesScreen;
