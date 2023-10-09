import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './navigation/Home'; 
import Icon from 'react-native-vector-icons/FontAwesome';
import Settings from './navigation/players';
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator  screenOptions={{
          tabBarActiveTintColor: 'purple', 
        }}>
        <Tab.Screen name="Home" component={Home}  options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Icon name="home" color={'purple'} size={30} />
            ),
          }}/>
          <Tab.Screen name="Players" component={Settings} options={{
            tabBarLabel: 'Players',
            tabBarIcon: ({ color, size }) => (
              <Icon name="group" color={'purple'} size={30} />
            ),
          }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  top: {
    fontColor : 'red'
  },
});
