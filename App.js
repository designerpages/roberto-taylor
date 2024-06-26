import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ItemListScreen from './screens/ItemListScreen';
import ItemFormScreen from './screens/ItemFormScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="ItemList"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="ItemList" component={ItemListScreen} />
        <Stack.Screen name="ItemForm" component={ItemFormScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
