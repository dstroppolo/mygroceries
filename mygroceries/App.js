/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'native-base';

import HomeStack from './screens/HomeStack';
import Scanner from './screens/Scanner';
import Account from './screens/Account';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#FA8776',
        inactiveTintColor: '#a195e5',
        activeBackgroundColor: '#2B12AF',
        inactiveBackgroundColor: '#4D4384',
        keyboardHidesTabBar: true
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({focused}) =>
            focused ? (
              <Icon name="home" style={{color: '#FA8776'}} />
            ) : (
              <Icon name="home" style={{color: '#a195e5'}} />
            ),
        }}
      />
      <Tab.Screen
        name="Scanner"
        component={Scanner}
        options={{
          unmountOnBlur: true,

          tabBarIcon: ({focused}) =>
            focused ? (
              <Icon type="MaterialCommunityIcons" name="barcode-scan" style={{color: '#FA8776'}}/>
            ) : (
              <Icon type="MaterialCommunityIcons" name="barcode-scan" style={{color: '#a195e5'}} />
            ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          unmountOnBlur: true,

          tabBarIcon: ({focused}) =>
            focused ? (
              <Icon type="MaterialCommunityIcons" name="account" style={{color: '#FA8776'}} />
            ) : (
              <Icon type="MaterialCommunityIcons" name="account" style={{color: '#a195e5'}} />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

export default App;
