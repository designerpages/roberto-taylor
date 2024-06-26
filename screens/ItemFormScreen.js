import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { createItem, updateItem } from '../api';

export default function ItemFormScreen({ route, navigation }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [item, setItem] = useState(null);

  useEffect(() => {
    if (route.params?.item) {
      setItem(route.params.item);
      setTitle(route.params.item.title);
      setBody(route.params.item.body);
    }
  }, [route.params?.item]);

  const handleSubmit = async () => {
    const newItem = { title, body };
    if (item) {
      await updateItem(item._id, newItem);
    } else {
      await createItem(newItem);
    }

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSubmit}>
          <Ionicons name="checkmark-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Text style={styles.label}>Title</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />
      <Text style={styles.label}>Description</Text>
      <TextInput style={styles.input} value={body} onChangeText={setBody} />
      <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#FFF4E1',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: 'black',
    marginBottom: 8,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 8,
    marginBottom: 16,
    color: 'black',
  },
  saveButton: {
    backgroundColor: 'black',
    padding: 16,
    alignItems: 'center',
    borderRadius: 8,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
