import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './navigation/home'; 
import Icon from 'react-native-vector-icons/FontAwesome';
import Settings from './navigation/settings';
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator  screenOptions={{
          tabBarActiveTintColor: 'purple', // Set the active tab icon color to purple
        }}>
        <Tab.Screen name="Home" component={Home} options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Icon name="home" color={color} size={size} />
            ),
          }}/>
          <Tab.Screen name="Settings" component={Settings} options={{
            tabBarLabel: 'Settings',
            tabBarIcon: ({ color, size }) => (
              <Icon name="gear" color={color} size={size} />
            ),
          }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  // Your styles here
});
