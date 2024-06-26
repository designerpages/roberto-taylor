import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { getItems, deleteItem } from '../api';
import { useIsFocused } from '@react-navigation/native';

export default function ItemListScreen({ navigation }) {
  const [items, setItems] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fetchItems();
    }
  }, [isFocused]);

  const fetchItems = async () => {
    const data = await getItems();
    setItems(data);
  };

  const handleDelete = async (id) => {
    await deleteItem(id);
    fetchItems();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>FuseProp Project Example</Text>
      </View>
      <TouchableOpacity onPress={() => setShowAll(!showAll)}>
        <Text style={styles.seeAll}>{showAll ? 'Show Less' : 'See All'}</Text>
      </TouchableOpacity>
      <FlatList
        data={showAll ? items : items.slice(0, 5)}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={styles.circle}></View>
            <View style={styles.itemContent}>
              <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
                {item.title}
              </Text>
              <Text style={styles.body} numberOfLines={1} ellipsizeMode="tail">
                {item.body}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('ItemForm', { item })}
              style={styles.editButton}
            >
              <Ionicons name="pencil-outline" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleDelete(item._id)}
              style={styles.deleteButton}
            >
              <Ionicons name="trash-outline" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('ItemForm')}
      >
        <Ionicons name="add" size={40} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingHorizontal: 16,
    paddingTop: Constants.statusBarHeight,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerText: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
  seeAll: {
    color: 'white',
    alignSelf: 'flex-end',
    marginBottom: 8,
    textDecorationLine: 'underline',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'pink',
    marginRight: 16,
  },
  itemContent: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    width: '100%',
  },
  body: {
    fontSize: 16,
    fontWeight: 'normal',
    width: '100%',
  },
  editButton: {
    marginRight: 16,
  },
  deleteButton: {},
  addButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
