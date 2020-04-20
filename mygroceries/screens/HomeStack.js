import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './Home';
import Product from './Product';

const Stack = createStackNavigator();

export default HomeStack = () => {
  return (
    <Stack.Navigator headerMode={'none'}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Product" component={Product} />
    </Stack.Navigator>
  );
}