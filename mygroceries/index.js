/**
 * @format
 */

import React from 'react';
import {AppRegistry} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import App from './App';
import {name as appName} from './app.json';

const Root = () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
};
AppRegistry.registerComponent(appName, () => Root);
